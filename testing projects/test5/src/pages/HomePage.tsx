import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

import { fetchProducts } from '@/lib/mockApi';
import { useScrollAnim } from '@/hooks/useScrollAnim';

import SeoMeta from '@/components/shared/SeoMeta';
import { Button } from '@/components/ui/button';
import Aurora from '@/components/special/Aurora';
import GradientText from '@/components/special/GradientText';
import ProductCard from '@/components/shared/ProductCard';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import ScrollStack from '@/components/special/ScrollStack';

const testimonials = [
  { quote: 'The best wedding cake I have ever tasted. Truly artistic and delicious!', author: 'Jessica L.' },
  { quote: 'Incredible attention to detail and excellent service.', author: 'Michael B.' },
  { quote: 'Reliable, beautiful, and perfectly priced for special occasions.', author: 'Samantha P.' },
];

const stats = [
    { value: 12500, label: 'Customers Served', suffix: '+' },
    { value: 8900, label: 'Cakes Created', suffix: '+' },
    { value: 98, label: '5-Star Ratings', suffix: '%' },
    { value: 25, label: 'Local Bakers', suffix: '+' },
];

const HomePage = () => {
  const { data: products, isLoading } = useQuery({ queryKey: ['featuredProducts'], queryFn: () => fetchProducts().then(p => p.slice(0, 3)) });
  const section2Anim = useScrollAnim();
  const section3Anim = useScrollAnim();
  const section4Anim = useScrollAnim();
  const section5Anim = useScrollAnim();

  return (
    <SeoMeta
      title="Artisan Bakehouse | Handcrafted Cakes & Pastries"
      description="Discover premium, artisan-baked cakes, tarts, and pastries made with the finest local ingredients. Order online today."
    >
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center text-center overflow-hidden">
        <Aurora className="opacity-30" />
        <div className="relative z-10 p-4">
          <motion.h1 
            className="font-heading text-5xl md:text-7xl lg:text-8xl font-extrabold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GradientText>Artisan Bakehouse</GradientText>
          </motion.h1>
          <motion.p 
            className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-foreground/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Where Every Treat Tells a Story. Handcrafted cakes, pastries, and custom creations, baked fresh daily.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button asChild size="lg" className="mt-8">
              <Link to="/catalog">View Our Menu</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="section-spacing container-max" ref={section2Anim.ref} style={section2Anim.animation}>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center">Featured Creations</h2>
        <p className="text-muted-foreground text-center mt-2 max-w-xl mx-auto">A selection of our current favorites, handcrafted with love and the finest ingredients.</p>
        <div className="mt-12">
          {isLoading ? <LoadingSpinner /> : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products?.map(product => <ProductCard key={product.id} product={product} />)}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-secondary section-spacing" ref={section3Anim.ref} style={section3Anim.animation}>
        <div className="container-max grid md:grid-cols-2 gap-12 items-center">
            <div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold">Crafted with Passion, Served with Pride</h2>
                <p className="mt-4 text-muted-foreground">Since 2018, our mission has been to bring joy to our community through the art of baking. We believe in using locally-sourced ingredients, traditional techniques, and a dash of modern creativity to create treats that aren't just delicious, but memorable.</p>
                <Button asChild className="mt-6" variant="accent"><Link to="/about">Our Story</Link></Button>
            </div>
            <div className="h-80 rounded-lg overflow-hidden subtle-shadow">
                <img src="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=800&auto=format&fit=crop" alt="Baking process" className="w-full h-full object-cover" />
            </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={section4Anim.ref} style={section4Anim.animation} className="container-max text-center section-spacing overflow-hidden">
        <h2 className="text-3xl md:text-4xl font-heading font-bold">Words from Our Community</h2>
        <p className="text-muted-foreground mt-2 max-w-xl mx-auto">We're honored to be a part of your special moments. Here's what some of our customers have to say.</p>
        <div className="mt-8">
          <ScrollStack>
            {testimonials.map((testimonial, i) => (
              <div key={i} className="max-w-2xl mx-auto bg-card p-8 rounded-lg subtle-shadow">
                <p className="text-xl italic">"{testimonial.quote}"</p>
                <p className="mt-4 font-semibold text-primary">- {testimonial.author}</p>
              </div>
            ))}
          </ScrollStack>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-secondary section-spacing" ref={section5Anim.ref} style={section5Anim.animation}>
        <div className="container-max grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
                <div key={stat.label}>
                    <p className="text-4xl md:text-5xl font-bold text-primary">
                        <CountUp end={stat.value} duration={3} enableScrollSpy />
                        {stat.suffix}
                    </p>
                    <p className="text-muted-foreground mt-2">{stat.label}</p>
                </div>
            ))}
        </div>
      </section>
    </SeoMeta>
  );
};

export default HomePage;