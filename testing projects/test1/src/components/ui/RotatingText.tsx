import { AnimatePresence, motion, Transition } from 'framer-motion';
import { useEffect, useState } from 'react';

const RotatingText = ({
  texts,
  mainClassName,
  staggerFrom,
  initial,
  animate,
  exit,
  staggerDuration,
  splitLevelClassName,
  transition,
  rotationInterval,
}: {
  texts: string[];
  mainClassName?: string;
  staggerFrom?: 'first' | 'last';
  initial?: Record<string, any>;
  animate?: Record<string, any>;
  exit?: Record<string, any>;
  staggerDuration?: number;
  splitLevelClassName?: string;
  transition?: Transition;
  rotationInterval?: number;
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, rotationInterval || 2000);

    return () => clearInterval(interval);
  }, [texts, rotationInterval]);

  return (
    <div className={`inline-block ${mainClassName}`}>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={index}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-120%' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {texts[index].split('').map((char, i) => (
            <motion.div
              key={i}
              initial={initial}
              animate={animate}
              exit={exit}
              className={`inline-block ${splitLevelClassName}`}
              transition={{
                ...transition,
                delay:
                  (staggerFrom === 'last'
                    ? texts[index].length - 1 - i
                    : i) * (staggerDuration || 0.025),
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RotatingText;