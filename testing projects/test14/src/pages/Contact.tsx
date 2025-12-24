import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <section className="pt-32 pb-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Left: Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-4xl md:text-7xl font-bold text-white mb-8">Let's Create <br /> <span className="text-cyan-400">Magic.</span></h1>
              <p className="text-slate-400 text-xl mb-12 max-w-md">
                Have a project in mind? We'd love to hear about it. Reach out and 
                let's build something exceptional together.
              </p>

              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-cyan-400 transition-colors">
                    <Mail className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <span className="text-slate-500 text-sm block">Email Us</span>
                    <span className="text-white text-lg font-bold">hello@pixelstudio.agency</span>
                  </div>
                </div>

                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-indigo-400 transition-colors">
                    <Phone className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <span className="text-slate-500 text-sm block">Call Us</span>
                    <span className="text-white text-lg font-bold">+1 (555) 000-MOTION</span>
                  </div>
                </div>

                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-rose-400 transition-colors">
                    <MapPin className="w-6 h-6 text-rose-400" />
                  </div>
                  <div>
                    <span className="text-slate-500 text-sm block">Visit Us</span>
                    <span className="text-white text-lg font-bold">Creative District, Los Angeles, CA</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-indigo-600/10 blur-[100px] rounded-full" />
              <div className="relative bg-slate-900/50 border border-slate-800 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-slate-400 text-sm font-bold uppercase tracking-widest">Full Name</label>
                    <Input 
                      placeholder="John Doe" 
                      className="bg-slate-950/50 border-slate-800 text-white h-14"
                      value={formState.name}
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-slate-400 text-sm font-bold uppercase tracking-widest">Email Address</label>
                    <Input 
                      type="email"
                      placeholder="john@example.com" 
                      className="bg-slate-950/50 border-slate-800 text-white h-14"
                      value={formState.email}
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-slate-400 text-sm font-bold uppercase tracking-widest">Project Brief</label>
                    <textarea 
                      placeholder="Tell us about your project..."
                      className="w-full bg-slate-950/50 border border-slate-800 rounded-md p-4 text-white min-h-[150px] focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                      value={formState.message}
                      onChange={(e) => setFormState({...formState, message: e.target.value})}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className={cn(
                      "w-full h-16 text-lg font-bold rounded-xl transition-all",
                      isSubmitted ? "bg-emerald-500 hover:bg-emerald-600" : "bg-indigo-600 hover:bg-indigo-700"
                    )}
                  >
                    {isSubmitted ? (
                      <span className="flex items-center">Sent Successfully! <Send className="ml-2 w-5 h-5" /></span>
                    ) : (
                      <span className="flex items-center">Send Message <Send className="ml-2 w-5 h-5" /></span>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <Section className="bg-slate-900">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: "What is your typical project timeline?", a: "Most motion projects take 4-8 weeks depending on complexity." },
                { q: "Do you offer sound design services?", a: "Yes, we provide full sound production and audio branding." },
                { q: "Which industries do you specialize in?", a: "We work across tech, luxury fashion, automotive, and gaming." },
              ].map((faq, i) => (
                <div key={i} className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
                  <h4 className="text-white font-bold mb-2 flex items-center gap-3">
                    <MessageSquare className="w-4 h-4 text-cyan-400" />
                    {faq.q}
                  </h4>
                  <p className="text-slate-400">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default Contact;