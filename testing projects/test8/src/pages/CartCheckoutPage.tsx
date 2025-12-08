import React from 'react';
    import { motion } from 'framer-motion';
    import { useForm } from 'react-hook-form';
    import { zodResolver } from '@hookform/resolvers/zod';
    import { z } from 'zod';
    import { Button } from '@/components/ui/Button';
    import { Input } from '@/components/ui/Input';
    import { Card } from '@/components/ui/Card';
    import { ShinyText } from '@/components/ui/ShinyText';
    import { getSeededImageUrl } from '@/lib/utils';
    import { ShoppingCart, Package, CreditCard } from 'lucide-react';
    import { toast } from 'sonner';

    // Mock Cart State (for demonstration purposes)
    // In a real application, this data would come from a global state management solution (e.g., Zustand)
    // or be fetched from an API.
    const mockCartItems = [
      {
        id: '1',
        name: 'Velvet Rose Cake',
        price: 65.00,
        quantity: 1,
        imageUrl: getSeededImageUrl('rose-cake-cart', 100, 100),
      },
      {
        id: '2',
        name: 'Golden Caramel Macarons (Set of 6)',
        price: 28.00,
        quantity: 2,
        imageUrl: getSeededImageUrl('macarons-cart', 100, 100),
      },
      {
        id: '3',
        name: 'Artisan Berry Tart',
        price: 45.00,
        quantity: 1,
        imageUrl: getSeededImageUrl('berry-tart-cart', 100, 100),
      },
    ];

    // Zod schema for checkout form validation
    const checkoutSchema = z.object({
      fullName: z.string().min(1, 'Full name is required'),
      email: z.string().email('Invalid email address'),
      phone: z.string().optional(), // Optional phone number
      address: z.string().min(1, 'Shipping address is required'),
      city: z.string().min(1, 'City is required'),
      state: z.string().min(1, 'State/Province is required'),
      zipCode: z.string().min(1, 'Zip/Postal Code is required'),
      country: z.string().min(1, 'Country is required'),
      // Payment Information (simplified for frontend demo)
      cardName: z.string().min(1, 'Name on card is required'),
      cardNumber: z.string()
        .min(1, 'Card number is required')
        .regex(/^\d{16}$/, 'Card number must be 16 digits'),
      expiryDate: z.string()
        .min(1, 'Expiry date is required')
        .regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'Invalid expiry date (MM/YY)'),
      cvv: z.string()
        .min(1, 'CVV is required')
        .regex(/^\d{3,4}$/, 'Invalid CVV (3 or 4 digits)'),
    });

    type CheckoutFormInputs = z.infer<typeof checkoutSchema>;

    const CartCheckoutPage: React.FC = () => {
      const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CheckoutFormInputs>({
        resolver: zodResolver(checkoutSchema),
      });

      const pageVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
      };

      const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.2 } },
      };

      const subtotal = mockCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
      const shippingCost = subtotal > 150 ? 0 : 15.00; // Free shipping over $150
      const taxRate = 0.08; // 8% sales tax
      const estimatedTax = subtotal * taxRate;
      const grandTotal = subtotal + shippingCost + estimatedTax;

      const onSubmit = async (data: CheckoutFormInputs) => {
        console.log('Checkout Form Data:', data);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        toast.success('Order Placed!', {
          description: `Your order for $${grandTotal.toFixed(2)} has been successfully placed.`,
        });
        // In a real app, you would redirect to an order confirmation page or update global state.
      };

      return (
        <motion.div
          className="container mx-auto px-4 py-16 max-w-7xl"
          initial="hidden"
          animate="visible"
          variants={pageVariants}
        >
          <motion.h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-primary">
            <ShinyText text="Your Cart & Checkout" />
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Summary */}
            <motion.div variants={sectionVariants} className="lg:col-span-1">
              <Card className="p-6 h-full flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
                    <ShoppingCart className="mr-2 text-secondary" size={28} /> Cart Summary
                  </h2>
                  {mockCartItems.length === 0 ? (
                    <p className="text-gray-600 text-lg">Your cart is empty.</p>
                  ) : (
                    <ul className="space-y-4 mb-6">
                      {mockCartItems.map((item) => (
                        <li key={item.id} className="flex items-center gap-4 border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                          <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md shadow-sm" width={64} height={64} />
                          <div className="flex-grow">
                            <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                          <span className="font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="border-t border-gray-200 pt-6 mt-6 space-y-3 text-lg">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Subtotal:</span>
                      <span className="font-semibold text-gray-800">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Shipping:</span>
                      <span className="font-semibold text-gray-800">
                        {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Estimated Tax ({(taxRate * 100).toFixed(0)}%):</span>
                      <span className="font-semibold text-gray-800">${estimatedTax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-xl pt-4 border-t border-gray-300 mt-4">
                      <span className="text-primary">Grand Total:</span>
                      <span className="text-primary">${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Checkout Form & Order Review */}
            <motion.div variants={sectionVariants} className="lg:col-span-2">
              <Card className="p-8">
                <h2 className="text-3xl font-bold text-primary mb-8 flex items-center">
                  <Package className="mr-2 text-secondary" size={32} /> Shipping & Payment
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  {/* Shipping Information */}
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Shipping Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                      <Input
                        label="Full Name"
                        id="fullName"
                        {...register('fullName')}
                        error={errors.fullName?.message}
                        placeholder="John Doe"
                      />
                      <Input
                        label="Email Address"
                        id="email"
                        type="email"
                        {...register('email')}
                        error={errors.email?.message}
                        placeholder="john.doe@example.com"
                      />
                      <Input
                        label="Phone Number (Optional)"
                        id="phone"
                        type="tel"
                        {...register('phone')}
                        error={errors.phone?.message}
                        placeholder="+1 (555) 123-4567"
                      />
                      <div className="md:col-span-2">
                        <Input
                          label="Address"
                          id="address"
                          {...register('address')}
                          error={errors.address?.message}
                          placeholder="123 Luxury Lane"
                        />
                      </div>
                      <Input
                        label="City"
                        id="city"
                        {...register('city')}
                        error={errors.city?.message}
                        placeholder="Metropolis"
                      />
                      <Input
                        label="State/Province"
                        id="state"
                        {...register('state')}
                        error={errors.state?.message}
                        placeholder="NY"
                      />
                      <Input
                        label="Zip/Postal Code"
                        id="zipCode"
                        {...register('zipCode')}
                        error={errors.zipCode?.message}
                        placeholder="10001"
                      />
                      <Input
                        label="Country"
                        id="country"
                        {...register('country')}
                        error={errors.country?.message}
                        placeholder="United States"
                      />
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center">
                      <CreditCard className="mr-2 text-secondary" size={24} /> Payment Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                      <div className="md:col-span-2">
                        <Input
                          label="Name on Card"
                          id="cardName"
                          {...register('cardName')}
                          error={errors.cardName?.message}
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Input
                          label="Card Number"
                          id="cardNumber"
                          type="text" // Use text to allow formatting, or pattern for strict
                          inputMode="numeric"
                          pattern="[0-9]{16}"
                          maxLength={16}
                          {...register('cardNumber')}
                          error={errors.cardNumber?.message}
                          placeholder="XXXX XXXX XXXX XXXX"
                        />
                      </div>
                      <Input
                        label="Expiry Date (MM/YY)"
                        id="expiryDate"
                        type="text"
                        inputMode="numeric"
                        pattern="(0[1-9]|1[0-2])\/?([0-9]{2})"
                        maxLength={5}
                        {...register('expiryDate')}
                        error={errors.expiryDate?.message}
                        placeholder="MM/YY"
                      />
                      <Input
                        label="CVV"
                        id="cvv"
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]{3,4}"
                        maxLength={4}
                        {...register('cvv')}
                        error={errors.cvv?.message}
                        placeholder="XXX"
                      />
                    </div>
                  </div>

                  {/* Order Review & Place Order Button */}
                  <div className="border-t border-gray-200 pt-8 mt-8">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Final Order Review</h3>
                    <div className="space-y-2 text-lg mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Items Subtotal:</span>
                        <span className="font-semibold text-gray-800">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Shipping:</span>
                        <span className="font-semibold text-gray-800">
                          {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Estimated Tax:</span>
                        <span className="font-semibold text-gray-800">${estimatedTax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-xl pt-4 border-t border-gray-300 mt-4">
                        <span className="text-primary">Total to Pay:</span>
                        <span className="text-primary">${grandTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full py-3 text-xl"
                      disabled={isSubmitting}
                      variant="primary"
                    >
                      {isSubmitting ? 'Processing Order...' : 'Place Order'}
                    </Button>
                  </div>
                </form>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      );
    };

    export default CartCheckoutPage;