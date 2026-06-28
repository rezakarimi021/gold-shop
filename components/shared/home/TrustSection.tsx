"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Truck, RotateCcw, Award } from "lucide-react";
import { cn } from "@/lib/utils";

const LUXURY_EASE = [0.25, 0.46, 0.45, 0.94] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.09, ease: LUXURY_EASE },
  }),
};

const TRUST_ITEMS = [
  {
    icon: Award,
    title: "طلای اصیل تضمینی",
    description: "همه محصولات دارای گواهی عیارسنجی از اتحادیه طلا و جواهر ایران.",
  },
  {
    icon: ShieldCheck,
    title: "ضمانت ۲ ساله",
    description: "ضمانت کامل کیفیت ساخت. هرگونه ایراد در ساخت رایگان اصلاح می‌شود.",
  },
  {
    icon: Truck,
    title: "ارسال رایگان",
    description: "ارسال مطمئن و رایگان برای خریدهای بالای ۵ میلیون تومان در سراسر ایران.",
  },
  {
    icon: RotateCcw,
    title: "بازگشت ۱۴ روزه",
    description: "رضایت شما اولویت ماست. بدون سوال، در ۱۴ روز بازگشت کالا پذیرفته می‌شود.",
  },
] as const;

export const TrustSection = () => (
  <section className="section-spacing-sm border-y border-border bg-muted/40" aria-label="چرا ما">
    <div className="container-luxury">
      <motion.div
        className="mb-10 text-center"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: LUXURY_EASE }}
      >
        <p className="type-overline mb-3 text-gold">تعهد ما</p>
        <h2 className="type-display-sm text-foreground">تجربه خرید بی‌نظیر، تضمین‌شده</h2>
      </motion.div>

      <div className={cn("grid gap-8", "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4")}>
        {TRUST_ITEMS.map(({ icon: Icon, title, description }, i) => (
          <motion.div
            key={title}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className={cn(
              "group flex flex-col items-center text-center",
              "rounded-2xl p-6",
              "bg-card shadow-luxury-xs",
              "transition-[box-shadow,transform] duration-[320ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
              "hover:-translate-y-0.5 hover:shadow-luxury-md",
            )}
          >
            <div
              className={cn(
                "mb-5 flex size-14 items-center justify-center rounded-full",
                "bg-gold-muted",
                "transition-colors duration-[220ms] group-hover:bg-gold/15",
              )}
            >
              <Icon className="size-6 text-gold" />
            </div>

            <h3 className="mb-2 text-base font-medium text-foreground">{title}</h3>
            <p className="text-sm leading-[1.75] text-muted-foreground">{description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
