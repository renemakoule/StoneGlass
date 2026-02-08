"use client";

import Image from "next/image";
import { PRODUCTS } from "@/lib/data";
import { ShoppingBag, Heart } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { formatPrice } from "@/lib/utils";
import { useProductStore } from "@/stores/productStore";
import { useCartStore } from "@/stores/cartStore";
import { useCheckoutStore } from "@/stores/checkoutStore";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ProductCard({ product }: { product: (typeof PRODUCTS)[0] }) {
  const openDetail = useProductStore((state) => state.openDetail);
  const varieties = product.varieties || [];
  const allImages = [product.image, ...varieties.map((v) => v.image)];

  const [imgIndex, setImgIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <div
      className="group flex flex-col items-start cursor-pointer w-full"
      onClick={() => openDetail(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setImgIndex(0);
      }}
    >
      {/* IMAGE CONTAINER */}
      <div className="relative w-full aspect-square bg-gray-100 mb-4 overflow-hidden rounded-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={imgIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full"
          >
            <Image
              src={allImages[imgIndex]}
              alt={product.name}
              fill
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* SLIDER NAVIGATION - ONLY ON HOVER */}
        {isHovered && allImages.length > 1 && (
          <>
            <button
              onClick={prevImg}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white text-gray-800 p-1 rounded-full shadow-sm transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImg}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white text-gray-800 p-1 rounded-full shadow-sm transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* DOT INDICATORS */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-30">
              {allImages.map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${i === imgIndex ? "bg-white scale-110" : "bg-white/40"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* TITLE */}
      <h3 className="text-[14px] text-gray-800 font-medium mb-1 line-clamp-2 px-1">
        {product.name}
      </h3>

      {/* PRICE */}
      <div className="flex items-center gap-2 px-1">
        <span className="text-gray-600 text-[14px]">
          ${formatPrice(product.price)}
        </span>
        {product.originalPrice && (
          <span className="text-gray-300 line-through text-[12px]">
            ${formatPrice(product.originalPrice)}
          </span>
        )}
      </div>
    </div>
  );
}
