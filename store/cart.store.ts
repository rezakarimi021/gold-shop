import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types/cart";
import type { ProductSummary, ProductVariant } from "@/types/product";

interface CartState {
  items: CartItem[];
  addItem: (product: ProductSummary, variant: ProductVariant) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, variant) => {
        const existing = get().items.find(
          (i) => i.product.id === product.id && i.variant.id === variant.id,
        );
        if (existing) {
          set((state) => ({
            items: state.items.map((i) =>
              i.id === existing.id ? { ...i, quantity: i.quantity + 1 } : i,
            ),
          }));
        } else {
          set((state) => ({
            items: [
              ...state.items,
              {
                id: `${product.id}-${variant.id}-${Date.now()}`,
                product,
                variant,
                quantity: 1,
                addedAt: new Date().toISOString(),
              },
            ],
          }));
        }
      },

      removeItem: (itemId) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== itemId),
        })),

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) => (i.id === itemId ? { ...i, quantity } : i)),
        }));
      },

      clearCart: () => set({ items: [] }),

      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      subtotal: () => get().items.reduce((sum, i) => sum + i.variant.price * i.quantity, 0),
    }),
    {
      name: "gold-shop-cart",
      version: 1,
    },
  ),
);
