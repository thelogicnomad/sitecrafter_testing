import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

// cn utility - ALWAYS define inline
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface DropdownItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface DropdownProps {
  label: string;
  items: DropdownItem[];
  onSelect?: (value: string) => void;
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  items = [],
  onSelect,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cn('relative inline-block text-left', className)} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-[#0A0E27] bg-white border border-slate-200 rounded-lg hover:bg-slate-50 focus:outline-none"
      >
        {label}
        <ChevronDown className={cn('w-4 h-4 ml-2 transition-transform', isOpen && 'rotate-180')} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-slate-100 rounded-xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="py-1">
              {(items ?? []).map((item) => (
                <button
                  key={item?.value}
                  onClick={() => {
                    onSelect?.(item?.value);
                    setIsOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-3 text-sm text-slate-700 hover:bg-[#00D9FF]/10 hover:text-[#0A0E27] transition-colors"
                >
                  {item?.icon && <span className="mr-3">{item.icon}</span>}
                  {item?.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};