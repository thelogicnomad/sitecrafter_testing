import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card = ({ children, className, hoverEffect = true }: CardProps) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -5 } : {}}
      className={cn(
        'bg-white dark:bg-[#1a1412] border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden',
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const CardHeader = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn('p-6', className)}>{children}</div>
);

export const CardContent = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn('p-6 pt-0', className)}>{children}</div>
);

export const CardFooter = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn('p-6 pt-0 flex items-center', className)}>{children}</div>
);