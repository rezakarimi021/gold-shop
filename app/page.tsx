import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/shared/home/HeroSection";
import { FeaturedCollections } from "@/components/shared/home/FeaturedCollections";
import { BestSellers } from "@/components/shared/home/BestSellers";
import { CategoryShowcase } from "@/components/shared/home/CategoryShowcase";
import { TrustSection } from "@/components/shared/home/TrustSection";
import { LimitedOffers } from "@/components/shared/home/LimitedOffers";
import { NewsletterSection } from "@/components/shared/home/NewsletterSection";
import { productsService } from "@/services/products.service";
import { categoriesService } from "@/services/categories.service";

const HomePage = async () => {
  const [featured, collections, categories] = await Promise.all([
    productsService.getFeatured(4),
    productsService.getCollections(),
    categoriesService.getAll(),
  ]);

  return (
    <>
      <Navbar />

      <main>
        <HeroSection />

        <FeaturedCollections collections={collections} />

        <BestSellers products={featured} />

        <CategoryShowcase categories={categories} />

        <TrustSection />

        <LimitedOffers
          product={featured.find((p) => p.stockStatus === "low_stock") ?? featured[0]}
        />

        <NewsletterSection />
      </main>

      <Footer />
    </>
  );
};

export default HomePage;
