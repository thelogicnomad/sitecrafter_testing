import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  className?: string;
}

export const Badge = ({ children, variant = 'primary', className }: BadgeProps) => {
  const variants = {
    primary: 'bg-[#911B44] text-white',
    secondary: 'bg-[#2D231E] text-white',
    accent: 'bg-[#FC5A30] text-white',
    outline: 'border border-[#911B44] text-[#911B44]',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 text-xs font-semibold uppercase tracking-widest',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};