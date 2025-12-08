import React, { useState, useEffect } from 'react';
    import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
    import { motion } from 'framer-motion';
    import { ProductDetailsView } from '@/components/features/ProductDetailsView';
    import { CustomizationForm } from '@/components/features/CustomizationForm';
    import { Button } from '@/components/ui/Button';
    import { Card } from '@/components/ui/Card';
    import { SkeletonLoader } from '@/components/ui/SkeletonLoader';
    import { getSeededImageUrl } from '@/lib/utils';
    import { ShoppingCart, Heart } from 'lucide-react';
    import { toast } from 'sonner';

    // Type for customization form data (aligned with CustomizationForm's Zod schema)
    interface CustomizationFormData {
      size: string;
      flavor: string;
      addons?: string[];
      specialInstructions?: string;
      quantity: number;
    }

    // Mock Product Data (aligned with CustomizationForm's Product interface)
    const mockProductData = {
      id: '1',
      name: 'Velvet Rose Celebration Cake',
      description: 'A luxurious red velvet cake, layered with rich cream cheese frosting and adorned with delicate edible rose petals. Perfect for anniversaries, engagements, or any moment deserving of elegance.',
      longDescription: 'Our signature Velvet Rose Celebration Cake is a masterpiece of flavor and design. Each layer of moist, vibrant red velvet sponge is infused with a hint of cocoa and vanilla, perfectly complemented by our velvety smooth, tangy cream cheese frosting. Hand-decorated with precision, it features a cascade of edible sugar roses and a gilded base, making it a stunning centerpiece for your special occasion. Available in various sizes and customization options to truly make it your own.',
      price: 85.00, // This is the default price for ProductDetailsView
      basePrice: 85.00, // Base price for customization calculations
      imageUrl: getSeededImageUrl('velvet-rose-cake', 800, 600),
      images: [
        getSeededImageUrl('velvet-rose-cake', 800, 600),
        getSeededImageUrl('velvet-rose-cake-slice', 800, 600),
        getSeededImageUrl('velvet-rose-cake-detail', 800, 600),
        getSeededImageUrl('velvet-rose-cake-top', 800, 600),
      ],
      category: 'Cakes',
      averageRating: 4.9,
      reviewCount: 120,
      // Customization options structured for CustomizationForm
      customizationOptions: {
        size: [
          { label: '6-inch (Serves 8-10)', priceModifier: 0, value: '6-inch' },
          { label: '8-inch (Serves 12-16)', priceModifier: 20.00, value: '8-inch' },
          { label: '10-inch (Serves 20-24)', priceModifier: 40.00, value: '10-inch' },
        ],
        flavor: [
          { label: 'Red Velvet', priceModifier: 0, value: 'red-velvet' },
          { label: 'Vanilla Bean', priceModifier: 5.00, value: 'vanilla-bean' },
          { label: 'Chocolate Fudge', priceModifier: 7.00, value: 'chocolate-fudge' },
        ],
        addons: [
          { label: 'Edible Gold Leaf', priceModifier: 15.00, value: 'gold-leaf' },
          { label: 'Custom Message Plaque', priceModifier: 10.00, value: 'message-plaque' },
          { label: 'Fresh Seasonal Berries', priceModifier: 20.00, value: 'fresh-berries' },
        ],
      },
      ingredients: ['Flour', 'Sugar', 'Eggs', 'Butter', 'Cream Cheese', 'Cocoa Powder', 'Vanilla Extract', 'Red Food Coloring'],
      allergens: ['Gluten', 'Dairy', 'Eggs'],
    };

    const ProductDetailPage: React.FC = () => {
      const { id } = useParams<{ id: string }>();
      const navigate = useNavigate();
      const [product, setProduct] = useState<typeof mockProductData | null>(null);
      const [isLoading, setIsLoading] = useState(true);
      const [currentPrice, setCurrentPrice] = useState(mockProductData.basePrice);

      useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
          if (id === '1' || id === 'custom') { // 'custom' can be a generic ID for custom cake builder
            setProduct(mockProductData);
            setCurrentPrice(mockProductData.basePrice); // Reset price when product loads
          } else {
            setProduct(null);
          }
          setIsLoading(false);
        }, Math.random() * 500 + 300);

        return () => clearTimeout(timer);
      }, [id]);

      const handleAddToCart = (data: CustomizationFormData, finalPrice: number) => {
        if (!product) return;
        console.log('Adding to cart:', { product: product.name, ...data, finalPrice });
        toast.success(`${data.quantity}x "${product.name}" added to cart! Total: $${finalPrice.toFixed(2)}`);
        // In a real app, dispatch to a cart state management system
        // navigate('/cart'); // Optionally navigate to cart
      };

      const handlePriceUpdate = (newPrice: number) => {
        setCurrentPrice(newPrice);
      };

      if (isLoading) {
        return (
          <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 min-h-screen">
            <div className="lg:col-span-1">
              <SkeletonLoader width="100%" height="500px" shape="rounded" className="mb-6" variant="card" />
              <div className="grid grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <SkeletonLoader key={i} width="100%" height="100px" shape="rounded" variant="card" />
                ))}
              </div>
            </div>
            <div className="lg:col-span-1 space-y-6">
              <SkeletonLoader width="80%" height="40px" shape="rounded" />
              <SkeletonLoader width="30%" height="30px" shape="rounded" />
              <SkeletonLoader width="100%" height="150px" shape="rounded" />
              <SkeletonLoader width="100%" height="300px" shape="rounded" />
              <SkeletonLoader width="50%" height="50px" shape="rounded" />
            </div>
          </div>
        );
      }

      if (!product) {
        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-2xl text-primary font-poppins"
            >
              Product not found.
            </motion.p>
          </div>
        );
      }

      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="min-h-screen bg-gray-50 text-gray-900 py-12"
        >
          <div className="container mx-auto px-4">
            <Card className="p-8 shadow-lifted-lg bg-white/70 backdrop-blur-sm">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Product Details & Image Gallery */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  <ProductDetailsView productData={product} />
                </motion.div>

                {/* Customization Form & Add to Cart */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="space-y-8"
                >
                  <h2 className="text-4xl font-bold text-primary font-poppins tracking-tight">
                    Customize Your Creation
                  </h2>
                  <CustomizationForm
                    productData={product}
                    onSubmit={handleAddToCart}
                    onPriceUpdate={handlePriceUpdate}
                  />
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                    <p className="text-4xl font-extrabold text-primary font-poppins">
                      ${currentPrice.toFixed(2)}
                    </p>
                    <div className="flex space-x-4">
                      <Button variant="ghost" size="lg" aria-label="Add to favorites">
                        <Heart className="mr-2" /> Favorite
                      </Button>
                      <Button type="submit" form="customization-form" variant="primary" size="lg" aria-label="Add to cart">
                        <ShoppingCart className="mr-2" /> Add to Cart
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </Card>
          </div>
        </motion.div>
      );
    };

    export default ProductDetailPage;