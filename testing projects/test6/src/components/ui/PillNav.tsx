"use client";
    import { useEffect, useRef, useState } from "react";
    import { useLocation } from "react-router-dom";
    import { gsap } from "gsap";
    import { useGSAP } from "@gsap/react";
    import { cn } from "@/lib/utils";

    interface PillNavProps {
      items: { label: string; href: string }[];
      logo?: React.ReactNode;
      logoText?: string;
      className?: string;
      baseColor?: string;
      pillColor?: string;
      hoveredPillTextColor?: string;
      pillTextColor?: string;
      activePillTextColor?: string;
      ease?: string;
    }

    export const PillNav: React.FC<PillNavProps> = ({
      items,
      logo,
      logoText,
      className,
      baseColor = "#000000",
      pillColor = "#ffffff",
      hoveredPillTextColor = "#ffffff",
      pillTextColor = "#000000",
      activePillTextColor = "#000000",
      ease = "power3.inOut",
    }) => {
      const pathname = useLocation();
      const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
      const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
      const activeIndex = items.findIndex((item) => item.href === pathname);
      const pillRef = useRef<HTMLDivElement>(null);
      const navRef = useRef<HTMLDivElement>(null);

      useGSAP(() => {
        const targetIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;
        const targetItem = itemRefs.current[targetIndex];

        if (targetItem) {
          gsap.to(pillRef.current, {
            x: targetItem.offsetLeft,
            width: targetItem.offsetWidth,
            duration: 0.4,
            ease: ease,
          });
        } else if (activeIndex === -1 && hoveredIndex === null) {
          gsap.to(pillRef.current, {
            width: 0,
            duration: 0.4,
            ease: ease,
          });
        }
      }, { dependencies: [hoveredIndex, activeIndex], scope: navRef });

      useEffect(() => {
        itemRefs.current = itemRefs.current.slice(0, items.length);
      }, [items.length]);

      return (
        <div
          ref={navRef}
          className={cn(
            "relative flex items-center justify-between p-2 rounded-full shadow-md backdrop-blur-sm",
            className
          )}
          style={{ backgroundColor: baseColor }}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <a href="/" className="flex items-center gap-2 pl-2">
            {logo}
            {logoText && <span className="font-bold text-lg text-primary-foreground">{logoText}</span>}
          </a>
          <div className="flex items-center">
            {items.map((item, index) => (
              <div
                key={item.href}
                ref={(el) => (itemRefs.current[index] = el)}
                onMouseEnter={() => setHoveredIndex(index)}
                className="relative px-4 py-2 cursor-pointer text-sm font-medium z-10"
              >
                <a href={item.href}
                  style={{
                    color:
                      activeIndex === index
                        ? activePillTextColor
                        : hoveredIndex === index
                        ? hoveredPillTextColor
                        : "hsl(var(--primary-foreground))",
                    transition: "color 0.3s",
                  }}
                >
                  {item.label}
                </a>
              </div>
            ))}
          </div>

          <div
            ref={pillRef}
            className="absolute top-2 h-10 rounded-full z-0"
            style={{ backgroundColor: pillColor, color: pillTextColor }}
          ></div>
        </div>
      );
    };