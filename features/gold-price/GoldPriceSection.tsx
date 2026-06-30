"use client";

import Link from "next/link";
import { TrendingUp, TrendingDown, ArrowLeft, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useGoldPriceStore } from "@/store/gold-price.store";
import { useGoldPrice } from "@/hooks/useGoldPrice";
import { ROUTES } from "@/constants/routes";

const FORMATTER = new Intl.NumberFormat("fa-IR");

interface KaratCardProps {
  label: string;
  karat: string;
  price: number | null;
  change?: number;
  highlight?: boolean;
}

const KaratCard = ({ label, karat, price, change, highlight }: KaratCardProps) => {
  const isUp = (change ?? 0) >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "relative overflow-hidden rounded-2xl border p-6",
        "transition-all duration-[300ms]",
        highlight
          ? "shadow-glow-gold border-gold/30 bg-gold/5"
          : "border-border bg-card hover:border-gold/20",
      )}
    >
      {highlight && (
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      )}

      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="type-overline mb-0.5 text-muted-foreground">{label}</p>
          <span
            className={cn(
              "inline-block rounded-md px-1.5 py-0.5 text-[10px] font-semibold tracking-widest",
              highlight ? "bg-gold/10 text-gold-dark" : "bg-muted text-muted-foreground",
            )}
          >
            {karat}
          </span>
        </div>
        {change !== undefined && (
          <span
            className={cn(
              "flex items-center gap-0.5 text-xs",
              isUp ? "text-success" : "text-destructive",
            )}
          >
            {isUp ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
            {Math.abs(change).toFixed(2)}٪
          </span>
        )}
      </div>

      <div className="flex items-baseline gap-1">
        {price ? (
          <>
            <span className="text-2xl font-light tracking-tight text-foreground">
              {FORMATTER.format(price)}
            </span>
            <span className="type-overline text-muted-foreground">تومان</span>
          </>
        ) : (
          <div className="h-7 w-32 animate-pulse rounded-lg bg-muted" />
        )}
      </div>
      <p className="mt-1 text-xs text-muted-foreground/60">هر گرم</p>
    </motion.div>
  );
};

export const GoldPriceSection = () => {
  useGoldPrice();
  const price = useGoldPriceStore((s) => s.price);
  const status = useGoldPriceStore((s) => s.status);

  return (
    <section
      className="section-luxury bg-gradient-to-b from-background to-card/30"
      aria-label="قیمت لحظه‌ای طلا"
    >
      <div className="container-luxury">
        {/* Section header */}
        <div className="mb-12 flex flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-2">
            <p className="type-overline text-gold">قیمت بازار</p>
            {status === "live" && (
              <span className="flex items-center gap-1 rounded-full border border-success/30 bg-success/5 px-2 py-0.5 text-[10px] text-success">
                <span className="size-1.5 animate-pulse rounded-full bg-success" />
                لحظه‌ای
              </span>
            )}
          </div>
          <h2 className="type-display-sm text-foreground">نرخ روز طلا</h2>
          <p className="max-w-sm text-sm text-muted-foreground">
            قیمت‌های زیر به‌صورت خودکار از بازار طلای ایران دریافت می‌شوند
          </p>
        </div>

        {/* Karat cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          <KaratCard
            label="طلای ۱۸ عیار"
            karat="18K"
            price={price?.pricePerGram18k ?? null}
            change={price?.priceChangePercent24h}
            highlight
          />
          <KaratCard label="طلای ۲۱ عیار" karat="21K" price={price?.pricePerGram21k ?? null} />
          <KaratCard label="طلای ۲۴ عیار" karat="24K" price={price?.pricePerGram24k ?? null} />
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <Link
            href={ROUTES.goldPrice}
            className={cn(
              "group flex items-center gap-2 rounded-xl",
              "border border-border px-6 py-3 text-sm font-medium",
              "text-muted-foreground transition-all duration-[200ms]",
              "hover:border-gold/40 hover:bg-gold/5 hover:text-foreground",
            )}
          >
            <Sparkles className="size-4 text-gold" />
            مشاهده نمودار قیمت طلا
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-0 rtl:group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};
