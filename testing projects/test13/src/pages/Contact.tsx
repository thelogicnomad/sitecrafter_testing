import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { MessageSquare, Mail, MapPin, Send, Phone } from 'lucide-react';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Contact Hero */}
      <section className="bg-slate-900 py-20 text-center">
        <Container>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">How Can We Help?</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Whether you have a question about our app, need technical support, or want to bring mindfulness to your company, we're here to talk.
          </p>
        </Container>
      </section>

      <Section className="-mt-12">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              {[
                { icon: <Mail />, title: "General Inquiries", detail: "hello@mindfulbreaks.com" },
                { icon: <MessageSquare />, title: "Technical Support", detail: "support@mindfulbreaks.com" },
                { icon: <Phone />, title: "Phone", detail: "+1 (555) 123-4567" },
                { icon: <MapPin />, title: "Global HQ", detail: "123 Serenity Way, San Francisco, CA" }
              ].map((item, i) => (
                <Card key={i} className="p-6 border-slate-100 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                    <p className="text-slate-600 text-sm">{item.detail}</p>
                  </div>
                </Card>
              ))}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-8 md:p-12 border-none shadow-2xl">
                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Send className="w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Message Sent!</h2>
                    <p className="text-slate-600 mb-8">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                    <Button onClick={() => setSubmitted(false)} variant="outline">Send Another Message</Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Full Name</label>
                        <Input placeholder="John Doe" required />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Email Address</label>
                        <Input type="email" placeholder="john@example.com" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Subject</label>
                      <Input placeholder="How can we help?" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Message</label>
                      <textarea 
                        className="w-full min-h-[150px] p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                        placeholder="Tell us more about your inquiry..."
                        required
                      ></textarea>
                    </div>
                    <Button type="submit" className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-bold">
                      Send Message
                    </Button>
                  </form>
                )}
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Map Placeholder */}
      <Section className="py-0 h-[400px] bg-slate-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
            <p className="text-indigo-900 font-bold">Interactive Map Component Placeholder</p>
            <p className="text-indigo-600/60 text-sm">San Francisco, CA</p>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Contact;