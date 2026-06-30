import type { GoldPrice, GoldPriceHistoryPoint, GoldPriceRange } from "@/types/gold-price";
import { NaasanGoldPriceProvider } from "./providers/navasan.provider";
import { TgjuGoldPriceProvider } from "./providers/tgju.provider";
import { MockGoldPriceProvider } from "./providers/mock.provider";

const tgjuProvider = new TgjuGoldPriceProvider();
const mockProvider = new MockGoldPriceProvider();

function buildProviderChain() {
  const chain = [];
  // NEXT_PUBLIC_ prefix makes this available in the static bundle (baked in at build time)
  const naasanKey = process.env.NEXT_PUBLIC_NAVASAN_API_KEY;
  if (naasanKey) chain.push(new NaasanGoldPriceProvider(naasanKey));
  chain.push(tgjuProvider);
  chain.push(mockProvider);
  return chain;
}

const providers = buildProviderChain();

function dedup(points: GoldPriceHistoryPoint[]): GoldPriceHistoryPoint[] {
  const seen = new Map<number, GoldPriceHistoryPoint>();
  for (const p of points) {
    const bucket = Math.floor(new Date(p.timestamp).getTime() / 60_000);
    seen.set(bucket, p);
  }
  return Array.from(seen.values()).sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
  );
}

export const goldPriceService = {
  async getCurrentPrice(): Promise<GoldPrice> {
    for (const provider of providers) {
      try {
        const price = await provider.fetchCurrentPrice();
        return price;
      } catch {
        // fall through to next provider
      }
    }
    return mockProvider.fetchCurrentPrice();
  },

  async getHistory(range: GoldPriceRange): Promise<GoldPriceHistoryPoint[]> {
    for (const provider of providers) {
      try {
        const history = await provider.fetchHistory(range);
        if (history.length > 0) return dedup(history);
      } catch {
        // fall through to next provider
      }
    }
    return mockProvider.fetchHistory(range);
  },
};
