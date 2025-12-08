import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProductById, fetchProducts } from '@/lib/mockApi';
import SeoMeta from '@/components/shared/SeoMeta';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import NotFoundPage from './NotFoundPage';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import ProductCard from '@/components/shared/ProductCard';

const ProductDetailPage = () => {
  const { id } = useParams();
  const productId = Number(id);
  const addItem = useCartStore(state => state.addItem);
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading, isError } = useQuery({ 
    queryKey: ['product', productId], 
    queryFn: () => fetchProductById(productId),
    enabled: !!productId
  });

  const { data: relatedProducts } = useQuery({
    queryKey: ['relatedProducts', productId],
    queryFn: () => fetchProducts().then(products => 
      products.filter(p => p.category === product?.category && p.id !== productId).slice(0, 4)
    ),
    enabled: !!product
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError || !product) return <NotFoundPage />;

  const handleAddToCart = () => {
    // A real implementation would handle adding multiple at once
    for (let i = 0; i < quantity; i++) {
        addItem(product);
    }
  };

  return (
    <SeoMeta
      title={`${product.name} | Artisan Bakehouse`}
      description={`Buy the ${product.name} online. ${product.description}`}
    >
      <div className="container-max section-spacing">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <img src={product.imageUrl} alt={product.name} className="w-full h-auto object-cover rounded-lg elevated-shadow" />
          </div>
          <div>
            <span className="text-sm font-semibold text-primary uppercase">{product.category}</span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mt-2">{product.name}</h1>
            <p className="text-2xl font-bold text-foreground mt-4">{formatPrice(product.price)}</p>
            <p className="text-muted-foreground mt-4">{product.description}</p>

            {product.details?.ingredients && (
                <div className="mt-6">
                    <h3 className="font-semibold">Ingredients</h3>
                    <p className="text-sm text-muted-foreground">{product.details.ingredients.join(', ')}</p>
                </div>
            )}
            
            <div className="flex items-center gap-4 mt-8">
              <div className="flex items-center border rounded-md">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-2">-</button>
                <span className="px-4">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-2">+</button>
              </div>
              <Button size="lg" variant="accent" onClick={handleAddToCart}>Add to Cart</Button>
            </div>
          </div>
        </div>

        {relatedProducts && relatedProducts.length > 0 && (
          <div className="mt-24">
            <h2 className="text-3xl font-heading font-bold text-center">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
              {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </SeoMeta>
  );
};

export default ProductDetailPage;