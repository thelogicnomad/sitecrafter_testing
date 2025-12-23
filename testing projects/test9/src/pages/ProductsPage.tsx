import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCard } from '@/components/features/ProductCard';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Search, SlidersHorizontal } from 'lucide-react';

const CATEGORIES = ['All', 'Signature Cakes', 'Macarons', 'Seasonal', 'Tarts', 'Gift Boxes'];

const PRODUCTS = [
  { id: '1', name: 'Midnight Velvet', price: 85, category: 'Signature Cakes', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800', rating: 5, description: 'Dark cocoa and gold leaf.' },
  { id: '2', name: 'Citron Tart', price: 64, category: 'Tarts', image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&q=80&w=800', rating: 4.8, description: 'Meyer lemon and meringue.' },
  { id: '3', name: 'Pistachio Dream', price: 92, category: 'Signature Cakes', image: 'https://images.unsplash.com/photo-1557925923-33b27f891f88?auto=format&fit=crop&q=80&w=800', rating: 4.9, description: 'Pistachio praline layers.' },
  { id: '4', name: 'Rose Macaron Box', price: 45, category: 'Macarons', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=800', rating: 4.7, description: 'Hand-painted rose petals.' },
  { id: '5', name: 'Autumn Spiced Cake', price: 78, category: 'Seasonal', image: 'https://images.unsplash.com/photo-1509460913899-515f1df34fea?auto=format&fit=crop&q=80&w=800', rating: 4.6, description: 'Cinnamon and nutmeg spice.' },
  { id: '6', name: 'Gourmet Gift Box', price: 120, category: 'Gift Boxes', image: 'https://images.unsplash.com/photo-1549146473-80663d47a950?auto=format&fit=crop&q=80&w=800', rating: 5, description: 'Selection of our finest.' },
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-serif mb-4">Our Collection</h1>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Explore our handcrafted selection of artisanal pastries, made with the finest ingredients and meticulous attention to detail.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4" />
            <Input
              placeholder="Search pastries..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                className="cursor-pointer px-4 py-1.5 text-sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>

          <Button variant="outline" size="icon" className="hidden md:flex">
            <SlidersHorizontal className="w-4 h-4" />
          </Button>
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <ProductCard
                  product={product}
                  onAddToCart={() => console.log('Added to cart:', product.name)}
                  onQuickView={() => console.log('Quick view:', product.name)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-stone-500 text-lg">No products found matching your criteria.</p>
            <Button
              variant="link"
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}