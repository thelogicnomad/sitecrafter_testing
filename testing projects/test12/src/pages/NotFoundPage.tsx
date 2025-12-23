import React from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { Home, Utensils } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white py-20">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-9xl font-bold text-slate-900 opacity-10">404</h1>
            <div className="relative -mt-24">
              <Utensils className="w-24 h-24 text-[#C5A059] mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Dish Not Found</h2>
              <p className="text-slate-600 text-lg mb-10">
                It seems the page you're looking for has been taken off the menu. 
                Let's get you back to something delicious.
              </p>
            </div>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-slate-900 text-white hover:bg-slate-800"
              onClick={() => window.location.href = '/'}
            >
              <Home className="mr-2 w-5 h-5" /> Back to Home
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.location.href = '/menu'}
            >
              View Our Menu
            </Button>
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-medium text-slate-400 uppercase tracking-widest">
            <a href="/menu" className="hover:text-[#C5A059] transition-colors">Menu</a>
            <a href="/book-a-table" className="hover:text-[#C5A059] transition-colors">Bookings</a>
            <a href="/about" className="hover:text-[#C5A059] transition-colors">About</a>
            <a href="/contact" className="hover:text-[#C5A059] transition-colors">Contact</a>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NotFoundPage;