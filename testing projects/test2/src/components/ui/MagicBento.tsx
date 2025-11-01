import React, { useRef, useEffect } from 'react';
    import { gsap } from 'gsap';
    import { cn } from '@/lib/utils';
    
    interface MagicBentoProps {
      children: React.ReactNode;
      className?: string;
    }

    const MagicBento: React.FC<MagicBentoProps> = ({ children, className }) => {
      const containerRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const handleMouseMove = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          gsap.to(el, {
            '--spotlight-x': `${x}px`,
            '--spotlight-y': `${y}px`,
            duration: 0.4,
            ease: 'power3.out',
          });

          const rotateX = gsap.utils.mapRange(0, rect.height, 10, -10)(y);
          const rotateY = gsap.utils.mapRange(0, rect.width, -10, 10)(x);
          gsap.to(el, {
              rotationX: rotateX,
              rotationY: rotateY,
              transformPerspective: 500,
              duration: 0.4,
              ease: 'power2.out'
          });
        };
        
        const handleMouseEnter = () => {
             gsap.to(el, {
                '--spotlight-opacity': 1,
                '--border-opacity': 1,
                scale: 1.03,
                duration: 0.3
            });
        };
        
        const handleMouseLeave = () => {
            gsap.to(el, {
                '--spotlight-opacity': 0,
                '--border-opacity': 0,
                scale: 1,
                rotationX: 0,
                rotationY: 0,
                duration: 0.3
            });
        };

        el.addEventListener('mousemove', handleMouseMove);
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          el.removeEventListener('mousemove', handleMouseMove);
          el.removeEventListener('mouseenter', handleMouseEnter);
          el.removeEventListener('mouseleave', handleMouseLeave);
        };
      }, []);

      return (
        <div ref={containerRef} className={cn("relative rounded-lg overflow-hidden transition-all duration-300", className)}
        style={{
            '--spotlight-x': '50%',
            '--spotlight-y': '50%',
            '--spotlight-opacity': 0,
            '--border-opacity': 0,
            background: `radial-gradient(circle at var(--spotlight-x) var(--spotlight-y), hsla(330, 50%, 65%, 0.1) 0%, transparent 40%)`,
            backgroundBlendMode: 'soft-light',
            border: '1px solid hsla(330, 50%, 65%, var(--border-opacity))'
        } as React.CSSProperties}>
          {children}
        </div>
      );
    };

    export default MagicBento;