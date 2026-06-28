import { Geist, Vazirmatn } from "next/font/google";

export const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
  preload: true,
});

export const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
  display: "swap",
  preload: true,
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
