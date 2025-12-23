import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  clean?: boolean;
}

export const Container = ({ children, className, clean = false }: ContainerProps) => {
  return (
    <div
      className={cn(
        'mx-auto px-4 sm:px-6 lg:px-8 w-full',
        !clean && 'max-w-7xl',
        className
      )}
    >
      {children}
    </div>
  );
};