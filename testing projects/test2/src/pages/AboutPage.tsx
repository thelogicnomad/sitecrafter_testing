import PageTransition from '@/components/sections/PageTransition';
    import DomeGallery from '@/components/ui/DomeGallery';
    import { teamMembers } from '@/utils/data';
    import { motion } from 'framer-motion';

    const galleryImages = [
      "https://images.unsplash.com/photo-1568254183919-78a4f43a2b53?q=80&w=800",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800",
      "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?q=80&w=800",
      "https://images.unsplash.com/photo-1579306240294-3d65b6c3c54c?q=80&w=800"
    ];

    const AboutPage = () => {
      return (
        <PageTransition>
          <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            {/* Our Story Section */}
            <section className="text-center">
              <h1 className="font-heading text-4xl font-bold text-secondary md:text-5xl">Our Story</h1>
              <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
                Sweet Delights Bakery began with a simple passion: to share the joy of traditional baking. From a small home kitchen to our beloved bakery, our commitment to quality, craftsmanship, and community has been the secret ingredient in everything we create.
              </p>
            </section>

            {/* Dome Gallery Section */}
            <section className="py-16">
              <h2 className="mb-8 text-center font-heading text-3xl font-bold text-secondary">A Glimpse Inside</h2>
              <DomeGallery images={galleryImages} />
            </section>

            {/* Our Team Section */}
            <section className="py-16">
              <h2 className="mb-12 text-center font-heading text-3xl font-bold text-secondary">Meet the Artisans</h2>
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <img src={member.image} alt={member.name} className="mx-auto h-32 w-32 rounded-full object-cover shadow-lg" />
                    <h3 className="mt-4 font-heading text-xl font-semibold text-secondary">{member.name}</h3>
                    <p className="text-sm text-primary">{member.role}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>
        </PageTransition>
      );
    };

    export default AboutPage;