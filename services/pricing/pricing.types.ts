import type { GoldKarat } from "@/types/product";

export interface PricingConfig {
  manufacturingCostRate: number;
  retailerProfitRate: number;
  vatRate: number;
}

export interface PricingInput {
  weightGrams: number;
  karat: GoldKarat;
  goldPricePerGram18k: number;
  config?: Partial<PricingConfig>;
}

export interface PricingBreakdown {
  goldValue: number;
  manufacturingCost: number;
  retailerProfit: number;
  vat: number;
  total: number;
  weightGrams: number;
  karat: GoldKarat;
  goldPricePerGram18k: number;
  effectivePricePerGram: number;
}
