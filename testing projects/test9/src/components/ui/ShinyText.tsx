import React from 'react';
import { cn } from '@/lib/utils';

interface ShinyTextProps {
  text: string;
  speed?: number;
  disabled?: boolean;
  className?: string;
}

export const ShinyText = ({ text, speed = 3, disabled = false, className }: ShinyTextProps) => {
  return (
    <span
      className={cn(
        'inline-block bg-[linear-gradient(110deg,#939393,45%,#fff,55%,#939393)] bg-[length:200%_100%] bg-clip-text text-transparent',
        !disabled && 'animate-shiny-text',
        className
      )}
      style={{ animationDuration: `${speed}s` }}
    >
      {text}
    </span>
  );
};