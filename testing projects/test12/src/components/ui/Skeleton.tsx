import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  circle?: boolean;
}

export const Skeleton = ({ className, circle }: SkeletonProps) => {
  return (
    <div
      className={cn(
        'animate-pulse bg-zinc-200',
        circle ? 'rounded-full' : 'rounded-md',
        className
      )}
    />
  );
};