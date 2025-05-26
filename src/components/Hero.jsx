import { useState, useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, animate } from "framer-motion";
import { ArrowRight, MoveDown } from "lucide-react";
import AboutModal from "./AboutModal";
import Matter from "matter-js";

const Hero = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [scrollEnabled, setScrollEnabled] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const canvasRef = useRef(null);
    const engineRef = useRef(null);
    const renderRef = useRef(null);
    const runnerRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    // Matter.js setup
    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const dimensions = {
            width: window.innerWidth,
            height: window.innerHeight,
        };

        // Set canvas dimensions
        canvas.width = dimensions.width;
        canvas.height = dimensions.height;

        // Module aliases
        const Engine = Matter.Engine;
        const Events = Matter.Events;
        const Runner = Matter.Runner;
        const Render = Matter.Render;
        const World = Matter.World;
        const Body = Matter.Body;
        const Bodies = Matter.Bodies;
        const Common = Matter.Common;

        // Create engine
        const engine = Engine.create();
        engine.world.gravity.y = 0;
        engine.world.gravity.x = 0;

        // Create renderer with specific settings for subtle effect
        const render = Render.create({
            canvas: canvas,
            engine: engine,
            options: {
                width: dimensions.width,
                height: dimensions.height,
                wireframes: false,
                background: 'transparent',
                showVelocity: false,
                showAngleIndicator: false,
                showDebug: false,
                pixelRatio: window.devicePixelRatio || 1,
            },
        });

        // Create runner
        const runner = Runner.create();

        // Create world
        const world = engine.world;

        // Store all particles for interaction
        const particles = [];

        // Create particles similar to anuragsinghbam.com
        for (let i = 0; i < 100; i += 1) {
            const x = Common.random(0, dimensions.width);
            const y = Common.random(0, dimensions.height);
            const radius = Common.random(1, 3); // Much smaller particles
            
            // Subtle white/blue particles with low opacity
            const particle = Bodies.circle(x, y, radius, {
                mass: 0.001,
                friction: 0,
                frictionAir: 0.001,
                restitution: 1,
                render: {
                    fillStyle: `rgba(255, 255, 255, ${Common.random(0.1, 0.3)})`,
                    strokeStyle: `rgba(59, 130, 246, ${Common.random(0.2, 0.4)})`,
                    lineWidth: 0.5,
                },
            });

            // Add very gentle initial velocity
            Body.setVelocity(particle, {
                x: Common.random(-0.2, 0.2),
                y: Common.random(-0.2, 0.2),
            });

            World.add(world, particle);
            particles.push(particle);
        }

        // Create invisible boundaries
        const wallThickness = 1;
        const walls = [
            Bodies.rectangle(dimensions.width / 2, -wallThickness, dimensions.width, wallThickness, { 
                isStatic: true, 
                render: { visible: false } 
            }),
            Bodies.rectangle(dimensions.width / 2, dimensions.height + wallThickness, dimensions.width, wallThickness, { 
                isStatic: true, 
                render: { visible: false } 
            }),
            Bodies.rectangle(-wallThickness, dimensions.height / 2, wallThickness, dimensions.height, { 
                isStatic: true, 
                render: { visible: false } 
            }),
            Bodies.rectangle(dimensions.width + wallThickness, dimensions.height / 2, wallThickness, dimensions.height, { 
                isStatic: true, 
                render: { visible: false } 
            }),
        ];

        World.add(world, walls);

        // Mouse tracking with proper coordinates
        const updateMousePosition = (event) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: (event.clientX - rect.left) * (canvas.width / rect.width),
                y: (event.clientY - rect.top) * (canvas.height / rect.height),
            };
        };

        // Touch tracking
        const updateTouchPosition = (event) => {
            if (event.touches.length > 0) {
                const rect = canvas.getBoundingClientRect();
                mouseRef.current = {
                    x: (event.touches[0].clientX - rect.left) * (canvas.width / rect.width),
                    y: (event.touches[0].clientY - rect.top) * (canvas.height / rect.height),
                };
            }
        };

        // Listen on the hero section for mouse events
        const heroSection = document.getElementById('hero');
        if (heroSection) {
            heroSection.addEventListener('mousemove', updateMousePosition);
            heroSection.addEventListener('touchmove', updateTouchPosition);
        }

        // Gentle mouse attraction similar to reference site
        Events.on(engine, 'beforeUpdate', function () {
            const mouse = mouseRef.current;
            if (!mouse.x && !mouse.y) return;

            particles.forEach(particle => {
                const dx = mouse.x - particle.position.x;
                const dy = mouse.y - particle.position.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Only attract nearby particles with very gentle force
                if (distance < 150 && distance > 0) {
                    const attractionStrength = 0.00008; // Much gentler attraction
                    const force = {
                        x: (dx / distance) * attractionStrength,
                        y: (dy / distance) * attractionStrength,
                    };
                    Body.applyForce(particle, particle.position, force);
                }

                // Add very subtle random movement
                if (Math.random() < 0.005) {
                    Body.applyForce(particle, particle.position, {
                        x: Common.random(-0.00005, 0.00005),
                        y: Common.random(-0.00005, 0.00005),
                    });
                }
            });
        });

        // Window resize handler
        const handleResize = () => {
            const newDimensions = {
                width: window.innerWidth,
                height: window.innerHeight,
            };
            
            canvas.width = newDimensions.width;
            canvas.height = newDimensions.height;
            render.options.width = newDimensions.width;
            render.options.height = newDimensions.height;
        };

        window.addEventListener('resize', handleResize);

        // Start the engine and renderer
        Runner.run(runner, engine);
        Render.run(render);

        // Store refs for cleanup
        engineRef.current = engine;
        renderRef.current = render;
        runnerRef.current = runner;

        return () => {
            if (heroSection) {
                heroSection.removeEventListener('mousemove', updateMousePosition);
                heroSection.removeEventListener('touchmove', updateTouchPosition);
            }
            window.removeEventListener('resize', handleResize);
            
            if (renderRef.current) {
                Render.stop(renderRef.current);
            }
            if (runnerRef.current && engineRef.current) {
                Runner.stop(runnerRef.current);
            }
            if (engineRef.current) {
                World.clear(engineRef.current.world, false);
                Engine.clear(engineRef.current);
            }
        };
    }, []);

    // Block scrolling until user clicks explore button
    useEffect(() => {
        if (!scrollEnabled) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, [scrollEnabled]);

    const handleMouseMove = ({ clientX, clientY }) => {
        const heroElement = document.getElementById("hero");
        if (heroElement) {
            const { left, top } = heroElement.getBoundingClientRect();
            mouseX.set(clientX - left);
            mouseY.set(clientY - top);
        }
    };

    const scrollToProjects = (e) => {
        e.preventDefault();
        setScrollEnabled(true);
        setTimeout(() => {
            document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

        return (
        <section id="hero" className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900" onMouseMove={handleMouseMove}>
            {/* Matter.js Canvas */}
            <canvas 
                ref={canvasRef}
                className="absolute inset-0 z-10"
                style={{ 
                    width: '100%',
                    height: '100%',
                    opacity: 1,
                    pointerEvents: 'none'
                }}
            />

            {/* Background overlays */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,41,59,0.3),rgba(15,23,42,0.5)_30%,rgba(12,15,28,0.7)_50%,rgba(2,6,23,0.9)_80%)] pointer-events-none z-[1]" />

            <div className="absolute inset-0 z-[2]">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay" />
            </div>

            {/* Animated gradient backdrop */}
            <motion.div
                className="absolute inset-0 opacity-20 z-[3]"
                style={{
                    background: useMotionTemplate`radial-gradient(600px at ${mouseX}px ${mouseY}px, rgba(0, 159, 253, 0.15), transparent 80%)`,
                }}
            />

            {/* Geometric grid pattern */}
            <div className="absolute inset-0 opacity-5 [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)] z-[4]">
                <div className="absolute inset-0 [background-size:40px_40px] [background-image:linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)]" />
            </div>

            <div className="container mx-auto px-4 md:px-8 lg:px-16 h-screen flex items-center relative z-20">
                <div className="max-w-2xl xl:max-w-4xl space-y-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
                        <h1 className="relative text-5xl md:text-7xl lg:text-8xl font-bold">
                            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Pushkar Modi</span>
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 blur-xl opacity-30 -z-10" />

                            {/* Cyberpunk decoration */}
                            <div className="absolute -left-4 top-1/2 h-[2px] w-12 bg-blue-400/70" />
                            <div className="absolute -right-8 bottom-0 h-12 w-[2px] bg-gradient-to-t from-cyan-400/70 to-transparent" />
                        </h1>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-xl md:text-2xl mt-4 text-gray-300 font-mono">
                            {`> MERN Stack Developer`}
                        </motion.p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex gap-4">
                        <button
                            onClick={() => setModalOpen(true)}
                            className="relative group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600/80 to-cyan-600/80 backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] shadow-xl hover:shadow-blue-500/20 border border-white/10 z-30">
                            <span className="text-lg font-semibold text-white">About Me</span>
                            <div className="transition-all group-hover:translate-x-1">
                                <ArrowRight className="text-white" size={20} />
                            </div>

                            {/* Animated hover effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity"
                                animate={{
                                    background: [
                                        "linear-gradient(to right, rgba(59, 130, 246, 0.1), rgba(6, 182, 212, 0.1))",
                                        "linear-gradient(to right, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1))",
                                        "linear-gradient(to right, rgba(59, 130, 246, 0.1), rgba(6, 182, 212, 0.1))",
                                    ],
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />

                            {/* Light edge effect */}
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        </button>
                    </motion.div>

                    {/* Animated scroll indicator */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30">
                        <a href="#projects" onClick={scrollToProjects} className="flex flex-col items-center group">
                            <div className="relative">
                                <motion.div
                                    animate={{ y: [0, 15, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600/80 to-cyan-600/80 flex items-center justify-center shadow-lg hover:shadow-blue-500/30 transition-shadow backdrop-blur-sm border border-white/10">
                                    <MoveDown className="text-white" size={24} />
                                </motion.div>

                                {/* Futuristic rings */}
                                {[16, 24, 32].map((size, i) => (
                                    <motion.div
                                        key={`ring-${i}`}
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/30"
                                        style={{ width: size, height: size }}
                                        animate={{
                                            scale: [1, 1.5, 1],
                                            opacity: [0.3, 0, 0.3],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            delay: i * 0.3,
                                            ease: "easeInOut",
                                        }}
                                    />
                                ))}
                            </div>
                            <motion.span
                                className="mt-2 text-sm text-gray-400 group-hover:text-white transition-colors"
                                animate={{
                                    opacity: [0.7, 1, 0.7],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}>
                                Explore Work
                            </motion.span>
                        </a>
                    </motion.div>
                </div>

                {/* Animated geometric logo */}
                <motion.div
                    className="absolute mix-blend-lighten right-0 md:right-8 lg:right-24 top-1/2 -translate-y-1/2 w-[200px] sm:w-[300px] md:w-[350px] lg:w-[400px] opacity-60 md:opacity-80 lg:opacity-100 z-20"
                    initial={{ opacity: 0, x: 100, rotateY: 45 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{ delay: 0.9, duration: 1.2, ease: "easeOut" }}>
                    <motion.div animate={{ rotateZ: [0, 360] }} transition={{ duration: 120, repeat: Infinity, ease: "linear" }} className="relative">
                        <svg viewBox="0 0 400 400" className="w-[400px] h-[400px]">
                            <motion.path
                                d="M200 50L50 350 350 350z"
                                stroke="url(#logo-gradient-1)"
                                strokeWidth="12"
                                fill="none"
                                strokeLinejoin="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 2, delay: 1 }}
                            />
                            <motion.path
                                d="M200 350L350 50 50 50z"
                                stroke="url(#logo-gradient-2)"
                                strokeWidth="12"
                                fill="none"
                                strokeLinejoin="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 2, delay: 1.5 }}
                            />
                            <defs>
                                <linearGradient id="logo-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <motion.stop offset="0%" stopColor="#00C6FF" animate={{ stopColor: ["#00C6FF", "#0072FF", "#00C6FF"] }} transition={{ duration: 5, repeat: Infinity }} />
                                    <motion.stop offset="100%" stopColor="#0072FF" animate={{ stopColor: ["#0072FF", "#00C6FF", "#0072FF"] }} transition={{ duration: 5, repeat: Infinity }} />
                                </linearGradient>
                                <linearGradient id="logo-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
                                    <motion.stop offset="0%" stopColor="#00C6FF" animate={{ stopColor: ["#00C6FF", "#0072FF", "#00C6FF"] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }} />
                                    <motion.stop
                                        offset="100%"
                                        stopColor="#0072FF"
                                        animate={{ stopColor: ["#0072FF", "#00C6FF", "#0072FF"] }}
                                        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                                    />
                                </linearGradient>
                            </defs>
                        </svg>
                    </motion.div>
                </motion.div>
            </div>

            {/* Glow effects */}
            <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)] pointer-events-none z-[5]">
                <div className="absolute -top-32 -left-48 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-48 -right-48 w-[800px] h-[800px] bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl" />
            </div>

            <AboutModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </section>
    );
};

export default Hero;