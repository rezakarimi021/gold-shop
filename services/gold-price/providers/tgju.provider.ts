import type { GoldPrice, GoldPriceHistoryPoint, GoldPriceRange } from "@/types/gold-price";
import type { GoldPriceProvider } from "../types";
import { KARAT_MULTIPLIER } from "@/constants/gold-price";

const API_BASE = "https://api.tgju.org/v1/market/indicator";

interface TgjuSummaryData {
  status: boolean;
  data: string[][];
}

interface TgjuHistoryData {
  status: boolean;
  data: {
    open: string;
    high: string;
    low: string;
    close: string;
    date: string;
  }[];
}

function parsePersianNumber(raw: string): number {
  const cleaned = raw.replace(/٫/g, ".").replace(/[^0-9.]/g, "");
  return parseFloat(cleaned) || 0;
}

const RANGE_TO_PARAMS: Record<GoldPriceRange, { period: string }> = {
  "1d": { period: "1" },
  "7d": { period: "7" },
  "1m": { period: "30" },
  "3m": { period: "90" },
  "6m": { period: "180" },
  "1y": { period: "365" },
};

export class TgjuGoldPriceProvider implements GoldPriceProvider {
  readonly name = "tgju";

  async fetchCurrentPrice(): Promise<GoldPrice> {
    const url = `${API_BASE}/summary-table-data/gold_18ayar`;
    const res = await fetch(url, {
      next: { revalidate: 0 },
      signal: AbortSignal.timeout(8_000),
      headers: { Accept: "application/json" },
    });

    if (!res.ok) throw new Error(`TGJU API error: ${res.status}`);

    const json = (await res.json()) as TgjuSummaryData;
    const row = json.data?.[0];
    if (!row) throw new Error("TGJU: empty data");

    // tgju columns: [current, min, max, change, changePercent, datetime, ...]
    const price18k = parsePersianNumber(row[0] ?? "0");
    const dailyLow = parsePersianNumber(row[1] ?? "0");
    const dailyHigh = parsePersianNumber(row[2] ?? "0");
    const changeRaw = parsePersianNumber(row[3] ?? "0");
    const changePercent = parsePersianNumber(row[4] ?? "0");

    const now = new Date().toISOString();
    return {
      pricePerGram18k: price18k,
      pricePerGram21k: Math.round(price18k * KARAT_MULTIPLIER[21]),
      pricePerGram24k: Math.round(price18k * KARAT_MULTIPLIER[24]),
      priceChangePercent24h: changePercent,
      priceChangeToman24h: Math.round(changeRaw),
      dailyHigh,
      dailyLow,
      timestamp: now,
      source: this.name,
      isStale: false,
      lastSuccessfulFetch: now,
    };
  }

  async fetchHistory(range: GoldPriceRange): Promise<GoldPriceHistoryPoint[]> {
    const { period } = RANGE_TO_PARAMS[range];
    const url = `${API_BASE}/indicator-data/gold_18ayar?period=${period}`;
    const res = await fetch(url, {
      next: { revalidate: 0 },
      signal: AbortSignal.timeout(10_000),
      headers: { Accept: "application/json" },
    });

    if (!res.ok) throw new Error(`TGJU history error: ${res.status}`);

    const json = (await res.json()) as TgjuHistoryData;
    return (json.data ?? [])
      .filter((item) => item.date && item.close)
      .map((item) => ({
        timestamp: new Date(item.date).toISOString(),
        price: parsePersianNumber(item.close),
      }))
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  }
}
