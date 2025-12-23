import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'outline';
  className?: string;
}

export const Badge = ({ label, variant = 'primary', className }: BadgeProps) => {
  const variants = {
    primary: 'bg-blue-100 text-blue-800 border-blue-200',
    secondary: 'bg-slate-100 text-slate-800 border-slate-200',
    accent: 'bg-amber-100 text-amber-800 border-amber-200',
    success: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    outline: 'bg-transparent border-slate-300 text-slate-600',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border uppercase tracking-wider',
        variants[variant],
        className
      )}
    >
      {label}
    </span>
  );
};