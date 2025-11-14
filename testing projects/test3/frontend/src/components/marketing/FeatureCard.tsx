import React from 'react';
    import { motion } from 'framer-motion';
    import { ArrowRight } from 'lucide-react';

    interface FeatureCardProps {
      icon: React.ReactElement;
      title: string;
      description: string;
    }

    const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
      return (
        <motion.div 
          className="bg-au-surface p-8 rounded-lg shadow-lg text-center h-full flex flex-col"
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-au-accent/20 text-au-accent">
            {React.cloneElement(icon, { size: 32 })}
          </div>
          <h3 className="mt-6 text-xl font-bold text-au-primary">{title}</h3>
          <p className="mt-2 text-au-text-muted flex-grow">{description}</p>
          <div className="mt-6">
            <a href="#" className="inline-flex items-center text-au-accent font-semibold">
              Learn more <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </motion.div>
      );
    };

    export default FeatureCard;