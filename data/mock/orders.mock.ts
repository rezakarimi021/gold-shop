import type { Order } from "@/types/order";
import { mockUser } from "./users.mock";

export const mockOrders: Order[] = [
  {
    id: "order-001",
    orderNumber: "GS-14050101",
    userId: mockUser.id,
    items: [],
    shippingAddress: mockUser.addresses[0]!,
    paymentMethod: "online",
    paymentStatus: "paid",
    orderStatus: "delivered",
    subtotal: 13_440_000,
    shippingCost: 0,
    total: 13_440_000,
    trackingCode: "1234567890",
    createdAt: "2026-05-01T10:00:00Z",
    updatedAt: "2026-05-05T14:00:00Z",
  },
  {
    id: "order-002",
    orderNumber: "GS-14050215",
    userId: mockUser.id,
    items: [],
    shippingAddress: mockUser.addresses[0]!,
    paymentMethod: "online",
    paymentStatus: "paid",
    orderStatus: "processing",
    subtotal: 30_240_000,
    shippingCost: 150_000,
    total: 30_390_000,
    createdAt: "2026-06-15T09:00:00Z",
    updatedAt: "2026-06-16T11:00:00Z",
  },
];
