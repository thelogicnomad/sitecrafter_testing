import React, { useRef, useCallback } from 'react';

    interface ClickSparkProps {
      children: React.ReactElement;
      sparkColor?: string;
      sparkSize?: number;
      sparkRadius?: number;
      sparkCount?: number;
      duration?: number;
    }

    const ClickSpark: React.FC<ClickSparkProps> = ({
      children,
      sparkColor = 'hsl(330, 50%, 65%)',
      sparkSize = 10,
      sparkRadius = 15,
      sparkCount = 8,
      duration = 600,
    }) => {
      const childRef = useRef<HTMLElement>(null);

      const createSpark = useCallback((x: number, y: number) => {
        const spark = document.createElement('div');
        spark.style.position = 'absolute';
        spark.style.left = `${x}px`;
        spark.style.top = `${y}px`;
        spark.style.width = `${sparkSize}px`;
        spark.style.height = `${sparkSize}px`;
        spark.style.backgroundColor = sparkColor;
        spark.style.borderRadius = '50%';
        spark.style.pointerEvents = 'none';
        spark.style.transform = 'translate(-50%, -50%)';
        document.body.appendChild(spark);

        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * sparkRadius + 10;
        const targetX = x + distance * Math.cos(angle);
        const targetY = y + distance * Math.sin(angle);

        spark.animate(
          [
            { transform: `translate(-50%, -50%) scale(1)`, opacity: 1 },
            { transform: `translate(${(targetX - x - sparkSize/2)}px, ${(targetY - y - sparkSize/2)}px) scale(0)`, opacity: 0 },
          ],
          {
            duration: duration,
            easing: 'ease-out',
          }
        ).onfinish = () => spark.remove();

      }, [sparkColor, sparkSize, sparkRadius, duration]);

      const handleClick = (e: React.MouseEvent) => {
        for (let i = 0; i < sparkCount; i++) {
          createSpark(e.clientX, e.clientY);
        }
        if (children.props.onClick) {
          children.props.onClick(e);
        }
      };

      return React.cloneElement(children, { ref: childRef, onClick: handleClick });
    };

    export default ClickSpark;