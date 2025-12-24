import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// cn utility - ALWAYS define inline
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'up' | 'down';
  className?: string;
}

export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  speed = 0.5,
  direction = 'up',
  className = '',
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const range = direction === 'up' ? [-100 * speed, 100 * speed] : [100 * speed, -100 * speed];
  const y = useTransform(scrollYProgress, [0, 1], range);

  return (
    <motion.div 
      ref={ref} 
      style={{ y }} 
      className={cn('relative', className)}
    >
      {children}
    </motion.div>
  );
};