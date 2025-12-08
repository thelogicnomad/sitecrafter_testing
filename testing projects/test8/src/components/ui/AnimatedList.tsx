import React, { useState, useRef, useEffect, useCallback } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { cn } from '@/lib/utils';
    import { ChevronDown, ChevronUp } from 'lucide-react'; // Not directly used but kept for potential future expansion

    interface AnimatedListProps<T> {
      items: T[];
      renderItem: (item: T, index: number) => React.ReactNode;
      onItemSelect?: (item: T, index: number) => void;
      showGradients?: boolean;
      enableArrowNavigation?: boolean;
      displayScrollbar?: boolean;
      className?: string;
      itemClassName?: string;
    }

    const AnimatedList = <T extends { id: string | number }>(
      {
        items,
        renderItem,
        onItemSelect,
        showGradients = true,
        enableArrowNavigation = true,
        displayScrollbar = false,
        className,
        itemClassName,
      }: AnimatedListProps<T>
    ) => {
      const [selectedIndex, setSelectedIndex] = useState<number>(-1);
      const listRef = useRef<HTMLDivElement>(null);

      const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
          if (!enableArrowNavigation || items.length === 0) return;

          if (event.key === 'ArrowDown') {
            event.preventDefault();
            setSelectedIndex((prevIndex) => (prevIndex + 1) % items.length);
          } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            setSelectedIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
          } else if (event.key === 'Enter' && selectedIndex !== -1) {
            event.preventDefault();
            onItemSelect?.(items[selectedIndex], selectedIndex);
          }
        },
        [enableArrowNavigation, items, selectedIndex, onItemSelect]
      );

      useEffect(() => {
        if (enableArrowNavigation) {
          window.addEventListener('keydown', handleKeyDown);
          return () => window.removeEventListener('keydown', handleKeyDown);
        }
      }, [enableArrowNavigation, handleKeyDown]);

      useEffect(() => {
        if (listRef.current && selectedIndex !== -1) {
          const selectedElement = listRef.current.children[selectedIndex] as HTMLElement;
          selectedElement?.focus(); // Focus the selected item for accessibility
          selectedElement?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, [selectedIndex]);

      const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
          opacity: 1,
          y: 0,
          transition: {
            delay: i * 0.05,
            duration: 0.3,
            ease: 'easeOut',
          },
        }),
        exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
      };

      return (
        <div className={cn('relative w-full', className)}>
          {showGradients && (
            <>
              <div className="absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
            </>
          )}
          <motion.div
            ref={listRef}
            className={cn(
              'relative max-h-96 overflow-y-auto',
              !displayScrollbar && 'scrollbar-hide' // Custom utility to hide scrollbar
            )}
            tabIndex={0} // Make the list focusable for arrow navigation
            role="list"
            aria-label="Animated list of items"
          >
            <AnimatePresence>
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={() => onItemSelect?.(item, i)}
                  tabIndex={enableArrowNavigation ? 0 : -1} // Make individual items focusable
                  role="listitem"
                  aria-selected={selectedIndex === i}
                  className={cn(
                    'p-3 cursor-pointer transition-colors duration-200',
                    'hover:bg-secondary/10',
                    selectedIndex === i && 'bg-secondary/20 ring-2 ring-secondary',
                    itemClassName
                  )}
                >
                  {renderItem(item, i)}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      );
    };

    export { AnimatedList };