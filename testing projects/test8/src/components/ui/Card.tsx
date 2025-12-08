import React from 'react';
    import { cn } from '@/lib/utils';

    interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
      shadowStyle?: 'lifted' | 'none' | 'lifted-lg' | 'inner'; // Added 'lifted-lg' and 'inner'
      children: React.ReactNode;
      className?: string;
    }

    const Card: React.FC<CardProps> = ({ shadowStyle = 'lifted', children, className, ...props }) => {
      const shadowClass = {
        'lifted': 'shadow-lifted hover:shadow-lifted-hover',
        'lifted-lg': 'shadow-lifted-lg hover:shadow-lifted-lg-hover',
        'inner': 'shadow-inner-gilded',
        'none': '',
      }[shadowStyle];

      return (
        <div
          className={cn(
            'bg-white rounded-lg p-6 transition-all duration-300 ease-in-out',
            shadowClass,
            className
          )}
          {...props}
        >
          {children}
        </div>
      );
    };

    export { Card };