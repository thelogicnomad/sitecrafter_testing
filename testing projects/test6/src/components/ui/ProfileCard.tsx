import React from 'react';
    import { cn } from '@/lib/utils';
    import { motion } from 'framer-motion';
    import { Button } from './Button';

    interface ProfileCardProps {
      name: string;
      title: string;
      expertise: string;
      avatarUrl: string;
    }

    export const ProfileCard: React.FC<ProfileCardProps> = ({ name, title, expertise, avatarUrl }) => {
      const cardRef = React.useRef<HTMLDivElement>(null);
      const [isHovered, setIsHovered] = React.useState(false);

      const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const { left, top, width, height } = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 25;
        const y = (e.clientY - top - height / 2) / 25;
        cardRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg) scale(1.05)`;
      };

      const handleMouseLeave = () => {
        if (!cardRef.current) return;
        cardRef.current.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
      };

      return (
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={() => setIsHovered(true)}
          style={{
            transformStyle: 'preserve-3d',
            transition: 'transform 0.2s ease-out',
          }}
          className="relative w-full h-full p-6 bg-card rounded-lg shadow-lg border border-border flex flex-col items-center text-center"
        >
          <div style={{ transform: 'translateZ(20px)' }} className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-primary">
            <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
          </div>
          <h3 style={{ transform: 'translateZ(40px)' }} className="text-xl font-bold font-heading text-foreground">{name}</h3>
          <p style={{ transform: 'translateZ(30px)' }} className="text-primary font-semibold text-sm">{title}</p>
          <p style={{ transform: 'translateZ(20px)' }} className="mt-2 text-muted-foreground text-xs">{expertise}</p>
        </motion.div>
      );
    };