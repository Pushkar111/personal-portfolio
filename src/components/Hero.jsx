
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import AboutModal from './AboutModal';

const Hero = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const scrollToProjects = (e) => {
    e.preventDefault();
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden bg-dark px-4 md:px-10 lg:px-20">
      {/* Background particles and shapes - simplified version */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-24 h-24 rounded-full bg-blue-500/10 top-1/4 left-1/4"></div>
        <div className="absolute w-32 h-32 rounded-lg bg-blue-500/5 top-1/3 right-1/4"></div>
        <div className="absolute w-20 h-20 rounded-full bg-blue-500/10 bottom-1/4 right-1/3"></div>
        <div className="absolute w-16 h-16 rounded-lg bg-blue-500/5 bottom-1/3 left-1/3"></div>
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/10"
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              animation: `pulse ${2 + Math.random() * 3}s infinite`
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto z-10">
        <div className="flex flex-col items-start max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-7xl font-bold mb-4 text-white"
          >
            Pushkar
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
        <div className="flex items-center">
          <svg width="200" height="200" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M100 50 H200 C250 50 300 100 300 150 C300 200 250 250 200 250 H100 V50" 
              stroke="url(#logo-gradient)" 
              strokeWidth="15"
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
          <span className="text-6xl font-bold bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text text-transparent opacity-20">Pushkar</span>
        </div>
      </div>

      <AboutModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
};

export default Hero;
