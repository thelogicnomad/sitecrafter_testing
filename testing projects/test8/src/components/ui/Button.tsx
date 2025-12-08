import React from 'react';
    import { motion } from 'framer-motion';
    import { cn } from '@/lib/utils';

    interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
      variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
      size?: 'sm' | 'md' | 'lg';
      children: React.ReactNode;
      as?: React.ElementType; // Allow rendering as a different element, e.g., 'a'
      href?: string; // For 'a' element
    }

    const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
      ({ className, variant = 'primary', size = 'md', children, as: Component = 'button', href, ...props }, ref) => {
        const baseStyles = 'relative inline-flex items-center justify-center font-semibold rounded-md transition-all duration-300 ease-in-out group overflow-hidden';

        const variantStyles = {
          primary: 'bg-primary text-white hover:bg-primary/90 shadow-lifted hover:shadow-lifted-hover',
          secondary: 'bg-secondary text-primary hover:bg-secondary/90 shadow-lifted hover:shadow-lifted-hover',
          ghost: 'bg-transparent text-primary hover:bg-primary/10',
          outline: 'border border-primary text-primary hover:bg-primary hover:text-white shadow-lifted hover:shadow-lifted-hover',
        };

        const sizeStyles = {
          sm: 'px-3 py-1.5 text-sm',
          md: 'px-4 py-2 text-base',
          lg: 'px-6 py-3 text-lg',
        };

        return (
          <motion.button
            ref={ref}
            as={Component} // Use the 'as' prop here
            href={href} // Pass href if 'as' is 'a'
            className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            {...props}
          >
            <span className="relative z-10">{children}</span>
            {/* Gilded Edge effect on hover */}
            <span className="absolute inset-0 bg-gradient-to-br from-secondary/0 via-secondary/20 to-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
          </motion.button>
        );
      }
    );
    Button.displayName = 'Button';

    export { Button };