import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { ArrowLeft, Home, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-20">
      <Container className="max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative mb-8">
            <h1 className="text-[12rem] font-black text-slate-200 leading-none">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-indigo-600 text-white px-6 py-2 rounded-full font-bold text-xl shadow-xl">
                Page Not Found
              </div>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Lost in the moment?</h2>
          <p className="text-lg text-slate-600 mb-10">
            Even the best of us lose our way sometimes. Let's get you back to your breath and your journey.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/">
              <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white px-8 h-14">
                <Home className="mr-2 w-5 h-5" /> Back to Home
              </Button>
            </Link>
            <Link to="/sessions">
              <Button variant="outline" size="lg" className="border-slate-300 text-slate-700 h-14 px-8">
                <Search className="mr-2 w-5 h-5" /> Browse Sessions
              </Button>
            </Link>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              { title: "Library", link: "/sessions", desc: "Find a meditation" },
              { title: "Pricing", link: "/pricing", desc: "View our plans" },
              { title: "About", link: "/about", desc: "Our story" }
            ].map((item, i) => (
              <Link key={i} to={item.link} className="p-4 rounded-xl hover:bg-white hover:shadow-md transition-all group">
                <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 flex items-center">
                  {item.title} <ArrowLeft className="ml-2 w-4 h-4 rotate-180" />
                </h4>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </Link>
            ))}
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default NotFound;