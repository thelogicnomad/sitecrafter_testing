import { create } from 'zustand';
import { toast } from 'sonner';
import type { CartItem, Recipe } from '@/types';

interface CartState {
  items: CartItem[];
  addToCart: (item: Recipe) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addToCart: (item) => {
    const { items } = get();
    const existingItem = items.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
        toast.info(`"${item.name}" is already in your cart.`);
    } else {
      set({ items: [...items, { ...item, quantity: 1 }] });
      toast.success(`"${item.name}" added to cart!`);
    }
  },
  removeFromCart: (itemId) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== itemId),
    }));
    toast.error("Item removed from cart.");
  },
  clearCart: () => {
    set({ items: [] });
  },
}));