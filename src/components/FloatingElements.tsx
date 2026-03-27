import React from 'react';
import { motion } from 'framer-motion';
import { IMAGES } from '../constants';

interface FloatingElementProps {
  src: string;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
}

const FloatingElement: React.FC<FloatingElementProps> = ({ 
  src, 
  className = "", 
  delay = 0, 
  duration = 4,
  yOffset = 20
}) => (
  <motion.img
    src={src}
    alt="Floating element"
    className={`absolute pointer-events-none select-none ${className}`}
    initial={{ y: 0 }}
    animate={{ 
      y: [0, -yOffset, 0],
      rotate: [0, 5, -5, 0]
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay
    }}
    referrerPolicy="no-referrer"
  />
);

export const FloatingFruits: React.FC<{ theme: 'day' | 'night' }> = ({ theme }) => {
  if (theme === 'day') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement 
          src={IMAGES.orangeSlice} 
          className="w-32 h-32 top-[15%] left-[10%] opacity-40 blur-[1px]" 
          delay={0}
          duration={5}
        />
        <FloatingElement 
          src={IMAGES.mintLeaves} 
          className="w-20 h-20 top-[40%] right-[15%] opacity-30 blur-[2px]" 
          delay={1}
          duration={6}
        />
        <FloatingElement 
          src={IMAGES.iceCubes} 
          className="w-24 h-24 bottom-[20%] left-[20%] opacity-20 blur-[3px]" 
          delay={2}
          duration={7}
        />
        <FloatingElement 
          src={IMAGES.orangeSlice} 
          className="w-16 h-16 top-[60%] left-[5%] opacity-30" 
          delay={0.5}
          duration={4}
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <FloatingElement 
        src={IMAGES.blueberries} 
        className="w-24 h-24 top-[20%] right-[10%] opacity-40 blur-[1px]" 
        delay={0}
        duration={5}
      />
      <FloatingElement 
        src={IMAGES.strawberry} 
        className="w-28 h-28 top-[50%] left-[12%] opacity-30 blur-[2px]" 
        delay={1.5}
        duration={6}
      />
      <FloatingElement 
        src={IMAGES.ginsengRoot} 
        className="w-32 h-32 bottom-[15%] right-[20%] opacity-20 blur-[3px]" 
        delay={2.5}
        duration={8}
      />
      <FloatingElement 
        src={IMAGES.blueberries} 
        className="w-16 h-16 top-[70%] right-[5%] opacity-30" 
        delay={0.8}
        duration={4}
      />
    </div>
  );
};
