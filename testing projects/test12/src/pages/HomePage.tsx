import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Utensils, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { TestimonialSlider } from '@/components/features/TestimonialSlider';
import { MenuGrid } from '@/components/features/MenuGrid';
import { Input } from '@/components/ui/Input';

const HomePage = () => {
  const [imgError, setImgError] = useState<Record<string, boolean>>({});

  const handleImgError = (id: string) => {
    setImgError((prev) => ({ ...prev, [id]: true }));
  };

  const heroImage = "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1920";

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          {!imgError['hero'] ? (
            <img
              src={heroImage}
              alt="Bistro Interior"
              className="w-full h-full object-cover opacity-50"
              onError={() => handleImgError('hero')}
              crossOrigin="anonymous"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-900 to-indigo-950" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        </div>

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <Badge className="mb-4 bg-[#C5A059] text-white border-none px-4 py-1">
              ESTABLISHED 1998
            </Badge>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
              Experience the Art of <span className="text-[#C5A059]">Savory</span> Dining
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
              Indulge in a symphony of flavors where traditional techniques meet modern culinary innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-[#C5A059] hover:bg-[#b08e4d] text-white text-lg px-8 py-6 h-auto" onClick={() => window.location.href='/book-a-table'}>
                Book a Table
              </Button>
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-slate-900 text-lg px-8 py-6 h-auto" onClick={() => window.location.href='/menu'}>
                Explore Menu
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Quick Info Bar */}
      <div className="bg-[#C5A059] py-8">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 text-white">
              <div className="p-3 bg-white/10 rounded-full">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold">Opening Hours</p>
                <p className="text-white/80">Mon - Sun: 11am - 11pm</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-white">
              <div className="p-3 bg-white/10 rounded-full">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold">Our Location</p>
                <p className="text-white/80">123 Culinary Ave, Foodie City</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-white">
              <div className="p-3 bg-white/10 rounded-full">
                <Utensils className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold">Reservations</p>
                <p className="text-white/80">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Featured Dishes Section */}
      <Section className="bg-white">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-slate-100 text-slate-900 border-none">CHEF'S SELECTION</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Signature Creations</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Our most beloved dishes, crafted with seasonal ingredients and passion.
          </p>
        </div>
        <MenuGrid />
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" className="group" onClick={() => window.location.href='/menu'}>
            View Full Menu <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </Section>

      {/* Story Preview Section */}
      <Section className="bg-slate-50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              {!imgError['story'] ? (
                <img
                  src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800"
                  alt="Chef at work"
                  className="w-full h-full object-cover"
                  onError={() => handleImgError('story')}
                  crossOrigin="anonymous"
                />
              ) : (
                <div className="w-full h-full bg-slate-200 flex items-center justify-center">Image unavailable</div>
              )}
            </div>
            <div className="absolute -bottom-8 -right-8 bg-[#C5A059] p-8 rounded-xl text-white hidden md:block max-w-xs shadow-xl">
              <p className="text-3xl font-bold mb-2">25+</p>
              <p className="text-sm uppercase tracking-wider">Years of Culinary Excellence and Local Heritage</p>
            </div>
          </div>
          <div>
            <Badge className="mb-4 bg-slate-200 text-slate-900 border-none">OUR STORY</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              A Legacy of Taste and Tradition
            </h2>
            <p className="text-slate-700 text-lg mb-6 leading-relaxed">
              Founded in the heart of the city, Savory Bistro began as a small family kitchen with a big dream: to create a space where food is celebrated as an art form.
            </p>
            <p className="text-slate-700 text-lg mb-8 leading-relaxed">
              Today, we continue that legacy by blending time-honored recipes with contemporary flair, sourcing only the finest local ingredients for our discerning guests.
            </p>
            <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800" onClick={() => window.location.href='/about'}>
              Learn Our Story
            </Button>
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="bg-white overflow-hidden">
        <div className="text-center mb-16">
          <div className="flex justify-center gap-1 mb-4 text-[#C5A059]">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Guest Experiences</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Hear from our diners about their memorable moments at Savory Bistro.
          </p>
        </div>
        <TestimonialSlider />
      </Section>

      {/* Newsletter Section */}
      <Section className="bg-slate-900 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Join Our Inner Circle</h2>
          <p className="text-slate-300 text-lg md:text-xl mb-10">
            Subscribe to receive exclusive invitations to tasting events, seasonal menu updates, and special promotions.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <Input 
              type="email" 
              placeholder="Enter your email address" 
              className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 h-14"
            />
            <Button className="bg-[#C5A059] hover:bg-[#b08e4d] text-white h-14 px-8 whitespace-nowrap">
              Subscribe Now
            </Button>
          </form>
          <p className="text-slate-500 text-sm mt-6">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </Section>
    </div>
  );
};

export default HomePage;