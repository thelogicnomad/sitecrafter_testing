import React from 'react';
    import { cn } from '@/lib/utils';

    interface SkeletonLoaderProps {
      shape?: 'circle' | 'square' | 'text' | 'rounded'; // Added 'rounded' for general use
      width?: string | number;
      height?: string | number;
      variant?: 'light' | 'dark' | 'card'; // Added 'card' for a distinct card-like skeleton
      className?: string;
    }

    const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
      shape = 'square',
      width = '100%',
      height = '1rem',
      variant = 'light',
      className,
    }) => {
      const baseStyles = 'animate-pulse';
      const variantStyles = {
        light: 'bg-gray-200',
        dark: 'bg-gray-700',
        card: 'bg-gray-100 border border-gray-200', // Lighter for card backgrounds
      }[variant];

      const shapeStyles = {
        circle: 'rounded-full',
        square: 'rounded-md',
        text: 'rounded-sm', // For text-like appearance
        rounded: 'rounded-lg', // General rounded style
      }[shape];

      return (
        <div
          className={cn(baseStyles, variantStyles, shapeStyles[shape], className)}
          style={{ width, height }}
          aria-hidden="true"
        />
      );
    };

    export { SkeletonLoader };