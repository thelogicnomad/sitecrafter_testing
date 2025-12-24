import React from 'react';

// cn utility - ALWAYS define inline
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  shape?: 'rect' | 'circle' | 'text';
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '1rem',
  shape = 'rect',
  className = '',
}) => {
  return (
    <div
      className={cn(
        'animate-pulse bg-slate-200',
        shape === 'circle' ? 'rounded-full' : 'rounded-md',
        shape === 'text' && 'h-4 mb-2',
        className
      )}
      style={{ 
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height 
      }}
    />
  );
};