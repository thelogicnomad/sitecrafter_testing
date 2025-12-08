import { useInView } from 'framer-motion';
import { useRef } from 'react';

export const useScrollAnim = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  return {
    ref,
    animation: {
      transform: isInView ? "none" : "translateY(50px)",
      opacity: isInView ? 1 : 0,
      transition: "all 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s"
    }
  };
};