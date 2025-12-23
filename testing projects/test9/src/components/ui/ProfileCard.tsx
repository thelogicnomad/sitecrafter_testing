import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Avatar } from './Avatar';

interface ProfileCardProps {
  name: string;
  title: string;
  avatarUrl: string;
  enableTilt?: boolean;
  className?: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  title,
  avatarUrl,
  enableTilt = true,
  className,
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX: enableTilt ? rotateX : 0,
        rotateY: enableTilt ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'group relative h-72 w-64 rounded-2xl bg-white p-6 shadow-xl border border-[#F2E3A1]',
        className
      )}
    >
      <div style={{ transform: 'translateZ(50px)' }} className="flex flex-col items-center text-center">
        <Avatar src={avatarUrl} size="lg" className="mb-4 border-4 border-[#8B1E41]/10" />
        <h3 className="text-xl font-bold text-[#8B1E41]">{name}</h3>
        <p className="text-sm font-medium text-[#F97047]">{title}</p>
        <div className="mt-6 flex gap-2">
            <div className="h-1 w-8 rounded-full bg-[#8B1E41]/20" />
            <div className="h-1 w-8 rounded-full bg-[#8B1E41]" />
            <div className="h-1 w-8 rounded-full bg-[#8B1E41]/20" />
        </div>
      </div>
    </motion.div>
  );
};