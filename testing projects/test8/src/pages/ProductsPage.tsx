import React, { useState, useEffect, useMemo } from 'react';
    import { motion } from 'framer-motion';
    import { FilterSidebar } from '@/components/features/FilterSidebar';
    import { ProductList } from '@/components/features/ProductList';
    import { Pagination } from '@/components/ui/Pagination';
    import { SkeletonLoader } from '@/components/ui/SkeletonLoader';
    import { getSeededImageUrl } from '@/lib/utils'; // Assuming this utility exists

    // FilterOption type from FilterSidebar
    interface FilterOption {
      label: string;
      value: string;
    }

    // Mock Product Data
    const allMockProducts = Array.from({ length: 24 }, (_, i) => ({
      id: String(i + 1),
      name: `Artisan Cake No. ${i + 1}`,
      description: `A beautifully handcrafted cake with unique flavors and elegant design. Perfect for any celebration. This is a longer description to ensure proper layout.`,
      price: 45.00 + (i % 5) * 5, // Vary price
      imageUrl: getSeededImageUrl(`cake-${i + 1}`, 400, 300),
      category: ['Cakes', 'Pastries', 'Tarts', 'Cupcakes'][i % 4],
      rating: 4.0 + (i % 10) / 10, // Vary rating
      reviews: 20 + (i % 20), // Vary reviews
      size: ['Small', 'Medium', 'Large'][i % 3],
      isNew: i < 3,
      isBestseller: i % 5 === 0,
    }));

    // Convert string arrays to FilterOption[] for FilterSidebar
    const categoriesOptions: FilterOption[] = ['All', 'Cakes', 'Pastries', 'Tarts', 'Cupcakes'].map(cat => ({ label: cat, value: cat }));
    const sizesOptions: FilterOption[] = ['All', 'Small', 'Medium', 'Large'].map(size => ({ label: size, value: size }));
    const priceRangesOptions: FilterOption[] = ['All', '$0-50', '$51-100', '$101+'].map(range => ({ label: range, value: range }));

    const ProductsPage: React.FC = () => {
      const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
        category: ['All'], // Default to 'All' selected
        size: ['All'],
        price: ['All'],
      });
      const [sortBy, setSortBy] = useState('price-asc'); // Default sort
      const [currentPage, setCurrentPage] = useState(1);
      const [isLoading, setIsLoading] = useState(true);
      const productsPerPage = 9;

      useEffect(() => {
        // Simulate API call with artificial latency
        setIsLoading(true);
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, Math.random() * 500 + 300); // 300ms-800ms latency
        return () => clearTimeout(timer);
      }, [activeFilters, sortBy, currentPage]);

      // This function now receives the full filter object from FilterSidebar
      const handleFilterChange = (newFilters: Record<string, string[]>) => {
        setActiveFilters(newFilters);
        setCurrentPage(1); // Reset to first page on filter change
      };

      const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value);
        setCurrentPage(1); // Reset to first page on sort change
      };

      const filteredAndSortedProducts = useMemo(() => {
        let filtered = allMockProducts;

        // Apply category filter
        if (activeFilters.category && !activeFilters.category.includes('All')) {
          filtered = filtered.filter(product => activeFilters.category.includes(product.category));
        }

        // Apply size filter
        if (activeFilters.size && !activeFilters.size.includes('All')) {
          filtered = filtered.filter(product => activeFilters.size.includes(product.size));
        }

        // Apply price range filter
        if (activeFilters.price && !activeFilters.price.includes('All')) {
          filtered = filtered.filter(product => {
            const selectedPriceRanges = activeFilters.price;
            let matchesPrice = false;
            for (const range of selectedPriceRanges) {
              if (range === '$0-50' && product.price <= 50) matchesPrice = true;
              else if (range === '$51-100' && product.price > 50 && product.price <= 100) matchesPrice = true;
              else if (range === '$101+' && product.price > 100) matchesPrice = true;
            }
            return matchesPrice;
          });
        }

        // Apply sorting
        filtered.sort((a, b) => {
          if (sortBy === 'price-asc') return a.price - b.price;
          if (sortBy === 'price-desc') return b.price - a.price;
          if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
          if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
          if (sortBy === 'rating-desc') return (b.rating || 0) - (a.rating || 0); // Handle undefined ratings
          return 0;
        });

        return filtered;
      }, [activeFilters, sortBy]);

      const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage);
      const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        return filteredAndSortedProducts.slice(startIndex, endIndex);
      }, [filteredAndSortedProducts, currentPage, productsPerPage]);

      const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on page change
      };

      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="min-h-screen bg-gray-50 text-gray-900"
        >
          {/* Page Header */}
          <header className="bg-gradient-to-r from-primary/5 to-secondary/5 py-16 text-center shadow-md">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-6xl font-extrabold text-primary mb-4 font-poppins tracking-tight"
            >
              Our Exquisite Creations
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl text-gray-700 max-w-2xl mx-auto font-inter"
            >
              Discover our handcrafted selection of luxury cakes, pastries, and desserts, perfect for every occasion.
            </motion.p>
          </header>

          <main className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Filter Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="md:col-span-1"
            >
              <FilterSidebar
                categories={categoriesOptions}
                sizes={sizesOptions}
                priceRanges={priceRangesOptions}
                initialFilters={activeFilters} // Pass current active filters for internal state
                onFilterChange={handleFilterChange}
              />
            </motion.aside>

            {/* Product List & Pagination */}
            <section className="md:col-span-3">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-primary font-poppins">
                  {activeFilters.category && !activeFilters.category.includes('All') ? activeFilters.category.join(', ') : 'All Products'}
                </h2>
                <div className="flex items-center space-x-2">
                  <label htmlFor="sort-by" className="text-gray-700 font-inter text-sm">Sort by:</label>
                  <select
                    id="sort-by"
                    className="p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary font-inter text-sm"
                    value={sortBy}
                    onChange={handleSortChange}
                    aria-label="Sort products by"
                  >
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Name: A-Z</option>
                    <option value="name-desc">Name: Z-A</option>
                    <option value="rating-desc">Rating: High to Low</option>
                  </select>
                </div>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: productsPerPage }).map((_, index) => (
                    <SkeletonLoader key={index} width="100%" height="350px" shape="rounded" variant="card" />
                  ))}
                </div>
              ) : (
                <>
                  <ProductList products={paginatedProducts} isLoading={false} onAddToCart={() => alert('Add to cart clicked!')} />
                  {paginatedProducts.length === 0 && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center text-gray-600 text-lg py-10"
                    >
                      No products found matching your criteria.
                    </motion.p>
                  )}
                  {totalPages > 1 && (
                    <div className="mt-10">
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  )}
                </>
              )}
            </section>
          </main>
        </motion.div>
      );
    };

    export default ProductsPage;