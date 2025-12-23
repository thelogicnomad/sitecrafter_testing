import React from 'react';

// cn utility - ALWAYS define inline
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface ContainerProps {
  children?: React.ReactNode;
  className?: string;
  clean?: boolean;
}

export const Container: React.FC<ContainerProps> = ({ 
  children, 
  className = '', 
  clean = false 
}) => {
  return (
    <div className={cn(
      'mx-auto px-4 sm:px-6 lg:px-8 w-full',
      !clean && 'max-w-7xl',
      className
    )}>
      {children}
    </div>
  );
};