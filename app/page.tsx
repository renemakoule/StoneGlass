"use client";

import { Header } from "@/components/layout/header";
import { HeroBanner } from "@/components/shop/hero-banner";
import { ProductGrid } from "@/components/shop/infinite-product-list";
import { ProductDetail } from "@/components/shop/product-detail";
import { MarqueeBanner } from "@/components/shop/marquee-banner";
import { StorySection } from "@/components/shop/story-section";
import { FeaturesBar } from "@/components/shop/features-bar";
import { MainFooter } from "@/components/layout/main-footer";
import { PRODUCTS } from "@/lib/data";

export default function Home() {
  // Take next 8 for Best Sellers to avoid duplication with main list
  const bestSellers = PRODUCTS.slice(8, 16);

  return (
    <main className="min-h-screen bg-white font-sans text-gray-800 flex flex-col relative">
      <ProductDetail />

      {/* ANNOUNCEMENT BAR */}
      <div className="shrink-0 text-center py-2.5 text-[10px] lg:text-[11px] uppercase tracking-[0.2em] text-black bg-[#6ab5b1]">
        <span className="font-medium">100% Natural, Hand-crafted</span>
      </div>

      <Header />

      {/* HERO SECTION */}
      <HeroBanner />

      {/* MARQUEE */}
      <MarqueeBanner />

      {/* MAIN CATALOG SECTION */}
      <div className="max-w-7xl mx-auto w-full px-6 py-12">
        <ProductGrid title="Find the Energy That Aligns With You" limit={8} />
      </div>

      {/* STORY SECTION */}
      <StorySection />

      {/* BEST SELLERS SECTION */}
      <div className="max-w-7xl mx-auto w-full px-6 py-12">
        <ProductGrid
          title="Best Sellers"
          limit={8}
          initialProducts={bestSellers}
          hideFilters
        />
      </div>

      {/* FEATURES BAR */}
      <FeaturesBar />

      {/* FOOTER */}
      <MainFooter />
    </main>
  );
}
