import type { Order, OrderSummary } from "@/types/order";
import { mockOrders } from "@/data/mock/orders.mock";

export const ordersService = {
  async getByUser(_userId: string): Promise<OrderSummary[]> {
    return mockOrders.map(toSummary);
  },

  async getById(orderId: string): Promise<Order | null> {
    return mockOrders.find((o) => o.id === orderId) ?? null;
  },
};

const toSummary = (o: Order): OrderSummary => ({
  id: o.id,
  orderNumber: o.orderNumber,
  orderStatus: o.orderStatus,
  paymentStatus: o.paymentStatus,
  total: o.total,
  createdAt: o.createdAt,
  itemCount: o.items.reduce((sum, i) => sum + i.quantity, 0),
});
