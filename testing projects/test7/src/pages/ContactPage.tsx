import ContactForm from '@/components/forms/ContactForm';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactPage = () => {
  const contactDetails = [
    { icon: Phone, text: '(555) 123-4567', href: 'tel:5551234567' },
    { icon: Mail, text: 'contact@artisanbake.co', href: 'mailto:contact@artisanbake.co' },
    { icon: MapPin, text: '123 Pastry Lane, Bakeville, USA', href: '#' },
  ];
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary">Get In Touch</h1>
          <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">
            Have a question or a custom order request? We'd love to hear from you.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-lg shadow-lg">
          <div className="order-2 lg:order-1">
            <h2 className="text-2xl font-bold font-display text-primary mb-6">Send us a message</h2>
            <ContactForm />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-2xl font-bold font-display text-primary mb-6">Our Details</h2>
            <div className="space-y-6">
              {contactDetails.map((detail, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="p-3 bg-accent/20 rounded-full text-accent">
                    <detail.icon size={24} />
                  </div>
                  <div>
                    <a href={detail.href} className="text-lg font-medium hover:text-accent transition-colors">{detail.text}</a>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <img 
                src="https://images.unsplash.com/photo-1563453392212-9a4a75c15f33?q=80&w=800&auto=format&fit=crop" 
                alt="Map to ArtisanBake Co."
                className="rounded-lg aspect-video object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;