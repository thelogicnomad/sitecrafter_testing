import React from 'react';
    import { motion } from 'framer-motion';
    import { useInView } from 'react-intersection-observer';
    import { ScrollStackItem } from '@/components/ui/ScrollStackItem';
    import { Card } from '@/components/ui/Card';
    import { ProfileCard } from '@/components/ui/ProfileCard';
    import { ShinyText } from '@/components/ui/ShinyText';
    import { getSeededImageUrl } from '@/lib/utils';
    import { ChefHat, HeartHandshake, Gem, Leaf } from 'lucide-react'; // Icons for values

    // Mock Team Data
    const teamMembers = [
      {
        name: 'Eleanor Vance',
        title: 'Founder & Head Pâtissier',
        handle: '@eleanor_bakes',
        status: 'online' as const, // Explicitly type status
        contactText: 'eleanor@artisanbake.com',
        avatarUrl: getSeededImageUrl('eleanor-vance', 200, 200),
      },
      {
        name: 'Marcus Thorne',
        title: 'Lead Product Designer',
        handle: '@marcus_designs',
        status: 'online' as const,
        contactText: 'marcus@artisanbake.com',
        avatarUrl: getSeededImageUrl('marcus-thorne', 200, 200),
      },
      {
        name: 'Sophia Chen',
        title: 'Artisan Decorator',
        handle: '@sophia_decor',
        status: 'online' as const,
        contactText: 'sophia@artisanbake.com',
        avatarUrl: getSeededImageUrl('sophia-chen', 200, 200),
      },
      {
        name: 'David Kim',
        title: 'Operations Manager',
        handle: '@david_ops',
        status: 'online' as const,
        contactText: 'david@artisanbake.com',
        avatarUrl: getSeededImageUrl('david-kim', 200, 200),
      },
    ];

    const AboutPage: React.FC = () => {
      const pageVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
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
              <ShinyText text="Our Story & Passion" className="font-display" />
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Discover the heart behind ArtisanBake Collective – a journey of culinary artistry, dedication, and a commitment to unparalleled elegance.
            </p>
          </motion.div>

          {/* Mission Section */}
          <ScrollStackItem>
            <Card className="p-8 md:p-12 mb-20 bg-white shadow-lifted">
              <h2 className="text-4xl font-bold text-primary mb-6 text-center">Our Mission</h2>
              <p className="text-lg text-gray-800 leading-relaxed text-center max-w-4xl mx-auto">
                At ArtisanBake Collective, our mission is to transform the art of baking into an immersive, luxurious experience. We meticulously craft each cake and pastry, blending traditional techniques with innovative design, to create edible masterpieces that celebrate life's most precious moments. We are dedicated to using only the finest, ethically sourced ingredients, ensuring every bite is a testament to quality, flavor, and elegance. Our commitment extends beyond the kitchen, fostering a community where creativity flourishes, and every customer feels cherished.
              </p>
            </Card>
          </ScrollStackItem>

          {/* Team Section */}
          <ScrollStackItem>
            <div className="mb-20">
              <h2 className="text-4xl font-bold text-primary mb-10 text-center">Meet Our Artisans</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                  >
                    <ProfileCard
                      name={member.name}
                      title={member.title}
                      handle={member.handle}
                      status={member.status}
                      contactText={member.contactText}
                      avatarUrl={member.avatarUrl}
                      showUserInfo={true}
                      enableTilt={true}
                      enableMobileTilt={false}
                      onContactClick={() => alert(`Contacting ${member.name}`)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollStackItem>

          {/* Values Section */}
          <ScrollStackItem>
            <div className="mb-16">
              <h2 className="text-4xl font-bold text-primary mb-10 text-center">Our Core Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="p-6 bg-white shadow-lifted text-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex justify-center mb-4 text-primary"
                  >
                    <ChefHat size={48} strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="text-2xl font-semibold text-primary mb-3">Craftsmanship</h3>
                  <p className="text-gray-700">
                    Every creation is a testament to meticulous attention to detail, traditional skills, and innovative artistry.
                  </p>
                </Card>
                <Card className="p-6 bg-white shadow-lifted text-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex justify-center mb-4 text-secondary"
                  >
                    <Gem size={48} strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="text-2xl font-semibold text-primary mb-3">Excellence</h3>
                  <p className="text-gray-700">
                    We source the finest ingredients and uphold the highest standards of quality, from concept to delivery.
                  </p>
                </Card>
                <Card className="p-6 bg-white shadow-lifted text-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex justify-center mb-4 text-primary"
                  >
                    <HeartHandshake size={48} strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="text-2xl font-semibold text-primary mb-3">Community</h3>
                  <p className="text-gray-700">
                    Building lasting relationships with our customers and partners, rooted in trust and shared passion.
                  </p>
                </Card>
              </div>
            </div>
          </ScrollStackItem>

          <ScrollStackItem>
            <Card className="p-8 md:p-12 bg-secondary/20 shadow-inner text-center">
              <h2 className="text-3xl font-bold text-primary mb-4">Join Our Collective</h2>
              <p className="text-lg text-gray-800 mb-6 max-w-3xl mx-auto">
                Be part of our journey as we continue to craft moments of joy and elegance. Follow us on social media or subscribe to our newsletter for the latest delights.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-white font-semibold px-8 py-3 rounded-md shadow-lifted hover:shadow-lifted-hover transition-all duration-300"
                onClick={() => alert('Redirecting to newsletter signup!')}
              >
                Subscribe Now
              </motion.button>
            </Card>
          </ScrollStackItem>
        </motion.div>
      );
    };

    export default AboutPage;