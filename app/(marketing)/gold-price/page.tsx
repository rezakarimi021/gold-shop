import type { Metadata } from "next";
import { GoldPricePageClient } from "./GoldPricePageClient";

export const metadata: Metadata = {
  title: "نمودار قیمت طلا | طلافروشی گلد",
  description:
    "قیمت لحظه‌ای طلای ۱۸ عیار، ۲۱ عیار و ۲۴ عیار در بازار ایران. نمودار تاریخی قیمت طلا با امکان مشاهده روند ۱ روزه تا ۱ ساله.",
  openGraph: {
    title: "نمودار قیمت طلا",
    description: "قیمت لحظه‌ای طلا در بازار ایران",
    type: "website",
  },
};

const GoldPricePage = () => <GoldPricePageClient />;

export default GoldPricePage;
