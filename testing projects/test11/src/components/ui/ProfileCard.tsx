import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProfileCardProps {
  name: string;
  title: string;
  handle: string;
  avatarUrl: string;
  bio: string;
  enableTilt?: boolean;
}

export const ProfileCard = ({ name, title, handle, avatarUrl, bio }: ProfileCardProps) => {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 flex flex-col items-center text-center group"
    >
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity" />
        <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
          {!imgError ? (
            <img
              src={avatarUrl}
              alt={name}
              className="h-full w-full object-cover"
              onError={() => setImgError(true)}
              crossOrigin="anonymous"
            />
          ) : (
            <div className="h-full w-full bg-slate-800 flex items-center justify-center text-white text-2xl font-bold">
              {name.charAt(0)}
            </div>
          )}
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-slate-900 mb-1">{name}</h3>
      <p className="text-[#2d5a88] font-semibold text-sm uppercase tracking-wider mb-4">{title}</p>
      <p className="text-slate-500 text-sm mb-6 max-w-xs">{bio}</p>
      
      <div className="flex gap-4">
        {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
          <button key={i} className="p-2 rounded-full bg-slate-50 text-slate-400 hover:bg-[#2d5a88] hover:text-white transition-all">
            <Icon className="w-5 h-5" />
          </button>
        ))}
      </div>
    </motion.div>
  );
};