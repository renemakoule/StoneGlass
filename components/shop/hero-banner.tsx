"use client";

import Image from "next/image";
import Link from "next/link";

export function HeroBanner() {
  return (
    <div className="relative bg-brand-dark text-white flex overflow-hidden w-full h-[400px] lg:h-[400px]">
      {/* CONTENT */}
      <div className="relative z-10 w-full flex flex-col justify-center items-center text-center p-8 bg-black/30">
        <h1 className="text-3xl font-serif mb-8 leading-tight max-w-4xl drop-shadow-2xl">
          The essence of stones, designed for your balance.
        </h1>
        <Link
          href="/catalog"
          className="bg-[#ffffff] text-black px-10 py-4 rounded-sm uppercase tracking-[0.3em] text-[10px] lg:text-xs font-bold hover:bg-white hover:text-black transition-all duration-500 shadow-xl"
        >
          Explore our bracelets
        </Link>
      </div>

      {/* IMAGE */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-section.jpeg"
          alt="Banner"
          fill
          className="object-cover"
          priority
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/20" />
      </div>
    </div>
  );
}
