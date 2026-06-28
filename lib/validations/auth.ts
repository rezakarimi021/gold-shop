import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("ایمیل نامعتبر است"),
  password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
    email: z.string().email("ایمیل نامعتبر است"),
    phone: z
      .string()
      .regex(/^09\d{9}$/, "شماره موبایل نامعتبر است")
      .optional()
      .or(z.literal("")),
    password: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "رمز عبور تکرار نشده است",
    path: ["confirmPassword"],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
