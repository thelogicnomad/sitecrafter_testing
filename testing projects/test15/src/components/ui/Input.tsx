import React, { useState } from 'react';

// cn utility - ALWAYS define inline
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isFloating?: boolean;
  hasNeonBorder?: boolean;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  isFloating = false,
  hasNeonBorder = true,
  error,
  className = '',
  id,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputId = id ?? `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full mb-4">
      <div className="relative">
        {label && !isFloating && (
          <label 
            htmlFor={inputId} 
            className="block text-sm font-medium text-slate-300 mb-1 ml-1"
          >
            {label}
          </label>
        )}
        
        <input
          id={inputId}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            'w-full bg-[#0D1B2A] text-white rounded-lg px-4 py-3 border transition-all duration-200 outline-none',
            hasNeonBorder && isFocused ? 'border-[#00D9FF] shadow-[0_0_10px_rgba(0,217,255,0.2)]' : 'border-slate-700',
            error ? 'border-rose-500' : '',
            isFloating ? 'pt-6 pb-2 placeholder-transparent' : '',
            className
          )}
          {...props}
        />

        {label && isFloating && (
          <label
            htmlFor={inputId}
            className={cn(
              'absolute left-4 transition-all duration-200 pointer-events-none',
              (isFocused || props.value) 
                ? 'top-1.5 text-[10px] text-[#00D9FF] font-bold uppercase tracking-wider' 
                : 'top-3.5 text-slate-500 text-base'
            )}
          >
            {label}
          </label>
        )}
      </div>
      {error && (
        <p className="mt-1 text-xs text-rose-500 font-medium ml-1">
          {error}
        </p>
      )}
    </div>
  );
};