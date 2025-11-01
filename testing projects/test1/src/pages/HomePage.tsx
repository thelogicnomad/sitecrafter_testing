import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import RotatingText from '@/components/ui/RotatingText';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const HomePage = () => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
    >
      <section className="min-h-[80vh] flex items-center justify-center text-center bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight">
                Find Your Dream{' '}
                <span className="inline-block">
                    <RotatingText
                        texts={['Home', 'Villa', 'Condo', 'Estate']}
                        mainClassName="px-2 sm:px-2 md:px-3 bg-accent text-accent-foreground overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                    />
                </span>
                <br/>
                with Apex Estates
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover premium properties, expert guidance, and seamless real estate experiences.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                    <Link to="/listings">Explore Listings</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                    <Link to="/contact">Sell Your Property</Link>
                </Button>
            </div>
        </div>
      </section>
      
      <section className="py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
              <h2 className="text-3xl md:text-4xl font-bold">Featured Properties</h2>
              <p className="mt-2 text-muted-foreground">Handpicked selections of the finest homes.</p>
              <div className="mt-10">
                <p>Featured properties will be displayed here.</p>
              </div>
          </div>
      </section>

    </motion.div>
  );
};

export default HomePage;