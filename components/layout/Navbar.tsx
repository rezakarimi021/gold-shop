"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Heart, Search, Menu, X, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { useCartStore } from "@/store/cart.store";
import { useWishlistStore } from "@/store/wishlist.store";
import { GoldPriceTicker } from "@/features/gold-price/GoldPriceTicker";
import { useGoldPrice } from "@/hooks/useGoldPrice";

const NAV_LINKS = [
  { href: ROUTES.home, label: "خانه" },
  { href: ROUTES.shop, label: "فروشگاه" },
  { href: ROUTES.collection("bahar-1405"), label: "کلکسیون‌ها" },
  { href: ROUTES.goldPrice, label: "نمودار طلا" },
  { href: ROUTES.blog, label: "مجله" },
  { href: "/about", label: "درباره ما" },
] as const;

const GoldPriceConnector = () => {
  useGoldPrice();
  return null;
};

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { status } = useSession();
  const isAuthed = status === "authenticated";

  const itemCount = useCartStore((s) => s.itemCount());
  const wishlistCount = useWishlistStore((s) => s.items.length);

  useEffect(() => {
    setMounted(true); // eslint-disable-line react-hooks/set-state-in-effect
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Mount SSE connection once at top level */}
      <GoldPriceConnector />

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50",
          "transition-all duration-[320ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
          isScrolled
            ? "border-b border-border/60 bg-card/95 shadow-luxury-sm backdrop-blur-md"
            : "bg-transparent",
        )}
      >
        <div className="container-luxury">
          <div className="flex h-16 items-center justify-between md:h-20">
            {/* Actions — end side (left in RTL) */}
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                aria-label="جستجو"
                className={cn(
                  "flex size-10 items-center justify-center rounded-lg",
                  "text-muted-foreground transition-colors duration-[150ms]",
                  "hover:bg-accent hover:text-foreground",
                )}
              >
                <Search className="size-4.5" />
              </button>

              <Link
                href={isAuthed ? ROUTES.orders : ROUTES.login}
                aria-label={isAuthed ? "حساب کاربری" : "ورود"}
                className={cn(
                  "relative flex size-10 items-center justify-center rounded-lg",
                  "text-muted-foreground transition-colors duration-[150ms]",
                  "hover:bg-accent hover:text-foreground",
                )}
              >
                <User className="size-4.5" />
                {mounted && isAuthed && (
                  <span className="absolute end-1 top-1 size-2 rounded-full bg-success" />
                )}
              </Link>

              <Link
                href={ROUTES.wishlist}
                aria-label="علاقه‌مندی‌ها"
                className={cn(
                  "relative flex size-10 items-center justify-center rounded-lg",
                  "text-muted-foreground transition-colors duration-[150ms]",
                  "hover:bg-accent hover:text-foreground",
                )}
              >
                <Heart className="size-4.5" />
                {mounted && wishlistCount > 0 && (
                  <span className="absolute end-1 top-1 flex size-[17px] items-center justify-center rounded-full bg-gold text-[9px] font-semibold text-gold-foreground">
                    {wishlistCount > 9 ? "+۹" : wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                href={ROUTES.cart}
                aria-label="سبد خرید"
                className={cn(
                  "relative flex size-10 items-center justify-center rounded-lg",
                  "text-muted-foreground transition-colors duration-[150ms]",
                  "hover:bg-accent hover:text-foreground",
                )}
              >
                <ShoppingBag className="size-4.5" />
                {mounted && itemCount > 0 && (
                  <span className="absolute end-1 top-1 flex size-[17px] items-center justify-center rounded-full bg-gold text-[9px] font-semibold text-gold-foreground">
                    {itemCount > 9 ? "+۹" : itemCount}
                  </span>
                )}
              </Link>

              <button
                type="button"
                aria-label={isMobileOpen ? "بستن منو" : "باز کردن منو"}
                aria-expanded={isMobileOpen}
                onClick={() => setIsMobileOpen((prev) => !prev)}
                className={cn(
                  "flex size-10 items-center justify-center rounded-lg md:hidden",
                  "text-muted-foreground transition-colors duration-[150ms]",
                  "hover:bg-accent hover:text-foreground",
                )}
              >
                {isMobileOpen ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
              </button>
            </div>

            {/* Desktop Navigation — center */}
            <nav className="hidden items-center gap-8 md:flex" aria-label="ناوبری اصلی">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative text-sm font-medium text-muted-foreground",
                    "transition-colors duration-[150ms] hover:text-foreground",
                    "after:absolute after:start-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-gold",
                    "after:transition-[width] after:duration-[220ms] after:ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
                    "hover:after:w-full",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Logo + Ticker — start side (right in RTL) */}
            <div className="flex flex-col items-end gap-1">
              <Link
                href={ROUTES.home}
                className="flex flex-col items-end outline-none"
                aria-label="طلافروشی گلد — صفحه اصلی"
              >
                <span className="text-[1.1rem] leading-tight font-light tracking-[0.06em] text-foreground">
                  طلافروشی
                </span>
                <span className="type-overline mt-0.5 leading-none text-gold">GOLD SHOP</span>
              </Link>
              {mounted && <GoldPriceTicker />}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "overflow-hidden md:hidden",
            "transition-[max-height,border-color] duration-[320ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
            isMobileOpen
              ? "max-h-96 border-b border-border bg-card/98 backdrop-blur-md"
              : "max-h-0",
          )}
          aria-hidden={!isMobileOpen}
        >
          <nav className="container-luxury pt-2 pb-6" aria-label="ناوبری موبایل">
            <div className="flex flex-col divide-y divide-border/50">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="py-3.5 text-sm font-medium text-foreground transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};
