import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  circle?: boolean;
}

export const Skeleton = ({ className, width, height, circle }: SkeletonProps) => {
  return (
    <div
      className={cn(
        'animate-pulse bg-gray-200 dark:bg-white/5',
        circle ? 'rounded-full' : 'rounded-none',
        className
      )}
      style={{ width, height }}
    />
  );
};