import React, { useLayoutEffect, useRef } from 'react';
    import { gsap } from 'gsap';
    import { SplitText as GSAPSplitText } from 'gsap/SplitText';
    import { useGSAP } from '@gsap/react';
    
    gsap.registerPlugin(GSAPSplitText);

    interface SplitTextProps {
      children: string;
      className?: string;
    }
    
    const SplitText: React.FC<SplitTextProps> = ({ children, className }) => {
        const comp = useRef<HTMLDivElement>(null);

        useGSAP(() => {
            if (!comp.current) return;
            const split = new GSAPSplitText(comp.current, { type: 'chars, words' });
            
            gsap.from(split.chars, {
              duration: 0.6,
              opacity: 0,
              y: 20,
              ease: 'power2.out',
              stagger: 0.02,
              scrollTrigger: {
                trigger: comp.current,
                start: 'top 80%',
              }
            });
        }, { scope: comp });
    
        return (
            <div ref={comp} className={className}>
                {children}
            </div>
        );
    };

    export default SplitText;