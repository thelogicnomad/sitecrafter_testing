import React from 'react';

// cn utility - ALWAYS define inline
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  isNarrow?: boolean;
}

export const Container: React.FC<ContainerProps> = ({ 
  children, 
  className = '',
  isNarrow = false 
}) => {
  return (
    <div className={cn(
      'mx-auto px-4 sm:px-6 lg:px-8',
      isNarrow ? 'max-w-4xl' : 'max-w-7xl',
      className
    )}>
      {children}
    </div>
  );
};

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: 'dark' | 'darker' | 'accent';
}

export const Section: React.FC<SectionProps> = ({ 
  children, 
  className = '', 
  id,
  variant = 'dark'
}) => {
  const variants = {
    dark: 'bg-[#0D1B2A]',
    darker: 'bg-[#050b12]',
    accent: 'bg-[#1F3A52]'
  };

  return (
    <section 
      id={id} 
      className={cn(
        'py-12 md:py-20 lg:py-28 overflow-hidden relative',
        variants[variant],
        className
      )}
    >
      {children}
    </section>
  );
};