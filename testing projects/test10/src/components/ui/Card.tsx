import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = ({ 
  children, 
  className, 
  hoverable = true, 
  padding = 'md' 
}: CardProps) => {
  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8 md:p-10',
  };

  return (
    <motion.div
      whileHover={hoverable ? { y: -5 } : {}}
      className={cn(
        'bg-white rounded-2xl border border-slate-100 shadow-sm transition-all duration-300',
        hoverable && 'hover:shadow-xl hover:border-blue-100',
        paddings[padding],
        className
      )}
    >
      {children}
    </motion.div>
  );
};