import React, { useState, useEffect, useCallback } from 'react';
    import { useForm, SubmitHandler } from 'react-hook-form';
    import { zodResolver } from '@hookform/resolvers/zod';
    import { z } from 'zod';
    import { cn } from '@/lib/utils';
    import { Input } from '@/components/ui/Input';
    import { Button } from '@/components/ui/Button';
    import { Card } from '@/components/ui/Card';
    import { motion } from 'framer-motion';
    import { toast } from 'sonner';

    // Dummy Product Type (aligned with ProductDetailPage's mockProductData)
    interface Product {
      id: string;
      name: string;
      basePrice: number;
      customizationOptions: {
        size: { label: string; priceModifier: number; value: string }[];
        flavor: { label: string; priceModifier: number; value: string }[];
        addons: { label: string; priceModifier: number; value: string }[];
      };
    }

    interface CustomizationFormProps {
      productData: Product;
      onSubmit: (data: CustomizationFormData, finalPrice: number) => void; // Now passes finalPrice
      onPriceUpdate: (price: number) => void; // Callback to update parent's price state
      className?: string;
    }

    // Zod schema for form validation
    const customizationSchema = z.object({
      size: z.string().min(1, 'Please select a size.'),
      flavor: z.string().min(1, 'Please select a flavor.'),
      addons: z.array(z.string()).optional(),
      specialInstructions: z.string().max(500, 'Instructions cannot exceed 500 characters.').optional(),
      quantity: z.number().min(1, 'Quantity must be at least 1.').max(10, 'Maximum quantity is 10.').default(1),
    });

    type CustomizationFormData = z.infer<typeof customizationSchema>;

    const CustomizationForm: React.FC<CustomizationFormProps> = ({ productData, onSubmit, onPriceUpdate, className }) => {
      const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<CustomizationFormData>({
        resolver: zodResolver(customizationSchema),
        defaultValues: {
          size: productData.customizationOptions.size[0]?.value || '', // Use 'value' for radio buttons
          flavor: productData.customizationOptions.flavor[0]?.value || '', // Use 'value' for radio buttons
          addons: [],
          quantity: 1,
        },
      });

      const watchedSize = watch('size');
      const watchedFlavor = watch('flavor');
      const watchedAddons = watch('addons');
      const watchedQuantity = watch('quantity');

      const [calculatedPrice, setCalculatedPrice] = useState(productData.basePrice);

      // Dynamic price calculation
      const calculatePrice = useCallback(() => {
        let currentPrice = productData.basePrice;

        const selectedSize = productData.customizationOptions.size.find(
          (opt) => opt.value === watchedSize
        );
        if (selectedSize) {
          currentPrice += selectedSize.priceModifier;
        }

        const selectedFlavor = productData.customizationOptions.flavor.find(
          (opt) => opt.value === watchedFlavor
        );
        if (selectedFlavor) {
          currentPrice += selectedFlavor.priceModifier;
        }

        watchedAddons?.forEach((addonValue) => { // Use addonValue instead of addonLabel
          const selectedAddon = productData.customizationOptions.addons.find(
            (opt) => opt.value === addonValue
          );
          if (selectedAddon) {
            currentPrice += selectedAddon.priceModifier;
          }
        });

        setCalculatedPrice(currentPrice * watchedQuantity);
      }, [productData, watchedSize, watchedFlavor, watchedAddons, watchedQuantity]);

      useEffect(() => {
        calculatePrice();
      }, [calculatePrice]);

      // Notify parent of price changes
      useEffect(() => {
        onPriceUpdate(calculatedPrice);
      }, [calculatedPrice, onPriceUpdate]);


      const onFormSubmit: SubmitHandler<CustomizationFormData> = async (data) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        onSubmit(data, calculatedPrice); // Pass both data and final price
        toast.success('Custom cake order submitted!', {
          description: `Your custom "${productData.name}" with a total of $${calculatedPrice.toFixed(2)} has been added to your cart.`,
        });
      };

      const handleAddonToggle = (addonValue: string) => { // Use addonValue
        const currentAddons = watchedAddons || [];
        if (currentAddons.includes(addonValue)) {
          setValue('addons', currentAddons.filter(item => item !== addonValue));
        } else {
          setValue('addons', [...currentAddons, addonValue]);
        }
      };

      return (
        <Card className={cn('p-8 max-w-2xl mx-auto bg-white/95 backdrop-blur-sm', className)}>
          <motion.h2
            className="text-3xl font-bold text-primary mb-6 text-center font-poppins"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Customize Your {productData.name}
          </motion.h2>

          <form id="customization-form" onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            {/* Size Selection */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <label htmlFor="size" className="block text-lg font-semibold text-gray-800 mb-2">
                Size:
              </label>
              <div className="flex flex-wrap gap-3" role="radiogroup" aria-labelledby="size">
                {productData.customizationOptions.size.map((option) => (
                  <label
                    key={option.value}
                    className={cn(
                      'px-5 py-2 border rounded-full cursor-pointer transition-colors duration-200',
                      'text-gray-700 hover:bg-secondary/20',
                      watchedSize === option.value ? 'bg-secondary text-primary font-bold border-primary' : 'bg-gray-100 border-gray-300'
                    )}
                  >
                    <input
                      type="radio"
                      {...register('size')}
                      value={option.value}
                      className="sr-only"
                      aria-checked={watchedSize === option.value}
                    />
                    {option.label} (+${option.priceModifier.toFixed(2)})
                  </label>
                ))}
              </div>
              {errors.size && <p className="mt-1 text-sm text-red-600">{errors.size.message}</p>}
            </motion.div>

            {/* Flavor Selection */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <label htmlFor="flavor" className="block text-lg font-semibold text-gray-800 mb-2">
                Flavor:
              </label>
              <div className="flex flex-wrap gap-3" role="radiogroup" aria-labelledby="flavor">
                {productData.customizationOptions.flavor.map((option) => (
                  <label
                    key={option.value}
                    className={cn(
                      'px-5 py-2 border rounded-full cursor-pointer transition-colors duration-200',
                      'text-gray-700 hover:bg-secondary/20',
                      watchedFlavor === option.value ? 'bg-secondary text-primary font-bold border-primary' : 'bg-gray-100 border-gray-300'
                    )}
                  >
                    <input
                      type="radio"
                      {...register('flavor')}
                      value={option.value}
                      className="sr-only"
                      aria-checked={watchedFlavor === option.value}
                    />
                    {option.label} (+${option.priceModifier.toFixed(2)})
                  </label>
                ))}
              </div>
              {errors.flavor && <p className="mt-1 text-sm text-red-600">{errors.flavor.message}</p>}
            </motion.div>

            {/* Add-ons Selection */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <label className="block text-lg font-semibold text-gray-800 mb-2">
                Add-ons:
              </label>
              <div className="flex flex-wrap gap-3" role="group" aria-label="Add-ons">
                {productData.customizationOptions.addons.map((option) => (
                  <label
                    key={option.value}
                    className={cn(
                      'px-5 py-2 border rounded-full cursor-pointer transition-colors duration-200',
                      'text-gray-700 hover:bg-secondary/20',
                      watchedAddons?.includes(option.value) ? 'bg-secondary text-primary font-bold border-primary' : 'bg-gray-100 border-gray-300'
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={watchedAddons?.includes(option.value)}
                      onChange={() => handleAddonToggle(option.value)}
                      className="sr-only"
                    />
                    {option.label} (+${option.priceModifier.toFixed(2)})
                  </label>
                ))}
              </div>
            </motion.div>

            {/* Quantity */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Input
                id="quantity"
                label="Quantity"
                type="number"
                {...register('quantity', { valueAsNumber: true })}
                error={errors.quantity?.message}
                min={1}
                max={10}
                className="w-24"
              />
            </motion.div>

            {/* Special Instructions */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
              <label htmlFor="specialInstructions" className="block text-lg font-semibold text-gray-800 mb-2">
                Special Instructions:
              </label>
              <textarea
                id="specialInstructions"
                {...register('specialInstructions')}
                rows={4}
                className={cn(
                  'block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none transition-all duration-200',
                  'bg-white text-gray-900 placeholder-gray-400',
                  'border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary/50',
                  errors.specialInstructions && 'border-red-500 focus:border-red-500 focus:ring-red-500/50',
                  'shadow-inner-gilded'
                )}
                placeholder="E.g., 'Please add a custom message: Happy Birthday, Sarah!'"
                aria-invalid={!!errors.specialInstructions}
                aria-describedby={errors.specialInstructions ? 'specialInstructions-error' : undefined}
              />
              {errors.specialInstructions && (
                <p id="specialInstructions-error" role="alert" className="mt-1 text-sm text-red-600">
                  {errors.specialInstructions.message}
                </p>
              )}
            </motion.div>

            {/* Price and Submit - Removed from here, handled in ProductDetailPage */}
          </form>
        </Card>
      );
    };

    export { CustomizationForm };