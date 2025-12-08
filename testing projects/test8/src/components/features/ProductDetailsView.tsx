import React from 'react';
    import { cn, getSeededImageUrl } from '@/lib/utils';
    import { Button } from '@/components/ui/Button';
    import { ShoppingCart, Star } from 'lucide-react';
    import { motion } from 'framer-motion';

    // Dummy Product Type
    interface Product {
      id: string;
      name: string;
      price: number;
      imageUrl?: string;
      images?: string[]; // Added for image gallery
      description: string;
      longDescription?: string;
      ingredients?: string[];
      allergens?: string[];
      averageRating?: number;
      reviewCount?: number;
    }

    interface ProductDetailsViewProps {
      productData: Product;
      onAddToCart?: (productId: string, quantity: number) => void;
      className?: string;
    }

    const ProductDetailsView: React.FC<ProductDetailsViewProps> = ({
      productData,
      onAddToCart,
      className,
    }) => {
      const {
        id,
        name,
        price,
        imageUrl,
        images,
        description,
        longDescription,
        ingredients,
        allergens,
        averageRating = 4.5,
        reviewCount = 120,
      } = productData;

      const [mainImage, setMainImage] = React.useState(imageUrl || (images && images.length > 0 ? images[0] : getSeededImageUrl(name.replace(/\s/g, '-'), 800, 600)));

      React.useEffect(() => {
        setMainImage(imageUrl || (images && images.length > 0 ? images[0] : getSeededImageUrl(name.replace(/\s/g, '-'), 800, 600)));
      }, [imageUrl, images, name]);


      const handleAddToCart = () => {
        onAddToCart?.(id, 1); // Default quantity 1
        console.log(`Added ${name} to cart.`);
      };

      const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: 'easeOut' },
      };

      return (
        <section className={cn('bg-white rounded-lg', className)} aria-labelledby="product-name">
          <div className="grid grid-cols-1 gap-10">
            {/* Product Image Gallery */}
            <motion.div
              className="relative rounded-lg overflow-hidden shadow-md"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <img
                src={mainImage}
                alt={`Image of ${name}`}
                className="w-full h-full max-h-[500px] object-cover"
                width={800}
                height={600}
              />
              {/* Add a subtle gradient overlay for elegance */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </motion.div>

            {images && images.length > 1 && (
              <div className="grid grid-cols-4 gap-4 mt-4">
                {images.map((img, index) => (
                  <motion.img
                    key={index}
                    src={img}
                    alt={`${name} thumbnail ${index + 1}`}
                    className={cn(
                      "w-full h-20 object-cover rounded-md cursor-pointer border-2 transition-all duration-200",
                      img === mainImage ? "border-primary shadow-md" : "border-gray-200 hover:border-secondary"
                    )}
                    onClick={() => setMainImage(img)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    width={200}
                    height={200}
                  />
                ))}
              </div>
            )}

            {/* Product Details */}
            <div className="flex flex-col justify-between">
              <motion.div {...fadeIn}>
                <h1 id="product-name" className="text-4xl font-extrabold text-primary mb-3 font-poppins">
                  {name}
                </h1>
                <p className="text-2xl font-bold text-primary-dark mb-4 font-inter">
                  ${price.toFixed(2)}
                </p>

                <div className="flex items-center mb-4">
                  <div className="flex mr-2" aria-label={`Average rating: ${averageRating} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'h-5 w-5',
                          i < Math.floor(averageRating) ? 'text-secondary fill-secondary' : 'text-gray-300'
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    ({reviewCount} reviews)
                  </span>
                </div>

                <p className="text-gray-700 leading-relaxed mb-6 font-inter">
                  {longDescription || description}
                </p>

                {ingredients && ingredients.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-primary mb-2">Ingredients:</h3>
                    <ul className="list-disc list-inside text-gray-600 text-sm">
                      {ingredients.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {allergens && allergens.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-red-700 mb-2">Allergens:</h3>
                    <ul className="list-disc list-inside text-red-600 text-sm font-semibold">
                      {allergens.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>

              {onAddToCart && (
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                >
                  <Button variant="primary" size="lg" onClick={handleAddToCart} className="w-full sm:w-auto">
                    <ShoppingCart className="h-5 w-5 mr-3" />
                    Add to Cart
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      );
    };

    export { ProductDetailsView };