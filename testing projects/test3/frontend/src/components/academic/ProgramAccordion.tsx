import React, { useState } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { ChevronDown } from 'lucide-react';
    import { cn } from '@/lib/utils';

    interface AccordionItem {
      id: string;
      title: string;
      content: React.ReactNode;
    }

    interface ProgramAccordionProps {
      items: AccordionItem[];
    }

    const ProgramAccordion: React.FC<ProgramAccordionProps> = ({ items }) => {
      const [expanded, setExpanded] = useState<string | false>(items[0]?.id || false);

      return (
        <div className="space-y-2">
          {items.map(item => {
            const isOpen = item.id === expanded;
            return (
              <div key={item.id} className="border border-au-text-muted/20 rounded-lg overflow-hidden">
                <motion.header
                  initial={false}
                  onClick={() => setExpanded(isOpen ? false : item.id)}
                  className="flex justify-between items-center p-4 cursor-pointer bg-au-surface"
                >
                  <h3 className="text-lg font-semibold text-au-primary">{item.title}</h3>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-5 w-5 text-au-primary" />
                  </motion.div>
                </motion.header>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.section
                      key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: 'auto' },
                        collapsed: { opacity: 0, height: 0 },
                      }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 border-t border-au-text-muted/20">
                        {item.content}
                      </div>
                    </motion.section>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      );
    };

    export default ProgramAccordion;