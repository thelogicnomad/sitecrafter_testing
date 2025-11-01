import React from 'react';
    import { Product } from '@/types';
    import { Star } from 'lucide-react';
    import { motion } from 'framer-motion';
    import Button from '../ui/Button';
    import { toast } from 'sonner';

    interface ProductCardProps {
      product: Product;
    }

    const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
      const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      };

      const handleAddToCart = () => {
        toast.success(`${product.name} added to cart!`);
      };

      return (
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full group"
        >
          <div className="relative overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="font-heading text-xl font-bold text-foreground mb-2">{product.name}</h3>
            <p className="text-muted-foreground text-sm mb-4 flex-grow">{product.description}</p>
            <div className="flex justify-between items-center mb-4">
              <p className="font-body text-lg font-bold text-accent-1">${product.price.toFixed(2)}</p>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm text-muted-foreground">{product.rating} ({product.reviewCount})</span>
              </div>
            </div>
            <Button onClick={handleAddToCart} className="w-full">Add to Cart</Button>
          </div>
        </motion.div>
      );
    };

    export default ProductCard;