import React from 'react';
    import { motion } from 'framer-motion';
    import { Mail, Phone, MapPin, Clock } from 'lucide-react';
    import { ContactForm } from '@/components/features/ContactForm';
    import { Card } from '@/components/ui/Card';
    import { ShinyText } from '@/components/ui/ShinyText';
    import { Button } from '@/components/ui/Button';

    const ContactPage: React.FC = () => {
      const handleFormSubmit = async (data: { name: string; email: string; subject: string; message: string }) => {
        console.log('Contact Form Submitted:', data);
        // Simulate API call
        return new Promise<void>((resolve) => setTimeout(() => {
          console.log("Simulated API call complete for contact form.");
          resolve();
        }, 1000));
      };

      const pageVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
      };

      const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
      };

      return (
        <motion.div
          className="container mx-auto px-4 py-16 max-w-7xl"
          initial="hidden"
          animate="visible"
          variants={pageVariants}
        >
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl font-extrabold text-primary mb-4 relative z-10">
              <ShinyText text="Get In Touch" className="font-display" />
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              We'd love to hear from you! Whether you have a question about our products, a custom order request, or just want to say hello, please reach out.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form Section */}
            <motion.div variants={itemVariants}>
              <Card className="p-8 md:p-10 bg-white shadow-lifted">
                <h2 className="text-3xl font-bold text-primary mb-6">Send Us a Message</h2>
                <ContactForm onSubmit={handleFormSubmit} />
              </Card>
            </motion.div>

            {/* Contact Info Panel */}
            <motion.div variants={itemVariants}>
              <Card className="p-8 md:p-10 bg-secondary/10 shadow-lifted flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-primary mb-6">Our Details</h2>
                  <div className="space-y-6 text-gray-800">
                    <div className="flex items-center">
                      <Mail className="text-primary mr-4 flex-shrink-0" size={24} />
                      <div>
                        <h3 className="font-semibold text-lg">Email Us</h3>
                        <a href="mailto:info@artisanbake.com" className="text-gray-700 hover:text-primary transition-colors">info@artisanbake.com</a>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Phone className="text-primary mr-4 flex-shrink-0" size={24} />
                      <div>
                        <h3 className="font-semibold text-lg">Call Us</h3>
                        <a href="tel:+1234567890" className="text-gray-700 hover:text-primary transition-colors">+1 (234) 567-890</a>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="text-primary mr-4 flex-shrink-0" size={24} />
                      <div>
                        <h3 className="font-semibold text-lg">Our Studio</h3>
                        <p className="text-gray-700">
                          123 Elegant Lane, <br />
                          Sweetville, CA 90210, USA
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="text-primary mr-4 flex-shrink-0" size={24} />
                      <div>
                        <h3 className="font-semibold text-lg">Operating Hours</h3>
                        <p className="text-gray-700">
                          Mon - Fri: 9:00 AM - 6:00 PM <br />
                          Sat: 10:00 AM - 4:00 PM <br />
                          Sun: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-10">
                  <Button variant="primary" size="lg" className="w-full">
                    Visit Our FAQ
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Map Placeholder */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Card className="p-4 bg-white shadow-lifted">
              <h2 className="sr-only">Our Location on Map</h2>
              <div className="w-full h-96 bg-gray-200 rounded-md overflow-hidden relative">
                <img
                  src="https://picsum.photos/seed/map-location/1200/500"
                  alt="Map showing ArtisanBake Collective location"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-center justify-center text-white text-2xl font-semibold">
                  Map Placeholder - Come Visit Us!
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      );
    };

    export default ContactPage;