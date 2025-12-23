import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

// cn utility - ALWAYS define inline
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}) => {
  const variants = {
    primary: 'bg-[#7B68BE] text-white hover:bg-[#6a56a8] shadow-md shadow-indigo-200',
    secondary: 'bg-[#A8D8EA] text-slate-900 hover:bg-[#96c6d8]',
    accent: 'bg-[#FFB6C1] text-slate-900 hover:bg-[#efa0ad]',
    outline: 'border-2 border-[#7B68BE] text-[#7B68BE] hover:bg-indigo-50',
    ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base font-medium',
    lg: 'px-8 py-4 text-lg font-bold'
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      disabled={isLoading || disabled}
      className={cn(
        'inline-flex items-center justify-center rounded-full transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </motion.button>
  );
};