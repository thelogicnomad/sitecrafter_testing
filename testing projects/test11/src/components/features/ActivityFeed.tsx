import React from 'react';
import { motion } from 'framer-motion';
import { Avatar } from '@/components/ui/Avatar';
import { Music, Trophy, MessageSquare, Play } from 'lucide-react';

const activities = [
  {
    user: { name: 'Rahul Sharma', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop' },
    action: 'completed the',
    target: 'Teental Speed Foundations',
    type: 'course',
    time: '2 hours ago',
    icon: Trophy,
    color: 'text-amber-500'
  },
  {
    user: { name: 'Priya Patel', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
    action: 'shared a practice video in',
    target: 'Rupak Taal Group',
    type: 'social',
    time: '5 hours ago',
    icon: Play,
    color: 'text-blue-500'
  },
  {
    user: { name: 'Anish Kumar', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
    action: 'joined the',
    target: 'Mastering the Bayan',
    type: 'enrollment',
    time: '8 hours ago',
    icon: Music,
    color: 'text-emerald-500'
  }
];

export const ActivityFeed = () => {
  return (
    <div className="space-y-4">
      {activities.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-slate-50 shadow-sm hover:shadow-md transition-shadow"
        >
          <Avatar 
            src={item.user.avatar} 
            fallback={item.user.name} 
            size="md" 
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-slate-600 leading-relaxed">
              <span className="font-bold text-slate-900">{item.user.name}</span>{' '}
              {item.action}{' '}
              <span className="font-semibold text-[#2d5a88]">{item.target}</span>
            </p>
            <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
              <item.icon className={cn("w-3 h-3", item.color)} />
              {item.time}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};