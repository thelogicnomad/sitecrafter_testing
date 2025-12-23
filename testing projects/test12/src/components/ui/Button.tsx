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
    const variants = {
      primary: 'bg-[#1A1A1A] text-white hover:bg-zinc-800 shadow-lg shadow-zinc-900/20',
      secondary: 'bg-[#C5A059] text-white hover:bg-[#B38F4D] shadow-lg shadow-[#C5A059]/20',
      accent: 'bg-[#E63946] text-white hover:bg-rose-700 shadow-lg shadow-rose-500/20',
      outline: 'border-2 border-zinc-200 text-zinc-900 hover:bg-zinc-50 focus:ring-zinc-500',
      ghost: 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900',
    };

    const sizes = {
      sm: 'h-9 px-4 text-sm',
      md: 'h-12 px-8 text-base',
      lg: 'h-14 px-10 text-lg',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isLoading || props.disabled}
        className={cn(
          'inline-flex items-center justify-center rounded-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-widest text-xs md:text-sm',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </motion.button>
    );
  }
);
Button.displayName = 'Button';