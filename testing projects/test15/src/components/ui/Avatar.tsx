import React from 'react';

// cn utility - ALWAYS define inline
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface AvatarProps {
  src?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  hasGlow?: boolean;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name = 'User',
  size = 'md',
  hasGlow = false,
  className = ''
}) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-xl',
    xl: 'w-24 h-24 text-3xl'
  };

  const initials = name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2) ?? '?';

  return (
    <div className={cn(
      'relative rounded-full overflow-hidden flex items-center justify-center border-2 border-slate-700 bg-slate-800',
      sizes[size],
      hasGlow && 'shadow-[0_0_15px_rgba(0,217,255,0.5)] border-[#00D9FF]',
      className
    )}>
      {src ? (
        <img 
          src={src} 
          alt={name} 
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      ) : (
        <span className="font-bold text-slate-300 select-none">
          {initials}
        </span>
      )}
      
      {/* Decorative ring for glow effect */}
      {hasGlow && (
        <div className="absolute inset-0 rounded-full border border-[#00D9FF]/30 animate-pulse" />
      )}
    </div>
  );
};