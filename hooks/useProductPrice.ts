"use client";

import { useMemo } from "react";
import { useGoldPriceStore } from "@/store/gold-price.store";
import { calculatePrice } from "@/services/pricing/engine";
import type { PricingBreakdown } from "@/services/pricing/pricing.types";
import type { GoldKarat } from "@/types/product";

interface UseProductPriceOptions {
  weightGrams: number;
  karat: GoldKarat;
  fallbackPrice?: number;
}

interface UseProductPriceResult {
  breakdown: PricingBreakdown | null;
  isLive: boolean;
  isLoading: boolean;
}

export function useProductPrice({
  weightGrams,
  karat,
  fallbackPrice,
}: UseProductPriceOptions): UseProductPriceResult {
  const price = useGoldPriceStore((s) => s.price);
  const status = useGoldPriceStore((s) => s.status);

  const breakdown = useMemo<PricingBreakdown | null>(() => {
    if (!price && !fallbackPrice) return null;

    const goldPricePerGram18k = price?.pricePerGram18k ?? fallbackPrice ?? 0;

    return calculatePrice({ weightGrams, karat, goldPricePerGram18k });
  }, [price, weightGrams, karat, fallbackPrice]);

  return {
    breakdown,
    isLive: status === "live",
    isLoading: status === "connecting" && !price,
  };
}
