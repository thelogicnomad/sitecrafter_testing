import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Avatar } from '../ui/Avatar';

// cn utility - ALWAYS define inline
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Product Designer",
    content: "Mindful Breaks has completely changed my workday. The 5-minute sessions are perfect for resetting between meetings."
  },
  {
    id: 2,
    name: "David Chen",
    role: "Software Engineer",
    content: "The breathing visualizer is my go-to when I'm feeling overwhelmed by complex bugs. It's simple but incredibly effective."
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Marketing Director",
    content: "I've tried many meditation apps, but this one feels the most approachable. No fluff, just pure mindfulness."
  }
];

export const TestimonialCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[index] ?? testimonials[0];

  return (
    <div className="relative max-w-4xl mx-auto px-12 py-16">
      <div className="absolute top-0 left-0 text-[#A8D8EA]/20">
        <Quote className="w-32 h-32 fill-current" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 text-center"
        >
          <div className="flex justify-center mb-8">
            <Avatar name={current?.name} size="lg" className="ring-4 ring-white shadow-xl" />
          </div>
          <blockquote className="text-2xl md:text-3xl font-medium text-slate-800 leading-snug mb-8">
            "{current?.content}"
          </blockquote>
          <div>
            <cite className="not-italic font-bold text-slate-900 text-lg block">{current?.name}</cite>
            <span className="text-slate-500 text-sm uppercase tracking-widest">{current?.role}</span>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center gap-4 mt-12">
        <button 
          onClick={prev}
          className="p-3 rounded-full bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all text-slate-400 hover:text-[#7B68BE]"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
          {(testimonials ?? []).map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                i === index ? "w-8 bg-[#7B68BE]" : "bg-slate-200"
              )}
            />
          ))}
        </div>
        <button 
          onClick={next}
          className="p-3 rounded-full bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all text-slate-400 hover:text-[#7B68BE]"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};