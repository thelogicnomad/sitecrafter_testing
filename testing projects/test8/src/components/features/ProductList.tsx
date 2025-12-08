import React from 'react';
    import { ProductCard } from './ProductCard';
    import { SkeletonLoader } from '@/components/ui/SkeletonLoader';
    import { cn } from '@/lib/utils';
    import { motion } from 'framer-motion';

    // Dummy Product Type (aligned with ProductCard's expected props)
    interface Product {
      id: string;
      name: string;
      price: number;
      imageUrl: string;
      description: string;
    }

    interface ProductListProps {
      products: Product[];
      isLoading: boolean;
      onAddToCart: (productId: string) => void;
      className?: string;
    }

    const ProductList: React.FC<ProductListProps> = ({ products, isLoading, onAddToCart, className }) => {
      const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.07,
          },
        },
      };

      const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      };

      if (isLoading) {
        return (
          <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6', className)}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center p-4">
                <SkeletonLoader width="100%" height="200px" className="mb-4 rounded-lg" shape="rounded" variant="card" />
                <SkeletonLoader width="80%" height="1.5rem" className="mb-2" shape="text" />
                <SkeletonLoader width="50%" height="1rem" shape="text" />
                <SkeletonLoader width="60%" height="2.5rem" className="mt-4" shape="rounded" />
              </div>
            ))}
          </div>
        );
      }

      if (products.length === 0) {
        return (
          <div className={cn('flex justify-center items-center p-8 text-gray-600 text-lg', className)}>
            <p>No products found matching your criteria.</p>
          </div>
        );
      }

      return (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6', className)}
          role="list"
          aria-label="List of products"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={itemVariants} role="listitem">
              <ProductCard productData={product} onAddToCart={() => onAddToCart(product.id)} />
            </motion.div>
          ))}
        </motion.div>
      );
    };

    export { ProductList };