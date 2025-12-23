import React from 'react';
import { Card } from './Card';
import { Avatar } from './Avatar';
import { Badge } from './Badge';
import { Twitter, Linkedin, Github, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

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
  status = "Active", 
  avatarUrl,
  enableTilt = true 
}: ProfileCardProps) => {
  return (
    <Card className="text-center group overflow-hidden" hoverable={enableTilt}>
      <div className="flex flex-col items-center">
        <div className="relative mb-6">
          <Avatar 
            src={avatarUrl} 
            fallback={name} 
            size="xl" 
            className="ring-4 ring-slate-50 group-hover:ring-[#1B4592]/10 transition-all duration-300"
          />
          <div className="absolute -bottom-2 right-0">
            <Badge 
              label={status} 
              variant={status === "Active" ? "accent" : "secondary"} 
              className="shadow-sm"
            />
          </div>
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-1">{name}</h3>
        <p className="text-sm font-medium text-[#1B4592] mb-3">{title}</p>
        <p className="text-sm text-slate-500 mb-6">@{handle}</p>

        <div className="flex items-center gap-4">
          {[Linkedin, Twitter, Github].map((Icon, i) => (
            <motion.a
              key={i}
              href="#"
              whileHover={{ y: -3 }}
              className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:text-[#1B4592] hover:bg-blue-50 transition-colors"
            >
              <Icon size={20} />
            </motion.a>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 w-full py-3 flex items-center justify-center gap-2 text-sm font-bold text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
        >
          View Full Profile
          <ExternalLink size={16} />
        </motion.button>
      </div>
    </Card>
  );
};