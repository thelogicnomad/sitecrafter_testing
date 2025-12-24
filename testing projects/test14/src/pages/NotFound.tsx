import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Home, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden">
      {/* Glitch Background Effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,217,255,0.1)_2px,rgba(0,217,255,0.1)_4px)]" />
      </div>

      <Container className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex p-6 bg-rose-500/10 rounded-full mb-8">
            <AlertTriangle className="w-16 h-16 text-rose-500" />
          </div>
          <h1 className="text-7xl md:text-9xl font-black text-white mb-4 tracking-tighter">
            4<span className="text-cyan-400">0</span>4
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-300 mb-8 uppercase tracking-widest">
            Signal Lost in Space
          </h2>
          <p className="text-slate-500 text-lg mb-12 max-w-md mx-auto">
            The frame you are looking for has been dropped or moved to another timeline.
          </p>
          <Link to="/">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 h-16 rounded-full text-lg">
              <Home className="mr-2 w-5 h-5" /> Return to Base
            </Button>
          </Link>
        </motion.div>
      </Container>

      {/* Decorative Elements */}
      <motion.div 
        animate={{ 
          x: [0, 10, -10, 0],
          y: [0, -5, 5, 0]
        }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute top-1/4 right-1/4 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl"
      />
      <motion.div 
        animate={{ 
          x: [0, -15, 15, 0],
          y: [0, 10, -10, 0]
        }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl"
      />
    </div>
  );
};

export default NotFound;