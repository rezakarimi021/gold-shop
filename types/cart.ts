import type { ProductSummary, ProductVariant } from "./product";

export interface CartItem {
  id: string;
  product: ProductSummary;
  variant: ProductVariant;
  quantity: number;
  addedAt: string;
}

export interface Cart {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  total: number;
}

export interface WishlistItem {
  id: string;
  product: ProductSummary;
  addedAt: string;
}
