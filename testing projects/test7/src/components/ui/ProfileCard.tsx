import React, { FC, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Button from '../common/Button';

interface ProfileCardProps {
  name: string;
  title: string;
  handle: string;
  status: string;
  contactText: string;
  avatarUrl: string;
  enableTilt?: boolean;
  onContactClick: () => void;
}

const ProfileCard: FC<ProfileCardProps> = ({
  name,
  title,
  handle,
  status,
  contactText,
  avatarUrl,
  enableTilt = true,
  onContactClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enableTilt || !cardRef.current) return;
    const card = cardRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      const rotateX = (y - 0.5) * -20;
      const rotateY = (x - 0.5) * 20;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [enableTilt]);

  return (
    <div
      ref={cardRef}
      className="relative w-full max-w-sm p-8 rounded-2xl bg-primary text-primary-foreground shadow-2xl transition-transform duration-300 ease-out"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="flex items-center mb-6">
        <div className="relative">
          <img src={avatarUrl} alt={name} className="w-20 h-20 rounded-full object-cover border-4 border-accent" />
          <span className={cn(
            'absolute bottom-0 right-0 block h-4 w-4 rounded-full border-2 border-primary',
            status === 'Online' ? 'bg-green-500' : 'bg-gray-500'
          )} />
        </div>
        <div className="ml-4">
          <h2 className="text-2xl font-bold font-display">{name}</h2>
          <p className="text-sm text-primary-foreground/80">@{handle}</p>
        </div>
      </div>
      <p className="text-lg font-medium mb-6">{title}</p>
      <Button onClick={onContactClick} variant="primary" className="w-full">{contactText}</Button>
    </div>
  );
};

export default ProfileCard;