import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import { ArrowLeft, Terminal, RefreshCw, Home, Code, ChevronRight } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const containerRef = useRef(null);
  const animationControls = useAnimation();
  const [hoveredButton, setHoveredButton] = useState(null);
  const [typewriterComplete, setTypewriterComplete] = useState(false);
  
  // Artificial loading state for dramatic effect
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.backgroundColor = '#0a0a0f';
    
    // Log the 404 error but don't show actual error to user
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Simulate a loading state for dramatic effect
    const timer = setTimeout(() => {
      setLoading(false);
      
      // Start main animations after "loading"
      animationControls.start({
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.8,
          ease: "easeOut",
        },
      });
      
      // Start typewriter effect
      setTimeout(() => setTypewriterComplete(true), 2000);
      
    }, 1000);
    
    return () => {
      document.body.style.backgroundColor = '';
      clearTimeout(timer);
    };
  }, [location.pathname, animationControls]);

  // Stylized "code" that looks cool but isn't actually showing an error
  const fakeCodeSnippet = `function navigateTo(path) {
  if (path === "${location.pathname}") {
    return {
      status: 404,
      message: "Path not found"
    };
  }
  
  return redirect("/");
}`;

  // Animation variants for the background circles
  const circleVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: (i) => ({
      scale: 1,
      opacity: 0.3,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        delay: i * 0.1,
      },
    }),
  };
  
  // Animation for matrix-like falling characters
  const MatrixRain = () => {
    return (
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div 
            key={i}
            className="absolute top-0 text-blue-400 font-mono text-opacity-70"
            style={{
              left: `${(i * 7) + Math.random() * 5}%`,
              animation: `matrixFall ${3 + Math.random() * 5}s infinite linear`,
              animationDelay: `${Math.random() * 2}s`
            }}
          >
            {Array.from({ length: 20 }).map((_, j) => (
              <div 
                key={j}
                style={{ 
                  opacity: Math.max(0.1, 1 - (j * 0.1)),
                  transform: `translateY(${j * 20}px)`,
                  animationDelay: `${j * 0.1}s`
                }}
              >
                {String.fromCharCode(33 + Math.floor(Math.random() * 94))}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* CSS for custom animations */}
      <style jsx="true">{`
        @keyframes gradientShift {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        
        @keyframes matrixFall {
          from { transform: translateY(-100px); }
          to { transform: translateY(100vh); }
        }
        
        @keyframes glitch {
          0% { transform: translate(0) }
          20% { transform: translate(-2px, 2px) }
          40% { transform: translate(-2px, -2px) }
          60% { transform: translate(2px, 2px) }
          80% { transform: translate(2px, -2px) }
          100% { transform: translate(0) }
        }
        
        .typewriter {
          overflow: hidden;
          border-right: 2px solid transparent;
          white-space: nowrap;
          display: inline-block;
          animation: typing 2s steps(40, end), blink-caret 0.75s step-end infinite;
        }
        
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
        
        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: #3b82f6 }
        }
        
        .shifting-bg {
          background: linear-gradient(135deg, #121237, #1f1f50, #0c234d, #070850);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
        }
      `}</style>

      <div className="min-h-screen flex items-center justify-center shifting-bg relative overflow-hidden" ref={containerRef}>
        {/* Loading overlay */}
        <AnimatePresence>
          {loading && (
            <motion.div 
              className="absolute inset-0 z-50 flex items-center justify-center bg-gray-900"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-16 h-16 text-blue-400"
              >
                <RefreshCw size={64} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Matrix-like rain effect in background */}
        <MatrixRain />
        
        {/* Enhanced Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated circles */}
          {[...Array(10)].map((_, i) => {
            const size = 40 + Math.random() * 200;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const color = [
              'bg-blue-600/10', 
              'bg-indigo-600/10', 
              'bg-purple-600/10',
              'bg-cyan-600/10'
            ][i % 4];

            return (
              <motion.div
                key={i}
                custom={i}
                className={`absolute rounded-full ${color} backdrop-blur-sm`}
                style={{ width: size, height: size, left: `${x}%`, top: `${y}%` }}
                variants={circleVariants}
                initial="initial"
                animate="animate"
              />
            );
          })}

          {/* Glowing dots */}
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-blue-400"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.1, 0.8, 0.1],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        {/* Main content with enhanced animations */}
        <motion.div
          className="relative z-10 max-w-3xl mx-auto p-8 rounded-2xl bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 shadow-[0_0_40px_rgba(59,130,246,0.2)]"
          initial={{ opacity: 0, y: 30 }}
          animate={animationControls}
        >
          {/* Animated 404 Heading */}
          <div className="text-center mb-10">
            <motion.div
              className="relative inline-block"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.8,
                type: "spring",
                bounce: 0.4,
              }}
            >
              <motion.h1
                className="text-[10rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-400 to-indigo-500 leading-none"
                animate={{ 
                  textShadow: ["0 0 8px rgba(59,130,246,0.6)", "0 0 16px rgba(59,130,246,0.4)", "0 0 8px rgba(59,130,246,0.6)"]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                404
              </motion.h1>
              
              <motion.div 
                className="absolute -top-4 -right-4 rounded-full bg-red-500 w-10 h-10 flex items-center justify-center text-white font-bold text-xl"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, duration: 0.3, type: "spring" }}
              >
                !
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
                <motion.span
                  animate={{ filter: ["blur(0px)", "blur(4px)", "blur(0px)"] }}
                  transition={{ duration: 3, times: [0, 0.5, 1], repeat: Infinity, repeatDelay: 5 }}
                >
                  Page Not Found
                </motion.span>
              </h2>
              <p className="text-xl text-gray-300 mb-6 max-w-lg mx-auto">
                The page at <code className="text-blue-400 font-mono px-1 py-0.5 bg-gray-800 rounded">{location.pathname}</code> has been lost in the digital void.
              </p>
            </motion.div>
          </div>

          {/* Terminal-inspired Section */}
          <motion.div
            className="bg-gray-900 border border-gray-700/50 rounded-lg p-4 mb-8 overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-3 border-b border-gray-800 pb-2">
              <Terminal size={16} className="text-blue-400" />
              <span className="text-blue-400 font-medium">terminal</span>
              <span className="text-gray-500">~/portfolio/routes</span>
            </div>
            
            <div className="font-mono text-sm">
              <div className="flex gap-2 items-start text-gray-400 mb-1">
                <span className="text-green-400">$</span>
                <span className="typewriter text-gray-300">find "{location.pathname}"</span>
              </div>
              
              <motion.pre 
                className="text-red-400 pl-5 overflow-x-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: typewriterComplete ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <code>Error: Path not found in route configuration</code>
              </motion.pre>
              
              <motion.div 
                className="mt-3 text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: typewriterComplete ? 1 : 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className="flex gap-2 items-start mb-1">
                  <span className="text-green-400">$</span>
                  <span>show available routes</span>
                </div>
                <div className="pl-5 text-blue-300">
                  <div>/ <span className="text-gray-400">- Home</span></div>
                  <div>/about <span className="text-gray-400">- About</span></div>
                  <div>/projects <span className="text-gray-400">- Projects</span></div>
                  <div>/contact <span className="text-gray-400">- Contact</span></div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setHoveredButton('home')}
              onHoverEnd={() => setHoveredButton(null)}
              className="relative"
            >
              <Link
                to="/"
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 font-medium group"
              >
                <Home className="group-hover:-translate-x-1 transition-transform" size={20} />
                Return to Home
                <AnimatePresence>
                  {hoveredButton === 'home' && (
                    <motion.span
                      className="absolute inset-0 rounded-lg border-2 border-blue-400/50"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setHoveredButton('refresh')}
              onHoverEnd={() => setHoveredButton(null)}
              className="relative"
            >
              <button
                onClick={() => window.location.reload()}
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 font-medium"
              >
                <RefreshCw size={20} />
                Refresh Page
                <AnimatePresence>
                  {hoveredButton === 'refresh' && (
                    <motion.span
                      className="absolute inset-0 rounded-lg border-2 border-gray-500/50"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default NotFound;