import React from 'react';
    import { motion } from 'framer-motion';
    import { cn } from '@/lib/utils';

    interface ShinyTextProps {
      text: string;
      disabled?: boolean;
      speed?: number; // Duration of the shine animation in seconds
      className?: string;
    }

    const ShinyText: React.FC<ShinyTextProps> = ({ text, disabled = false, speed = 2, className }) => {
      if (disabled) {
        return <span className={cn('text-gray-700', className)}>{text}</span>;
      }

      return (
        <motion.span
          className={cn(
            'relative inline-block overflow-hidden whitespace-nowrap',
            'bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] bg-clip-text text-transparent',
            className
          )}
          initial={{ backgroundPosition: '200% center' }}
          animate={{ backgroundPosition: ['200% center', '-200% center'] }}
          transition={{
            repeat: Infinity,
            duration: speed,
            ease: 'linear',
          }}
        >
          {text}
        </motion.span>
      );
    };

    export { ShinyText };