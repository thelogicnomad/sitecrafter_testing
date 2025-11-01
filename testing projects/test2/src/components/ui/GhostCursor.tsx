import React, { useEffect, useRef } from 'react';
    import { gsap } from 'gsap';

    interface GhostCursorProps {
      color?: string;
    }

    const GhostCursor: React.FC<GhostCursorProps> = ({ color = '#B19EEF' }) => {
      const cursorRef = useRef<HTMLDivElement>(null);
      const followerRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;
        if (!cursor || !follower) return;

        gsap.set(cursor, { xPercent: -50, yPercent: -50 });
        gsap.set(follower, { xPercent: -50, yPercent: -50 });

        const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        const mouse = { x: pos.x, y: pos.y };
        const speed = 0.1;

        const xSet = gsap.quickSetter(follower, "x", "px");
        const ySet = gsap.quickSetter(follower, "y", "px");

        const handleMouseMove = (e: MouseEvent) => {
          mouse.x = e.clientX;
          mouse.y = e.clientY;
          gsap.to(cursor, { duration: 0, x: e.clientX, y: e.clientY });
        };

        const updateCursor = () => {
            const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
            pos.x += (mouse.x - pos.x) * dt;
            pos.y += (mouse.y - pos.y) * dt;
            xSet(pos.x);
            ySet(pos.y);
        };

        gsap.ticker.add(updateCursor);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
          gsap.ticker.remove(updateCursor);
          window.removeEventListener('mousemove', handleMouseMove);
        };
      }, [color]);
      
      return (
        <>
            <div ref={cursorRef} style={{
                position: 'fixed',
                left: 0,
                top: 0,
                width: '10px',
                height: '10px',
                backgroundColor: color,
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 9999,
            }} />
            <div ref={followerRef} style={{
                position: 'fixed',
                left: 0,
                top: 0,
                width: '30px',
                height: '30px',
                border: `1px solid ${color}`,
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 9999,
            }} />
        </>
      );
    };

    export default GhostCursor;