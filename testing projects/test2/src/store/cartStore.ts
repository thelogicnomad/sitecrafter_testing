import { create } from 'zustand';
    import { persist } from 'zustand/middleware';

    type CartItem = {
      id: number;
      name: string;
      price: number;
      image: string;
      quantity: number;
    };

    type CartState = {
      items: CartItem[];
      addItem: (item: CartItem) => void;
      removeItem: (itemId: number) => void;
      updateQuantity: (itemId: number, quantity: number) => void;
      clearCart: () => void;
    };

    const useCartStore = create<CartState>()(
      persist(
        (set) => ({
          items: [],
          addItem: (item) =>
            set((state) => {
              const existingItem = state.items.find((i) => i.id === item.id);
              if (existingItem) {
                return {
                  items: state.items.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                  ),
                };
              }
              return { items: [...state.items, { ...item, quantity: 1 }] };
            }),
          removeItem: (itemId) =>
            set((state) => ({
              items: state.items.filter((item) => item.id !== itemId),
            })),
          updateQuantity: (itemId, quantity) =>
            set((state) => ({
              items: state.items.map((item) =>
                item.id === itemId ? { ...item, quantity } : item
              ),
            })),
          clearCart: () => set({ items: [] }),
        }),
        {
          name: 'cart-storage',
        }
      )
    );

    export default useCartStore;