import React from 'react';
import { Card } from '@/components/ui/Card';
import { Progress } from '@radix-ui/react-progress'; // Assuming radix or manual
import { BookOpen, PlayCircle, Trophy } from 'lucide-react';

interface CourseProgressTrackerProps {
  courseName: string;
  percentage: number;
  lastAccessed: string;
  totalModules: number;
  completedModules: number;
}

export const CourseProgressTracker = ({
  courseName,
  percentage,
  lastAccessed,
  totalModules,
  completedModules
}: CourseProgressTrackerProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">{courseName}</h3>
          <p className="text-sm text-slate-500">Last accessed: {lastAccessed}</p>
        </div>
        <div className="bg-blue-50 p-2 rounded-lg">
          <BookOpen className="w-6 h-6 text-[#1B4592]" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <span className="text-sm font-semibold text-slate-700">Progress</span>
          <span className="text-sm font-bold text-[#1B4592]">{percentage}%</span>
        </div>
        
        <div className="w-full bg-slate-100 rounded-full h-2.5">
          <div 
            className="bg-[#1B4592] h-2.5 rounded-full transition-all duration-500" 
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
            <PlayCircle className="w-5 h-5 text-slate-400" />
            <div>
              <p className="text-xs text-slate-500">Modules</p>
              <p className="text-sm font-bold text-slate-900">{completedModules}/{totalModules}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl">
            <Trophy className="w-5 h-5 text-[#177D5E]" />
            <div>
              <p className="text-xs text-slate-500">Certificates</p>
              <p className="text-sm font-bold text-slate-900">{percentage === 100 ? '1' : '0'}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};