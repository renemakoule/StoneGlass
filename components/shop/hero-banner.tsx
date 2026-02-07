"use client";

import Image from "next/image";

export function HeroBanner() {
  return (
    <div className="relative bg-brand-dark text-white rounded-lg flex overflow-hidden mb-6 h-[220px] lg:h-[250px]">
      {/* CONTENT - Relative to stay above the image on mobile */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center p-6 lg:p-8 lg:bg-linear-to-r from-black via-brand-purple/30 to-black">
        <h1 className="text-3xl lg:text-4xl font-serif mb-2 leading-tight drop-shadow-md">
          Hot Best
          <br />
          Sexy Lingerie set
        </h1>
        <p className="text-[10px] lg:text-xs tracking-widest uppercase mt-4 opacity-90 font-medium">
          Show your richness
        </p>
      </div>

      {/* IMAGE - Absolute on mobile, Relative on desktop */}
      <div className="absolute inset-0 lg:relative lg:flex-1 z-0">
        <Image
          src="/hero-section.jpeg"
          alt="Banner"
          fill
          className="object-cover"
          priority
        />
        {/* Mobile Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/40 to-black/70 lg:hidden" />
      </div>
    </div>
  );
}
