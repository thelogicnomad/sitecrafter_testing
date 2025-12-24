import React from 'react';

// cn utility - ALWAYS define inline
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  isValid?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  isValid,
  className = '',
  id,
  ...props
}) => {
  const inputId = id ?? label?.toLowerCase().replace(/\s/g, '-');

  return (
    <div className="w-full space-y-2">
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-slate-700 font-['Orbitron'] tracking-wider uppercase"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          className={cn(
            'w-full px-4 py-3 rounded-lg border-2 transition-all outline-none bg-white',
            error 
              ? 'border-rose-500 focus:ring-rose-200' 
              : isValid 
                ? 'border-emerald-500 focus:ring-emerald-200'
                : 'border-slate-200 focus:border-[#00D9FF] focus:ring-4 focus:ring-[#00D9FF]/10',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-xs text-rose-600 font-medium">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};