import React from 'react';
import { motion } from 'framer-motion';
import { Aurora } from '@/components/ui/Aurora';
import { GradientText } from '@/components/ui/GradientText';
import { ClickSpark } from '@/components/ui/ClickSpark';
import { ProductCard } from '@/components/features/ProductCard';
import { ShinyText } from '@/components/ui/ShinyText';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Star, ArrowRight, Utensils, Award, Clock } from 'lucide-react';

const FEATURED_CAKES = [
  {
    id: '1',
    name: 'The Midnight Velvet',
    price: 85,
    category: 'Signature',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800',
    rating: 5,
    description: 'Dark cocoa layers with a signature gold-leaf finish and raspberry reduction.'
  },
  {
    id: '2',
    name: 'Golden Citron Tart',
    price: 64,
    category: 'Seasonal',
    image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    description: 'Meyer lemon curd in a buttery shortcrust, topped with toasted Italian meringue.'
  },
  {
    id: '3',
    name: 'Pistachio Dream',
    price: 92,
    category: 'Luxury',
    image: 'https://images.unsplash.com/photo-1557925923-33b27f891f88?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    description: 'Sicilian pistachio praline layered with light sponge and white chocolate ganache.'
  }
];

const HomePage = () => {
  return (
    <div className="relative min-h-screen bg-[#2D231E]">
      <ClickSpark>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Aurora colorStops={["#911B44", "#2D231E", "#FC5A30"]} speed={0.5} />
          </div>

          <div className="container mx-auto px-4 z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <ShinyText text="Est. 1924 • Paris & London" className="mb-6 block text-sm tracking-widest uppercase" />
              <h1 className="text-6xl md:text-8xl font-serif text-white mb-6">
                <GradientText colors={["#FFFFFF", "#FC5A30", "#911B44", "#FFFFFF"]} animationSpeed={6}>
                  Artistry in Every Crumb
                </GradientText>
              </h1>
              <p className="text-xl text-stone-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                Experience the golden standard of French patisserie. Hand-crafted masterpieces
                delivered from our ovens to your celebrations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-[#911B44] hover:bg-[#7a1639] text-white px-8">
                  Explore Collection
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Custom Orders
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Cakes */}
        <section className="py-24 bg-stone-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-4xl font-serif text-[#2D231E] mb-4">The Signature Collection</h2>
                <p className="text-stone-600">Our most beloved creations, perfected over generations.</p>
              </div>
              <Button variant="ghost" className="text-[#911B44] font-semibold hidden md:flex items-center gap-2">
                View All Cakes <ArrowRight size={16} />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {FEATURED_CAKES.map((cake, idx) => (
                <motion.div
                  key={cake.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <ProductCard
                    product={cake}
                    onAddToCart={() => console.log('Added to cart:', cake.name)}
                    onQuickView={() => console.log('Quick view:', cake.name)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Craftsmanship Showcase */}
        <section className="py-24 bg-[#2D231E] text-white overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <h2 className="text-4xl font-serif mb-8">The Gilded Standard</h2>
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#911B44]/20 flex items-center justify-center shrink-0">
                      <Utensils className="text-[#FC5A30]" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Ethical Sourcing</h4>
                      <p className="text-stone-400">We partner exclusively with single-origin cocoa farmers and local organic dairies for unparalleled purity.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#911B44]/20 flex items-center justify-center shrink-0">
                      <Award className="text-[#FC5A30]" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Master Pastry Chefs</h4>
                      <p className="text-stone-400">Our team consists of Michelin-pedigree artisans who view every cake as a unique sculpture.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#911B44]/20 flex items-center justify-center shrink-0">
                      <Clock className="text-[#FC5A30]" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">48-Hour Curing</h4>
                      <p className="text-stone-400">Our sponges are rested for exactly 48 hours to ensure the perfect moisture balance before decoration.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="relative"
              >
                <img
                  src="https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=800"
                  alt="Pastry Chef at work"
                  className="rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute -bottom-6 -right-6 bg-[#911B44] p-8 rounded-lg hidden lg:block">
                  <p className="text-3xl font-serif italic">"Excellence is not an act, but a habit."</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-serif text-[#2D231E] mb-16">Words from our Patrons</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Isabella V.", role: "Wedding Client", text: "The custom cake for our wedding was more than dessert; it was a conversation piece. Stunning and delicious." },
                { name: "Julian M.", role: "Food Critic", text: "Gilded Patisserie maintains a level of consistency and luxury that is rare in the modern culinary world." },
                { name: "Sophie R.", role: "Regular Patron", text: "Their macarons are the best I've had outside of Paris. The salted caramel is a revelation." }
              ].map((testimonial, i) => (
                <Card key={i} className="p-8 border-stone-100 hover:shadow-xl transition-shadow">
                  <div className="flex justify-center mb-4 text-[#FC5A30]">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-stone-600 italic mb-6">"{testimonial.text}"</p>
                  <h5 className="font-bold text-[#2D231E]">{testimonial.name}</h5>
                  <p className="text-sm text-stone-400">{testimonial.role}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </ClickSpark>
    </div>
  );
};

export default HomePage;