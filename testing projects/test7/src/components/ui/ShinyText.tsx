import React, { FC, CSSProperties } from 'react';
import { cn } from '@/lib/utils';

interface ShinyTextProps {
  text: string;
  className?: string;
  speed?: number;
}

const ShinyText: FC<ShinyTextProps> = ({
  text,
  className,
  speed = 1.5,
}) => {
  const animationStyle = {
    '--speed': `${speed}s`,
  } as CSSProperties;

  return (
    <span className={cn('relative inline-block', className)}>
      <span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent bg-[200%_auto] animate-shimmer"
        style={animationStyle}
      />
      <span className="relative">{text}</span>
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .animate-shimmer {
          animation: shimmer var(--speed) linear infinite;
        }
      `}</style>
    </span>
  );
};

export default ShinyText;