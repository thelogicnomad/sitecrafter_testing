import React from 'react';
import { motion } from 'framer-motion';

// cn utility - ALWAYS define inline
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface BadgeProps {
  label: string;
  color?: 'primary' | 'accent' | 'success' | 'warning' | 'error';
  pulseAnimation?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  label = 'Badge',
  color = 'primary',
  pulseAnimation = false,
  className = '',
}) => {
  const colors = {
    primary: 'bg-[#0A0E27] text-white',
    accent: 'bg-[#00D9FF] text-[#0A0E27]',
    success: 'bg-emerald-100 text-emerald-700',
    warning: 'bg-amber-100 text-amber-700',
    error: 'bg-rose-100 text-rose-700',
  };

  return (
    <div className="relative inline-block">
      {pulseAnimation && (
        <span className={cn(
          'absolute inset-0 rounded-full animate-ping opacity-75',
          color === 'accent' ? 'bg-[#00D9FF]' : 'bg-[#0A0E27]'
        )} />
      )}
      <span className={cn(
        'relative px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest font-[Orbitron]',
        colors[color],
        className
      )}>
        {label}
      </span>
    </div>
  );
};