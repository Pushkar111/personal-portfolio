
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { Download, Send } from 'lucide-react';
import PhoneModel from './PhoneModel';

const Hero = () => {
  const defaultOptions = {
    reverse: false,
    max: 15,
    perspective: 1000,
    scale: 1.05,
    speed: 1000,
    transition: true,
    axis: null,
    reset: true,
    easing: 'cubic-bezier(.03,.98,.52,.99)',
  };

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
      
      <div className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center justify-between">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:w-1/2 mb-12 md:mb-0"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg text-blue-light font-medium mb-4"
          >
            Hello, I'm
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Anurag Singh
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-2xl md:text-3xl font-semibold mb-6"
          >
            <span className="text-gradient">Full Stack Developer</span>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-gray-600 text-lg mb-8 max-w-lg"
          >
            I build exceptional and accessible digital experiences 
            for the web with modern technologies.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#contact"
              className="bg-gradient-primary text-white px-6 py-3 rounded-full font-medium hover-scale flex items-center gap-2"
            >
              <Send size={18} />
              Contact Me
            </a>
            <a
              href="/resume.pdf"
              className="bg-white text-gray-800 px-6 py-3 rounded-full font-medium border border-gray-300 hover-scale flex items-center gap-2"
            >
              <Download size={18} />
              Resume
            </a>
          </motion.div>
        </motion.div>

        {/* 3D Phone Model */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:w-1/2 flex justify-center"
        >
          <Tilt options={defaultOptions} className="w-full max-w-sm">
            <div className="relative w-full h-[600px] bg-blue-light/5 rounded-2xl p-8 backdrop-blur-sm border border-white/20 shadow-xl">
              <PhoneModel />
            </div>
          </Tilt>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center">
          <p className="text-sm text-gray-600 mb-2">Scroll Down</p>
          <div className="w-1 h-10 rounded-full bg-gradient-primary relative overflow-hidden">
            <div className="w-full h-1/2 bg-white/80 absolute top-0 animate-[bounce_2s_infinite]"></div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
