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

export function ProductCard({ product }: { product: (typeof PRODUCTS)[0] }) {
  const [currentImage, setCurrentImage] = useState(product.image);
  const openDetail = useProductStore((state) => state.openDetail);
  const addItem = useCartStore((state) => state.addItem);
  const openCheckout = useCheckoutStore((state) => state.openCheckout);

  return (
    <div
      className="group flex flex-col items-center cursor-pointer"
      onClick={() => openDetail(product)}
    >
      {/* IMAGE CONTAINER */}
      <div
        className="relative w-full aspect-[3/4] bg-gray-50 mb-3 overflow-hidden rounded-sm"
        onMouseLeave={() => setCurrentImage(product.image)}
      >
        <Image
          src={currentImage}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* ACTION BUTTONS - COMPACT & PERMANENT */}
        <div className="absolute bottom-2 right-2 flex flex-col items-end gap-1.5 z-20 pointer-events-none transition-all duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toast.success("Added to favorites!");
            }}
            className="bg-white text-gray-800 p-1.5 rounded-full shadow-lg hover:bg-brand-red hover:text-white transition-colors pointer-events-auto group/btn relative"
          >
            <Heart className="w-3.5 h-3.5" />
            <span className="absolute right-full mr-2 bg-gray-800 text-white text-[9px] px-2 py-1 rounded-sm opacity-0 group-hover/btn:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">
              Favoris
            </span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1,
              });
              toast.success("Added to cart!");
            }}
            className="bg-white text-gray-800 p-1.5 rounded-full shadow-lg hover:bg-brand-purple hover:text-white transition-colors pointer-events-auto group/btn relative"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="absolute right-full mr-2 bg-gray-800 text-white text-[9px] px-2 py-1 rounded-sm opacity-0 group-hover/btn:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">
              Add to Cart
            </span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              openCheckout(product);
            }}
            className="bg-brand-red text-white px-2.5 py-1 rounded-sm shadow-lg hover:bg-red-600 transition-all pointer-events-auto text-[10px] font-bold uppercase tracking-tight"
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* RATING */}
      <div className="flex text-yellow-400 text-[10px] mb-2 gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i}>★</span>
        ))}
      </div>

      {/* TITLE */}
      <h3 className="text-[13px] text-gray-600 font-medium mb-1 line-clamp-1 hover:text-brand-purple transition-colors px-2 text-center uppercase tracking-tight">
        {product.name}
      </h3>

      {/* VARIETIES (REPLACING COLORS) */}
      <div className="flex flex-col items-center gap-2 mb-2 w-full px-2">
        {product.varieties && product.varieties.length > 0 && (
          <div className="flex gap-1.5 overflow-x-auto pb-1 max-w-full justify-center hide-scrollbar">
            {product.varieties.slice(0, 5).map((variety, i) => (
              <div
                key={i}
                className="relative w-6 h-6 rounded-full overflow-hidden border border-gray-200 cursor-pointer hover:scale-110 transition-transform shadow-sm shrink-0"
                onMouseEnter={() => setCurrentImage(variety.image)}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImage(variety.image);
                }}
              >
                <Image
                  src={variety.image}
                  alt={variety.name}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
            {product.varieties.length > 5 && (
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-[9px] text-gray-500 shrink-0">
                +{product.varieties.length - 5}
              </div>
            )}
          </div>
        )}

        {/* SIZES */}
        {product.sizes && (
          <div className="flex flex-wrap justify-center gap-1 text-[9px] font-bold text-gray-400 uppercase">
            {product.sizes.slice(0, 4).map((s, i) => (
              <span key={i} className="hover:text-gray-800 whitespace-nowrap">
                {i > 0 && <span className="mx-1">•</span>}
                {s.split(":")[0]}
              </span>
            ))}
            {product.sizes.length > 4 && <span>...</span>}
          </div>
        )}
      </div>

      {/* PRICE */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-brand-red font-bold text-xs tracking-tight">
          ${formatPrice(product.price)}
        </span>
        {product.originalPrice && (
          <span className="text-gray-400 line-through text-[11px]">
            ${formatPrice(product.originalPrice)}
          </span>
        )}
      </div>
    </div>
  );
}
