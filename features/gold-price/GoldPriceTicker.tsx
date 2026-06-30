"use client";

import Link from "next/link";
import { TrendingUp, TrendingDown, WifiOff, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useGoldPriceStore } from "@/store/gold-price.store";
import { ROUTES } from "@/constants/routes";

const PERSIAN_FORMATTER = new Intl.NumberFormat("fa-IR");

export const GoldPriceTicker = () => {
  const price = useGoldPriceStore((s) => s.price);
  const status = useGoldPriceStore((s) => s.status);

  const isConnecting = status === "connecting" && !price;
  const isUp = (price?.priceChangePercent24h ?? 0) >= 0;

  return (
    <Link
      href={ROUTES.goldPrice}
      className={cn(
        "group hidden items-center gap-2 rounded-lg px-3 py-1.5 lg:flex",
        "border border-border/60 bg-card/50 backdrop-blur-sm",
        "transition-all duration-[200ms] hover:border-gold/40 hover:bg-gold/5",
      )}
      aria-label="قیمت طلا ۱۸ عیار — مشاهده نمودار"
    >
      {/* Connection indicator */}
      <span className="relative flex size-2 shrink-0">
        {status === "live" ? (
          <>
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-success" />
          </>
        ) : status === "connecting" ? (
          <Loader2 className="size-2 animate-spin text-muted-foreground" />
        ) : (
          <WifiOff className="size-2 text-warning" />
        )}
      </span>

      <AnimatePresence mode="wait">
        {isConnecting ? (
          <motion.span
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="type-overline text-muted-foreground"
          >
            در حال دریافت...
          </motion.span>
        ) : price ? (
          <motion.span
            key={price.pricePerGram18k}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1.5"
          >
            <span className="type-overline text-muted-foreground">طلا ۱۸</span>
            <span className="text-xs font-medium text-foreground tabular-nums">
              {PERSIAN_FORMATTER.format(price.pricePerGram18k)}
            </span>
            <span className="type-overline text-muted-foreground/70">ت</span>
            <span
              className={cn(
                "flex items-center gap-0.5 text-[10px] tabular-nums",
                isUp ? "text-success" : "text-destructive",
              )}
            >
              {isUp ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
              {Math.abs(price.priceChangePercent24h).toFixed(2)}٪
            </span>
          </motion.span>
        ) : (
          <motion.span
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="type-overline flex items-center gap-1 text-muted-foreground"
          >
            <WifiOff className="size-3" />
            اتصال قطع است
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
};
