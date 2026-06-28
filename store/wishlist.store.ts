import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { WishlistItem } from "@/types/cart";
import type { ProductSummary } from "@/types/product";

interface WishlistState {
  items: WishlistItem[];
  addItem: (product: ProductSummary) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: ProductSummary) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        if (get().isInWishlist(product.id)) return;
        set((state) => ({
          items: [
            ...state.items,
            {
              id: `wish-${product.id}`,
              product,
              addedAt: new Date().toISOString(),
            },
          ],
        }));
      },

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== productId),
        })),

      toggleItem: (product) => {
        if (get().isInWishlist(product.id)) {
          get().removeItem(product.id);
        } else {
          get().addItem(product);
        }
      },

      isInWishlist: (productId) => get().items.some((i) => i.product.id === productId),

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "gold-shop-wishlist",
      version: 1,
    },
  ),
);
