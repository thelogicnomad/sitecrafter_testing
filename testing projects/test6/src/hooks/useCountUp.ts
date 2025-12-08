import { useEffect, useState } from 'react';
    import { animate } from 'framer-motion';

    export const useCountUp = (target: number, duration = 2) => {
      const [count, setCount] = useState(0);

      useEffect(() => {
        const controls = animate(0, target, {
          duration,
          onUpdate(value) {
            setCount(Math.floor(value));
          },
        });
        return () => controls.stop();
      }, [target, duration]);

      return count;
    };