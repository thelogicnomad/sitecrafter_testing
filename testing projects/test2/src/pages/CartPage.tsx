import PageTransition from '@/components/sections/PageTransition';
    import useCartStore from '@/store/cartStore';
    import { Button } from '@/components/ui/Button';
    import { Link } from 'react-router-dom';
    import { Trash2 } from 'lucide-react';
    import { toast } from 'sonner';

    const CartPage = () => {
      const { items, removeItem, updateQuantity, clearCart } = useCartStore();
      const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

      const handleClearCart = () => {
        clearCart();
        toast.info("Your cart has been cleared.");
      };

      return (
        <PageTransition>
          <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="text-center font-heading text-4xl font-bold text-secondary md:text-5xl">Your Cart</h1>
            
            {items.length === 0 ? (
              <div className="mt-12 text-center">
                <p className="text-lg text-muted-foreground">Your cart is empty.</p>
                <Link to="/shop">
                  <Button className="mt-4">Continue Shopping</Button>
                </Link>
              </div>
            ) : (
              <div className="mt-12">
                <ul className="space-y-4">
                  {items.map(item => (
                    <li key={item.id} className="flex items-center justify-between rounded-lg bg-accent/50 p-4">
                      <div className="flex items-center gap-4">
                        <img src={item.image} alt={item.name} className="h-20 w-20 rounded-md object-cover" />
                        <div>
                          <h2 className="font-heading text-lg font-semibold text-secondary">{item.name}</h2>
                          <p className="text-primary">${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                         <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                          className="w-16 rounded-md border-border bg-background p-2 text-center"
                        />
                        <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                            <Trash2 className="h-5 w-5 text-error" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex justify-between items-center">
                    <Button variant="outline" onClick={handleClearCart}>Clear Cart</Button>
                    <div className="text-right">
                        <p className="text-lg">Subtotal: <span className="font-bold text-primary">${subtotal.toFixed(2)}</span></p>
                        <Button className="mt-2">Proceed to Checkout</Button>
                    </div>
                </div>
              </div>
            )}
          </div>
        </PageTransition>
      );
    };

    export default CartPage;