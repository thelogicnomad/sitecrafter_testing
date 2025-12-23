import React from 'react';
import { cn } from '@/lib/utils';

interface AuroraProps {
  colorStops?: string[];
  blend?: number;
  amplitude?: number;
  speed?: number;
  className?: string;
}

export const Aurora = ({
  colorStops = ['#911B44', '#2D231E', '#FC5A30'],
  blend = 0.5,
  amplitude = 1.0,
  speed = 1.0,
  className
}: AuroraProps) => {
  return (
    <div className={cn('relative overflow-hidden w-full h-full', className)}>
      <div 
        className="absolute inset-0 opacity-30 blur-[100px]"
        style={{
          background: `linear-gradient(45deg, ${colorStops.join(', ')})`,
          animation: `aurora ${20 / speed}s infinite alternate ease-in-out`,
        }}
      />
      <style>{`
        @keyframes aurora {
          0% { transform: scale(1) translate(0%, 0%) rotate(0deg); }
          50% { transform: scale(${1.2 * amplitude}) translate(5%, 5%) rotate(5deg); }
          100% { transform: scale(1) translate(0%, 0%) rotate(0deg); }
        }
      `}</style>
    </div>
  );
};