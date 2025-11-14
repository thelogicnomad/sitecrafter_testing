import React from 'react';
    import SectionHeading from '@/components/common/SectionHeading';
    import ProfileCard from '@/components/common/ProfileCard';
    import { MOCK_LEADERSHIP } from '@/api/mockData';
    import { usePageTitle } from '@/hooks/usePageTitle';
    import { motion } from 'framer-motion';

    const AboutPage: React.FC = () => {
        usePageTitle('About AU');
      return (
        <div className="pt-20">
          <header className="bg-au-primary text-au-surface py-24 text-center">
            <h1 className="text-4xl md:text-6xl font-bold">A Legacy of Principled Inquiry.</h1>
            <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-au-surface/80">
              Since its founding in 1888, Aethelred has upheld the values of critical thinking, integrity, and service.
            </p>
          </header>

          <section className="py-20">
            <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
                <motion.blockquote 
                    className="text-2xl md:text-3xl font-serif italic text-au-primary relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="absolute -top-4 -left-8 text-8xl text-au-accent/20 font-serif">&ldquo;</span>
                    To educate minds capable not only of understanding the world as it is, but imagining the world as it ought to be.
                    <span className="absolute -bottom-8 -right-4 text-8xl text-au-accent/20 font-serif">&rdquo;</span>
                </motion.blockquote>
                <p className="mt-6 text-au-text-muted">&mdash; Founding Charter, 1888</p>
            </div>
          </section>

          <section className="py-20 bg-au-bg-light">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeading title="The President's Cabinet" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {MOCK_LEADERSHIP.map(leader => (
                        <ProfileCard 
                            key={leader.id} 
                            name={leader.name} 
                            title={leader.title} 
                            avatarUrl={leader.imageUrl} 
                        />
                    ))}
                </div>
            </div>
          </section>
        </div>
      );
    };

    export default AboutPage;