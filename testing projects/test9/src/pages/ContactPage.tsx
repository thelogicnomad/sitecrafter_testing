import React from 'react';
import { motion } from 'framer-motion';
import { ClickSpark } from '@/components/ui/ClickSpark';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { MapPin, Phone, Mail, Instagram, Facebook, Clock } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-stone-50 pt-24">
      <ClickSpark>
        <div className="container mx-auto px-4 pb-24">
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-serif text-[#2D231E] mb-4"
            >
              Get in Touch
            </motion.h1>
            <p className="text-stone-600 max-w-xl mx-auto">
              Whether you're planning a grand wedding or simply want to inquire 
              about our daily specials, we're here to assist you.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="p-8 border-none shadow-lg">
                <h3 className="text-xl font-bold mb-6 text-[#2D231E]">Boutique Details</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#911B44]/10 flex items-center justify-center shrink-0">
                      <MapPin className="text-[#911B44]" size={20} />
                    </div>
                    <div>
                      <p className="font-bold">The Flagship</p>
                      <p className="text-stone-500 text-sm">124 Avenue des Champs-Élysées, Paris, France</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#911B44]/10 flex items-center justify-center shrink-0">
                      <Phone className="text-[#911B44]" size={20} />
                    </div>
                    <div>
                      <p className="font-bold">Phone</p>
                      <p className="text-stone-500 text-sm">+33 1 23 45 67 89</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#911B44]/10 flex items-center justify-center shrink-0">
                      <Mail className="text-[#911B44]" size={20} />
                    </div>
                    <div>
                      <p className="font-bold">Email</p>
                      <p className="text-stone-500 text-sm">concierge@gildedpatisserie.com</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-8 border-none shadow-lg bg-[#2D231E] text-white">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Clock size={20} /> Opening Hours
                </h3>
                <div className="space-y-3 text-stone-300">
                  <div className="flex justify-between">
                    <span>Mon - Fri</span>
                    <span>08:00 - 19:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>09:00 - 20:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>10:00 - 16:00</span>
                  </div>
                </div>
              </Card>

              <div className="flex justify-center gap-4">
                <Button variant="outline" className="rounded-full w-12 h-12 p-0 border-stone-200">
                  <Instagram size={20} />
                </Button>
                <Button variant="outline" className="rounded-full w-12 h-12 p-0 border-stone-200">
                  <Facebook size={20} />
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-10 border-none shadow-xl">
                <h3 className="text-2xl font-serif mb-8 text-[#2D231E]">Send a Message</h3>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-stone-700">Full Name</label>
                      <Input placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-stone-700">Email Address</label>
                      <Input type="email" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-stone-700">Subject</label>
                    <select className="w-full p-3 rounded-lg border bg-stone-50">
                      <option>General Inquiry</option>
                      <option>Wedding Cake Consultation</option>
                      <option>Corporate Events</option>
                      <option>Feedback</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-stone-700">Message</label>
                    <textarea 
                      className="w-full p-3 rounded-lg border bg-stone-50 h-40" 
                      placeholder="How can we help you today?"
                    />
                  </div>
                  <Button className="w-full bg-[#911B44] text-white h-12 text-lg">
                    Send Message
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>

        {/* Map Placeholder Section */}
        <section className="h-[400px] w-full bg-stone-200 relative overflow-hidden">
          <div className="absolute inset-0 grayscale contrast-125 opacity-60">
            <img 
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=2000" 
              alt="Map" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="bg-white p-6 rounded-2xl shadow-2xl text-center">
                <MapPin className="text-[#911B44] mx-auto mb-2" size={32} />
                <h4 className="font-bold">Find Us in Paris</h4>
                <p className="text-sm text-stone-500">124 Avenue des Champs-Élysées</p>
                <Button variant="link" className="text-[#911B44] mt-2">Get Directions</Button>
             </div>
          </div>
        </section>
      </ClickSpark>
    </div>
  );
};

export default ContactPage;