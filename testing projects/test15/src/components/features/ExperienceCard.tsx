import React from 'react';
import { motion } from 'framer-motion';
import { Play, Lock, Clock, Flame } from 'lucide-react';
import { Badge } from '../ui/Badge';

// cn utility - ALWAYS define inline
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface ExperienceCardProps {
  title?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Pro' | 'God Mode';
  thumbnail?: string;
  duration?: string;
  calories?: string;
  isLocked?: boolean;
  index?: number;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({
  title = 'Unknown Experience',
  difficulty = 'Beginner',
  thumbnail,
  duration = '15m',
  calories = '150',
  isLocked = false,
  index = 0
}) => {
  const fallbackGradients = [
    'from-indigo-600 to-blue-500',
    'from-purple-600 to-pink-500',
    'from-emerald-500 to-teal-400',
    'from-rose-500 to-orange-400'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group relative bg-[#1F3A52] rounded-2xl overflow-hidden shadow-2xl border border-slate-700 transition-all duration-300"
    >
      {/* Thumbnail Area */}
      <div className="relative h-56 overflow-hidden">
        {thumbnail ? (
          <img 
            src={thumbnail} 
            alt={title} 
            className={cn(
              'w-full h-full object-cover transition-transform duration-500 group-hover:scale-110',
              isLocked && 'grayscale contrast-75'
            )}
          />
        ) : (
          <div className={cn(
            'w-full h-full bg-gradient-to-br',
            fallbackGradients[index % fallbackGradients.length]
          )} />
        )}
        
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-transparent to-transparent opacity-80" />
        
        {/* Badge Overlay */}
        <div className="absolute top-4 left-4">
          <Badge 
            label={difficulty} 
            status={difficulty === 'God Mode' ? 'error' : difficulty === 'Pro' ? 'accent' : 'info'} 
          />
        </div>

        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
            <div className="bg-[#0D1B2A]/80 p-4 rounded-full border border-slate-600 shadow-xl">
              <Lock className="w-8 h-8 text-slate-400" />
            </div>
          </div>
        )}

        {!isLocked && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-[#00D9FF] p-4 rounded-full shadow-[0_0_20px_rgba(0,217,255,0.6)]">
              <Play className="w-8 h-8 text-[#0D1B2A] fill-current ml-1" />
            </div>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#00D9FF] transition-colors line-clamp-1">
          {title}
        </h3>
        
        <div className="flex items-center justify-between text-slate-400 text-sm">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-blue-400" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-orange-500" />
            <span>{calories} kcal</span>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-slate-700/50">
          <button 
            disabled={isLocked}
            className={cn(
              'w-full py-2 rounded-lg font-bold text-sm tracking-widest uppercase transition-all duration-200',
              isLocked 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                : 'bg-transparent border border-[#00D9FF]/50 text-[#00D9FF] hover:bg-[#00D9FF] hover:text-[#0D1B2A]'
            )}
          >
            {isLocked ? 'Premium Only' : 'Enter Arena'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};