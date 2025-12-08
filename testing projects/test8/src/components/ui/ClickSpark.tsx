import React, { useState, useCallback } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';

    interface Spark {
      id: number;
      x: number;
      y: number;
      color: string;
    }

    interface ClickSparkProps {
      sparkColor?: string;
      sparkSize?: number; // Max size of a spark particle
      sparkRadius?: number; // Max distance particles spread from click
      sparkCount?: number; // Number of particles
      duration?: number; // Animation duration in ms
      children: React.ReactNode;
    }

    const ClickSpark: React.FC<ClickSparkProps> = ({
      sparkColor = '#D9AE73', // Secondary color for sparks
      sparkSize = 10,
      sparkRadius = 30,
      sparkCount = 10,
      duration = 600,
      children,
    }) => {
      const [sparks, setSparks] = useState<Spark[]>([]);

      const createSpark = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const newSparks = Array.from({ length: sparkCount }).map((_, i) => ({
            id: Date.now() + i,
            x,
            y,
            color: sparkColor,
          }));

          setSparks((prev) => [...prev, ...newSparks]);
        },
        [sparkColor, sparkCount]
      );

      const handleAnimationComplete = useCallback((id: number) => {
        setSparks((prev) => prev.filter((spark) => spark.id !== id));
      }, []);

      const sparkVariants = {
        initial: {
          opacity: 0,
          scale: 0,
          x: 0,
          y: 0,
        },
        animate: (i: number) => {
          const angle = Math.random() * 2 * Math.PI;
          const distance = Math.random() * sparkRadius;
          const targetX = Math.cos(angle) * distance;
          const targetY = Math.sin(angle) * distance;

          return {
            opacity: [0, 1, 0],
            scale: [0, Math.random() * sparkSize * 0.5 + sparkSize * 0.5, 0],
            x: targetX,
            y: targetY,
            transition: {
              duration: duration / 1000,
              ease: 'easeOut',
              delay: Math.random() * 0.1, // Slight delay for staggered effect
            },
          };
        },
        exit: { opacity: 0, scale: 0 }, // Ensure sparks disappear
      };

      return (
        <div className="relative inline-block cursor-pointer" onClick={createSpark}>
          {children}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <AnimatePresence>
              {sparks.map((spark) => (
                <motion.div
                  key={spark.id}
                  custom={spark.id}
                  variants={sparkVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  onAnimationComplete={() => handleAnimationComplete(spark.id)}
                  style={{
                    position: 'absolute',
                    left: spark.x,
                    top: spark.y,
                    backgroundColor: spark.color,
                    borderRadius: '50%',
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                  }}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      );
    };

    export { ClickSpark };