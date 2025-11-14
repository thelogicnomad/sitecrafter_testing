import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  headerActions?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, children, className, headerActions }) => {
  return (
    <div className={cn('bg-card rounded-lg border border-border shadow-sm', className)}>
      {(title || headerActions) && (
        <div className="flex items-center justify-between p-4 border-b border-border">
          {title && <h3 className="text-lg font-semibold font-heading text-card-foreground">{title}</h3>}
          {headerActions && <div>{headerActions}</div>}
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};