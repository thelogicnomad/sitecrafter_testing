import React from 'react';
    import { motion } from 'framer-motion';
    import { Link } from 'react-router-dom';
    import Button from '../common/Button';
    
    import SplitText from '../common/SplitText';

    const HeroSection: React.FC = () => {
      const stats = [
        { value: '15:1', label: 'Student/Faculty Ratio' },
        { value: '98%', label: 'Placement Rate' },
        { value: '50+', label: 'Majors' },
      ];

      return (
        <section className="relative h-screen min-h-[700px] flex items-center justify-center text-au-surface overflow-hidden">
          
          <div className="absolute inset-0 bg-au-primary opacity-50"></div>
          
          <div className="relative z-10 text-center container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <SplitText className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
                Where Tradition Meets Tomorrow.
              </SplitText>
            </motion.div>
            
            <motion.p 
              className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-au-surface/80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Aethelred University fosters intellectual curiosity, groundbreaking research, and a commitment to global citizenship since 1888.
            </motion.p>

            <motion.div 
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link to="/academics">
                <Button variant="secondary" size="large">Explore Programs</Button>
              </Link>
              <Link to="/admissions">
                <Button variant="outline" size="large" className="border-au-surface text-au-surface hover:bg-au-surface/10">Request Info</Button>
              </Link>
            </motion.div>

            <motion.div 
              className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                    transition: {
                        staggerChildren: 0.2,
                        delayChildren: 0.8,
                    },
                },
              }}
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="text-center"
                >
                  <p className="text-4xl font-bold">{stat.value}</p>
                  <p className="text-sm text-au-surface/70">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      );
    };

    export default HeroSection;