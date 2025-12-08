import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import ClickSpark from '@/components/ui/ClickSpark';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant = 'primary', ...props }, ref) => {
    const variants = {
      primary: 'bg-accent text-accent-foreground hover:bg-accent-hover shadow-lg shadow-accent/20',
      secondary: 'bg-primary text-primary-foreground hover:bg-primary/90',
      outline: 'border border-current hover:bg-muted/20',
    };

    return (
      <ClickSpark>
        <button
          className={cn(
            'inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
            variants[variant],
            className,
          )}
          ref={ref}
          {...props}
        >
          {children}
        </button>
      </ClickSpark>
    );
  }
);

Button.displayName = 'Button';

export default Button;