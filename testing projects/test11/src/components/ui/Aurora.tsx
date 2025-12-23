import React from 'react';
import { cn } from '@/lib/utils';

interface AuroraProps {
  colorStops?: string[];
  blend?: string;
  amplitude?: number;
  speed?: number;
  className?: string;
}

export const Aurora = ({ 
  colorStops = ['#2d5a88', '#fca311', '#1a1c23'], 
  className 
}: AuroraProps) => {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div 
          className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] animate-slow-spin"
          style={{
            background: `radial-gradient(circle at center, ${colorStops[0]} 0%, ${colorStops[1]} 30%, ${colorStops[2]} 60%, transparent 100%)`,
            filter: 'blur(80px)',
          }}
        />
      </div>
      <style>{`
        @keyframes slow-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-slow-spin {
          animation: slow-spin 30s linear infinite;
        }
      `}</style>
    </div>
  );
};