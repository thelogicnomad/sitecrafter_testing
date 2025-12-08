import React from 'react';
    import { cn, getRandomImageUrl } from '@/lib/utils';
    import { Card } from './Card';
    import { Button } from './Button';
    import { motion } from 'framer-motion';
    import { Mail } from 'lucide-react';

    interface ProfileCardProps {
      name: string;
      title?: string;
      handle?: string;
      status?: 'online' | 'offline' | 'busy'; // Explicit status types
      contactText?: string;
      avatarUrl?: string;
      showUserInfo?: boolean;
      enableTilt?: boolean;
      enableMobileTilt?: boolean; // Not directly used in this implementation, but kept for interface consistency
      onContactClick?: () => void;
      className?: string;
    }

    const ProfileCard: React.FC<ProfileCardProps> = ({
      name,
      title,
      handle,
      status,
      contactText = 'Contact',
      avatarUrl,
      showUserInfo = true,
      enableTilt = true,
      // enableMobileTilt = false, // Not implemented for mobile tilt effect
      onContactClick,
      className,
    }) => {
      const initialAvatar = avatarUrl || getRandomImageUrl(200, 200);

      const tiltProps = enableTilt
        ? {
            whileHover: { scale: 1.02, rotateX: 1, rotateY: 1 }, // Subtle tilt
            whileTap: { scale: 0.98 },
            transition: { duration: 0.2, ease: 'easeOut' },
          }
        : {};

      return (
        <motion.div
          className={cn(
            'relative w-full max-w-sm mx-auto',
            enableTilt && 'perspective-1000', // Apply perspective for 3D effect
            className
          )}
          {...tiltProps}
        >
          <Card className="flex flex-col items-center p-6 text-center bg-gradient-to-br from-white to-secondary/10 relative overflow-hidden">
            <div className="relative mb-4">
              <img
                src={initialAvatar}
                alt={`${name}'s avatar`}
                className="w-24 h-24 rounded-full object-cover border-4 border-secondary shadow-md"
                width={96}
                height={96}
              />
              {status && (
                <span
                  className={cn(
                    'absolute bottom-0 right-0 block h-4 w-4 rounded-full ring-2 ring-white',
                    status === 'online' && 'bg-green-500',
                    status === 'offline' && 'bg-gray-400',
                    status === 'busy' && 'bg-red-500'
                  )}
                  aria-label={`Status: ${status}`}
                />
              )}
            </div>

            {showUserInfo && (
              <>
                <h3 className="text-xl font-bold text-primary mb-1">{name}</h3>
                {title && <p className="text-sm text-gray-600 mb-1">{title}</p>}
                {handle && <p className="text-xs text-gray-500 mb-3">@{handle}</p>}
              </>
            )}

            {onContactClick && (
              <Button onClick={onContactClick} size="sm" className="mt-4">
                <Mail className="h-4 w-4 mr-2" />
                {contactText}
              </Button>
            )}
          </Card>
        </motion.div>
      );
    };

    export { ProfileCard };