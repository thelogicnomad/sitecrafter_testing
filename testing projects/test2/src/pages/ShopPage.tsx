import PageTransition from '@/components/sections/PageTransition';
    import ProductCard from '@/components/product/ProductCard';
    import { products } from '@/utils/data';
    import { motion } from 'framer-motion';

    const ShopPage = () => {
      return (
        <PageTransition>
          <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-center font-heading text-4xl font-bold text-secondary md:text-5xl">
                Our Delicious Creations
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-center text-lg text-muted-foreground">
                Browse our collection of handcrafted breads, pastries, cakes, and more.
              </p>
            </motion.div>

            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </div>
        </PageTransition>
      );
    };

    export default ShopPage;