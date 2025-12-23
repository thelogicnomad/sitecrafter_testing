import React from 'react';
import { cn } from '@/lib/utils';

interface GradientTextProps {
  children: React.ReactNode;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
  className?: string;
}

export const GradientText = ({
  children,
  colors = ['#911B44', '#FC5A30', '#2D231E', '#911B44'],
  animationSpeed = 8,
  showBorder = false,
  className
}: GradientTextProps) => {
  const gradient = `linear-gradient(to right, ${colors.join(', ')})`;

  return (
    <div className={cn('relative inline-block group', className)}>
      {showBorder && (
        <div 
          className="absolute -inset-[1px] rounded-lg opacity-50 group-hover:opacity-100 transition duration-500"
          style={{
            background: gradient,
            backgroundSize: '300% 100%',
            animation: `gradient ${animationSpeed}s linear infinite`
          }}
        />
      )}
      <span
        className="relative block bg-clip-text text-transparent font-poppins"
        style={{
          backgroundImage: gradient,
          backgroundSize: '300% 100%',
          animation: `gradient ${animationSpeed}s linear infinite`
        }}
      >
        {children}
      </span>
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};