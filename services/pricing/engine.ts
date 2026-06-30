import {
  KARAT_MULTIPLIER,
  MANUFACTURING_COST_RATE,
  RETAILER_PROFIT_RATE,
  VAT_RATE,
} from "@/constants/gold-price";
import type { PricingBreakdown, PricingConfig, PricingInput } from "./pricing.types";

const DEFAULT_CONFIG: PricingConfig = {
  manufacturingCostRate: MANUFACTURING_COST_RATE,
  retailerProfitRate: RETAILER_PROFIT_RATE,
  vatRate: VAT_RATE,
};

export function calculatePrice(input: PricingInput): PricingBreakdown {
  const config = { ...DEFAULT_CONFIG, ...input.config };
  const { weightGrams, karat, goldPricePerGram18k } = input;

  const effectivePricePerGram = Math.round(goldPricePerGram18k * KARAT_MULTIPLIER[karat]);
  const goldValue = Math.round(weightGrams * effectivePricePerGram);
  const manufacturingCost = Math.round(goldValue * config.manufacturingCostRate);
  const subtotal = goldValue + manufacturingCost;
  const retailerProfit = Math.round(subtotal * config.retailerProfitRate);
  const preTax = subtotal + retailerProfit;
  const vat = Math.round(preTax * config.vatRate);
  const total = preTax + vat;

  return {
    goldValue,
    manufacturingCost,
    retailerProfit,
    vat,
    total,
    weightGrams,
    karat,
    goldPricePerGram18k,
    effectivePricePerGram,
  };
}

export function getPricingConfig(): PricingConfig {
  return { ...DEFAULT_CONFIG };
}
