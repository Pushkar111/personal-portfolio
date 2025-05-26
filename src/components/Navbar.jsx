import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, ExternalLink } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const navbarRef = useRef(null);
  const [activeSection, setActiveSection] = useState('home');
  
  // Check if currently on home page
  const isHomePage = location.pathname === '/' || location.pathname === '';

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Only detect active sections on home page
    const handleScrollForActiveSection = () => {
      if (!isHomePage) return;
      
      const sections = ['home', 'projects', 'testimonials', 'contact'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const offset = 100;
          
          if (rect.top <= offset && rect.bottom >= offset) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleScrollForActiveSection);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScrollForActiveSection);
    };
  }, [isHomePage]);

  // Enhanced body scroll lock for mobile menu
  useEffect(() => {
    if (mobileMenuOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }
    
    return () => {
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Links configuration
  const navLinks = [
    { name: 'Home', path: 'home', id: 'home' },
    { name: 'Projects', path: 'projects', id: 'projects' },
    { name: 'Testimonials', path: 'testimonials', id: 'testimonials' },
    { name: 'Contact', path: 'contact', id: 'contact' }
  ];

  // Handle navigation for both home and non-home pages
  const handleNavigation = (e, path) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const sectionId = path.replace('#', '');
    
    if (isHomePage) {
      // If already on home page, just scroll to the section
      scrollToSection(sectionId);
    } else {
      // If on another page, navigate to home page then scroll to section
      navigate('/');
      // Store the section to scroll to after navigation
      sessionStorage.setItem('scrollToSection', sectionId);
    }
  };

  useEffect(() => {
    if (isHomePage) {
      // Check if we need to scroll to a section after navigation
      const scrollTarget = sessionStorage.getItem('scrollToSection');
      if (scrollTarget) {
        sessionStorage.removeItem('scrollToSection');
        scrollToSection(scrollTarget);
      } else if (location.hash) {
        // Handle direct URL with hash
        scrollToSection(location.hash.replace('#', ''));
      }
    }
  }, [isHomePage, location]);

  // Animation variants
  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut" 
      }
    }
  };

  const linkVariants = {
    hover: { 
      scale: 1.05,
      color: "#60A5FA",
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.95
    }
  };

  const mobileMenuItemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };

  // Toggle mobile menu with improved handling
  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  // Add this helper function before the return statement
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

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
        <a href="#home" className="text-2xl font-bold text-white">
          <svg width="40" height="40" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M200 50L50 350 350 350z M200 350L350 50 50 50z" 
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
        </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <motion.a
                key={link.id}
                href={link.path}
                onClick={(e) => handleNavigation(e, link.path)}
                variants={linkVariants}
                whileHover="hover"
                whileTap="tap"
                className={`relative font-medium text-base transition-colors ${
                  activeSection === link.id && isHomePage
                    ? 'text-blue-400' 
                    : 'text-gray-200 hover:text-blue-400'
                }`}
              >
                {link.name}
                {activeSection === link.id && isHomePage && (
                  <motion.span 
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500"
                    layoutId="activeNavIndicator"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.a>
            ))}

            <motion.a
              href="https://drive.google.com/file/d/1nn4j2CyR7NYA2SRAXjI9_S_nvR5646Vg/view?usp=sharing"
              target='_blank'
              variants={linkVariants}
              whileHover="hover"
              whileTap="tap"
              className="text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 px-5 py-2 rounded-md font-medium shadow-lg shadow-blue-700/20 transition-all duration-300 flex items-center gap-1"
            >
              <span>Resume</span>
              <ExternalLink size={16} />
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMobileMenu}
              className="text-white bg-gray-800/70 p-2 rounded-md hover:bg-gray-700/70 transition-colors z-50"
              aria-label="Open Menu"
            >
              <Menu size={24} />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu - Fixed to viewport, completely separate from main nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
              onClick={toggleMobileMenu}
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-gray-900 border-l border-gray-800 overflow-y-auto shadow-2xl"
            >
              <div className="sticky top-0 p-5 flex justify-between items-center bg-gray-900 border-b border-gray-800/50 shadow-md">
                <div className="text-xl font-bold text-white flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-2">Navigation</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleMobileMenu}
                  className="text-white p-2 rounded-full hover:bg-gray-800/80 transition-colors"
                  aria-label="Close Menu"
                >
                  <X size={24} />
                </motion.button>
              </div>
              
              <div className="px-6 py-8 flex flex-col space-y-6">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.id}
                    custom={i}
                    variants={mobileMenuItemVariants}
                    initial="hidden"
                    animate="visible"
                    href={link.path}
                    onClick={(e) => handleNavigation(e, link.path)}
                    className={`relative group flex items-center text-xl font-medium py-3 pl-2 ${
                      activeSection === link.id && isHomePage
                        ? 'text-blue-400' 
                        : 'text-white'
                    }`}
                  >
                    <motion.span
                      initial={{ width: activeSection === link.id && isHomePage ? '4px' : '0px' }}
                      whileHover={{ width: '4px' }}
                      className={`absolute left-0 top-0 h-full bg-blue-500 rounded-r-full transition-all duration-200 ${
                        activeSection === link.id && isHomePage ? 'w-1' : 'w-0'
                      }`}
                    />
                    <span className="ml-2">{link.name}</span>
                    <ChevronRight 
                      size={18} 
                      className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" 
                    />
                  </motion.a>
                ))}

                <motion.div
                  variants={mobileMenuItemVariants}
                  custom={navLinks.length}
                  initial="hidden"
                  animate="visible"
                  className="pt-4 mt-4 border-t border-gray-800"
                >
                  <a 
                    href="/resume"
                    className="flex items-center justify-center w-full text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 px-5 py-3 rounded-md font-medium shadow-lg gap-2"
                    onClick={toggleMobileMenu}
                  >
                    <span>Download Resume</span>
                    <ExternalLink size={18} />
                  </a>
                </motion.div>
                
                {!isHomePage && (
                  <motion.div
                    variants={mobileMenuItemVariants}
                    custom={navLinks.length + 1}
                    initial="hidden"
                    animate="visible"
                    className="text-center pt-4"
                  >
                    <div className="text-sm text-blue-400 font-medium">
                      Currently on: <span className="text-gray-300">{location.pathname}</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;