import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "طلافروشی آنلاین",
    "خرید طلا",
    "طلا اصل",
    "جواهرات طلا",
    "انگشتر طلا",
    "گردنبند طلا",
    "دستبند طلا",
    "گوشواره طلا",
    "طلا ۱۸ عیار",
    "طلا ۲۱ عیار",
    "زیورآلات لوکس",
    "طلافروشی",
    "خرید انگشتر",
    "انگشتر نامزدی",
    "هدیه طلا",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
