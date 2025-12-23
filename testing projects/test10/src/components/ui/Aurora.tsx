import React from 'react';
import { cn } from '@/lib/utils';

interface AuroraProps {
  className?: string;
  colorStops?: string[];
}

export const Aurora = ({ 
  className,
  colorStops = ['#1B4592', '#177D5E', '#4F46E5'] 
}: AuroraProps) => {
  return (
    <div className={cn('absolute inset-0 overflow-hidden -z-10 pointer-events-none', className)}>
      <div 
        className="absolute -inset-[100%] opacity-20 blur-[100px] animate-slow-spin"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${colorStops[0]} 0%, ${colorStops[1]} 25%, ${colorStops[2]} 50%, transparent 100%)`,
        }}
      />
    </div>
  );
};