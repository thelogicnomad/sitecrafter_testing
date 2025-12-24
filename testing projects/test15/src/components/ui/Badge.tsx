import React from 'react';
import { LucideIcon } from 'lucide-react';

// cn utility - ALWAYS define inline
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface BadgeProps {
  label: string;
  status?: 'success' | 'warning' | 'error' | 'info' | 'accent';
  isPulsing?: boolean;
  icon?: LucideIcon;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  label = 'Badge',
  status = 'info',
  isPulsing = false,
  icon: Icon,
  className = ''
}) => {
  const statuses = {
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    error: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    info: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    accent: 'bg-[#00D9FF]/10 text-[#00D9FF] border-[#00D9FF]/20'
  };

  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border tracking-wider uppercase',
      statuses[status],
      className
    )}>
      {isPulsing && (
        <span className="relative flex h-2 w-2">
          <span className={cn(
            'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
            status === 'accent' ? 'bg-[#00D9FF]' : 'bg-current'
          )} />
          <span className={cn(
            'relative inline-flex rounded-full h-2 w-2',
            status === 'accent' ? 'bg-[#00D9FF]' : 'bg-current'
          )} />
        </span>
      )}
      {Icon && <Icon className="w-3 h-3" />}
      {label}
    </span>
  );
};