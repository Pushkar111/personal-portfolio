
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 px-4 sm:px-6 py-4 transition-all duration-300 ${
        scrolled ? 'bg-dark/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <a href="#home" className="text-2xl font-bold text-white flex items-center">
          <svg width="40" height="40" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
            <path 
              d="M100 50 H200 C250 50 300 100 300 150 C300 200 250 250 200 250 H100 V50" 
              stroke="url(#nav-logo-gradient)" 
              strokeWidth="20"
              fill="none"
            />
            <defs>
              <linearGradient id="nav-logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2A2A72" />
                <stop offset="50%" stopColor="#009FFD" />
                <stop offset="100%" stopColor="#2A2A72" />
              </linearGradient>
            </defs>
          </svg>
          <span className="bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text text-transparent">Pushkar</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#home" className="text-white hover:text-blue-400 transition-colors">Home</a>
          <a href="#projects" className="text-white hover:text-blue-400 transition-colors">Projects</a>
          <a href="#testimonials" className="text-white hover:text-blue-400 transition-colors">Testimonials</a>
          <a href="#contact" className="text-white hover:text-blue-400 transition-colors">Contact</a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="text-white"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu - Offcanvas */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed top-0 right-0 h-full w-[70%] max-w-sm bg-dark border-l border-gray-800 z-50 md:hidden"
            >
              <div className="p-5 flex justify-end">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white p-2 rounded-full hover:bg-gray-800"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="px-6 py-8 flex flex-col space-y-8">
                <a
                  href="#home"
                  className="text-2xl font-medium text-white hover:text-blue-400 transition-colors py-2 border-b border-gray-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </a>
                <a
                  href="#projects"
                  className="text-2xl font-medium text-white hover:text-blue-400 transition-colors py-2 border-b border-gray-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Projects
                </a>
                <a
                  href="#testimonials"
                  className="text-2xl font-medium text-white hover:text-blue-400 transition-colors py-2 border-b border-gray-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Testimonials
                </a>
                <a
                  href="#contact"
                  className="text-2xl font-medium text-white hover:text-blue-400 transition-colors py-2 border-b border-gray-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
