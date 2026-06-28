import type { AuthSession, LoginCredentials, User } from "@/types/user";
import { mockUser } from "@/data/mock/users.mock";

const OTP_STORE = new Map<string, string>();

export const authService = {
  async requestOtp(phone: string): Promise<{ success: boolean }> {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    OTP_STORE.set(phone, otp);
    if (process.env["NODE_ENV"] === "development") {
      console.log(`[DEV] OTP for ${phone}: ${otp}`);
    }
    return { success: true };
  },

  async login(credentials: LoginCredentials): Promise<AuthSession | null> {
    const stored = OTP_STORE.get(credentials.phone);
    if (!stored || stored !== credentials.otp) return null;
    OTP_STORE.delete(credentials.phone);

    return {
      user: mockUser,
      accessToken: `mock-token-${Date.now()}`,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };
  },

  async getSession(): Promise<AuthSession | null> {
    return null;
  },

  async logout(): Promise<void> {
    return;
  },

  async updateProfile(data: Partial<User>): Promise<User> {
    return { ...mockUser, ...data };
  },
};
