import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/lib/mockApi';
import SeoMeta from '@/components/shared/SeoMeta';
import ProductCard from '@/components/shared/ProductCard';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { useState } from 'react';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';

const categories = ['All', 'Cakes', 'Tarts', 'Pastries', 'Seasonal', 'Gluten-Free', 'Vegan'];

const CatalogPage = () => {
    const { data: products, isLoading } = useQuery({ queryKey: ['products'], queryFn: fetchProducts });
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredProducts = products?.filter(product => 
        activeCategory === 'All' || product.category === activeCategory
    );

    return (
        <SeoMeta
            title="Full Cake & Pastry Catalog | Artisan Bakehouse"
            description="Browse 100+ cakes, tarts, and custom pastries. Filter by flavor, diet, and price. Secure online browsing."
        >
            <div className="container-max section-spacing">
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold">Our Complete Selection</h1>
                    <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Filter by category to find your perfect dessert. Each treat is handcrafted with the finest ingredients and a passion for perfection.</p>
                </div>

                <div className="flex justify-center flex-wrap gap-2 my-12">
                    {categories.map(category => (
                        <Button
                            key={category}
                            variant={activeCategory === category ? 'default' : 'secondary'}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </Button>
                    ))}
                </div>
                
                {isLoading ? <LoadingSpinner /> : (
                    <>
                        {filteredProducts && filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {filteredProducts.map(product => <ProductCard key={product.id} product={product} />)}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <h2 className="text-2xl font-bold">No Treats Found</h2>
                                <p className="text-muted-foreground mt-2">No products match your current filter. Try selecting a different category.</p>
                                <Button className="mt-4" onClick={() => setActiveCategory('All')}>Reset Filters</Button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </SeoMeta>
    );
};

export default CatalogPage;