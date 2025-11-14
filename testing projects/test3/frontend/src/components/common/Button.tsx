import React from 'react';
    import { motion } from 'framer-motion';
    import { cn } from '@/lib/utils';
    import { LoaderCircle } from 'lucide-react';

    type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
    type Size = 'small' | 'medium' | 'large';

    interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
      variant?: Variant;
      size?: Size;
      children: React.ReactNode;
      isLoading?: boolean;
      asChild?: boolean;
    }

    const Button: React.FC<ButtonProps> = ({ 
      variant = 'primary', 
      size = 'medium', 
      children, 
      isLoading = false,
      className,
      ...props 
    }) => {
      const baseClasses = "inline-flex items-center justify-center font-semibold rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-au-accent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300";

      const variantClasses = {
        primary: "bg-au-primary text-au-surface hover:bg-opacity-90",
        secondary: "bg-au-accent text-au-primary hover:bg-au-accent/90",
        outline: "border border-au-text-muted text-au-text-dark hover:bg-au-surface/50",
        ghost: "text-au-text-dark hover:bg-au-surface/50",
      };

      const sizeClasses = {
        small: "px-4 py-2 text-sm",
        medium: "px-6 py-3 text-base",
        large: "px-8 py-4 text-lg",
      };

      return (
        <motion.button
          className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
          whileHover={{ y: -2, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.15 }}
          disabled={isLoading}
          {...props}
        >
          {isLoading ? (
            <>
              <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            children
          )}
        </motion.button>
      );
    };

    export default Button;