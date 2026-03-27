import React from 'react';
import { motion } from 'framer-motion';

interface FloatingFruitProps {
  image: string;
  size?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  delay?: number;
  duration?: number;
  rotate?: number;
}

export const FloatingFruit: React.FC<FloatingFruitProps> = ({
  image,
  size = 60,
  top,
  left,
  right,
  bottom,
  delay = 0,
  duration = 6,
  rotate = 20,
}) => {
  return (
    <motion.div
      style={{
        position: 'absolute',
        top,
        left,
        right,
        bottom,
        width: size,
        height: size,
        zIndex: 1,
      }}
      initial={{ y: 0, rotate: 0 }}
      animate={{
        y: [0, -20, 0],
        rotate: [0, rotate, 0],
      }}
      whileHover={{ scale: 1.2, rotate: rotate * 2 }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      <img src={image} alt="fruit" className="w-full h-full object-contain opacity-80 cursor-pointer transition-opacity hover:opacity-100" />
    </motion.div>
  );
};
