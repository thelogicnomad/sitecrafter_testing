import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, className, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isLoading || props.disabled}
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed',
          variant === 'primary' && 'bg-[#2d5a88] text-white hover:bg-[#244a70] focus:ring-[#2d5a88] shadow-lg shadow-blue-900/20',
          variant === 'secondary' && 'bg-[#1a1c23] text-white hover:bg-black focus:ring-slate-900',
          variant === 'accent' && 'bg-[#fca311] text-slate-900 hover:bg-[#e8940f] focus:ring-[#fca311] shadow-lg shadow-amber-500/20',
          variant === 'outline' && 'border-2 border-slate-200 text-slate-700 hover:bg-slate-50 focus:ring-slate-400',
          variant === 'ghost' && 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
          size === 'sm' && 'h-9 px-4 text-sm',
          size === 'md' && 'h-11 px-6 text-base',
          size === 'lg' && 'h-14 px-8 text-lg',
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          children
        )}
      </motion.button>
    );
  }
);
Button.displayName = 'Button';