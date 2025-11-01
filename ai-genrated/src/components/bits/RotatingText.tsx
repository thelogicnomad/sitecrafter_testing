import { motion, AnimatePresence } from 'framer-motion';
    import { useEffect, useState } from 'react';

    type RotatingTextProps = {
      texts: string[];
      mainClassName?: string;
      staggerFrom?: 'first' | 'last';
      initial?: object;
      animate?: object;
      exit?: object;
      staggerDuration?: number;
      splitLevelClassName?: string;
      transition?: object;
      rotationInterval?: number;
    };

    const RotatingText = ({
      texts,
      mainClassName,
      staggerFrom = 'first',
      initial = { y: '100%' },
      animate = { y: 0 },
      exit = { y: '-100%' },
      staggerDuration = 0.05,
      splitLevelClassName,
      transition = { type: 'spring' },
      rotationInterval = 2000,
    }: RotatingTextProps) => {
      const [index, setIndex] = useState(0);

      useEffect(() => {
        const interval = setInterval(() => {
          setIndex((prev) => (prev + 1) % texts.length);
        }, rotationInterval);

        return () => clearInterval(interval);
      }, [texts, rotationInterval]);

      return (
        <div className={mainClassName}>
          <AnimatePresence mode="wait">
            <motion.div key={index} className={splitLevelClassName}>
              {texts[index].split('').map((char, i) => (
                <motion.div
                  key={i}
                  initial={initial}
                  animate={animate}
                  exit={exit}
                  transition={{
                    ...transition,
                    delay:
                      staggerFrom === 'first'
                        ? i * staggerDuration
                        : (texts[index].length - 1 - i) * staggerDuration,
                  }}
                  style={{ display: 'inline-block' }}
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