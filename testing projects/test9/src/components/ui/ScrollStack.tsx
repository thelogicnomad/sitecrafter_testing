import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScrollStackProps {
  children: React.ReactNode[];
  className?: string;
}

export const ScrollStack: React.FC<ScrollStackProps> = ({ children, className }) => {
  return (
    <div className={cn('flex flex-col gap-10 py-20', className)}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="sticky top-24"
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
};