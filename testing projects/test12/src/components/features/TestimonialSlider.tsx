import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

// Simple cn utility function
const cn = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(' ');

const TESTIMONIALS = [
  {
    id: 1,
    name: "Eleanor Sterling",
    role: "Food Critic",
    content: "The Wagyu Ribeye was transformative. Savory Bistro has redefined fine dining in the city with its impeccable service and bold flavors.",
    rating: 5,
    image: "https://picsum.photos/100/100?random=1"
  },
  {
    id: 2,
    name: "Marcus Thorne",
    role: "Regular Guest",
    content: "The atmosphere is unmatched. It's my go-to spot for business dinners and anniversaries. The Truffle Burrata is a must-try!",
    rating: 5,
    image: "https://picsum.photos/100/100?random=2"
  },
  {
    id: 3,
    name: "Sophia Chen",
    role: "Lifestyle Blogger",
    content: "Every dish is a work of art. Not only does the food taste incredible, but the presentation is absolutely social-media worthy.",
    rating: 5,
    image: "https://picsum.photos/100/100?random=3"
  }
];

export const TestimonialSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative max-w-4xl mx-auto px-4 py-12">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10">
        <Quote size={120} className="text-amber-600" />
      </div>

      <div className="relative min-h-[300px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(TESTIMONIALS[index].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-600 text-amber-600" />
              ))}
            </div>

            <p className="text-xl md:text-3xl font-medium text-zinc-900 leading-relaxed italic mb-8">
              "{TESTIMONIALS[index].content}"
            </p>

            <div className="flex flex-col items-center">
              <img
                src={TESTIMONIALS[index].image}
                alt={TESTIMONIALS[index].name}
                className="w-16 h-16 rounded-full object-cover border-2 border-amber-600 mb-4"
              />
              <h4 className="font-bold text-zinc-900">{TESTIMONIALS[index].name}</h4>
              <p className="text-sm text-zinc-500 uppercase tracking-widest">{TESTIMONIALS[index].role}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-2 mt-8">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index === i ? "w-8 bg-amber-600" : "bg-zinc-300"
            )}
          />
        ))}
      </div>
    </div>
  );
};