import type { GoldPrice, GoldPriceHistoryPoint, GoldPriceRange } from "@/types/gold-price";
import type { GoldPriceProvider } from "../types";
import { KARAT_MULTIPLIER } from "@/constants/gold-price";

const API_BASE = "https://navasan.net/api";

interface NaasanCurrentResponse {
  value: string;
  change: string;
  changePercent: string;
  min: string;
  max: string;
  date?: string;
  time?: string;
}

interface NaasanHistoryItem {
  date: string;
  value: string;
}

function parseToman(raw: string): number {
  return parseInt(raw.replace(/[^0-9]/g, ""), 10) || 0;
}

function parsePercent(raw: string): number {
  return parseFloat(raw.replace(/[^0-9.-]/g, "")) || 0;
}

const RANGE_TO_DAYS: Record<GoldPriceRange, number> = {
  "1d": 1,
  "7d": 7,
  "1m": 30,
  "3m": 90,
  "6m": 180,
  "1y": 365,
};

export class NaasanGoldPriceProvider implements GoldPriceProvider {
  readonly name = "navasan";
  private readonly apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async fetchCurrentPrice(): Promise<GoldPrice> {
    const url = `${API_BASE}/?apikey=${this.apiKey}&item=18ayar&type=single`;
    const res = await fetch(url, {
      next: { revalidate: 0 },
      signal: AbortSignal.timeout(8_000),
    });

    if (!res.ok) throw new Error(`Navasan API error: ${res.status}`);

    const json = (await res.json()) as NaasanCurrentResponse | NaasanCurrentResponse[];
    const raw = Array.isArray(json) ? json[0] : json;
    if (!raw) throw new Error("Navasan: empty response");

    const price18k = parseToman(raw.value);
    const change = parseToman(raw.change);
    const changePercent = parsePercent(raw.changePercent);

    const now = new Date().toISOString();
    return {
      pricePerGram18k: price18k,
      pricePerGram21k: Math.round(price18k * KARAT_MULTIPLIER[21]),
      pricePerGram24k: Math.round(price18k * KARAT_MULTIPLIER[24]),
      priceChangePercent24h: changePercent,
      priceChangeToman24h: change,
      dailyHigh: parseToman(raw.max),
      dailyLow: parseToman(raw.min),
      timestamp: now,
      source: this.name,
      isStale: false,
      lastSuccessfulFetch: now,
    };
  }

  async fetchHistory(range: GoldPriceRange): Promise<GoldPriceHistoryPoint[]> {
    const days = RANGE_TO_DAYS[range];
    const url = `${API_BASE}/?apikey=${this.apiKey}&item=18ayar&type=history&range=${days}d`;
    const res = await fetch(url, {
      next: { revalidate: 0 },
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) throw new Error(`Navasan history error: ${res.status}`);

    const json = (await res.json()) as NaasanHistoryItem[];
    return json
      .filter((item) => item.date && item.value)
      .map((item) => ({
        timestamp: new Date(item.date).toISOString(),
        price: parseToman(item.value),
      }))
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  }
}
