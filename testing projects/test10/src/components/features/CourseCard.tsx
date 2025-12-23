import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Clock, Star, Users, ArrowRight } from 'lucide-react';

interface CourseCardProps {
  title: string;
  instructor: string;
  rating: number;
  students: number;
  duration: string;
  price: string;
  thumbnail: string;
  category: string;
}

export const CourseCard = ({
  title,
  instructor,
  rating,
  students,
  duration,
  price,
  thumbnail,
  category
}: CourseCardProps) => {
  return (
    <Card className="flex flex-col h-full overflow-hidden p-0 group" padding="none">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={thumbnail} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <Badge label={category} variant="accent" className="bg-white/90 backdrop-blur-sm" />
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-bold text-slate-900">{rating}</span>
          <span className="text-sm text-slate-500">({students} students)</span>
        </div>
        
        <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2 min-h-[3.5rem]">
          {title}
        </h3>
        
        <p className="text-sm text-slate-600 mb-4">
          by <span className="font-medium text-slate-900">{instructor}</span>
        </p>
        
        <div className="flex items-center gap-4 mb-6 text-sm text-slate-500">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {duration}
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            Full Access
          </div>
        </div>
        
        <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
          <span className="text-2xl font-bold text-[#1B4592]">{price}</span>
          <Button size="sm" className="rounded-lg">
            Enroll Now
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};