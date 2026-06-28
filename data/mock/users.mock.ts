import type { User } from "@/types/user";

export const mockUser: User = {
  id: "user-001",
  firstName: "سارا",
  lastName: "احمدی",
  phone: "09121234567",
  email: "sara.ahmadi@example.com",
  role: "customer",
  addresses: [
    {
      id: "addr-001",
      label: "خانه",
      recipientName: "سارا احمدی",
      phone: "09121234567",
      province: "تهران",
      city: "تهران",
      district: "یوسف‌آباد",
      street: "خیابان بهار، پلاک ۱۲، واحد ۳",
      postalCode: "1411234567",
      isDefault: true,
    },
  ],
  createdAt: "2026-01-01T00:00:00Z",
  updatedAt: "2026-06-01T00:00:00Z",
};
