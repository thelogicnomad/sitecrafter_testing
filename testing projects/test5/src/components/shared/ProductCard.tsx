import { Product } from '@/types';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <motion.div
      className="bg-card rounded-lg overflow-hidden subtle-shadow h-full flex flex-col"
      whileHover={{ y: -4, scale: 1.01, boxShadow: '0 8px 24px rgba(27, 10, 10, 0.1)' }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/product/${product.id}`} className="block">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-56 object-cover"
          loading="lazy"
        />
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <span className="text-xs text-primary font-semibold uppercase">{product.category}</span>
        <h3 className="font-heading text-lg font-bold mt-1 flex-grow">
          <Link to={`/product/${product.id}`} className="hover:text-primary transition-colors">{product.name}</Link>
        </h3>
        <p className="text-muted-foreground text-sm mt-2">{product.description.substring(0, 60)}...</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-foreground">{formatPrice(product.price)}</span>
          {product.price > 0 && <Button size="sm" variant="accent" onClick={() => addItem(product)}>Add to Cart</Button>}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;