import React, { useState, useCallback } from 'react';

    interface Spark {
      id: string;
      createdAt: number;
      color: string;
      size: number;
      style: React.CSSProperties;
    }

    interface ClickSparkProps {
      children: React.ReactNode;
      sparkColor?: string;
    }

    const generateSpark = (color: string): Omit<Spark, 'id' | 'createdAt'> => {
      const size = Math.floor(Math.random() * 3 + 5);
      return {
        color,
        size,
        style: {
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${size}px`,
          height: `${size}px`,
          position: 'absolute',
          backgroundColor: color,
          borderRadius: '50%',
          zIndex: 9999,
        },
      };
    };

    export const ClickSpark: React.FC<ClickSparkProps> = ({ children, sparkColor = 'hsl(var(--accent))' }) => {
      const [sparks, setSparks] = useState<Spark[]>([]);

      const BUCKET_SIZE = 4;

      const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const newSparks: Spark[] = Array.from({ length: BUCKET_SIZE }).map(() => {
          const spark = generateSpark(sparkColor);
          return {
            ...spark,
            id: crypto.randomUUID(),
            createdAt: Date.now(),
          };
        });
        setSparks(prev => [...prev, ...newSparks]);
      }, [sparkColor]);

      const onAnimationEnd = (id: string) => {
        setSparks(prev => prev.filter(spark => spark.id !== id));
      };

      return (
        <div style={{ position: 'relative' }} onClick={handleClick}>
          {sparks.map(spark => (
            <Sparkle key={spark.id} {...spark} onAnimationEnd={() => onAnimationEnd(spark.id)} />
          ))}
          {children}
        </div>
      );
    };

    const Sparkle: React.FC<Spark & { onAnimationEnd: () => void }> = ({ style, onAnimationEnd }) => {
      const [isAnimated, setIsAnimated] = useState(false);

      React.useEffect(() => {
        const timer = setTimeout(() => setIsAnimated(true), 10);
        return () => clearTimeout(timer);
      }, []);
      
      return (
        <div
          style={{
            ...style,
            transition: 'transform 600ms cubic-bezier(0.23, 1, 0.32, 1)',
            transform: isAnimated ? 'scale(0)' : 'scale(1)',
          }}
          onTransitionEnd={onAnimationEnd}
        />
      );
    };