import React from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { SplitText } from '@/components/ui/SplitText';

const NotFoundPage = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white py-20">
      <Container>
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-64 h-64 relative mb-8"
          >
            <div className="absolute inset-0 bg-indigo-100 rounded-full animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center text-[120px] font-black text-indigo-600 select-none">
              404
            </div>
          </motion.div>

          <SplitText 
            text="Page Not Found" 
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
          />
          
          <p className="text-lg text-slate-600 max-w-md mb-10 leading-relaxed">
            Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 px-8 h-14">
                <Home className="mr-2 w-5 h-5" /> Back to Home
              </Button>
            </Link>
            <Link to="/courses">
              <Button size="lg" variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 h-14">
                <Search className="mr-2 w-5 h-5" /> Browse Courses
              </Button>
            </Link>
          </div>

          <div className="mt-16 pt-8 border-t border-slate-100 w-full max-w-lg">
            <p className="text-slate-500 text-sm mb-4">Or try searching for what you need:</p>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NotFoundPage;