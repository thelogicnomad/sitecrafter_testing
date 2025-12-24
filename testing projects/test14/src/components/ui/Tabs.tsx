import React, { useState } from 'react';
import { motion } from 'framer-motion';

// cn utility - ALWAYS define inline
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs = [],
  defaultTab,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  return (
    <div className={cn('w-full', className)}>
      <div className="flex border-b border-slate-200 mb-8 overflow-x-auto no-scrollbar">
        {(tabs ?? []).map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={cn(
              'relative px-6 py-4 text-sm font-bold font-['Orbitron'] uppercase tracking-wider transition-colors whitespace-nowrap',
              activeTab === tab?.id ? 'text-[#0A0E27]' : 'text-slate-400 hover:text-slate-600'
            )}
          >
            {tab?.label}
            {activeTab === tab?.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-1 bg-[#00D9FF]"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
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
        {(tabs ?? []).find(t => t.id === activeTab)?.content}
      </motion.div>
    </div>
  );
};