import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { Calendar, Users, Clock, Utensils } from 'lucide-react';

export const ReservationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-12 bg-zinc-50 rounded-xl border-2 border-dashed border-[#C5A059]/30"
      >
        <div className="w-16 h-16 bg-[#C5A059] rounded-full flex items-center justify-center mx-auto mb-6">
          <Utensils className="text-white w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-zinc-900 mb-2">Table Reserved!</h3>
        <p className="text-zinc-600 mb-6">A confirmation email has been sent to your inbox. We look forward to serving you.</p>
        <Button onClick={() => setSubmitted(false)} variant="outline">Make another booking</Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 md:p-10 rounded-xl shadow-2xl border border-zinc-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500">Full Name</label>
          <div className="relative">
            <Input placeholder="John Doe" required className="pl-4" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500">Email Address</label>
          <Input type="email" placeholder="john@example.com" required />
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#C5A059]" /> Date
          </label>
          <Input type="date" required />
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#C5A059]" /> Time
          </label>
          <Input type="time" required />
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
            <Users className="w-4 h-4 text-[#C5A059]" /> Party Size
          </label>
          <select className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#C5A059]">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
              <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
            ))}
            <option value="9+">9+ (Contact us)</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500">Special Requests</label>
          <Input placeholder="Allergies, birthday, etc." />
        </div>
      </div>
      
      <Button 
        type="submit" 
        variant="secondary" 
        className="w-full" 
        isLoading={isSubmitting}
      >
        Confirm Reservation
      </Button>
      
      <p className="text-center text-xs text-zinc-400">
        By clicking "Confirm Reservation", you agree to our booking policy.
      </p>
    </form>
  );
};