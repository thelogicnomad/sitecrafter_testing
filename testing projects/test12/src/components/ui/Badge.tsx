import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  className?: string;
}

export const Badge = ({ children, variant = 'primary', className }: BadgeProps) => {
  const styles = {
    primary: 'bg-zinc-900 text-zinc-50',
    secondary: 'bg-[#C5A059] text-white',
    accent: 'bg-rose-100 text-rose-700',
    outline: 'border border-zinc-200 text-zinc-600',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wider',
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
};