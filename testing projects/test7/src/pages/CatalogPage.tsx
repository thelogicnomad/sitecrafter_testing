import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { api } from '@/lib/api';
import CakeCard from '@/components/product/CakeCard';
import { LoaderCircle, Search, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = ['All', 'Wedding', 'Birthday', 'Cupcakes', 'Seasonal', 'Everyday'];
const flavors = ['All', 'Chocolate', 'Vanilla', 'Red Velvet', 'Fruit', 'Coffee'];
const sorts = [
  { value: 'rating-desc', label: 'Best Selling' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

const CatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || 'All',
    flavor: searchParams.get('flavor') || 'All',
    search: searchParams.get('search') || '',
  });
  const [sort, setSort] = useState(searchParams.get('sort') || 'rating-desc');
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1'));

  const { data, isLoading, isError } = useQuery({
    queryKey: ['recipes', page, filters, sort],
    queryFn: () => api.fetchRecipes(
        page, 
        {
            category: filters.category === 'All' ? undefined : filters.category,
            flavor: filters.flavor === 'All' ? undefined : filters.flavor,
            search: filters.search || undefined,
        },
        sort
    ),
    keepPreviousData: true,
  });

  const handleFilterChange = (filterType: 'category' | 'flavor', value: string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
    setPage(1);
    updateSearchParams({ [filterType]: value, page: '1' });
  };
    
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    updateSearchParams({ search: filters.search, page: '1' });
  };

  const handleSortChange = (value: string) => {
    setSort(value);
    setPage(1);
    updateSearchParams({ sort: value, page: '1' });
  };
    
  const updateSearchParams = (newParams: Record<string, string>) => {
    const currentParams = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value && value !== 'All') {
        currentParams.set(key, value);
      } else {
        currentParams.delete(key);
      }
    });
    setSearchParams(currentParams);
  };

  const FilterGroup = ({ title, items, selected, onChange }: { title: string, items: string[], selected: string, onChange: (val: string) => void }) => (
    <div>
        <h4 className="font-semibold mb-2">{title}</h4>
        <div className="flex flex-wrap gap-2">
            {items.map(item => (
                <button 
                    key={item} 
                    onClick={() => onChange(item)}
                    className={`px-3 py-1 text-sm rounded-full transition ${selected === item ? 'bg-primary text-primary-foreground' : 'bg-muted/50 hover:bg-muted/80'}`}
                >
                    {item}
                </button>
            ))}
        </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-primary">The Full Collection</h1>
        <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">
          Find the perfect centerpiece for any occasion. Filter by category, flavor, or search for your favorite.
        </p>
      </header>
      
      <aside className="mb-8 p-6 bg-white rounded-lg shadow-md space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
            <div className="lg:col-span-2">
                <form onSubmit={handleSearch} className="relative">
                    <input 
                        type="text" 
                        placeholder="Search for cakes..."
                        value={filters.search}
                        onChange={e => setFilters(prev => ({...prev, search: e.target.value}))}
                        className="w-full pl-10 pr-4 py-2 border rounded-full"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                </form>
            </div>
            <div className="flex items-center gap-2">
                <SlidersHorizontal className="text-muted-foreground" size={20}/>
                <select 
                    value={sort} 
                    onChange={e => handleSortChange(e.target.value)}
                    className="w-full p-2 border rounded-full bg-transparent"
                >
                    {sorts.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
            </div>
        </div>
        <div>
            <FilterGroup title="Category" items={categories} selected={filters.category} onChange={(v) => handleFilterChange('category', v)} />
        </div>
         <div>
            <FilterGroup title="Flavor" items={flavors} selected={filters.flavor} onChange={(v) => handleFilterChange('flavor', v)} />
        </div>
      </aside>

      <main>
        {isLoading && <div className="flex justify-center items-center h-64"><LoaderCircle className="w-12 h-12 animate-spin text-primary" /></div>}
        {isError && <p className="text-center text-red-500">Failed to load recipes. Please try again.</p>}
        {!isLoading && !isError && data?.data.length === 0 && (
          <p className="text-center text-foreground/70 h-64 flex items-center justify-center">No cakes found matching your criteria. Try adjusting your filters!</p>
        )}
        
        <AnimatePresence>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            initial="hidden" animate="visible"
          >
            {data?.data.map((cake, i) => (
              <motion.div
                key={cake.id}
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { delay: i * 0.05 } }
                }}
              >
                  <CakeCard cake={cake} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        {data && data.totalPages > 1 && (
          <nav className="flex justify-center items-center gap-4 mt-12">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-4 py-2 rounded-md disabled:opacity-50">Previous</button>
            <span>Page {page} of {data.totalPages}</span>
            <button onClick={() => setPage(p => Math.min(data.totalPages, p + 1))} disabled={page === data.totalPages} className="px-4 py-2 rounded-md disabled:opacity-50">Next</button>
          </nav>
        )}
      </main>
    </div>
  );
};

export default CatalogPage;