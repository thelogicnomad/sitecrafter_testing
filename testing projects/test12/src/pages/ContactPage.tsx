import React from 'react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { LocationMap } from '@/components/features/LocationMap';
import { OpeningHours } from '@/components/features/OpeningHours';
import { Phone, Mail, MapPin, MessageSquare } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Contact Header */}
      <section className="py-20 bg-slate-900 text-white text-center">
        <Container>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Get In Touch</h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Whether you have a question about our menu, want to book a private event, or just want to say hello, we'd love to hear from you.
          </p>
        </Container>
      </section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <MessageSquare className="text-[#C5A059]" /> Send a Message
            </h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Full Name</label>
                  <Input placeholder="John Doe" className="h-12" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Email Address</label>
                  <Input type="email" placeholder="john@example.com" className="h-12" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Subject</label>
                <Input placeholder="Private Event Inquiry" className="h-12" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Message</label>
                <textarea 
                  className="w-full min-h-[150px] p-4 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent transition-all"
                  placeholder="How can we help you?"
                />
              </div>
              <Button size="lg" className="w-full bg-slate-900 text-white hover:bg-slate-800 h-14 text-lg">
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Details */}
          <div className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-[#C5A059]" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Call Us</h4>
                  <p className="text-slate-600">+1 (555) 123-4567</p>
                  <p className="text-slate-600">+1 (555) 987-6543</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-[#C5A059]" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Email Us</h4>
                  <p className="text-slate-600">hello@savorybistro.com</p>
                  <p className="text-slate-600">events@savorybistro.com</p>
                </div>
              </div>
              <div className="flex gap-4 sm:col-span-2">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-[#C5A059]" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Our Location</h4>
                  <p className="text-slate-600">123 Culinary Avenue, Downtown District</p>
                  <p className="text-slate-600">Foodie City, FC 54321</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
              <OpeningHours />
            </div>
          </div>
        </div>
      </Section>

      {/* Map Section */}
      <div className="h-[450px] w-full relative">
        <LocationMap />
      </div>
    </div>
  );
};

export default ContactPage;