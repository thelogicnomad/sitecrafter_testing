import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

// cn utility - ALWAYS define inline
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

export const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 md:p-12">
      {/* Decorative background gradients */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-[#7B68BE] rounded-full blur-[100px] opacity-20" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-64 h-64 bg-[#A8D8EA] rounded-full blur-[100px] opacity-20" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Get your weekly dose of <span className="text-[#A8D8EA]">calm</span>
        </h2>
        <p className="text-slate-400 text-lg mb-8">
          Join 5,000+ others receiving mindful tips, guided sessions, and exclusive wellness content every Sunday.
        </p>

        {status === 'success' ? (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center py-4 text-[#A8D8EA]"
          >
            <CheckCircle2 className="w-16 h-16 mb-4" />
            <h3 className="text-2xl font-bold text-white">You're on the list!</h3>
            <p className="text-slate-400 mt-2">Check your inbox for a special welcome gift.</p>
            <Button 
              variant="ghost" 
              className="mt-6 text-white hover:bg-white/10"
              onClick={() => setStatus('idle')}
            >
              Sign up another email
            </Button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-slate-500 h-14"
              />
            </div>
            <Button 
              type="submit" 
              isLoading={status === 'loading'}
              size="lg"
              className="h-14 px-10"
              rightIcon={<Send className="w-4 h-4" />}
            >
              Subscribe
            </Button>
          </form>
        )}
        
        <p className="mt-6 text-slate-500 text-xs">
          No spam. Unsubscribe at any time. Your data is safe with us.
        </p>
      </div>
    </div>
  );
};