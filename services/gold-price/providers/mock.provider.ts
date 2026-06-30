import type { GoldPrice, GoldPriceHistoryPoint, GoldPriceRange } from "@/types/gold-price";
import type { GoldPriceProvider } from "../types";
import { KARAT_MULTIPLIER, MOCK_GOLD_PRICE_PER_GRAM_18K } from "@/constants/gold-price";

const BASE = MOCK_GOLD_PRICE_PER_GRAM_18K;

function seededRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function generateHistory(range: GoldPriceRange): GoldPriceHistoryPoint[] {
  const cfg: Record<GoldPriceRange, { days: number; intervalMs: number }> = {
    "1d": { days: 1, intervalMs: 5 * 60_000 },
    "7d": { days: 7, intervalMs: 60 * 60_000 },
    "1m": { days: 30, intervalMs: 4 * 60 * 60_000 },
    "3m": { days: 90, intervalMs: 24 * 60 * 60_000 },
    "6m": { days: 180, intervalMs: 24 * 60 * 60_000 },
    "1y": { days: 365, intervalMs: 24 * 60 * 60_000 },
  };

  const { days, intervalMs } = cfg[range];
  const now = Date.now();
  const start = now - days * 24 * 60 * 60_000;
  const points: GoldPriceHistoryPoint[] = [];

  let price = BASE * (0.88 + seededRandom(days) * 0.14);

  for (let t = start; t <= now; t += intervalMs) {
    const seed = Math.floor(t / 1000);
    const change = (seededRandom(seed) - 0.49) * price * 0.014;
    price = Math.max(3_200_000, Math.min(5_800_000, price + change));
    points.push({
      timestamp: new Date(t).toISOString(),
      price: Math.round(price / 1000) * 1000,
    });
  }

  if (points.length > 0) {
    points[points.length - 1]!.price = BASE;
  }

  return points;
}

export class MockGoldPriceProvider implements GoldPriceProvider {
  readonly name = "mock";

  async fetchCurrentPrice(): Promise<GoldPrice> {
    const now = new Date().toISOString();
    const noise = (Math.random() - 0.5) * 20_000;
    const price18k = BASE + noise;

    return {
      pricePerGram18k: Math.round(price18k),
      pricePerGram21k: Math.round(price18k * KARAT_MULTIPLIER[21]),
      pricePerGram24k: Math.round(price18k * KARAT_MULTIPLIER[24]),
      priceChangePercent24h: +((-0.5 + Math.random()) * 2).toFixed(2),
      priceChangeToman24h: Math.round((Math.random() - 0.5) * 80_000),
      dailyHigh: Math.round(price18k * 1.008),
      dailyLow: Math.round(price18k * 0.992),
      timestamp: now,
      source: "mock",
      isStale: false,
      lastSuccessfulFetch: now,
    };
  }

  async fetchHistory(range: GoldPriceRange): Promise<GoldPriceHistoryPoint[]> {
    return generateHistory(range);
  }
}
