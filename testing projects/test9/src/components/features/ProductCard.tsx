import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye, Heart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  isNew?: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart, onQuickView }: ProductCardProps) => {
  return (
    <Card className="group">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
        
        {product.isNew && (
          <div className="absolute top-4 left-4">
            <Badge variant="accent">New Arrival</Badge>
          </div>
        )}

        <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <button className="h-10 w-10 bg-white shadow-lg flex items-center justify-center text-[#2D231E] hover:text-[#911B44] transition-colors">
            <Heart size={20} />
          </button>
          <button 
            onClick={() => onQuickView(product)}
            className="h-10 w-10 bg-white shadow-lg flex items-center justify-center text-[#2D231E] hover:text-[#911B44] transition-colors"
          >
            <Eye size={20} />
          </button>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Button 
            className="w-full"
            onClick={() => onAddToCart(product)}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Selection
          </Button>
        </div>
      </div>

      <div className="p-5 text-center">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">{product.category}</p>
        <h3 className="text-lg font-poppins font-semibold text-[#2D231E] dark:text-white mb-2 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-[#911B44] font-bold text-xl">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </Card>
  );
};