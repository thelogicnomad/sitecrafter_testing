import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

// cn utility - ALWAYS define inline
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  className?: string;
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  isMagnetic?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  className = '',
  onClick,
  isLoading = false,
  disabled = false,
  isMagnetic = false,
}) => {
  const variants = {
    primary: 'bg-[#0A0E27] text-white hover:bg-[#1A1F3A] shadow-lg',
    secondary: 'bg-[#00D9FF] text-[#0A0E27] hover:bg-[#00b8d9] font-bold',
    outline: 'border-2 border-[#0A0E27] text-[#0A0E27] hover:bg-[#0A0E27] hover:text-white',
    ghost: 'text-[#0A0E27] hover:bg-slate-100',
    glow: 'bg-[#00D9FF] text-[#0A0E27] shadow-[0_0_20px_rgba(0,217,255,0.5)] hover:shadow-[0_0_30px_rgba(0,217,255,0.8)] transition-shadow',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg font-bold tracking-wider',
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02, y: isMagnetic ? -2 : 0 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : Icon && iconPosition === 'left' ? (
        <Icon className="w-5 h-5 mr-2" />
      ) : null}
      
      <span className="font-['Orbitron'] uppercase tracking-tight">{children}</span>
      
      {!isLoading && Icon && iconPosition === 'right' ? (
        <Icon className="w-5 h-5 ml-2" />
      ) : null}
    </motion.button>
  );
};