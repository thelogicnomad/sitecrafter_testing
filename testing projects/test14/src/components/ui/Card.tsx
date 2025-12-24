import React from 'react';
import { motion } from 'framer-motion';

// cn utility - ALWAYS define inline
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface CardProps {
  title?: string;
  description?: string;
  index?: number;
  isGlass?: boolean;
  tiltEnabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  title = '',
  description = '',
  index = 0,
  isGlass = false,
  tiltEnabled = true,
  children,
  className = '',
}) => {
  const gradients = [
    'from-[#0A0E27] to-[#1A1F3A]',
    'from-[#00D9FF] to-[#0088AA]',
    'from-indigo-600 to-purple-700',
    'from-slate-800 to-slate-900',
  ];

  return (
    <motion.div
      whileHover={tiltEnabled ? { y: -10, rotateX: 2, rotateY: 2 } : { y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={cn(
        'rounded-2xl overflow-hidden transition-all duration-300 group',
        isGlass
          ? 'bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl'
          : 'bg-white shadow-xl border border-slate-100',
        className
      )}
    >
      {/* Gradient Image Placeholder */}
      <div className={cn(
        'h-48 w-full bg-gradient-to-br relative overflow-hidden',
        gradients[index % gradients.length]
      )}>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
      </div>

      <div className="p-6">
        {title && (
          <h3 className={cn(
            'text-xl font-bold font-[Orbitron] mb-2',
            isGlass ? 'text-white' : 'text-[#0A0E27]'
          )}>
            {title}
          </h3>
        )}
        {description && (
          <p className={cn(
            'text-sm leading-relaxed mb-4',
            isGlass ? 'text-slate-300' : 'text-slate-600'
          )}>
            {description}
          </p>
        )}
        {children}
      </div>
    </motion.div>
  );
};