import React from 'react';

// cn utility - ALWAYS define inline
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface SectionProps {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  variant?: 'white' | 'slate' | 'primary' | 'dark';
}

export const Section: React.FC<SectionProps> = ({ 
  children, 
  className = '', 
  id,
  variant = 'white' 
}) => {
  const variants = {
    white: 'bg-white text-slate-900',
    slate: 'bg-slate-50 text-slate-900',
    primary: 'bg-[#7B68BE] text-white',
    dark: 'bg-slate-900 text-white'
  };

  return (
    <section 
      id={id}
      className={cn(
        'py-12 md:py-20 lg:py-24 overflow-hidden',
        variants[variant],
        className
      )}
    >
      {children}
    </section>
  );
};