export type GoldPriceRange = "1d" | "7d" | "1m" | "3m" | "6m" | "1y";

export interface GoldPrice {
  pricePerGram18k: number;
  pricePerGram21k: number;
  pricePerGram24k: number;
  priceChangePercent24h: number;
  priceChangeToman24h: number;
  dailyHigh: number;
  dailyLow: number;
  timestamp: string;
  source: string;
  isStale: boolean;
  lastSuccessfulFetch: string;
}

export interface GoldPriceHistoryPoint {
  timestamp: string;
  price: number;
}

export interface GoldPriceHistory {
  range: GoldPriceRange;
  points: GoldPriceHistoryPoint[];
  source: string;
  fetchedAt: string;
}

export interface GoldPriceApiResponse {
  success: boolean;
  data: GoldPrice;
  error?: string;
}

export interface GoldPriceHistoryApiResponse {
  success: boolean;
  data: GoldPriceHistory;
  error?: string;
}
