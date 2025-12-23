import React from 'react';
import { motion } from 'framer-motion';
import { Aurora } from '@/components/ui/Aurora';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Ghost } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden bg-[#2D231E]">
      <div className="absolute inset-0 z-0">
        <Aurora colorStops={["#911B44", "#2D231E", "#FC5A30"]} speed={0.8} />
      </div>

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white">
              <Ghost size={48} />
            </div>
          </div>
          
          <h1 className="text-9xl font-serif text-white mb-4">404</h1>
          <h2 className="text-3xl font-serif text-stone-200 mb-8">The Sweetness is Missing</h2>
          
          <p className="text-stone-400 max-w-md mx-auto mb-12">
            It seems the page you are looking for has been devoured or never existed. 
            Don't let your appetite fade—our main collection is just a click away.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button className="bg-[#911B44] hover:bg-[#7a1639] text-white px-8 h-12 gap-2">
                <Home size={18} /> Return Home
              </Button>
            </Link>
            <Link to="/cakes">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 h-12 gap-2">
                <ArrowLeft size={18} /> Back to Cakes
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Floating Crumbs Animation */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 bg-[#FC5A30]/20 rounded-full"
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 100 - 50, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: i * 0.5,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

export default NotFoundPage;