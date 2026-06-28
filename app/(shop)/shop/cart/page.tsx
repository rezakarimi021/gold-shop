"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, ArrowLeft, Tag } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CartItem } from "@/components/shared/cart/CartItem";
import { useCartStore } from "@/store/cart.store";
import { formatPrice } from "@/utils/formatPrice";
import { ROUTES } from "@/constants/routes";
import { SHIPPING } from "@/constants/config";

const LUXURY_EASE = [0.25, 0.46, 0.45, 0.94] as const;

const CartPage = () => {
  const [mounted, setMounted] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [couponStatus, setCouponStatus] = useState<"idle" | "valid" | "invalid">("idle");

  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());

  useEffect(() => {
    setMounted(true); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

  const isShippingFree = subtotal >= SHIPPING.freeThreshold;
  const shipping = isShippingFree ? 0 : SHIPPING.flatRate;
  const total = subtotal + shipping;

  const handleCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coupon.trim()) return;
    setCouponStatus(coupon.toUpperCase() === "GOLD10" ? "valid" : "invalid");
  };

  if (!mounted) {
    return (
      <div className="container-luxury py-14">
        <div className="mb-10 h-8 w-48 shimmer rounded-lg" />
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="size-24 shimmer rounded-xl" />
                <div className="flex-1 space-y-3">
                  <div className="h-4 w-3/4 shimmer rounded-lg" />
                  <div className="h-3 w-1/2 shimmer rounded-lg" />
                </div>
              </div>
            ))}
          </div>
          <div className="h-64 shimmer rounded-2xl" />
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <motion.div
        className="container-luxury py-20 text-center"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: LUXURY_EASE }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1, ease: LUXURY_EASE }}
          className={cn(
            "mx-auto mb-6 flex size-20 items-center justify-center rounded-full",
            "bg-muted",
          )}
          aria-hidden="true"
        >
          <ShoppingBag className="size-8 text-muted-foreground" />
        </motion.div>
        <h1 className="type-display-sm mb-3 text-foreground">سبد خرید خالی است</h1>
        <p className="mb-8 text-muted-foreground">
          هنوز محصولی به سبد خرید اضافه نشده. به فروشگاه بروید و محصولات ما را کشف کنید.
        </p>
        <Link href={ROUTES.shop} className={cn(buttonVariants({ variant: "gold", size: "lg" }))}>
          مشاهده محصولات
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container-luxury py-10 lg:py-14">
        {/* Header */}
        <div className="mb-10">
          <h1 className="type-display-sm mb-1 text-foreground">سبد خرید</h1>
          <p className="text-sm text-muted-foreground">
            {items.reduce((s, i) => s + i.quantity, 0)} قطعه محصول
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-start">
          {/* Cart items */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-luxury-xs">
            <div role="list" aria-label="محصولات در سبد">
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    role="listitem"
                    layout
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 40, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.32, ease: LUXURY_EASE }}
                  >
                    <CartItem item={item} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Continue shopping */}
            <Link
              href={ROUTES.shop}
              className={cn(
                "mt-4 inline-flex items-center gap-2",
                "text-sm text-muted-foreground transition-colors hover:text-gold",
              )}
            >
              <ArrowLeft className="size-3.5 rtl:rotate-180" />
              ادامه خرید
            </Link>
          </div>

          {/* Order summary */}
          <div
            className={cn(
              "rounded-2xl border border-border bg-card p-6 shadow-luxury-xs",
              "lg:sticky lg:top-24",
            )}
          >
            <h2 className="mb-6 text-base font-medium text-foreground">خلاصه سفارش</h2>

            <div className="space-y-3.5">
              {/* Subtotal */}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">جمع محصولات</span>
                <span className="text-foreground">{formatPrice(subtotal)}</span>
              </div>

              {/* Shipping */}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">هزینه ارسال</span>
                <span
                  className={cn("font-medium", isShippingFree ? "text-success" : "text-foreground")}
                >
                  {isShippingFree ? "رایگان" : formatPrice(shipping)}
                </span>
              </div>

              {!isShippingFree && (
                <p className="text-xs text-muted-foreground">
                  برای ارسال رایگان{" "}
                  <span className="text-gold">
                    {formatPrice(SHIPPING.freeThreshold - subtotal)}
                  </span>{" "}
                  دیگر خرید کنید.
                </p>
              )}

              {/* Divider */}
              <div className="divider-gold my-1" />

              {/* Total */}
              <div className="flex justify-between">
                <span className="font-medium text-foreground">جمع کل</span>
                <motion.span
                  key={total}
                  initial={{ y: -6, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.22, ease: LUXURY_EASE }}
                  className="text-lg font-light tracking-tight text-foreground"
                >
                  {formatPrice(total)}
                </motion.span>
              </div>
            </div>

            {/* Coupon code */}
            <form onSubmit={handleCoupon} className="mt-6">
              <p className="mb-2.5 text-xs font-medium text-muted-foreground">کد تخفیف</p>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/50" />
                  <Input
                    value={coupon}
                    onChange={(e) => {
                      setCoupon(e.target.value);
                      setCouponStatus("idle");
                    }}
                    placeholder="GOLD10"
                    className="h-10 ps-9 text-sm"
                    hasError={couponStatus === "invalid"}
                    hasSuccess={couponStatus === "valid"}
                  />
                </div>
                <Button type="submit" variant="outline" size="sm" className="h-10">
                  اعمال
                </Button>
              </div>
              {couponStatus === "valid" && (
                <p className="mt-1.5 text-xs text-success">کد تخفیف ۱۰٪ اعمال شد.</p>
              )}
              {couponStatus === "invalid" && (
                <p className="mt-1.5 text-xs text-destructive">کد تخفیف نامعتبر است.</p>
              )}
            </form>

            {/* Checkout CTA */}
            <Link
              href={ROUTES.checkout}
              className={cn(
                buttonVariants({ variant: "gold", size: "lg" }),
                "mt-6 w-full rounded-xl",
              )}
            >
              ادامه و پرداخت
            </Link>

            {/* Trust note */}
            <p className="mt-4 text-center text-xs text-muted-foreground">
              پرداخت امن · تضمین اصالت · ارسال بیمه‌شده
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
