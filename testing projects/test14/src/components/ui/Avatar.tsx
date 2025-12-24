import React from 'react';

// cn utility - ALWAYS define inline
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface AvatarProps {
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  hoverEffect?: boolean;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  name = 'User',
  size = 'md',
  hoverEffect = true,
  className = '',
}) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-xl',
    xl: 'w-24 h-24 text-3xl',
  };

  const gradients = [
    'from-indigo-500 to-purple-600',
    'from-emerald-400 to-teal-500',
    'from-rose-400 to-orange-500',
    'from-blue-500 to-cyan-400',
  ];

  // Simple hash for consistent color per name
  const charCodeSum = (name ?? '').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const gradientClass = gradients[charCodeSum % gradients.length];

  return (
    <div className={cn(
      'rounded-full flex items-center justify-center text-white font-bold bg-gradient-to-br shadow-md overflow-hidden transition-transform duration-300',
      gradientClass,
      sizes[size],
      hoverEffect && 'hover:scale-110 cursor-pointer',
      className
    )}>
      {name?.charAt(0).toUpperCase() ?? '?'}
    </div>
  );
};