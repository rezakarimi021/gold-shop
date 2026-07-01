"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Truck, RotateCcw, Award } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const TRUST_ITEMS = [
  {
    icon: Award,
    title: "طلای اصیل تضمینی",
    description: "گواهی عیارسنجی معتبر از اتحادیه طلا و جواهر ایران به همراه هر محصول.",
  },
  {
    icon: ShieldCheck,
    title: "ضمانت ۲ ساله",
    description: "ضمانت کامل کیفیت ساخت. هرگونه ایراد در ساخت رایگان اصلاح می‌شود.",
  },
  {
    icon: Truck,
    title: "ارسال رایگان",
    description: "ارسال مطمئن برای خریدهای بالای ۵ میلیون تومان در سراسر ایران.",
  },
  {
    icon: RotateCcw,
    title: "بازگشت ۱۴ روزه",
    description: "بدون سوال، در ۱۴ روز بازگشت کالا پذیرفته می‌شود.",
  },
] as const;

export const TrustSection = () => (
  <section className="border-y border-border/50 bg-muted/15 py-10" aria-label="تعهدات ما">
    <div className="container-luxury">
      <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
        {TRUST_ITEMS.map(({ icon: Icon, title, description }, i) => (
          <motion.div
            key={title}
            className={cn(
              "flex items-start gap-4",
              "lg:px-8",
              i === 0 && "lg:ps-0",
              i === TRUST_ITEMS.length - 1 && "lg:pe-0",
              i > 0 && "lg:border-s lg:border-border/60",
            )}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.48, delay: i * 0.09, ease: EASE }}
          >
            <div
              className={cn(
                "mt-0.5 flex size-9 shrink-0 items-center justify-center",
                "rounded-full bg-gold-muted ring-1 ring-gold/25",
              )}
            >
              <Icon className="size-4 text-gold" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <h3 className="mb-1 text-sm leading-snug font-semibold text-foreground">{title}</h3>
              <p className="text-xs leading-[1.75] text-muted-foreground">{description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
