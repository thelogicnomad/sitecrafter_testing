import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music } from 'lucide-react';

// cn utility - ALWAYS define inline
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface AudioPlayerProps {
  trackTitle?: string;
  author?: string;
  duration?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  trackTitle = "Evening Serenity",
  author = "Mindful Breaks",
  duration = "12:45"
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 border border-slate-100 max-w-md w-full">
      <div className="flex items-center gap-6">
        {/* Album Art Placeholder */}
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#7B68BE] to-[#FFB6C1] flex items-center justify-center shadow-lg">
          <Music className="text-white w-10 h-10" />
        </div>

        <div className="flex-1">
          <h4 className="text-lg font-bold text-slate-900 truncate">{trackTitle}</h4>
          <p className="text-slate-500 text-sm">{author}</p>
          <div className="mt-4 flex items-center gap-3">
            <Volume2 className="w-4 h-4 text-slate-400" />
            <div className="h-1 flex-1 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#A8D8EA] w-2/3" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="relative h-2 bg-slate-100 rounded-full cursor-pointer group">
            <div 
              className="absolute top-0 left-0 h-full bg-[#7B68BE] rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            />
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#7B68BE] rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: `${progress}%`, marginLeft: '-8px' }}
            />
          </div>
          <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <span>4:23</span>
            <span>{duration}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-8">
          <button className="text-slate-400 hover:text-[#7B68BE] transition-colors">
            <SkipBack className="w-6 h-6 fill-current" />
          </button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 bg-[#7B68BE] rounded-full flex items-center justify-center text-white shadow-lg shadow-indigo-200"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 fill-current" />
            ) : (
              <Play className="w-8 h-8 fill-current ml-1" />
            )}
          </motion.button>

          <button className="text-slate-400 hover:text-[#7B68BE] transition-colors">
            <SkipForward className="w-6 h-6 fill-current" />
          </button>
        </div>
      </div>
    </div>
  );
};