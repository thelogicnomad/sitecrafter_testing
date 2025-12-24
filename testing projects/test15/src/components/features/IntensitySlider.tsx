import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Activity, Flame } from 'lucide-react';

// cn utility - ALWAYS define inline
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface IntensitySliderProps {
  min?: number;
  max?: number;
  defaultValue?: number;
  onChange?: (val: number) => void;
  accentColor?: string;
}

export const IntensitySlider: React.FC<IntensitySliderProps> = ({
  min = 1,
  max = 10,
  defaultValue = 5,
  onChange,
  accentColor = '#00D9FF'
}) => {
  const [value, setValue] = useState(defaultValue);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = parseInt(e.target.value);
    setValue(newVal);
    if (onChange) onChange(newVal);
  };

  const getIntensityLabel = (val: number) => {
    if (val <= 3) return { label: 'LOW IMPACT', icon: Activity, color: 'text-blue-400' };
    if (val <= 7) return { label: 'MODERATE', icon: Zap, color: 'text-amber-400' };
    return { label: 'EXTREME', icon: Flame, color: 'text-rose-500' };
  };

  const { label, icon: Icon, color } = getIntensityLabel(value);

  return (
    <div className="w-full bg-[#1F3A52] p-6 rounded-2xl border border-slate-700">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className={cn('p-2 rounded-lg bg-slate-800', color)}>
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 tracking-widest uppercase">Intensity Level</p>
            <h4 className={cn('text-lg font-bold tracking-tight', color)}>{label}</h4>
          </div>
        </div>
        <div className="text-3xl font-black text-white italic">
          {value}<span className="text-sm opacity-50 ml-1">/ {max}</span>
        </div>
      </div>

      <div className="relative h-8 flex items-center">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={handleSliderChange}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#00D9FF]"
        />
      </div>

      <div className="flex justify-between mt-2 px-1">
        {(Array.from({ length: max - min + 1 }) ?? []).map((_, i) => (
          <div 
            key={i} 
            className={cn(
              'w-1 h-3 rounded-full transition-colors',
              i + min <= value ? 'bg-[#00D9FF]' : 'bg-slate-700'
            )} 
          />
        ))}
      </div>
    </div>
  );
};