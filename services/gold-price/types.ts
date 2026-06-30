import type { GoldPrice, GoldPriceHistoryPoint, GoldPriceRange } from "@/types/gold-price";

export interface GoldPriceProvider {
  readonly name: string;
  fetchCurrentPrice(): Promise<GoldPrice>;
  fetchHistory(range: GoldPriceRange): Promise<GoldPriceHistoryPoint[]>;
}
