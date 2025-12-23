import React from 'react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Mail, Phone, MapPin, MessageSquare, Send } from 'lucide-react';

const ContactPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
  };

  return (
    <div className="flex flex-col w-full bg-slate-50">
      {/* Hero */}
      <section className="py-20 bg-slate-900 text-white">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Let's Talk <span className="text-accent">Tabla</span></h1>
            <p className="text-xl text-slate-300">
              Have questions about courses, technical issues, or institutional partnerships? 
              Our team of rhythmic experts is here to help.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Form & Info */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-8">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-slate-100 rounded-lg text-slate-700">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Email us</p>
                      <p className="text-slate-600">support@tabla-academy.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-slate-100 rounded-lg text-slate-700">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Call us</p>
                      <p className="text-slate-600">+1 (555) 000-0000</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-slate-100 rounded-lg text-slate-700">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Visit us</p>
                      <p className="text-slate-600">123 Rhythm Lane, Musical City, 56789</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 p-8 rounded-2xl border border-amber-100">
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare className="w-6 h-6 text-amber-600" />
                  <h4 className="font-bold text-slate-900">Live Chat</h4>
                </div>
                <p className="text-slate-700 mb-4">
                  Need immediate assistance? Our live chat is available Monday to Friday, 9am - 5pm EST.
                </p>
                <Button variant="outline" className="w-full border-amber-200 hover:bg-amber-100">Start Chatting</Button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="first-name" className="text-sm font-medium text-slate-700">First Name</label>
                      <Input id="first-name" placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="last-name" className="text-sm font-medium text-slate-700">Last Name</label>
                      <Input id="last-name" placeholder="Doe" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-slate-700">Email Address</label>
                    <Input id="email" type="email" placeholder="john@example.com" required />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-slate-700">Subject</label>
                    <Input id="subject" placeholder="How can we help?" required />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-slate-700">Message</label>
                    <textarea 
                      id="message" 
                      rows={6} 
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all resize-none"
                      placeholder="Tell us more about your inquiry..."
                      required
                    ></textarea>
                  </div>

                  <Button type="submit" className="w-full md:w-auto px-8 py-6 text-lg bg-slate-900 hover:bg-slate-800 text-white">
                    Send Message
                    <Send className="ml-2 w-5 h-5" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default ContactPage;