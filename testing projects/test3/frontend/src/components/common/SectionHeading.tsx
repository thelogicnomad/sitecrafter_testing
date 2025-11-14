import React from 'react';
    import { motion } from 'framer-motion';

    interface SectionHeadingProps {
      title: string;
      subtitle?: string;
      className?: string;
    }

    const SectionHeading: React.FC<SectionHeadingProps> = ({ title, subtitle, className }) => {
      return (
        <motion.div 
            className={`text-center mb-12 md:mb-16 ${className}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
        >
          {subtitle && (
            <p className="text-au-accent font-semibold mb-2 text-lg">{subtitle}</p>
          )}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-au-primary">{title}</h2>
        </motion.div>
      );
    };

    export default SectionHeading;