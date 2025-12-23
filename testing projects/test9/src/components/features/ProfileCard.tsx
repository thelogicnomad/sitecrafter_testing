import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Card } from '@/components/ui/Card';
import { Instagram, Twitter, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProfileCardProps {
  name: string;
  title: string;
  handle: string;
  status?: string;
  avatarUrl?: string;
  enableTilt?: boolean;
}

export const ProfileCard = ({
  name,
  title,
  handle,
  status,
  avatarUrl,
  enableTilt = true
}: ProfileCardProps) => {
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
      className="perspective-1000"
    >
      <Card className="w-80 group overflow-visible">
        <div className="relative h-24 bg-[#2D231E]">
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
            <Avatar 
              src={avatarUrl || `https://picsum.photos/seed/${handle}/200/200`} 
              fallback={name.charAt(0)}
              size="lg"
              className="border-4 border-white dark:border-[#1a1412]"
            />
          </div>
        </div>
        <div className="pt-14 pb-8 px-6 text-center">
          <h3 className="text-xl font-poppins font-bold text-[#2D231E] dark:text-white mb-1">
            {name}
          </h3>
          <p className="text-sm font-medium text-[#911B44] mb-3 uppercase tracking-widest">
            {title}
          </p>
          <p className="text-sm text-gray-500 mb-4 italic">
            @{handle}
          </p>
          
          {status && (
            <Badge variant="accent" className="mb-6">
              {status}
            </Badge>
          )}

          <div className="flex justify-center space-x-4">
            {[Instagram, Twitter, Mail].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ scale: 1.2, color: '#911B44' }}
                className="text-gray-400 transition-colors"
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};