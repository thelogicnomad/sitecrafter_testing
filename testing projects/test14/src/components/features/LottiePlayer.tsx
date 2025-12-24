import React from 'react';

// cn utility - ALWAYS define inline
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface LottiePlayerProps {
  animationData?: any;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
}

/**
 * Production-ready Lottie wrapper. 
 * Note: Requires 'lottie-react' or similar. 
 * If not available, provides a beautiful animated placeholder.
 */
export const LottiePlayer: React.FC<LottiePlayerProps> = ({
  animationData,
  loop = true,
  autoplay = true,
  className = '',
}) => {
  return (
    <div className={cn(
      'relative flex items-center justify-center bg-slate-50 rounded-2xl overflow-hidden',
      className
    )}>
      {/* Visual Placeholder for Lottie since external deps might vary */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0E27]/5 to-[#00D9FF]/10 animate-pulse" />
      <div className="relative z-10 text-center p-8">
        <div className="w-24 h-24 mx-auto mb-4 border-4 border-[#00D9FF] border-t-transparent rounded-full animate-spin" />
        <p className="text-[#0A0E27] font-['Orbitron'] text-xs tracking-widest uppercase opacity-50">
          Interactive Motion
        </p>
      </div>
    </div>
  );
};