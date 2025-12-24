import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap, Target, TrendingUp, Trophy } from 'lucide-react';
import { Card } from '../ui/Card';

// cn utility - ALWAYS define inline
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface StatItemProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon: any;
  colorClass: string;
}

const StatItem: React.FC<StatItemProps> = ({ label, value, subValue, icon: Icon, colorClass }) => (
  <div className="flex items-start gap-4">
    <div className={cn('p-3 rounded-xl bg-slate-800/50 border border-slate-700', colorClass)}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</p>
      <div className="flex items-baseline gap-2">
        <h4 className="text-2xl font-black text-white">{value}</h4>
        {subValue && <span className="text-xs text-slate-400">{subValue}</span>}
      </div>
    </div>
  </div>
);

export const StatsDashboard: React.FC = () => {
  const weeklyData = [
    { day: 'M', height: '60%' },
    { day: 'T', height: '80%' },
    { day: 'W', height: '45%' },
    { day: 'T', height: '90%' },
    { day: 'F', height: '70%' },
    { day: 'S', height: '30%' },
    { day: 'S', height: '50%' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Stats Card */}
      <Card className="lg:col-span-2 bg-[#0D1B2A] border-[#00D9FF]/20 overflow-visible" isHolographic>
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="flex-1 space-y-8">
            <h3 className="text-2xl font-black text-white italic tracking-tighter flex items-center gap-2">
              <Activity className="text-[#00D9FF]" /> BIOMETRIC OVERVIEW
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <StatItem 
                label="Active Calories" 
                value="1,284" 
                subValue="kcal" 
                icon={Zap} 
                colorClass="text-amber-400" 
              />
              <StatItem 
                label="Avg Heart Rate" 
                value="142" 
                subValue="bpm" 
                icon={Activity} 
                colorClass="text-rose-500" 
              />
              <StatItem 
                label="Total Time" 
                value="4.5" 
                subValue="hrs" 
                icon={TrendingUp} 
                colorClass="text-blue-400" 
              />
              <StatItem 
                label="Rank Progress" 
                value="Elite II" 
                subValue="78%" 
                icon={Trophy} 
                colorClass="text-[#00D9FF]" 
              />
            </div>
          </div>

          <div className="w-full md:w-48 flex flex-col justify-end">
             <div className="flex items-end justify-between h-32 gap-2 mb-2">
                {(weeklyData ?? []).map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 flex-1">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: item.height }}
                      transition={{ delay: i * 0.1, duration: 1 }}
                      className="w-full bg-gradient-to-t from-[#00D9FF]/20 to-[#00D9FF] rounded-t-sm"
                    />
                    <span className="text-[10px] font-bold text-slate-500">{item.day}</span>
                  </div>
                ))}
             </div>
             <p className="text-[10px] text-center font-bold text-[#00D9FF] tracking-widest uppercase">Weekly Output</p>
          </div>
        </div>
      </Card>

      {/* Side Profile Card */}
      <Card className="bg-[#1F3A52] border-slate-700">
        <div className="text-center space-y-4">
          <div className="relative inline-block">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#00D9FF] to-blue-600 p-1 shadow-[0_0_25px_rgba(0,217,255,0.4)]">
              <div className="w-full h-full rounded-full bg-[#0D1B2A] flex items-center justify-center overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1615843423179-bea071facf96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDczNjF8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjB1c2VyJTIwYXZhdGFyfGVufDB8fHx8MTc2NjU4NDQ0Mnww&ixlib=rb-4.1.0&q=80&w=1080" 
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-6 h-6 rounded-full border-4 border-[#1F3A52]" />
          </div>
          
          <div>
            <h4 className="text-xl font-bold text-white">Xenon_Rider</h4>
            <p className="text-slate-400 text-sm">Level 42 Cyber-Athlete</p>
          </div>

          <div className="pt-4 space-y-3">
             <div className="flex justify-between text-xs font-bold text-slate-300 px-2 uppercase tracking-wider">
               <span>Next Milestone</span>
               <span>850 / 1000 XP</span>
             </div>
             <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: '85%' }}
                 className="h-full bg-[#00D9FF]" 
               />
             </div>
          </div>

          <button className="w-full mt-4 py-3 bg-[#0D1B2A] text-[#00D9FF] border border-[#00D9FF]/30 rounded-xl font-black uppercase tracking-tighter hover:bg-[#00D9FF] hover:text-[#0D1B2A] transition-all">
            View Global Ranking
          </button>
        </div>
      </Card>
    </div>
  );
};