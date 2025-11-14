import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import { cn } from '@/lib/utils';

gsap.registerPlugin(GSAPSplitText);

interface SplitTextProps {
  text: string;
  className?: string;
}

export default function SplitText({ text, className }: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (containerRef.current) {
      const split = new GSAPSplitText(containerRef.current, { type: 'chars, words' });
      gsap.from(split.chars, {
        duration: 0.6,
        opacity: 0,
        y: 40,
        ease: 'power3.out',
        stagger: 0.03,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={cn(className)}>
      {text}
    </div>
  );
}