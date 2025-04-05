
import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const SkillTag = ({ text }) => (
  <span className="inline-block px-3 py-1 text-sm bg-gray-800 text-blue-400 rounded-full mr-2 mb-2">
    #{text}
  </span>
);

const AboutModal = ({ isOpen, onClose }) => {
  const modalRef = useRef();

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="bg-gray-900 rounded-xl border border-gray-800 w-full max-w-4xl max-h-[80vh] overflow-auto"
          >
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-blue-400">ABOUT ME</h2>
                <button
                  onClick={onClose}
                  className="p-1 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                  <X className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    I help business owners and busy web developers to design & develop creative websites that fits their vision and attracts the visitors to stay for ever. Technologies and tools that I use to create such awesome websites.
                  </p>

                  <div className="flex flex-wrap mb-8">
                    <SkillTag text="javascript" />
                    <SkillTag text="react.js" />
                    <SkillTag text="redux" />
                    <SkillTag text="node.js" />
                    <SkillTag text="express.js" />
                    <SkillTag text="mongoDB" />
                    <SkillTag text="mongoose" />
                    <SkillTag text="cloudinary" />
                    <SkillTag text="ejs" />
                    <SkillTag text="html" />
                    <SkillTag text="css" />
                    <SkillTag text="sass" />
                    <SkillTag text="bootstrap" />
                    <SkillTag text="tailwind" />
                    <SkillTag text="git" />
                    <SkillTag text="github" />
                    <SkillTag text="aws" />
                    <SkillTag text="terminal" />
                    <SkillTag text="adobeXD" />
                    <SkillTag text="figma" />
                  </div>

                  <h3 className="text-2xl font-bold text-blue-400 mb-4">MERN STACK</h3>

                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-2">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2L3 7L12 12L21 7L12 2Z" fill="#4CAF50" />
                          <path d="M3 17L12 22L21 17V7L12 12L3 7V17Z" fill="#4CAF50" opacity="0.5" />
                        </svg>
                      </div>
                      <span className="text-green-400 font-bold">M</span>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-2">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21 12C21 7.03 16.97 3 12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12Z" stroke="white" strokeWidth="2" />
                          <path d="M3 12H21" stroke="white" strokeWidth="2" />
                        </svg>
                      </div>
                      <span className="text-white font-bold">E</span>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-2">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="9" fill="#61DAFB" />
                          <circle cx="12" cy="12" r="3" fill="#1E1E1E" />
                          <circle cx="19" cy="12" r="2" fill="#61DAFB" />
                          <circle cx="5" cy="12" r="2" fill="#61DAFB" />
                          <circle cx="12" cy="19" r="2" fill="#61DAFB" />
                          <circle cx="12" cy="5" r="2" fill="#61DAFB" />
                        </svg>
                      </div>
                      <span className="text-blue-400 font-bold">R</span>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-2">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="24" height="24" rx="3" fill="#8CC84B" />
                          <path d="M12 6V18M18 12H6" stroke="#1E1E1E" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                      </div>
                      <span className="text-green-400 font-bold">N</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center items-center">
                  <img 
                    src="public/lovable-uploads/c082105c-a49a-41bc-926b-24db8c677e6c.png" 
                    alt="Developer Illustration" 
                    className="max-w-full h-auto" 
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AboutModal;
