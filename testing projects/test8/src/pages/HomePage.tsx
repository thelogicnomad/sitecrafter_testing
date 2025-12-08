import React from 'react';
    import { motion } from 'framer-motion';
    import { useInView } from 'react-intersection-observer';
    import { HeroSection } from '@/components/features/HeroSection';
    import { FeaturedProducts } from '@/components/features/FeaturedProducts';
    import { TestimonialSlider } from '@/components/features/TestimonialSlider';
    import { Card } from '@/components/ui/Card';
    import { ScrollStackItem } from '@/components/ui/ScrollStackItem';
    import { getSeededImageUrl } from '@/lib/utils';

    // Mock Data for Home Page
    const mockProducts = [
      {
        id: '1',
        name: 'Velvet Rose Cake',
        description: 'A decadent red velvet cake with cream cheese frosting and delicate rose petals.',
        price: 65.00,
        imageUrl: getSeededImageUrl('rose-cake', 400, 300),
        category: 'Cakes',
        rating: 4.9,
        reviews: 120,
      },
      {
        id: '2',
        name: 'Golden Caramel Macarons',
        description: 'Handcrafted French macarons with a rich salted caramel filling, shimmering with edible gold dust.',
        price: 28.00,
        imageUrl: getSeededImageUrl('macarons', 400, 300),
        category: 'Pastries',
        rating: 4.8,
        reviews: 85,
      },
      {
        id: '3',
        name: 'Artisan Berry Tart',
        description: 'A crisp butter crust filled with vanilla bean pastry cream and topped with a medley of fresh seasonal berries.',
        price: 45.00,
        imageUrl: getSeededImageUrl('berry-tart', 400, 300),
        category: 'Tarts',
        rating: 4.7,
        reviews: 98,
      },
      {
        id: '4',
        name: 'Espresso Chocolate Delight',
        description: 'Layers of rich chocolate sponge, coffee-infused ganache, and dark chocolate mousse.',
        price: 70.00,
        imageUrl: getSeededImageUrl('espresso-cake', 400, 300),
        category: 'Cakes',
        rating: 5.0,
        reviews: 150,
      },
    ];

    const mockTestimonials = [
      {
        id: 't1',
        quote: "The Velvet Rose Cake was an absolute masterpiece! Not only stunning to look at, but every bite was pure heaven. It made our anniversary truly special.",
        author: "Eleanor Vance",
        title: "Happy Customer", // Changed from location to title
        avatarUrl: getSeededImageUrl('eleanor', 200, 200), // Changed from avatar to avatarUrl
        rating: 5, // Added rating
      },
      {
        id: 't2',
        quote: "ArtisanBake Collective never disappoints. Their Golden Caramel Macarons are the best I've ever tasted – perfectly crisp with a melt-in-your-mouth filling. A true luxury!",
        author: "Marcus Thorne",
        title: "Connoisseur", // Changed from location to title
        avatarUrl: getSeededImageUrl('marcus', 200, 200), // Changed from avatar to avatarUrl
        rating: 5, // Added rating
      },
      {
        id: 't3',
        quote: "I ordered a custom cake for my daughter's birthday, and the detail was incredible. Beyond beautiful, it tasted fresh and exquisite. Highly recommend!",
        author: "Sophia Chen",
        title: "Event Planner", // Changed from location to title
        avatarUrl: getSeededImageUrl('sophia', 200, 200), // Changed from avatar to avatarUrl
        rating: 4, // Added rating
      },
    ];

    interface StatCardProps {
      value: string;
      label: string;
    }

    const StatCard: React.FC<StatCardProps> = ({ value, label }) => {
      const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
      return (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-lg shadow-lifted"
        >
          <p className="text-5xl font-bold text-primary mb-2 font-poppins">{value}</p>
          <p className="text-lg text-gray-700 font-inter">{label}</p>
        </motion.div>
      );
    };

    const HomePage: React.FC = () => {
      const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
      };

      return (
        <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 text-gray-900">
          {/* Hero Section */}
          <HeroSection
            h1Text="Crafted with Passion, Served with Love"
            subheadingText="Experience the exquisite taste of artisanal cakes and pastries, baked fresh daily for your special moments."
            ctaPrimary={{ text: "Explore Our Creations", href: "/products" }}
            ctaSecondary={{ text: "Build Your Custom Cake", href: "/product/custom" }}
          />

          {/* Featured Products Section */}
          <ScrollStackItem>
            <motion.section
              className="py-20 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="text-5xl font-bold text-center text-primary mb-12 font-poppins tracking-tight">
                Our Signature Collection
              </h2>
              <FeaturedProducts products={mockProducts} />
            </motion.section>
          </ScrollStackItem>

          {/* Testimonials Section */}
          <ScrollStackItem>
            <motion.section
              className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-r from-primary/5 to-secondary/5"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="text-5xl font-bold text-center text-primary mb-12 font-poppins tracking-tight">
                What Our Customers Say
              </h2>
              <TestimonialSlider testimonials={mockTestimonials} interval={7000} />
            </motion.section>
          </ScrollStackItem>

          {/* Stats Section */}
          <ScrollStackItem>
            <motion.section
              className="py-20 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="text-5xl font-bold text-center text-primary mb-12 font-poppins tracking-tight">
                Our Collective in Numbers
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <StatCard value="15+" label="Years of Exquisite Baking" />
                <StatCard value="5000+" label="Delighted Customers" />
                <StatCard value="200+" label="Unique Creations" />
              </div>
            </motion.section>
          </ScrollStackItem>
        </div>
      );
    };

    export default HomePage;