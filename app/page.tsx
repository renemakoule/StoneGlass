"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { HeroBanner } from "@/components/shop/hero-banner";
import { Toolbar } from "@/components/shop/toolbar";
import { InfiniteProductList } from "@/components/shop/infinite-product-list";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ProductDetail } from "@/components/shop/product-detail";
import { Filter, X } from "lucide-react";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <main className="h-screen bg-brand-light font-sans text-gray-800 flex flex-col overflow-hidden relative">
      <ProductDetail />

      {/* BREADCRUMB - Hidden on mobile for space */}
      <div className="shrink-0 text-center py-3 text-xs text-gray-500 bg-cyan-500 border-b">
        <span className="text-gray-800 font-medium">
          100% Natural, Hand-crafted
        </span>
      </div>
      <Header />

      <div className="max-w-7xl mx-auto w-full px-4 py-4 lg:py-8 flex gap-8 flex-1 overflow-hidden">
        {/* DESKTOP SIDEBAR */}
        <div className="hidden lg:block h-full">
          <Sidebar />
        </div>

        {/* MOBILE DRAWER SIDEBAR */}
        <div
          className={`fixed inset-0 z-60 lg:hidden transition-opacity duration-300 ${isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
          {/* Content */}
          <div
            className={`absolute top-0 left-0 bottom-0 w-[280px] bg-white shadow-2xl transition-transform duration-300 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} flex flex-col`}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <span className="font-bold uppercase tracking-widest text-xs">
                Filters
              </span>
              <span
                onClick={() => setIsSidebarOpen(false)}
                className="p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </span>
            </div>
            <div className="flex-1 overflow-y-auto p-4 scrollbar-none">
              <Sidebar />
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <section className="flex-1 overflow-y-auto lg:pr-4 custom-scrollbar pb-24 lg:pb-10">
          <HeroBanner />

          <p className="text-[11px] lg:text-xs text-gray-500 mb-6 lg:mb-8 leading-relaxed">
            The word lingerie is a word taken directly from the French language,
            meaning undergarments, and used exclusively for more lightweight
            items of female undergarments...
          </p>

          <Toolbar />

          {/* INFINITE PRODUCT LIST */}
          <InfiniteProductList />
        </section>
      </div>

      {/* FLOAT ACTION BUTTON (FAB) - Filter */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="lg:hidden fixed bottom-20 right-4 z-40 bg-brand-purple text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
      >
        <Filter className="w-5 h-5" />
      </button>

      {/* MOBILE BOTTOM NAVIGATION */}
      <MobileNav />
    </main>
  );
}
