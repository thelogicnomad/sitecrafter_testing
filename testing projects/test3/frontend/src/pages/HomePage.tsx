import React from 'react';
    import { BookOpen, Target, Globe } from 'lucide-react';
    import { motion } from 'framer-motion';
    import { Link } from 'react-router-dom';

    import HeroSection from '@/components/marketing/HeroSection';
    import FeatureCard from '@/components/marketing/FeatureCard';
    import SectionHeading from '@/components/common/SectionHeading';
    import AnimatedList from '@/components/marketing/AnimatedList';
    import Button from '@/components/common/Button';
    import { usePageTitle } from '@/hooks/usePageTitle';
    import { MOCK_NEWS } from '@/api/mockData';

    const HomePage: React.FC = () => {
      usePageTitle('Home');
      const features = [
        {
          icon: <BookOpen />,
          title: 'Undergraduate Studies',
          description: 'Dive into over 50 majors designed for the modern world, fostering critical thinking and innovation.',
        },
        {
          icon: <Target />,
          title: 'Research & Innovation',
          description: 'Join faculty pushing the boundaries in AI, Sustainability, and the Humanities.',
        },
        {
          icon: <Globe />,
          title: 'Global Opportunities',
          description: 'Study abroad in over 12 countries, gaining a worldwide perspective and invaluable experience.',
        },
      ];

      return (
        <div>
          <HeroSection />

          <section className="py-20 bg-au-bg-light">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <SectionHeading title="Your Journey Starts Here" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <FeatureCard key={index} {...feature} />
                ))}
              </div>
            </div>
          </section>

          <section className="py-20">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                >
                  <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800" alt="Students collaborating" className="rounded-lg shadow-xl" />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                >
                  <SectionHeading title="The Future of Computer Science" className="text-left mb-6" />
                  <p className="text-lg text-au-text-muted mb-6">
                    The AU School of Engineering presents the new Computational Ethics track, integrating philosophy and advanced algorithms. Limited enrollment for Fall {new Date().getFullYear() + 1}.
                  </p>
                  <Link to="/academics/programs/cse-4yr">
                    <Button variant="secondary" size="large">View CS Curriculum</Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="py-20 bg-au-bg-light">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <SectionHeading title="Latest University News" />
              <div className="max-w-2xl mx-auto">
                <AnimatedList items={MOCK_NEWS} />
              </div>
            </div>
          </section>
        </div>
      );
    };

    export default HomePage;