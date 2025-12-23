import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// cn utility - ALWAYS define inline
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface BreathingVisualizerProps {
  isActive?: boolean;
  rhythmType?: 'calm' | 'box' | 'deep';
}

export const BreathingVisualizer: React.FC<BreathingVisualizerProps> = ({
  isActive = false,
  rhythmType = 'calm'
}) => {
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');

  const settings = {
    calm: { inhale: 4, hold: 2, exhale: 6 },
    box: { inhale: 4, hold: 4, exhale: 4 },
    deep: { inhale: 5, hold: 0, exhale: 7 }
  };

  const current = settings[rhythmType] ?? settings.calm;

  useEffect(() => {
    if (!isActive) return;

    let timer: NodeJS.Timeout;
    const cycle = () => {
      setPhase('Inhale');
      timer = setTimeout(() => {
        if (current.hold > 0) {
          setPhase('Hold');
          timer = setTimeout(() => {
            setPhase('Exhale');
          }, current.hold * 1000);
        } else {
          setPhase('Exhale');
        }
      }, current.inhale * 1000);
    };

    cycle();
    const interval = setInterval(cycle, (current.inhale + current.hold + current.exhale) * 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [isActive, rhythmType, current]);

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-indigo-100 opacity-50" />
        
        {/* Animated Circle */}
        <motion.div
          animate={isActive ? {
            scale: phase === 'Inhale' ? 1.5 : phase === 'Hold' ? 1.5 : 0.8,
            backgroundColor: phase === 'Inhale' ? '#7B68BE' : phase === 'Hold' ? '#A8D8EA' : '#FFB6C1',
          } : { scale: 1, backgroundColor: '#cbd5e1' }}
          transition={{ 
            duration: phase === 'Inhale' ? current.inhale : phase === 'Hold' ? current.hold : current.exhale,
            ease: "easeInOut"
          }}
          className="w-32 h-32 rounded-full shadow-2xl flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={phase}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-white font-bold text-lg"
            >
              {isActive ? phase : 'Ready?'}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Decorative particles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={isActive ? {
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            } : {}}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
            className={cn(
              "absolute rounded-full border border-indigo-200",
              i === 0 ? "w-72 h-72" : i === 1 ? "w-80 h-80" : "w-96 h-96"
            )}
          />
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <h4 className="text-xl font-bold text-slate-800">
          {isActive ? 'Follow the rhythm' : 'Click start to begin'}
        </h4>
        <p className="text-slate-500 mt-2">
          {rhythmType === 'calm' && '4s Inhale • 2s Hold • 6s Exhale'}
          {rhythmType === 'box' && '4s Inhale • 4s Hold • 4s Exhale'}
          {rhythmType === 'deep' && '5s Inhale • 7s Exhale'}
        </p>
      </div>
    </div>
  );
};