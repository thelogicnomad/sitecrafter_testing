import React from 'react';
import { motion } from 'framer-motion';

// cn utility - ALWAYS define inline
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface CardProps {
  title?: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
  isHolographic?: boolean;
  isFlip?: boolean;
  elevation?: 'low' | 'medium' | 'high';
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  className = '',
  children,
  isHolographic = false,
  isFlip = false,
  elevation = 'medium'
}) => {
  const elevations = {
    low: 'shadow-md',
    medium: 'shadow-xl',
    high: 'shadow-2xl'
  };

  const holographicStyle = isHolographic 
    ? 'border border-[#00D9FF]/30 bg-[#0D1B2A]/80 backdrop-blur-md before:absolute before:inset-0 before:bg-gradient-to-tr before:from-[#00D9FF]/5 before:to-transparent before:pointer-events-none' 
    : 'bg-[#1F3A52] border border-slate-700';

  return (
    <motion.div
      initial={isFlip ? { rotateY: 180 } : { opacity: 0, y: 20 }}
      animate={isFlip ? { rotateY: 0 } : { opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.01 }}
      className={cn(
        'relative rounded-2xl p-6 overflow-hidden transition-all duration-300',
        elevations[elevation],
        holographicStyle,
        className
      )}
    >
      {title && (
        <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-slate-400 text-sm mb-4 leading-relaxed">
          {description}
        </p>
      )}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Decorative Corner */}
      {isHolographic && (
        <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden pointer-events-none">
          <div className="absolute top-[-25px] right-[-25px] w-[50px] h-[50px] bg-[#00D9FF] rotate-45 opacity-20" />
        </div>
      )}
    </motion.div>
  );
};