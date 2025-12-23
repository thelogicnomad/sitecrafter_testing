import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, BookOpen, Star, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

export interface Course {
  id: string;
  title: string;
  instructor: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  lessons: number;
  rating: number;
  price: string;
  image: string;
  description: string;
}

interface CourseCardProps {
  course: Course;
  onEnroll?: (courseId: string) => void;
}

export const CourseCard = ({ course, onEnroll }: CourseCardProps) => {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        {!imgError ? (
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImgError(true)}
            crossOrigin="anonymous"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#2d5a88] to-[#1a1c23] flex items-center justify-center p-6">
            <PlayCircle className="w-12 h-12 text-white/50" />
          </div>
        )}
        <div className="absolute top-4 left-4">
          <Badge 
            label={course.level} 
            variant={course.level === 'Beginner' ? 'success' : course.level === 'Intermediate' ? 'primary' : 'accent'} 
          />
        </div>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={cn("w-4 h-4 fill-current", i >= Math.floor(course.rating) && "opacity-30")} />
            ))}
          </div>
          <span className="text-xs font-bold text-slate-500">({course.rating})</span>
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-[#2d5a88] transition-colors">
          {course.title}
        </h3>
        <p className="text-slate-500 text-sm mb-4 line-clamp-2">{course.description}</p>

        <div className="flex items-center justify-between text-slate-500 text-sm mb-6 pb-6 border-b border-slate-50">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {course.duration}
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            {course.lessons} Lessons
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 font-medium">Full Course</span>
            <span className="text-2xl font-bold text-slate-900">{course.price}</span>
          </div>
          <Button size="sm" onClick={() => onEnroll?.(course.id)}>
            Enroll Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
};