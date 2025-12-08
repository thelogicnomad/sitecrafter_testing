import React, { useRef, FC, ReactNode } from 'react';

interface ClickSparkProps {
  children: ReactNode;
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
}

const ClickSpark: FC<ClickSparkProps> = ({
  children,
  sparkColor = 'hsl(var(--accent))',
  sparkSize = 10,
  sparkRadius = 25,
  sparkCount = 8,
  duration = 400,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const createSpark = (x: number, y: number) => {
    const spark = document.createElement('div');
    spark.style.position = 'absolute';
    spark.style.width = `${sparkSize}px`;
    spark.style.height = `${sparkSize}px`;
    spark.style.backgroundColor = sparkColor;
    spark.style.borderRadius = '50%';
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    spark.style.pointerEvents = 'none';
    spark.style.transform = 'translate(-50%, -50%)';
    containerRef.current?.appendChild(spark);

    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * sparkRadius;
    const targetX = x + Math.cos(angle) * distance;
    const targetY = y + Math.sin(angle) * distance;

    const animation = spark.animate(
      [
        { transform: `translate(-50%, -50%) scale(1)`, opacity: 1 },
        { transform: `translate(${targetX - x - sparkSize/2}px, ${targetY - y - sparkSize/2}px) scale(0)`, opacity: 0 },
      ],
      {
        duration: duration,
        easing: 'ease-out',
      }
    );
    animation.onfinish = () => spark.remove();
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (let i = 0; i < sparkCount; i++) {
      createSpark(x, y);
    }
  };

  return (
    <div ref={containerRef} onClick={handleClick} style={{ position: 'relative', display: 'inline-block' }}>
      {children}
    </div>
  );
};

export default ClickSpark;