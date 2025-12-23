import React from 'react';

// cn utility - ALWAYS define inline
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface AvatarProps {
  name?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ 
  name = 'User', 
  size = 'md',
  className = '' 
}) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-xl'
  };

  const gradients = [
    'from-indigo-400 to-purple-500',
    'from-emerald-400 to-teal-500',
    'from-rose-400 to-orange-400',
    'from-blue-400 to-cyan-400'
  ];

  // Simple hash for consistent gradient based on name
  const charCode = (name?.charCodeAt(0) ?? 0);
  const gradientClass = gradients[charCode % gradients.length];

  return (
    <div className={cn(
      'rounded-full flex items-center justify-center text-white font-bold bg-gradient-to-br shadow-inner',
      sizes[size],
      gradientClass,
      className
    )}>
      {name?.charAt(0).toUpperCase() ?? '?'}
    </div>
  );
};