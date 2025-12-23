import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'danger' | 'warning' | 'success';
  className?: string;
}

export const Badge = ({ label, variant = 'primary', className }: BadgeProps) => {
  const variants = {
    primary: 'bg-blue-50 text-[#1B4592] border-blue-100',
    secondary: 'bg-slate-100 text-slate-700 border-slate-200',
    accent: 'bg-emerald-50 text-[#177D5E] border-emerald-100',
    danger: 'bg-rose-50 text-rose-600 border-rose-100',
    warning: 'bg-amber-50 text-amber-600 border-amber-100',
    success: 'bg-green-50 text-green-600 border-green-100',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border',
        variants[variant],
        className
      )}
    >
      {label}
    </span>
  );
};