import React, { useEffect, useRef } from 'react';
    import { Link, useLocation } from 'react-router-dom';
    import gsap from 'gsap';

    interface PillNavProps {
      items: { label: string; href: string }[];
      baseColor?: string;
      pillColor?: string;
      hoveredPillTextColor?: string;
      pillTextColor?: string;
    }

    const PillNav: React.FC<PillNavProps> = ({ 
      items, 
      baseColor = 'black',
      pillColor = 'white',
      hoveredPillTextColor = 'white',
      pillTextColor = 'black',
    }) => {
      const navRef = useRef<HTMLDivElement>(null);
      const pillRef = useRef<HTMLDivElement>(null);
      const location = useLocation();

      useEffect(() => {
        const activeLink = navRef.current?.querySelector(`[href="${location.pathname}"]`) as HTMLElement;
        if (activeLink && pillRef.current) {
          gsap.to(pillRef.current, {
            width: activeLink.offsetWidth,
            x: activeLink.offsetLeft,
            duration: 0.3,
            ease: 'power2.out',
          });
        }
      }, [location.pathname]);

      const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const target = e.currentTarget;
        gsap.to(pillRef.current, {
          width: target.offsetWidth,
          x: target.offsetLeft,
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      const handleMouseLeave = () => {
        const activeLink = navRef.current?.querySelector(`[href="${location.pathname}"]`) as HTMLElement;
        if (activeLink) {
          gsap.to(pillRef.current, {
            width: activeLink.offsetWidth,
            x: activeLink.offsetLeft,
            duration: 0.3,
            ease: 'power2.out',
          });
        }
      };

      return (
        <nav ref={navRef} className="relative hidden md:flex items-center space-x-2 rounded-full p-1" onMouseLeave={handleMouseLeave}>
          <div ref={pillRef} className="absolute left-0 top-0 h-full rounded-full" style={{ backgroundColor: pillColor, zIndex: 0 }} />
          {items.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onMouseEnter={handleMouseEnter}
              className="relative z-10 rounded-full px-4 py-2 text-sm font-medium transition-colors"
              style={{
                 color: location.pathname === item.href ? pillTextColor : baseColor,
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      );
    };

    export default PillNav;