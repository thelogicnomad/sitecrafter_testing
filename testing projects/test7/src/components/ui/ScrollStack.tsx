import React, { FC, ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollStackProps {
  children: ReactNode;
}

const ScrollStack: FC<ScrollStackProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const childrenArray = React.Children.toArray(children);

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {childrenArray.map((child, i) => {
          const start = i / childrenArray.length;
          const end = (i + 1) / childrenArray.length;
          const scale = useTransform(scrollYProgress, [start, end], [1, 0.8]);
          const opacity = useTransform(scrollYProgress, [start, end], [1, 0]);

          return (
            <motion.div
              key={i}
              className="absolute inset-0 flex items-center justify-center"
              style={{
                scale,
                opacity,
                zIndex: childrenArray.length - i,
              }}
            >
              {child}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export const ScrollStackItem: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="w-full max-w-3xl p-8 bg-white rounded-2xl shadow-2xl text-center">
    {children}
  </div>
);

export default ScrollStack;