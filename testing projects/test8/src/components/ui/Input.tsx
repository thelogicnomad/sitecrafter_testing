import React from 'react';
    import { cn } from '@/lib/utils';

    interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
      label?: string;
      error?: string;
      id: string;
      'aria-describedby'?: string;
    }

    const Input = React.forwardRef<HTMLInputElement, InputProps>(
      ({ label, error, id, className, type = 'text', 'aria-describedby': ariaDescribedBy, ...props }, ref) => {
        const errorId = error ? `${id}-error` : undefined;

        return (
          <div className="relative w-full">
            {label && (
              <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
            )}
            <input
              ref={ref}
              id={id}
              type={type}
              className={cn(
                'block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none transition-all duration-200',
                'bg-white text-gray-900 placeholder-gray-400',
                'border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary/50',
                error && 'border-red-500 focus:border-red-500 focus:ring-red-500/50',
                'shadow-inner-gilded', // Custom shadow for elegant depth
                className
              )}
              aria-invalid={!!error}
              aria-describedby={error ? errorId : ariaDescribedBy}
              {...props}
            />
            {error && (
              <p id={errorId} role="alert" className="mt-1 text-sm text-red-600">
                {error}
              </p>
            )}
          </div>
        );
      }
    );
    Input.displayName = 'Input';

    export { Input };