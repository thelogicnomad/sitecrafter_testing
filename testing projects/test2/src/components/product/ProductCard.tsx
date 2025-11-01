import { motion } from 'framer-motion';
    import { ShoppingCart } from 'lucide-react';
    import { Button } from '@/components/ui/Button';
    import useCartStore from '@/store/cartStore';
    import { toast } from 'sonner';
    import MagicBento from '@/components/ui/MagicBento';
    import ClickSpark from '@/components/ui/ClickSpark';

    type Product = {
      id: number;
      name: string;
      price: number;
      image: string;
      category: string;
    };
    
    interface ProductCardProps {
      product: Product;
    }

    const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
      const addToCart = useCartStore((state) => state.addItem);

      const handleAddToCart = () => {
        addToCart({ ...product, quantity: 1 });
        toast.success(`${product.name} added to cart!`);
      };

      return (
        <MagicBento className="bg-background/50 backdrop-blur-sm">
            <div className="flex h-full flex-col p-4">
                <div className="mb-4 aspect-square w-full overflow-hidden rounded-md">
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-300 hover:scale-110" />
                </div>
                <div className="flex-grow">
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                    <h3 className="font-heading text-xl font-semibold text-secondary">{product.name}</h3>
                </div>
                <div className="mt-4 flex items-center justify-between">
                    <p className="text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
                     <ClickSpark>
                        <Button size="sm" onClick={handleAddToCart}>
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Add to Cart
                        </Button>
                    </ClickSpark>
                </div>
            </div>
        </MagicBento>
      );
    };

    export default ProductCard;