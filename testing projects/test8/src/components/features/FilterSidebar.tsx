import React, { useState, useEffect, useCallback } from 'react';
    import { cn } from '@/lib/utils';
    import { Button } from '@/components/ui/Button';
    import { ChevronDown, ChevronUp, X } from 'lucide-react';
    import { motion, AnimatePresence } from 'framer-motion';

    interface FilterOption {
      label: string;
      value: string;
    }

    interface FilterSidebarProps {
      categories: FilterOption[];
      sizes: FilterOption[];
      priceRanges: FilterOption[];
      onFilterChange: (filters: Record<string, string[]>) => void; // Expects a full filter object
      className?: string;
      initialFilters?: Record<string, string[]>; // Optional initial filters
    }

    const FilterSection: React.FC<{
      title: string;
      options: FilterOption[];
      selected: string[];
      onSelect: (value: string) => void;
    }> = ({ title, options, selected, onSelect }) => {
      const [isOpen, setIsOpen] = useState(true);

      return (
        <div className="mb-6 border-b border-gray-200 pb-4">
          <button
            className="flex justify-between items-center w-full py-2 text-lg font-semibold text-primary hover:text-primary/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls={`filter-section-${title.toLowerCase().replace(/\s/g, '-')}`}
          >
            {title}
            {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                id={`filter-section-${title.toLowerCase().replace(/\s/g, '-')}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-2"
              >
                <div className="space-y-2" role="group" aria-label={`${title} filters`}>
                  {options.map((option) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`${title}-${option.value}`}
                        value={option.value}
                        checked={selected.includes(option.value)}
                        onChange={() => onSelect(option.value)}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label htmlFor={`${title}-${option.value}`} className="ml-2 text-gray-700 cursor-pointer">
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    };

    const FilterSidebar: React.FC<FilterSidebarProps> = ({
      categories,
      sizes,
      priceRanges,
      onFilterChange,
      className,
      initialFilters = { category: [], size: [], price: [] },
    }) => {
      const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>(initialFilters);

      // Effect to update internal state if initialFilters prop changes
      useEffect(() => {
        setSelectedFilters(initialFilters);
      }, [initialFilters]);


      const handleToggleFilter = useCallback((filterType: string, value: string) => {
        setSelectedFilters((prev) => {
          const current = prev[filterType] || [];
          const newSelection = current.includes(value)
            ? current.filter((item) => item !== value)
            : [...current, value];
          const updatedFilters = { ...prev, [filterType]: newSelection };
          onFilterChange(updatedFilters); // Immediately notify parent of change
          return updatedFilters;
        });
      }, [onFilterChange]);

      const handleClearFilters = () => {
        const clearedFilters = { category: [], size: [], price: [] };
        setSelectedFilters(clearedFilters);
        onFilterChange(clearedFilters); // Notify parent
      };

      const hasActiveFilters = Object.values(selectedFilters).some((arr) => arr.length > 0);

      return (
        <aside className={cn('w-full md:w-64 p-6 bg-white rounded-lg shadow-lifted h-full', className)} aria-label="Product filters">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-primary font-poppins">Filters</h3>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={handleClearFilters} aria-label="Clear all filters">
                <X className="h-4 w-4 mr-1" /> Clear All
              </Button>
            )}
          </div>

          <FilterSection
            title="Category"
            options={categories}
            selected={selectedFilters.category || []}
            onSelect={(value) => handleToggleFilter('category', value)}
          />

          <FilterSection
            title="Size"
            options={sizes}
            selected={selectedFilters.size || []}
            onSelect={(value) => handleToggleFilter('size', value)}
          />

          <FilterSection
            title="Price Range"
            options={priceRanges}
            selected={selectedFilters.price || []}
            onSelect={(value) => handleToggleFilter('price', value)}
          />
        </aside>
      );
    };

    export { FilterSidebar };