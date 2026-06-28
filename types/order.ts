import type { CartItem } from "./cart";
import type { UserAddress } from "./user";

export type OrderStatus =
  | "pending"
  | "payment_pending"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export type PaymentMethod = "online" | "card_on_delivery";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface OrderItem extends CartItem {
  priceAtPurchase: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: OrderItem[];
  shippingAddress: UserAddress;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  subtotal: number;
  shippingCost: number;
  total: number;
  notes?: string;
  trackingCode?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderSummary extends Pick<
  Order,
  "id" | "orderNumber" | "orderStatus" | "paymentStatus" | "total" | "createdAt"
> {
  itemCount: number;
}
