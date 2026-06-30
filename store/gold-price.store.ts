import { create } from "zustand";
import type { GoldPrice } from "@/types/gold-price";

type ConnectionStatus = "connecting" | "live" | "stale" | "error";

interface GoldPriceState {
  price: GoldPrice | null;
  status: ConnectionStatus;
  error: string | null;

  setPrice: (price: GoldPrice) => void;
  setStatus: (status: ConnectionStatus) => void;
  setError: (error: string | null) => void;
}

export const useGoldPriceStore = create<GoldPriceState>()((set) => ({
  price: null,
  status: "connecting",
  error: null,

  setPrice: (price) => set({ price, status: price.isStale ? "stale" : "live", error: null }),

  setStatus: (status) => set({ status }),

  setError: (error) => set({ error, status: "error" }),
}));
