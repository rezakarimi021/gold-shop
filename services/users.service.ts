import type { User, UserAddress } from "@/types/user";
import { mockUser } from "@/data/mock/users.mock";

export const usersService = {
  async getById(_userId: string): Promise<User | null> {
    return mockUser;
  },

  async updateProfile(userId: string, data: Partial<User>): Promise<User> {
    void userId;
    return { ...mockUser, ...data };
  },

  async addAddress(_userId: string, address: Omit<UserAddress, "id">): Promise<UserAddress> {
    return { ...address, id: `addr-${Date.now()}` };
  },

  async updateAddress(
    _userId: string,
    addressId: string,
    data: Partial<UserAddress>,
  ): Promise<UserAddress> {
    const existing = mockUser.addresses.find((a) => a.id === addressId);
    if (!existing) throw new Error("Address not found");
    return { ...existing, ...data };
  },

  async deleteAddress(_userId: string, _addressId: string): Promise<void> {
    return;
  },
};
