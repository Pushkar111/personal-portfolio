
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CursorAnimation = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      transition: {
        type: "spring",
        mass: 0.6
      }
    },
    text: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      height: 64,
      width: 64,
      backgroundColor: "rgba(9, 99, 253, 0.15)",
      mixBlendMode: "difference",
      transition: {
        type: "spring",
        mass: 0.6
      }
    }
  };

  return (
    <>
      <motion.div
        className="cursor-dot fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 border-2 border-blue-500 hidden md:block"
        variants={variants}
        animate={cursorVariant}
      />
      <motion.div
        className="cursor-dot-outline fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-50 bg-blue-500/50 hidden md:block"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8
        }}
        transition={{
          type: "spring",
          mass: 0.3
        }}
      />
    </>
  );
};

export default CursorAnimation;
