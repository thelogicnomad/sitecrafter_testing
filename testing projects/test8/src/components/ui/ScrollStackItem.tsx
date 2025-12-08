import React, { useRef } from 'react';
    import { motion, useInView } from 'framer-motion';
    import { cn } from '@/lib/utils';

    interface ScrollStackItemProps {
      children: React.ReactNode;
      delay?: number; // Stagger delay for animation
      className?: string;
    }

    const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children, delay = 0, className }) => {
      const ref = useRef<HTMLDivElement>(null);
      const isInView = useInView(ref, { once: true, amount: 0.3 }); // Trigger when 30% of item is in view

      const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: 'easeOut',
            delay: delay,
          },
        },
      };

      return (
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={variants}
          className={cn('w-full', className)}
        >
          {children}
        </motion.div>
      );
    };

    export { ScrollStackItem };