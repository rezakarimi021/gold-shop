"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { formatWeight } from "@/utils/formatPrice";
import { ShieldCheck, Truck, RotateCcw, Award } from "lucide-react";
import type { Product } from "@/types/product";

type Tab = "description" | "specs" | "care" | "warranty";

const TABS: { id: Tab; label: string }[] = [
  { id: "description", label: "توضیحات" },
  { id: "specs", label: "مشخصات" },
  { id: "care", label: "مراقبت" },
  { id: "warranty", label: "ضمانت" },
];

const TRUST_ITEMS = [
  {
    icon: Award,
    title: "اصالت تضمینی",
    desc: "گواهی عیارسنجی معتبر از اتحادیه طلا",
  },
  {
    icon: Truck,
    title: "ارسال مطمئن",
    desc: "بسته‌بندی امن، بیمه‌شده تا درب منزل",
  },
  {
    icon: RotateCcw,
    title: "بازگشت ۱۴ روزه",
    desc: "بدون سوال، در ۱۴ روز قابل مرجعی",
  },
  {
    icon: ShieldCheck,
    title: "ضمانت ساخت",
    desc: "ضمانت کامل کیفیت برای ۲ سال",
  },
] as const;

interface ProductDetailsProps {
  product: Product;
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [activeTab, setActiveTab] = useState<Tab>("description");

  const CATEGORY_LABELS: Record<string, string> = {
    ring: "انگشتر",
    necklace: "گردنبند",
    bracelet: "دستبند",
    earring: "گوشواره",
    pendant: "آویز",
    bangle: "النگو",
    chain: "زنجیر",
    set: "ست",
  };

  const GENDER_LABELS: Record<string, string> = {
    women: "زنانه",
    men: "مردانه",
    unisex: "یونیسکس",
  };

  return (
    <div className="mt-16">
      {/* Trust badges strip — horizontal, no card wrappers */}
      <div className="mb-14 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
        {TRUST_ITEMS.map(({ icon: Icon, title, desc }, i) => (
          <div
            key={title}
            className={cn(
              "flex items-start gap-3",
              i > 0 && "sm:border-s sm:border-border/60 sm:ps-6",
            )}
          >
            <Icon className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
            <div>
              <p className="mb-0.5 text-xs font-semibold text-foreground">{title}</p>
              <p className="text-xs leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div
        role="tablist"
        aria-label="اطلاعات محصول"
        className={cn("mb-8 flex gap-0 border-b border-border", "overflow-x-auto")}
      >
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={activeTab === id}
            aria-controls={`panel-${id}`}
            onClick={() => setActiveTab(id)}
            className={cn(
              "shrink-0 px-6 py-3.5 text-sm font-medium",
              "-mb-px border-b-2 transition-[border-color,color] duration-[220ms]",
              "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
              activeTab === id
                ? "border-gold text-gold"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab panels */}
      <div className="max-w-2xl">
        {activeTab === "description" && (
          <div
            id="panel-description"
            role="tabpanel"
            aria-label="توضیحات محصول"
            className="animate-fade-in"
          >
            <p className="text-base leading-[2] font-light text-foreground/80">
              {product.description}
            </p>
            {product.craftingDetails && (
              <div className="mt-6 rounded-xl border border-gold/20 bg-gold-muted/50 p-5">
                <p className="type-overline mb-2 text-gold">جزئیات ساخت</p>
                <p className="text-sm leading-relaxed text-foreground/70">
                  {product.craftingDetails}
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "specs" && (
          <div
            id="panel-specs"
            role="tabpanel"
            aria-label="مشخصات محصول"
            className="animate-fade-in"
          >
            <table className="w-full">
              <tbody className="divide-y divide-border">
                {(
                  [
                    ["دسته‌بندی", CATEGORY_LABELS[product.category] ?? product.category],
                    ["جنسیت", GENDER_LABELS[product.gender] ?? product.gender],
                    ...product.variants.map((v, i) => [
                      `گزینه ${i + 1}`,
                      `${v.karat} عیار — ${formatWeight(v.weight)}`,
                    ]),
                    product.dimensions?.diameter
                      ? ["قطر", `${product.dimensions.diameter} میلی‌متر`]
                      : null,
                    product.dimensions?.height
                      ? ["طول", `${product.dimensions.height} میلی‌متر`]
                      : null,
                    product.tags.length > 0 ? ["برچسب‌ها", product.tags.join("، ")] : null,
                  ] as (string[] | null)[]
                )
                  .filter((row): row is string[] => row !== null)
                  .map(([label, value]) => (
                    <tr key={label}>
                      <td className="w-36 py-3.5 text-sm text-muted-foreground">{label}</td>
                      <td className="py-3.5 text-sm text-foreground">{value}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "care" && (
          <div
            id="panel-care"
            role="tabpanel"
            aria-label="راهنمای مراقبت"
            className="animate-fade-in space-y-4"
          >
            {[
              "طلا را دور از مواد شیمیایی، عطر و کرم‌های آرایشی نگه‌دارید.",
              "پس از هر بار استفاده با پارچه نرم و خشک تمیز کنید.",
              "در جعبه یا کیسه جواهرات جداگانه نگه‌داری کنید تا از خش‌خوردگی جلوگیری شود.",
              "برای تمیزکاری عمیق از محلول آب ولرم و صابون ملایم استفاده کنید.",
              "از دستگاه‌های اولتراسونیک خانگی استفاده نکنید — برای لعاب‌کاری‌های ظریف مضر است.",
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-gold/60"
                  aria-hidden="true"
                />
                <p className="text-sm leading-relaxed text-foreground/75">{tip}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "warranty" && (
          <div
            id="panel-warranty"
            role="tabpanel"
            aria-label="ضمانت"
            className="animate-fade-in space-y-6"
          >
            <div className="rounded-xl border border-border bg-card p-6">
              <p className="type-overline mb-3 text-gold">ضمانت ۲ ساله</p>
              <p className="text-sm leading-relaxed text-foreground/75">
                تمامی محصولات طلافروشی گلد دارای ضمانت ۲ ساله کیفیت ساخت هستند. در صورت وجود هرگونه
                ایراد در ساخت، رایگان اصلاح یا تعویض می‌شود.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <p className="type-overline mb-3 text-gold">گواهی اصالت</p>
              <p className="text-sm leading-relaxed text-foreground/75">
                به همراه هر محصول، گواهی عیارسنجی معتبر از اتحادیه طلا و جواهر ایران ارائه می‌شود.
                کد محصول روی گواهی قابل استعلام است.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
