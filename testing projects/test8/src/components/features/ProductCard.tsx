import React from 'react';
    import { motion } from 'framer-motion';
    import { Card } from '@/components/ui/Card';
    import { Button } from '@/components/ui/Button';
    import { ClickSpark } from '@/components/ui/ClickSpark';
    import { cn, getRandomImageUrl } from '@/lib/utils';
    import { ShoppingCart } from 'lucide-react';
    import { Link } from 'react-router-dom';

    // Dummy Product Type
    interface Product {
      id: string;
      name: string;
      price: number;
      imageUrl?: string;
      description: string;
    }

    interface ProductCardProps {
      productData: Product;
      onAddToCart: (productId: string) => void;
      className?: string;
    }

    const ProductCard: React.FC<ProductCardProps> = ({ productData, onAddToCart, className }) => {
      const { id, name, price, imageUrl } = productData;

      return (
        <Card
          className={cn(
            'flex flex-col h-full overflow-hidden bg-white/95 backdrop-blur-sm',
            'transform transition-transform duration-300 ease-in-out hover:-translate-y-1',
            className
          )}
          shadowStyle="lifted"
        >
          <Link to={`/product/${id}`} aria-label={`View details for ${name}`}>
            <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
              <img
                src={imageUrl || getRandomImageUrl(400, 300)}
                alt={name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                width={400}
                height={300}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </Link>

          <div className="p-4 flex flex-col flex-grow">
            <Link to={`/product/${id}`} className="hover:text-primary-dark">
              <h3 className="text-xl font-semibold text-primary mb-2 font-poppins line-clamp-2">{name}</h3>
            </Link>
            <p className="text-gray-600 text-sm mb-3 flex-grow line-clamp-3">{productData.description}</p>
            <div className="flex items-center justify-between mt-auto pt-2">
              <span className="text-2xl font-bold text-primary-dark font-inter">
                ${price.toFixed(2)}
              </span>
              <ClickSpark>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onAddToCart(id)}
                  aria-label={`Add ${name} to cart`}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </ClickSpark>
            </div>
          </div>
        </Card>
      );
    };

    export { ProductCard };