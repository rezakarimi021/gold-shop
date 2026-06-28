import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { buttonVariants } from "@/components/ui/button";

export const HeroSection = () => (
  <section
    className="relative flex min-h-screen flex-col overflow-hidden lg:flex-row"
    aria-label="بخش اصلی"
  >
    {/* ── Text side — right (start in RTL) ────────────────────────────────── */}
    <div
      className={cn(
        "relative z-10 flex flex-1 flex-col justify-center",
        "px-6 pt-32 pb-16 sm:px-10",
        "lg:max-w-[52%] lg:ps-[max(3rem,5vw)] lg:pe-16 lg:pt-36 lg:pb-24",
        "bg-background",
      )}
    >
      {/* Thin gold vertical rule on the inner edge (desktop only) */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute hidden lg:block",
          "end-0 top-[20%] h-[60%] w-px",
          "bg-gradient-to-b from-transparent via-gold/30 to-transparent",
        )}
      />

      <div className="max-w-lg">
        {/* Overline */}
        <p className="type-overline animate-fade-in mb-7 text-gold">کلکسیون بهار ۱۴۰۵</p>

        {/* Headline */}
        <h1
          className={cn(
            "type-display-xl mb-6 text-foreground",
            "animate-fade-in [animation-delay:80ms]",
          )}
        >
          جواهراتی که
          <br />
          <span className="text-gold">داستان می‌گویند</span>
        </h1>

        {/* Divider */}
        <div
          className="animate-fade-in mb-7 h-px w-14 bg-gold/40 [animation-delay:160ms]"
          aria-hidden="true"
        />

        {/* Body */}
        <p
          className={cn(
            "mb-10 text-[1.0625rem] leading-[1.85] font-light text-muted-foreground",
            "max-w-[36ch]",
            "animate-fade-in [animation-delay:240ms]",
          )}
        >
          هر قطعه از مجموعه ما روایت‌گر یک لحظه جاودانه است. طلای خالص، دست‌ساز با فن فیلیگری ایرانی
          — برای کسانی که ارزش زیبایی را می‌دانند.
        </p>

        {/* CTAs */}
        <div
          className={cn(
            "flex flex-wrap items-center gap-4",
            "animate-fade-in [animation-delay:320ms]",
          )}
        >
          <Link
            href={ROUTES.collection("bahar-1405")}
            className={cn(buttonVariants({ variant: "gold", size: "lg" }))}
          >
            کشف کلکسیون
          </Link>

          <Link
            href={ROUTES.shop}
            className={cn(
              "group inline-flex items-center gap-2",
              "text-sm font-medium text-foreground",
              "border-b border-foreground/30 pb-0.5",
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
        </div>

        {/* Trust micro-row */}
        <div
          className={cn(
            "mt-12 flex flex-wrap items-center gap-6",
            "animate-fade-in [animation-delay:400ms]",
          )}
        >
          {["طلای ۱۸ و ۲۴ عیار", "ضمانت اصالت", "ارسال رایگان"].map((item) => (
            <div key={item} className="flex items-center gap-1.5">
              <div className="size-1 rounded-full bg-gold/60" aria-hidden="true" />
              <span className="type-overline text-muted-foreground">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* ── Image side — left (end in RTL) ───────────────────────────────────── */}
    <div className={cn("relative min-h-[55vw] flex-1", "lg:min-h-full", "image-hover-luxury")}>
      <Image
        src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=90"
        alt="انگشتر طلا — کلکسیون بهار ۱۴۰۵"
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 52vw"
        className="object-cover object-center"
        data-luxury-image
      />
      {/* Subtle warm scrim on the start edge (where it meets the text side) */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0",
          "bg-gradient-to-e from-background/40 via-transparent to-transparent",
          "lg:bg-gradient-to-e lg:from-background/20 lg:via-transparent lg:to-transparent",
        )}
      />
    </div>

    {/* Scroll indicator */}
    <div
      aria-hidden="true"
      className={cn(
        "absolute start-1/2 bottom-8 -translate-x-1/2",
        "hidden flex-col items-center gap-2 lg:flex",
        "animate-fade-in [animation-delay:600ms]",
      )}
    >
      <span className="type-overline text-muted-foreground/60">اسکرول</span>
      <div className="h-10 w-px bg-gradient-to-b from-border to-transparent" />
    </div>
  </section>
);
