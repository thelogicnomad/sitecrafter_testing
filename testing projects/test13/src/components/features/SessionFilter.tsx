import React from 'react';
import { motion } from 'framer-motion';

// cn utility - ALWAYS define inline
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface SessionFilterProps {
  activeFilter: string;
  onFilterChange: (id: string) => void;
}

const filters = [
  { id: 'all', label: 'All Sessions' },
  { id: 'focus', label: 'Focus' },
  { id: 'calm', label: 'Calm' },
  { id: 'sleep', label: 'Sleep' },
  { id: 'energy', label: 'Energy' },
];

export const SessionFilter: React.FC<SessionFilterProps> = ({ 
  activeFilter = 'all', 
  onFilterChange 
}) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-12">
      {(filters ?? []).map((filter) => (
        <button
          key={filter?.id}
          onClick={() => onFilterChange(filter?.id)}
          className={cn(
            'relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border',
            activeFilter === filter?.id 
              ? 'text-white border-transparent' 
              : 'text-slate-600 border-slate-200 hover:border-[#7B68BE] hover:text-[#7B68BE]'
          )}
        >
          {activeFilter === filter?.id && (
            <motion.div
              layoutId="filterBg"
              className="absolute inset-0 bg-[#7B68BE] rounded-full"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{filter?.label}</span>
        </button>
      ))}
    </div>
  );
};