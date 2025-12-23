import React from 'react';
import { motion } from 'framer-motion';

// cn utility - ALWAYS define inline
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface CardProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  index?: number;
  showGradient?: boolean;
  elevation?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  children,
  className = '',
  index = 0,
  showGradient = false,
  elevation = 'md'
}) => {
  const gradients = [
    'from-[#7B68BE] to-[#96c6d8]',
    'from-[#FFB6C1] to-[#7B68BE]',
    'from-[#A8D8EA] to-[#7B68BE]',
    'from-indigo-500 to-purple-600'
  ];

  const shadows = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-lg hover:shadow-xl',
    lg: 'shadow-2xl'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        'bg-white rounded-2xl overflow-hidden transition-all duration-300 border border-slate-100',
        shadows[elevation],
        className
      )}
    >
      {showGradient && (
        <div className={cn(
          'h-32 w-full bg-gradient-to-br',
          gradients[index % gradients.length]
        )} />
      )}
      <div className="p-6">
        {title && <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>}
        {description && <p className="text-slate-600 mb-4 leading-relaxed">{description}</p>}
        {children}
      </div>
    </motion.div>
  );
};