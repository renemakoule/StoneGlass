"use client";

import { motion } from "framer-motion";

const marqueeText =
  "Minimalist jewellery for mindful rituals. Handcrafted in sterling silver & gold, with genuine healing gemstones.";

export function MarqueeBanner() {
  return (
    <div className="bg-[#fffdf4] py-6 overflow-hidden border-y border-pink-100 flex items-center">
      <motion.div
        animate={{ x: [0, "-50%"] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex whitespace-nowrap text-[10px] lg:text-xs font-semibold tracking-[0.2em] uppercase text-black"
      >
        <span className="px-8">{marqueeText}</span>
        <span className="px-8">{marqueeText}</span>
        <span className="px-8">{marqueeText}</span>
        <span className="px-8">{marqueeText}</span>
      </motion.div>
    </div>
  );
}
