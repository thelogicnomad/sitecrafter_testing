import React, { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

// cn utility - ALWAYS define inline
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface CursorGlowProps {
  color?: string;
  radius?: number;
  smoothing?: number;
}

export const CursorGlow: React.FC<CursorGlowProps> = ({
  color = '#00D9FF',
  radius = 300,
  smoothing = 25,
}) => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  
  const springConfig = { damping: smoothing, stiffness: 150 };
  const x = useSpring(-1000, springConfig);
  const y = useSpring(-1000, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
      style={{
        background: `radial-gradient(circle ${radius}px at var(--x) var(--y), ${color}15, transparent 80%)`,
      }}
    >
      <motion.div
        className="absolute rounded-full blur-[80px] opacity-20"
        style={{
          width: radius,
          height: radius,
          backgroundColor: color,
          left: x,
          top: y,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </motion.div>
  );
};