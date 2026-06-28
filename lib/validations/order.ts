import { z } from "zod";

export const createOrderSchema = z.object({
  customer: z.object({
    firstName: z.string().min(2, "نام کوتاه است"),
    lastName: z.string().min(2, "نام خانوادگی کوتاه است"),
    phone: z.string().regex(/^09\d{9}$/, "شماره موبایل نامعتبر"),
    email: z.string().email().optional().or(z.literal("")),
  }),
  shipping: z.object({
    province: z.string().min(2),
    city: z.string().min(2),
    address: z.string().min(10),
    postalCode: z.string().regex(/^\d{10}$/),
  }),
  paymentMethod: z.enum(["online", "card"]),
  items: z
    .array(
      z.object({
        productId: z.string(),
        variantId: z.string(),
        productName: z.string(),
        karat: z.number(),
        weight: z.number(),
        quantity: z.number().int().min(1).max(20),
        unitPrice: z.number().int().min(1),
        productImage: z.string().optional(),
      }),
    )
    .min(1, "سبد خرید خالی است"),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
