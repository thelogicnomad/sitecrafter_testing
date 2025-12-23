import React from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-indigo-900 py-20 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-800/50 skew-x-12 translate-x-1/4" />
        <Container className="relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Get in Touch</h1>
            <p className="text-xl text-indigo-200">
              Have questions about admissions, courses, or campus life? We're here to help you navigate your academic journey.
            </p>
          </div>
        </Container>
      </section>

      <Section className="-mt-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <Card className="p-8 border-none shadow-xl bg-white hover:translate-y-[-4px] transition-transform">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
              <Phone className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Call Us</h3>
            <p className="text-slate-600 mb-4">Available Mon-Sat, 9am - 5pm</p>
            <div className="text-indigo-600 font-bold text-lg">+91 (080) 2345-6789</div>
            <div className="text-indigo-600 font-bold text-lg">+91 98765 43210</div>
          </Card>

          <Card className="p-8 border-none shadow-xl bg-white hover:translate-y-[-4px] transition-transform">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
              <Mail className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Email Us</h3>
            <p className="text-slate-600 mb-4">We usually respond within 24 hours</p>
            <div className="text-indigo-600 font-bold text-lg">info@kenexus.edu.in</div>
            <div className="text-indigo-600 font-bold text-lg">admissions@kenexus.edu.in</div>
          </Card>

          <Card className="p-8 border-none shadow-xl bg-white hover:translate-y-[-4px] transition-transform">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
              <MapPin className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Visit Us</h3>
            <p className="text-slate-600 mb-4">Main Administrative Block</p>
            <div className="text-slate-900 font-medium">
              Education City, Vidhana Soudha Road,<br />
              Bengaluru, Karnataka - 560001
            </div>
          </Card>
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-bold mb-4">
              <MessageSquare className="w-5 h-5" />
              <span>SEND A MESSAGE</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">How can we help you?</h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Full Name</label>
                  <Input placeholder="John Doe" className="h-12" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Email Address</label>
                  <Input placeholder="john@example.com" type="email" className="h-12" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Subject</label>
                <Input placeholder="Admission Query" className="h-12" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Message</label>
                <textarea 
                  className="w-full min-h-[150px] p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>
              <Button size="lg" className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-lg font-bold">
                Send Message <Send className="ml-2 w-5 h-5" />
              </Button>
            </form>
          </div>

          {/* Map / Image */}
          <div className="flex flex-col h-full">
            <div className="bg-slate-100 rounded-3xl overflow-hidden flex-grow relative min-h-[400px]">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop" 
                alt="Campus Map" 
                className="w-full h-full object-cover grayscale opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <Card className="p-6 max-w-sm shadow-2xl bg-white/90 backdrop-blur-md border-none">
                  <h4 className="font-bold text-slate-900 mb-2">Bengaluru Main Campus</h4>
                  <p className="text-sm text-slate-600 mb-4">
                    Our central hub for administration and technical programs located in the heart of the city.
                  </p>
                  <Button variant="outline" size="sm" className="w-full border-indigo-600 text-indigo-600">
                    Get Directions
                  </Button>
                </Card>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <Clock className="w-6 h-6 text-indigo-600 mb-3" />
                <div className="font-bold text-slate-900">Working Hours</div>
                <div className="text-sm text-slate-600">Mon-Fri: 9am - 6pm</div>
                <div className="text-sm text-slate-600">Sat: 9am - 1pm</div>
              </div>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <MapPin className="w-6 h-6 text-indigo-600 mb-3" />
                <div className="font-bold text-slate-900">Regional Centers</div>
                <div className="text-sm text-slate-600">Mysuru, Mangaluru</div>
                <div className="text-sm text-slate-600">Hubballi, Belagavi</div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default ContactPage;