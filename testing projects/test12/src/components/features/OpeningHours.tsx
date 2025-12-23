import React from 'react';
import { Clock } from 'lucide-react';

const HOURS = [
  { day: 'Monday', hours: '17:00 - 22:00', closed: false },
  { day: 'Tuesday', hours: '17:00 - 22:00', closed: false },
  { day: 'Wednesday', hours: '17:00 - 22:00', closed: false },
  { day: 'Thursday', hours: '17:00 - 23:00', closed: false },
  { day: 'Friday', hours: '17:00 - 00:00', closed: false },
  { day: 'Saturday', hours: '12:00 - 00:00', closed: false },
  { day: 'Sunday', hours: '12:00 - 21:00', closed: false },
];

export const OpeningHours = () => {
  return (
    <div className="bg-zinc-900 text-white p-8 md:p-12 rounded-sm border border-zinc-800 shadow-2xl">
      <div className="flex items-center gap-3 mb-8">
        <Clock className="text-[#C5A059] w-6 h-6" />
        <h3 className="text-2xl font-bold uppercase tracking-tighter">Opening Hours</h3>
      </div>
      
      <div className="space-y-4">
        {HOURS.map((item) => (
          <div 
            key={item.day} 
            className="flex justify-between items-center border-b border-zinc-800 pb-3 group"
          >
            <span className="font-medium text-zinc-400 group-hover:text-white transition-colors">
              {item.day}
            </span>
            <span className={cn(
              "font-bold tracking-widest text-sm",
              item.closed ? "text-rose-500" : "text-[#C5A059]"
            )}>
              {item.closed ? 'CLOSED' : item.hours}
            </span>
          </div>
        ))}
      </div>
      
      <div className="mt-10 p-4 bg-zinc-800/50 rounded-sm border border-zinc-700/50">
        <p className="text-xs text-zinc-400 leading-relaxed">
          * Kitchen closes 45 minutes before closing time. <br />
          * For parties larger than 8, please call us directly for arrangements.
        </p>
      </div>
    </div>
  );
};