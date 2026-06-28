export type UserRole = "guest" | "customer" | "admin";

export interface UserAddress {
  id: string;
  label: string;
  recipientName: string;
  phone: string;
  province: string;
  city: string;
  district?: string;
  street: string;
  postalCode: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  role: UserRole;
  avatarUrl?: string;
  addresses: UserAddress[];
  createdAt: string;
  updatedAt: string;
}

export interface AuthSession {
  user: User;
  accessToken: string;
  expiresAt: string;
}

export interface LoginCredentials {
  phone: string;
  otp: string;
}
