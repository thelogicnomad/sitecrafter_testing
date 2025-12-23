import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'rect' | 'circle' | 'text';
  width?: string | number;
  height?: string | number;
}

export const Skeleton = ({ 
  className, 
  variant = 'rect',
  width,
  height 
}: SkeletonProps) => {
  return (
    <div
      className={cn(
        'animate-pulse bg-slate-200',
        variant === 'circle' && 'rounded-full',
        variant === 'rect' && 'rounded-lg',
        variant === 'text' && 'rounded h-4 w-3/4',
        className
      )}
      style={{ width, height }}
    />
  );
};