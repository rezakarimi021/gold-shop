import { Suspense } from "react";
import { productsService } from "@/services/products.service";
import { ShopPageClient } from "./ShopPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "فروشگاه طلا و جواهر | خرید آنلاین طلا",
  description:
    "خرید آنلاین طلا و جواهرات اصل. انگشتر، گردنبند، دستبند، گوشواره و ست طلا با ضمانت اصالت و ارسال رایگان.",
  keywords: ["خرید طلا", "طلافروشی آنلاین", "جواهرات طلا", "طلا اصل", "انگشتر طلا", "گردنبند طلا"],
};

const ShopPage = async () => {
  const { data: allProducts } = await productsService.getAll({ page: 1, perPage: 1000 });

  return (
    <Suspense>
      <ShopPageClient allProducts={allProducts} />
    </Suspense>
  );
};

export default ShopPage;
