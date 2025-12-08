import React, { FC, ReactNode, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

interface PillNavProps {
  logo: ReactNode;
  logoAlt: string;
  items: { label: string; href: string }[];
  activeHref: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  ease?: string;
  children?: ReactNode;
}

const PillNav: FC<PillNavProps> = ({
  logo,
  logoAlt,
  items,
  activeHref,
  baseColor = 'hsl(var(--primary))',
  pillColor = 'hsl(var(--accent))',
  hoveredPillTextColor = 'hsl(var(--primary-foreground))',
  pillTextColor = 'hsl(var(--accent-foreground))',
  ease = 'power3.inOut',
  children
}) => {
  const navRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const activeLink = linksRef.current.find(
      (link) => link?.getAttribute('href') === activeHref
    );

    if (activeLink && pillRef.current) {
      gsap.to(pillRef.current, {
        width: activeLink.offsetWidth,
        x: activeLink.offsetLeft,
        duration: 0.5,
        ease: ease,
      });
    }
  }, [activeHref, ease, items]);

  const handleMouseEnter = (el: HTMLAnchorElement) => {
    if (pillRef.current) {
      gsap.to(pillRef.current, {
        width: el.offsetWidth,
        x: el.offsetLeft,
        duration: 0.3,
        ease: ease,
      });
    }
  };

  const handleMouseLeave = () => {
    const activeLink = linksRef.current.find(
      (link) => link?.getAttribute('href') === activeHref
    );
    if (activeLink && pillRef.current) {
      gsap.to(pillRef.current, {
        width: activeLink.offsetWidth,
        x: activeLink.offsetLeft,
        duration: 0.3,
        ease: ease,
      });
    }
  };

  return (
    <nav
      ref={navRef}
      className="relative flex items-center justify-between p-2 rounded-full shadow-lg"
      style={{ backgroundColor: baseColor, color: hoveredPillTextColor }}
      onMouseLeave={handleMouseLeave}
    >
      <Link to="/" className="flex-shrink-0 p-2 z-10" aria-label={logoAlt}>
        {logo}
      </Link>
      <div className="relative flex items-center">
        {items.map((item, index) => (
          <Link
            key={item.href}
            to={item.href}
            ref={(el) => (linksRef.current[index] = el)}
            className="relative z-10 px-4 py-2 text-sm font-medium transition-colors duration-300"
            onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
            style={{
              color: activeHref === item.href ? pillTextColor : hoveredPillTextColor,
            }}
          >
            {item.label}
          </Link>
        ))}
        <div
          ref={pillRef}
          className="absolute left-0 h-full rounded-full"
          style={{ backgroundColor: pillColor }}
        />
      </div>
      <div className="flex items-center gap-4 px-2 z-10">{children}</div>
    </nav>
  );
};

export default PillNav;