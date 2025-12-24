import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

// cn utility - ALWAYS define inline
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  isGlow?: boolean;
  hasRipple?: boolean;
  icon?: LucideIcon;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  isGlow = false,
  hasRipple = true,
  icon: Icon,
  isLoading = false,
  ...props
}) => {
  const variants = {
    primary: 'bg-[#0D1B2A] text-white hover:bg-[#162a41] border border-slate-700',
    secondary: 'bg-[#1F3A52] text-white hover:bg-[#2a4d6e]',
    accent: 'bg-[#00D9FF] text-[#0D1B2A] font-bold hover:bg-[#00b8d9]',
    outline: 'bg-transparent border-2 border-[#00D9FF] text-[#00D9FF] hover:bg-[#00D9FF]/10',
    ghost: 'bg-transparent text-slate-300 hover:bg-slate-800'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const glowEffect = isGlow ? 'shadow-[0_0_20px_rgba(0,217,255,0.4)]' : '';

  return (
    <motion.button
      whileTap={hasRipple ? { scale: 0.97 } : {}}
      whileHover={{ scale: 1.02 }}
      className={cn(
        'relative flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden',
        variants[variant],
        sizes[size],
        glowEffect,
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {Icon && <Icon className={cn('w-5 h-5', children ? 'mr-1' : '')} />}
          {children}
        </>
      )}
      
      {/* Subtle scanline effect for accent buttons */}
      {variant === 'accent' && (
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-white/10 to-transparent opacity-20 h-[2px] animate-scanline" />
      )}
    </motion.button>
  );
};