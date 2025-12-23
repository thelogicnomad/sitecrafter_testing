import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CardProps {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  imageAlt?: string;
}

export const Card = ({ title, subtitle, description, image, footer, children, className, imageAlt }: CardProps) => {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={cn(
        'bg-white rounded-xl shadow-lg overflow-hidden border border-zinc-100 flex flex-col h-full transition-all duration-300 hover:shadow-2xl',
        className
      )}
    >
      {image && (
        <div className="relative h-56 w-full overflow-hidden">
          {!imgError ? (
            <img
              src={image}
              alt={imageAlt || title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              onError={() => setImgError(true)}
              crossOrigin="anonymous"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-zinc-100 to-zinc-200 flex items-center justify-center">
              <span className="text-zinc-400 font-medium">Image unavailable</span>
            </div>
          )}
          {subtitle && (
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
              <span className="text-xs font-bold text-[#C5A059] uppercase tracking-tighter">{subtitle}</span>
            </div>
          )}
        </div>
      )}
      <div className="p-6 md:p-8 flex-grow flex flex-col">
        {title && <h3 className="text-xl md:text-2xl font-bold text-zinc-900 mb-2 leading-tight">{title}</h3>}
        {description && <p className="text-zinc-600 text-sm md:text-base leading-relaxed mb-4">{description}</p>}
        {children}
        {footer && <div className="mt-auto pt-6 border-t border-zinc-50">{footer}</div>}
      </div>
    </motion.div>
  );
};