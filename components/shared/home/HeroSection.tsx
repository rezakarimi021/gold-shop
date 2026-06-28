"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { buttonVariants } from "@/components/ui/button";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.72, ease, delay },
});

export const HeroSection = () => (
  <section
    className="relative flex min-h-screen w-full flex-col overflow-hidden"
    aria-label="بخش اصلی"
  >
    {/* ── Full-screen background photo ────────────────────────────────────── */}
    <div className="absolute inset-0 z-0">
      <Image
        src="/images/hero/model-earring.jpg"
        alt="مدل با گوشواره طلا — طلافروشی گلد"
        fill
        priority
        quality={95}
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Layered overlays for editorial depth */}
      {/* Bottom-up dark gradient for text legibility */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10"
      />
      {/* Right-side warm vignette (RTL: text sits on right) */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-l from-black/50 via-transparent to-transparent"
      />
      {/* Very subtle warm gold tone over skin tones */}
      <div aria-hidden className="absolute inset-0 bg-[#b8860b]/5 mix-blend-multiply" />
    </div>

    {/* ── Content ─────────────────────────────────────────────────────────── */}
    <div
      className={cn(
        "relative z-10 flex min-h-screen flex-col justify-end",
        "px-6 pb-16 sm:px-10 sm:pb-20",
        "lg:px-[max(3rem,6vw)] lg:pb-28",
      )}
    >
      {/* Gold fine rule — purely decorative */}
      <motion.div
        aria-hidden
        className="mb-8 h-px w-16 bg-gold/70"
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, ease, delay: 0.1 }}
      />

      {/* Overline */}
      <motion.p className="type-overline mb-4 tracking-widest text-gold/90" {...fadeUp(0.2)}>
        کلکسیون بهار ۱۴۰۵
      </motion.p>

      {/* Headline */}
      <motion.h1
        className={cn(
          "mb-5 leading-[1.15] font-light tracking-tight text-white",
          "text-[2.4rem] sm:text-[3.2rem] lg:text-[4rem] xl:text-[4.8rem]",
          "max-w-[12ch]",
        )}
        {...fadeUp(0.32)}
      >
        جواهراتی که
        <br />
        <span
          className={cn(
            "font-extralight italic",
            "bg-gradient-to-l from-[#f0d060] via-[#d4a820] to-[#c8960c]",
            "bg-clip-text text-transparent",
          )}
        >
          داستان می‌گویند
        </span>
      </motion.h1>

      {/* Body */}
      <motion.p
        className={cn(
          "mb-10 leading-[1.9] font-light text-white/75",
          "max-w-[38ch] text-[0.9375rem]",
        )}
        {...fadeUp(0.44)}
      >
        هر قطعه روایت‌گر یک لحظه جاودانه است. طلای خالص، دست‌ساز با فن فیلیگری ایرانی — برای کسانی
        که ارزش زیبایی را می‌دانند.
      </motion.p>

      {/* CTAs */}
      <motion.div className="flex flex-wrap items-center gap-4" {...fadeUp(0.56)}>
        <Link
          href={ROUTES.collection("bahar-1405")}
          className={cn(
            buttonVariants({ variant: "gold", size: "lg" }),
            "shadow-lg shadow-gold/20",
          )}
        >
          کشف کلکسیون
        </Link>

        <Link
          href={ROUTES.shop}
          className={cn(
            "group inline-flex items-center gap-2",
            "text-sm font-medium text-white/80",
            "border-b border-white/30 pb-0.5",
            "transition-[border-color,color] duration-[220ms]",
            "hover:border-gold hover:text-gold",
          )}
        >
          مشاهده همه محصولات
          <ArrowLeft
            className={cn(
              "size-3.5 transition-transform duration-[220ms]",
              "rtl:rotate-180 group-hover:rtl:-translate-x-1",
            )}
          />
        </Link>
      </motion.div>

      {/* Trust micro-row */}
      <motion.div className="mt-10 flex flex-wrap items-center gap-6" {...fadeUp(0.68)}>
        {["طلای ۱۸ و ۲۴ عیار", "ضمانت اصالت", "ارسال رایگان"].map((item) => (
          <div key={item} className="flex items-center gap-2">
            <div className="size-1 rounded-full bg-gold/70" aria-hidden />
            <span className="type-overline tracking-wider text-white/60">{item}</span>
          </div>
        ))}
      </motion.div>
    </div>

    {/* Scroll indicator */}
    <motion.div
      aria-hidden
      className={cn("absolute end-8 bottom-10 hidden flex-col items-center gap-3 lg:flex")}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.1, duration: 0.6 }}
    >
      <span
        className="type-overline tracking-widest text-white/40"
        style={{ writingMode: "vertical-rl" }}
      >
        اسکرول
      </span>
      <motion.div
        className="w-px bg-gradient-to-b from-gold/50 to-transparent"
        initial={{ height: 0 }}
        animate={{ height: 56 }}
        transition={{ delay: 1.3, duration: 0.8, ease }}
      />
    </motion.div>
  </section>
);
