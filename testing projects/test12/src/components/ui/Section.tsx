import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
}

export const Section = ({ children, className, id, dark = false }: SectionProps) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        'py-12 md:py-20 lg:py-28 overflow-hidden',
        dark ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-900',
        className
      )}
    >
      {children}
    </motion.section>
  );
};