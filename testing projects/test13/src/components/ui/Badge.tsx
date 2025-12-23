import React from 'react';

// cn utility - ALWAYS define inline
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'slate';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ 
  label = '', 
  variant = 'primary',
  className = '' 
}) => {
  const variants = {
    primary: 'bg-indigo-100 text-[#7B68BE]',
    secondary: 'bg-cyan-100 text-cyan-700',
    accent: 'bg-rose-100 text-rose-600',
    outline: 'border border-slate-200 text-slate-600',
    slate: 'bg-slate-100 text-slate-600'
  };

  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider',
      variants[variant],
      className
    )}>
      {label}
    </span>
  );
};