import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Home, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center overflow-hidden">
      {/* Glitch Background Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent opacity-50 animate-pulse" />
      </div>

      <Container className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20 
          }}
        >
          <h1 className="text-[10rem] md:text-[15rem] font-black text-white/5 leading-none select-none">
            404
          </h1>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
            <motion.div
              animate={{ 
                x: [0, -2, 2, -1, 0],
                y: [0, 1, -1, 1, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 0.2,
                repeatType: "mirror"
              }}
            >
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tighter">
                SIGNAL LOST
              </h2>
            </motion.div>
            
            <p className="text-indigo-400 font-mono text-sm md:text-base mb-12 uppercase tracking-[0.3em]">
              Environment Not Found in CloudVerse
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Link to="/">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white min-w-[200px] h-14 rounded-xl font-bold">
                  <Home className="mr-2 w-5 h-5" /> Return Home
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-slate-700 text-white hover:bg-white/5 min-w-[200px] h-14 rounded-xl font-bold"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="mr-2 w-5 h-5" /> Go Back
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-20 max-w-2xl mx-auto">
          {[1,2,3,4].map(i => (
            <div key={i} className="h-1 bg-slate-700 rounded-full" />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default NotFound;