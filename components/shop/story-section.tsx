"use client";

import Image from "next/image";

export function StorySection() {
  return (
    <section className="flex flex-col lg:flex-row w-full min-h-[400px]">
      <div className="flex-1 relative min-h-[300px] lg:min-h-0">
        <Image src="/pub.jpeg" alt="Our Story" fill className="object-cover" />
      </div>
      <div className="flex-1 bg-[#6ab5b1] text-black flex flex-col justify-center px-8 py-12 lg:px-20">
        <span className="uppercase tracking-[0.3em] text-[10px] lg:text-[11px] mb-4 font-medium">
          Our Story
        </span>
        <h2 className="text-2xl lg:text-4xl font-serif mb-6 leading-tight">
          Where Energy Meets Intention
        </h2>
        <p className="text-sm lg:text-base leading-relaxed opacity-90 font-light max-w-xl">
          At StoneGlas, we believe every stone carries a unique vibration. Our
          mission is to combine these natural energies with artisanal
          craftsmanship to create jewelry that doesn't just look beautiful, but
          helps you find your inner balance and focus.
        </p>
        <div className="mt-8">
          <p className="border border-black px-8 py-3 rounded-sm uppercase tracking-[0.2em] text-[10px] lg:text-[11px] hover:bg-white hover:text-[#6ab5b1] transition-all duration-300">
            About Us
          </p>
        </div>
      </div>
    </section>
  );
}
