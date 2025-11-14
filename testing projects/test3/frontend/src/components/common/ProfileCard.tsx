import React from 'react';
    import { motion } from 'framer-motion';
    import { Mail } from 'lucide-react';

    interface ProfileCardProps {
      name: string;
      title: string;
      handle?: string;
      status?: string;
      contactText?: string;
      avatarUrl: string;
      onContactClick?: () => void;
    }
    
    const ProfileCard: React.FC<ProfileCardProps> = ({
      name,
      title,
      handle,
      avatarUrl,
      onContactClick,
    }) => {
      return (
        <motion.div
          className="relative w-full max-w-sm p-6 bg-au-surface rounded-lg shadow-lg overflow-hidden"
          whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)" }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col items-center text-center">
            <motion.img
              src={avatarUrl}
              alt={name}
              className="w-24 h-24 rounded-full object-cover border-4 border-au-accent mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
            />
            <h3 className="text-xl font-bold text-au-primary">{name}</h3>
            <p className="text-au-text-muted">{title}</p>
            {handle && <p className="text-sm text-au-accent">@{handle}</p>}
          </div>
          {onContactClick && (
            <motion.button
              onClick={onContactClick}
              className="mt-6 w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-au-primary bg-au-accent hover:bg-au-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-au-accent"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact
            </motion.button>
          )}
        </motion.div>
      );
    };

    export default ProfileCard;