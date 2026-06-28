"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FormStatus = "idle" | "loading" | "success" | "error";

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    await new Promise<void>((resolve) => setTimeout(resolve, 900));
    setStatus("success");
    setEmail("");
  };

  return (
    <section
      className={cn("section-spacing-sm", "bg-[oklch(0.148_0.010_56)]")}
      aria-label="خبرنامه"
    >
      <div className="container-narrow text-center">
        {/* Icon */}
        <div
          className={cn(
            "mx-auto mb-6 flex size-14 items-center justify-center rounded-full",
            "border border-gold/20 bg-gold/10",
          )}
          aria-hidden="true"
        >
          <Mail className="size-6 text-gold" />
        </div>

        <p className="type-overline mb-4 text-gold">خبرنامه</p>

        <h2 className="type-display-sm mb-4 text-[oklch(0.935_0.006_83)]">اولین باشید</h2>

        <p
          className={cn(
            "mx-auto mb-10 max-w-[44ch]",
            "text-base leading-[1.8] font-light text-[oklch(0.935_0.006_83)]/60",
          )}
        >
          از جدیدترین کلکسیون‌ها، پیشنهادات ویژه اعضا، و تخفیف‌های اختصاصی پیش از همه باخبر شوید.
        </p>

        {status === "success" ? (
          <div className="animate-fade-in">
            <div
              className={cn(
                "mx-auto inline-flex items-center gap-3 rounded-xl",
                "border border-gold/30 bg-gold/10 px-6 py-4",
              )}
            >
              <div className="size-2 rounded-full bg-gold" aria-hidden="true" />
              <p className="text-sm font-medium text-gold">ممنون! عضویت شما با موفقیت ثبت شد.</p>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
            noValidate
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="آدرس ایمیل شما"
              required
              className={cn(
                "h-12 flex-1 rounded-xl",
                "border-white/10 bg-white/5",
                "text-[oklch(0.935_0.006_83)] placeholder:text-[oklch(0.935_0.006_83)]/30",
                "focus-visible:border-gold/50 focus-visible:ring-gold/20",
              )}
              aria-label="آدرس ایمیل"
            />
            <Button
              type="submit"
              variant="gold"
              size="lg"
              isLoading={status === "loading"}
              loadingText="در حال ثبت..."
              className="h-12 rounded-xl"
            >
              عضویت
            </Button>
          </form>
        )}

        <p className="mt-5 text-xs text-[oklch(0.935_0.006_83)]/30">
          اطلاعات شما محفوظ است. هر زمان می‌توانید لغو اشتراک کنید.
        </p>
      </div>
    </section>
  );
};
