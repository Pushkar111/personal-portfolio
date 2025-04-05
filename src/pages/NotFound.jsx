
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-primary">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center bg-white/10 backdrop-blur-lg p-12 rounded-2xl border border-white/20 shadow-xl"
      >
        <h1 className="text-8xl font-bold text-white mb-4">404</h1>
        <p className="text-xl text-white/90 mb-8">Oops! Page not found</p>
        
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-white bg-white/20 hover:bg-white/30 transition-colors duration-300 px-6 py-3 rounded-full font-medium"
        >
          <ArrowLeft size={18} />
          Return to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
