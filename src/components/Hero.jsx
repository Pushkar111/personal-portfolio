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

      <div className="container mx-auto z-10">
        <div className="flex flex-col items-start max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-7xl font-bold mb-4 text-white"
          >
            Anurag Singh
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-2"
          >
            MERN Stack Developer
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10"
          >
            <button 
              onClick={() => setModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded flex items-center transition-all duration-300 group"
            >
              About Me 
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <a 
              href="#projects" 
              onClick={scrollToProjects}
              className="flex flex-col items-center text-gray-400 hover:text-white transition-colors"
            >
              <span className="text-sm mb-2">Latest Works</span>
              <div className="w-10 h-10 flex items-center justify-center">
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                </motion.div>
              </div>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Large logo in the center-right */}
      <div className="absolute right-0 md:right-10 top-1/2 -translate-y-1/2 opacity-80 z-0 transform scale-75 md:scale-100">
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M200 50L50 350 350 350z M200 350L350 50 50 50z" 
            stroke="url(#logo-gradient)" 
            strokeWidth="10"
            fill="none"
          />
          <defs>
            <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2A2A72" />
              <stop offset="50%" stopColor="#009FFD" />
              <stop offset="100%" stopColor="#2A2A72" />
            </linearGradient>
          </defs>
        </svg>
      </div>

            <AboutModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </section>
    );
};

export default Hero;