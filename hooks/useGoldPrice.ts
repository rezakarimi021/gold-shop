"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useGoldPriceStore } from "@/store/gold-price.store";
import { goldPriceService } from "@/services/gold-price/service";
import type { GoldPrice } from "@/types/gold-price";

const REFETCH_INTERVAL_MS = 15_000;
const STALE_TIME_MS = 10_000;
const GC_TIME_MS = 5 * 60_000;

export function useGoldPrice() {
  const { setPrice, setStatus, setError } = useGoldPriceStore();

  const query = useQuery<GoldPrice>({
    queryKey: ["gold-price", "current"],
    queryFn: () => goldPriceService.getCurrentPrice(),
    refetchInterval: REFETCH_INTERVAL_MS,
    staleTime: STALE_TIME_MS,
    gcTime: GC_TIME_MS,
    retry: 3,
    retryDelay: (attempt) => Math.min(1_000 * Math.pow(2, attempt), 30_000),
  });

  useEffect(() => {
    if (query.isPending && !query.data) {
      setStatus("connecting");
    } else if (query.isError && !query.data) {
      setStatus("error");
      setError(query.error instanceof Error ? query.error.message : "خطا در دریافت قیمت");
    } else if (query.data) {
      setPrice(query.data);
      setError(null);
    }
  }, [query.isPending, query.isError, query.data, query.error, setPrice, setStatus, setError]);

  const price = useGoldPriceStore((s) => s.price);
  const status = useGoldPriceStore((s) => s.status);
  const error = useGoldPriceStore((s) => s.error);

  return { price, status, error };
}

export { useGoldPriceStore };
