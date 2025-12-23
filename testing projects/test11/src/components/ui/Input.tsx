import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="text-sm font-semibold text-slate-700 ml-1">
            {label}
          </label>
        )}
        <div className="relative group">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#2d5a88] transition-colors">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'flex h-11 w-full rounded-xl border-2 border-slate-100 bg-white px-3 py-2 text-sm ring-offset-white transition-all placeholder:text-slate-400 focus:outline-none focus:border-[#2d5a88] focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-50',
              icon && 'pl-10',
              error && 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/10',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-xs font-medium text-rose-500 ml-1">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';