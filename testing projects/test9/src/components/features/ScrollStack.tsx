import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollStackProps {
  children: React.ReactNode[];
}

export const ScrollStack = ({ children }: ScrollStackProps) => {
  return (
    <div className="flex flex-col gap-20 py-20">
      {children.map((child, index) => (
        <ScrollCard key={index} index={index}>
          {child}
        </ScrollCard>
      ))}
    </div>
  );
};

const ScrollCard = ({ children, index }: { children: React.ReactNode; index: number }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <motion.div
      ref={container}
      style={{
        scale,
        opacity,
        top: `calc(20px + ${index * 40}px)`,
      }}
      className="sticky w-full"
    >
      {children}
    </motion.div>
  );
};