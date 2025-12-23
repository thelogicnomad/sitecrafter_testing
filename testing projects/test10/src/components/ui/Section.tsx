import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: 'white' | 'light' | 'dark' | 'primary';
}

export const Section = ({ children, className, id, variant = 'white' }: SectionProps) => {
  const variants = {
    white: 'bg-white text-slate-900',
    light: 'bg-slate-50 text-slate-900',
    dark: 'bg-slate-900 text-white',
    primary: 'bg-[#1B4592] text-white',
  };

  return (
    <section
      id={id}
      className={cn(
        'py-12 md:py-20 lg:py-24 overflow-hidden relative',
        variants[variant],
        className
      )}
    >
      {children}
    </section>
  );
};