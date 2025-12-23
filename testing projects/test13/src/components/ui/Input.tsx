import React from 'react';

// cn utility - ALWAYS define inline
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  className = '',
  id,
  ...props
}, ref) => {
  const inputId = id ?? `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        ref={ref}
        className={cn(
          'flex h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm ring-offset-white transition-all',
          'placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7B68BE] focus:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error ? 'border-red-500 focus:ring-red-500' : 'border-slate-200',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-xs font-medium text-red-500 mt-1">{error}</p>
      )}
      {!error && helperText && (
        <p className="text-xs text-slate-500 mt-1">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';