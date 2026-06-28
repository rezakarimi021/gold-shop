export const siteConfig = {
  name: "طلافروشی",
  nameEn: "Gold Shop",
  tagline: "زیور الست",
  description: "مجموعه‌ای از برترین جواهرات و طلاآلات با کیفیت عالی برای زنان و مردان",
  url:
    process.env["NEXT_PUBLIC_URL"] ??
    process.env["NEXT_PUBLIC_SITE_URL"] ??
    "http://localhost:3000",
  locale: "fa-IR",
  dir: "rtl" as const,
  currency: "IRR",
  currencySymbol: "تومان",
  goldKarats: [18, 21, 24] as const,
  contactEmail: "info@goldshop.ir",
  contactPhone: "+98-21-1234-5678",
  socialLinks: {
    instagram: "https://instagram.com/goldshop",
    telegram: "https://t.me/goldshop",
    whatsapp: "https://wa.me/989121234567",
  },
} as const;

export type SiteConfig = typeof siteConfig;
