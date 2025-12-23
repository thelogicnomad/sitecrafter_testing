import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Spark {
  id: number;
  x: number;
  y: number;
}

interface ClickSparkProps {
  children: React.ReactNode;
  sparkColor?: string;
  sparkSize?: number;
  duration?: number;
}

export const ClickSpark = ({
  children,
  sparkColor = '#FC5A30',
  sparkSize = 10,
  duration = 0.6
}: ClickSparkProps) => {
  const [sparks, setSparks] = useState<Spark[]>([]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setSparks((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setSparks((prev) => prev.filter((s) => s.id !== id));
    }, duration * 1000);
  }, [duration]);

  return (
    <div className="relative inline-block overflow-hidden" onClick={handleClick}>
      {children}
      <AnimatePresence>
        {sparks.map((spark) => (
          <motion.div
            key={spark.id}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration }}
            className="absolute pointer-events-none rounded-full"
            style={{
              left: spark.x,
              top: spark.y,
              width: sparkSize,
              height: sparkSize,
              backgroundColor: sparkColor,
              transform: 'translate(-50%, -50%)'
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};