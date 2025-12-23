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
      <div className="flex border-b border-gray-200 dark:border-white/10 mb-8 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'relative px-6 py-3 text-sm font-semibold uppercase tracking-widest transition-colors whitespace-nowrap',
              activeTab === tab.id
                ? 'text-[#911B44]'
                : 'text-gray-500 hover:text-[#911B44]'
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#911B44]"
              />
            )}
          </button>
        ))}
      </div>
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </motion.div>
    </div>
  );
};