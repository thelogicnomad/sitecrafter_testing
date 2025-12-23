import React, { useState } from 'react';
import { motion } from 'framer-motion';

// cn utility - ALWAYS define inline
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  items: TabItem[];
  defaultTab?: string;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ 
  items = [], 
  defaultTab,
  className = '' 
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab ?? items[0]?.id);

  return (
    <div className={cn('w-full', className)}>
      <div className="flex space-x-1 bg-slate-100 p-1 rounded-xl mb-8 max-w-md mx-auto">
        {(items ?? []).map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={cn(
              'flex-1 py-2.5 text-sm font-medium rounded-lg transition-all relative',
              activeTab === tab?.id ? 'text-[#7B68BE]' : 'text-slate-500 hover:text-slate-700'
            )}
          >
            {activeTab === tab?.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-white rounded-lg shadow-sm"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{tab?.label}</span>
          </button>
        ))}
      </div>
      
      <div className="mt-4">
        {(items ?? []).map((tab) => (
          <div 
            key={tab?.id} 
            className={cn(activeTab === tab?.id ? 'block' : 'hidden')}
          >
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {tab?.content}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};