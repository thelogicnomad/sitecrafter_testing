import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-[#911B44] text-white hover:bg-[#7a1639] shadow-md',
      secondary: 'bg-[#2D231E] text-white hover:bg-[#1f1814] shadow-md',
      accent: 'bg-[#FC5A30] text-white hover:bg-[#e54e28] shadow-md',
      outline: 'border-2 border-[#911B44] text-[#911B44] bg-transparent hover:bg-[#911B44] hover:text-white',
      ghost: 'bg-transparent text-[#2D231E] hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-white/10',
    };

    const sizes = {
      sm: 'h-9 px-4 text-xs',
      md: 'h-11 px-6 text-sm',
      lg: 'h-14 px-8 text-base font-semibold uppercase tracking-wider',
      icon: 'h-10 w-10 p-0',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'inline-flex items-center justify-center rounded-none transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#911B44] focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none font-poppins',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';