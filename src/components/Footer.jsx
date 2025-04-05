
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="py-8 bg-white">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-gray-600 text-center md:text-left mb-4 md:mb-0"
        >
          © 2025 Anurag Singh. All rights reserved.
        </motion.p>
        
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          onClick={scrollToTop}
          className="p-3 bg-gradient-primary text-white rounded-full hover-scale"
        >
          <ArrowUp size={20} />
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;
