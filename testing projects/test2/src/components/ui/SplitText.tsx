import React, { useRef, useEffect } from 'react';
    import { gsap } from 'gsap';
    import { SplitText as GSAPSplitText } from 'gsap/SplitText';
    gsap.registerPlugin(GSAPSplitText);

    interface SplitTextProps {
      children: string;
      type?: 'chars' | 'words' | 'lines';
      className?: string;
    }

    const SplitText: React.FC<SplitTextProps> = ({ children, type = 'chars', className }) => {
      const textRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
        if (textRef.current) {
          const split = new GSAPSplitText(textRef.current, { type });
          gsap.from(split.chars, {
            duration: 0.8,
            opacity: 0,
            y: 40,
            ease: 'power3.out',
            stagger: 0.05,
          });
        }
      }, [children, type]);

      return <div ref={textRef} className={className}>{children}</div>;
    };

    export default SplitText;