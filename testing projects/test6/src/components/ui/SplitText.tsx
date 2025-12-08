"use client"
    import { useRef } from 'react';
    import { gsap } from 'gsap';
    import { useGSAP } from '@gsap/react';
    import { SplitText as GSAPSplitText } from 'gsap/SplitText';
    import { cn } from "@/lib/utils";
    gsap.registerPlugin(GSAPSplitText);

    interface SplitTextProps {
      text: string;
      splitType?: 'chars' | 'words' | 'lines';
      className?: string;
      from?: gsap.TweenVars;
      to?: gsap.TweenVars;
      stagger?: number;
    }

    export const SplitText = ({
      text,
      splitType = 'chars',
      className,
      from = { opacity: 0, y: 40 },
      to = { opacity: 1, y: 0, stagger: 0.05, duration: 0.6, ease: "power3.out" },
    }: SplitTextProps) => {
      const containerRef = useRef<HTMLDivElement>(null);

      useGSAP(() => {
        if (containerRef.current) {
          const split = new GSAPSplitText(containerRef.current, { type: splitType });
          gsap.fromTo(split[splitType], from, to);
        }
      }, { scope: containerRef });

      return (
        <div ref={containerRef} className={cn("overflow-hidden", className)} >
          {text}
        </div>
      );
    };