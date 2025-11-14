import React from 'react';
    import { motion } from 'framer-motion';

    interface AnimatedListProps {
      items: string[];
    }
    
    const AnimatedList: React.FC<AnimatedListProps> = ({ items }) => {
      const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      };
    
      const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
        },
      };
    
      return (
        <motion.ul
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {items.map((item, index) => (
            <motion.li
              key={index}
              className="p-4 bg-au-surface rounded-lg shadow-sm"
              variants={itemVariants}
            >
              <p className="font-medium text-au-primary">{item}</p>
            </motion.li>
          ))}
        </motion.ul>
      );
    };
    
    export default AnimatedList;