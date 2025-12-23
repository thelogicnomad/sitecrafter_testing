import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Avatar = ({ src, alt, fallback, size = 'md', className }: AvatarProps) => {
  const [imgError, setImgError] = useState(false);

  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-12 w-12 text-sm',
    lg: 'h-16 w-16 text-base',
    xl: 'h-24 w-24 text-xl',
  };

  return (
    <div
      className={cn(
        'relative flex shrink-0 overflow-hidden rounded-full border-2 border-white shadow-sm bg-slate-100',
        sizes[size],
        className
      )}
    >
      {!imgError && src ? (
        <img
          src={src}
          alt={alt || 'User avatar'}
          className="aspect-square h-full w-full object-cover"
          onError={() => setImgError(true)}
          crossOrigin="anonymous"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900 font-bold text-white uppercase">
          {fallback.substring(0, 2)}
        </div>
      )}
    </div>
  );
};