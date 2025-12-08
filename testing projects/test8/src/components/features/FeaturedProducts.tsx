import React from 'react';
    import { motion } from 'framer-motion';
    import { useInView } from 'react-intersection-observer';
    import { ProductCard } from './ProductCard';
    import { cn } from '@/lib/utils';
    import { SkeletonLoader } from '@/components/ui/SkeletonLoader';

    // Dummy Product Type (aligned with ProductCard's expected props)
    interface Product {
      id: string;
      name: string;
      price: number;
      imageUrl: string;
      description: string;
      // Additional properties from mock data, if needed for filtering/display
      category?: string;
      rating?: number;
      reviews?: number;
    }

    interface FeaturedProductsProps {
      products: Product[];
      isLoading?: boolean;
      className?: string;
    }

    const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products, isLoading = false, className }) => {
      const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
      });

      const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      };

      const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      };

      const handleAddToCart = (productId: string) => {
        console.log(`Product ${productId} added to cart!`);
        // In a real app, this would dispatch an action to a cart state management system
      };

      return (
        <section className={cn('py-16 bg-gradient-to-br from-white to-secondary/5', className)} aria-labelledby="featured-products-title">
          <div className="container mx-auto px-4">
            <h2 id="featured-products-title" className="text-4xl font-bold text-center text-primary mb-12 font-poppins">
              Our Signature Creations
            </h2>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <SkeletonLoader width="100%" height="200px" className="mb-4" shape="rounded" variant="card" />
                    <SkeletonLoader width="80%" height="1.5rem" className="mb-2" shape="text" />
                    <SkeletonLoader width="50%" height="1.0rem" shape="text" />
                  </div>
                ))}
              </div>
            ) : (
              <motion.div
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {products.map((product) => (
                  <motion.div key={product.id} variants={itemVariants}>
                    <ProductCard productData={product} onAddToCart={() => handleAddToCart(product.id)} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>
      );
    };

    export { FeaturedProducts };