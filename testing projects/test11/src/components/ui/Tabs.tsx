import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultValue?: string;
  className?: string;
}

export const Tabs = ({ tabs, defaultValue, className }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultValue || tabs[0].id);

  return (
    <div className={cn('w-full', className)}>
      <div className="flex space-x-1 border-b border-slate-200 mb-6 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'relative px-4 py-2.5 text-sm font-semibold transition-colors focus:outline-none whitespace-nowrap',
              activeTab === tab.id ? 'text-[#2d5a88]' : 'text-slate-500 hover:text-slate-700'
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2d5a88]"
              />
            )}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tabs.find((t) => t.id === activeTab)?.content}
      </div>
    </div>
  );
};