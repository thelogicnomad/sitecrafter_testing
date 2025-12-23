import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  title: string;
  description: string;
  date: string;
}

interface AdmissionsTimelineProps {
  steps: Step[];
  activeStep: number;
}

export const AdmissionsTimeline = ({ steps, activeStep }: AdmissionsTimelineProps) => {
  return (
    <div className="relative">
      {/* Vertical Line */}
      <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-slate-200" />
      
      <div className="space-y-8">
        {steps.map((step, index) => {
          const isCompleted = index < activeStep;
          const isActive = index === activeStep;
          
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex items-start gap-6 pl-1"
            >
              <div className={cn(
                "relative z-10 flex items-center justify-center w-9 h-9 rounded-full bg-white border-2 transition-colors duration-300",
                isCompleted ? "border-[#177D5E] bg-emerald-50" : 
                isActive ? "border-[#1B4592] ring-4 ring-blue-50" : 
                "border-slate-200"
              )}>
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-[#177D5E]" />
                ) : (
                  <Circle className={cn(
                    "w-3 h-3 transition-colors duration-300",
                    isActive ? "fill-[#1B4592] text-[#1B4592]" : "text-slate-300"
                  )} />
                )}
              </div>
              
              <div className="flex-1 pt-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 mb-1">
                  <h4 className={cn(
                    "text-lg font-bold transition-colors duration-300",
                    isActive ? "text-[#1B4592]" : "text-slate-900"
                  )}>
                    {step.title}
                  </h4>
                  <span className="text-sm font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {step.date}
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};