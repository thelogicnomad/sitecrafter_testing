import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import type { Recipe } from '@/types';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface CakeCardProps {
  cake: Recipe;
}

const CakeCard = ({ cake }: CakeCardProps) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full group"
      whileHover={{ y: -5, boxShadow: '0 25px 50px -12px rgba(45, 29, 21, 0.25)' }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Link to={`/recipe/${cake.id}`} className="flex flex-col h-full">
        <div className="aspect-video overflow-hidden">
          <img 
            src={cake.imageUrl} 
            alt={cake.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
            loading="lazy"
          />
        </div>
        <div className="p-6 flex-grow flex flex-col">
          <div className="flex justify-between items-start">
            <span className="inline-block px-3 py-1 bg-primary-light/20 text-primary rounded-full text-xs font-semibold mb-3">
              {cake.category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="text-accent fill-current" size={16} />
              <span className="font-semibold text-sm">{cake.rating}</span>
            </div>
          </div>
          <h3 className="text-xl font-display font-bold text-primary mb-2 flex-grow">
            {cake.name}
          </h3>
          <p className="text-foreground/70 text-sm mb-4">
            {cake.description}
          </p>
          <div className="mt-auto flex justify-between items-center">
            <p className="text-2xl font-bold text-primary">${cake.price}</p>
            <span className="text-accent font-semibold hover:text-accent-hover transition-colors">
              View Details &rarr;
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CakeCard;