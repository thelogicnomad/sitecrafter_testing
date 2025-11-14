import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProfileCardProps {
  name: string;
  title: string;
  imageUrl: string;
  className?: string;
}

export default function ProfileCard({ name, title, imageUrl, className }: ProfileCardProps) {
  return (
    <motion.div
      className={cn("bg-au-surface rounded-lg shadow-au-lg overflow-hidden text-center p-6 group", className)}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="relative w-32 h-32 mx-auto">
        <img
          src={imageUrl}
          alt={name}
          className="rounded-full w-full h-full object-cover border-4 border-au-surface group-hover:border-au-accent transition-colors duration-300"
        />
      </div>
      <h3 className="mt-4 text-xl font-bold font-serif text-au-primary">{name}</h3>
      <p className="text-au-text-muted mt-1">{title}</p>
    </motion.div>
  );
}