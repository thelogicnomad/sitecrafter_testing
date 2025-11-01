import PageTransition from '@/components/sections/PageTransition';
    import { Button } from '@/components/ui/Button';
    import { Link } from 'react-router-dom';
    import ProductCard from '@/components/product/ProductCard';
    import { products } from '@/utils/data';
    import Aurora from '@/components/ui/Aurora';
    import SplitText from '@/components/ui/SplitText';
    import ClickSpark from '@/components/ui/ClickSpark';

    const HomePage = () => {
      const featuredProducts = products.slice(0, 4);

      return (
        <PageTransition>
          {/* Hero Section */}
          <section className="relative flex h-[80vh] min-h-[600px] w-full items-center justify-center overflow-hidden text-center">
            <Aurora />
            <div className="relative z-10 flex flex-col items-center">
              <SplitText className="font-heading text-5xl font-bold text-secondary md:text-7xl">
                Crafted with Love, Baked to Perfection.
              </SplitText>
              <p className="mt-4 max-w-2xl text-lg text-foreground md:text-xl">
                Experience the warmth and flavor of our artisanal baked goods, made fresh daily with the finest ingredients.
              </p>
              <ClickSpark>
                  <Link to="/shop">
                    <Button size="lg" className="mt-8">
                      Shop Our Creations
                    </Button>
                  </Link>
              </ClickSpark>
            </div>
          </section>

          {/* Featured Products Section */}
          <section className="py-20 md:py-32">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-center font-heading text-4xl font-bold text-secondary">
                Our Featured Delights
              </h2>
              <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        </PageTransition>
      );
    };

    export default HomePage;