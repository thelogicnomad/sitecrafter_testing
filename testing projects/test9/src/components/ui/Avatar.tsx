import React from 'react';
import { cn } from '@/lib/utils';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Avatar = ({ src, alt, fallback, className, size = 'md' }: AvatarProps) => {
  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-12 w-12 text-sm',
    lg: 'h-20 w-20 text-xl',
  };

  return (
    <div
      className={cn(
        'relative flex shrink-0 overflow-hidden rounded-full border border-[#911B44]/20',
        sizes[size],
        className
      )}
    >
      {src ? (
        <img src={src} alt={alt} className="aspect-square h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-white/10 font-poppins font-semibold uppercase">
          {fallback}
        </div>
      )}
    </div>
  );
};