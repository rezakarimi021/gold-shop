import type { GoldKarat } from "@/types/product";
import type { GoldPriceRange } from "@/types/gold-price";

export const KARAT_MULTIPLIER: Record<GoldKarat, number> = {
  18: 1,
  21: 21 / 18,
  24: 24 / 18,
};

export const MANUFACTURING_COST_RATE = 0.12;
export const RETAILER_PROFIT_RATE = 0.07;
export const VAT_RATE = 0.09;

export const GOLD_PRICE_POLL_INTERVAL_MS = 15_000;
export const GOLD_PRICE_CACHE_TTL_MS = 60_000;
export const GOLD_HISTORY_CACHE_TTL_MS = 5 * 60_000;

export const GOLD_PRICE_RANGE_LABELS: Record<GoldPriceRange, string> = {
  "1d": "۱ روز",
  "7d": "۷ روز",
  "1m": "۱ ماه",
  "3m": "۳ ماه",
  "6m": "۶ ماه",
  "1y": "۱ سال",
};

export const GOLD_PRICE_RANGE_ORDER: GoldPriceRange[] = ["1d", "7d", "1m", "3m", "6m", "1y"];

export const MOCK_GOLD_PRICE_PER_GRAM_18K = 4_250_000;
