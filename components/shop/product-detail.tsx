"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Heart,
  Star,
  Plus,
  Minus,
  ChevronRight,
  CheckCircle2,
  Share2,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import { useProductStore } from "@/stores/productStore";
import { useCartStore } from "@/stores/cartStore";
import { useCheckoutStore } from "@/stores/checkoutStore";
import { PRODUCTS } from "@/lib/data";
import { formatPrice, cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ProductDetail() {
  const { selectedProduct, isDetailOpen, closeDetail, openDetail } =
    useProductStore();
  const addItem = useCartStore((state) => state.addItem);
  const openCheckout = useCheckoutStore((state) => state.openCheckout);
  const [currentImage, setCurrentImage] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (selectedProduct) {
      setCurrentImage(selectedProduct.image);
      setSelectedSize(selectedProduct.sizes?.[0] || "");
      setQuantity(1);
    }
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const handleAddToCart = () => {
    if (!selectedProduct) return;

    addItem({
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      image: selectedProduct.image,
      quantity: quantity,
    });
    toast.success(`${selectedProduct.name} added to cart!`);
  };

  const handleBuyNow = () => {
    if (selectedProduct) {
      openCheckout(selectedProduct);
    }
  };

  const suggestions = PRODUCTS.filter((p) => p.id !== selectedProduct.id).slice(
    0,
    3,
  ); // Reduced for compactness

  return (
    <Sheet open={isDetailOpen} onOpenChange={closeDetail}>
      <SheetContent
        side="right"
        className="w-full lg:w-1/2 sm:max-w-none p-0 border-none bg-white shadow-2xl overflow-y-auto custom-scrollbar"
      >
        {/* HEADER: PRODUCT NAME AS TITLE */}
        <SheetHeader className="p-6 pb-0 sticky top-0 bg-white/80 backdrop-blur-md z-30 border-b border-gray-50 mb-2">
          <span className="text-[10px] font-bold text-brand-purple uppercase tracking-[0.2em]">
            Product Details
          </span>
          <SheetTitle className="text-2xl font-bold text-gray-900 uppercase tracking-tighter leading-tight mt-1">
            {selectedProduct.name}
          </SheetTitle>
          <SheetDescription className="sr-only">
            Details and options for {selectedProduct.name}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col lg:flex-row gap-10 p-6 lg:p-8">
          {/* LEFT: GALLERY */}
          <div className="w-full lg:w-[40%] flex flex-col gap-6 lg:sticky lg:top-8 self-start">
            {/* COMPACT GALLERY */}
            <div className="flex flex-col gap-4 mx-auto w-full">
              <div className="relative aspect-square w-full rounded-md overflow-hidden bg-gray-50 shadow-inner">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImage}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={currentImage}
                      alt={selectedProduct.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  {selectedProduct.originalPrice && (
                    <span className="bg-brand-red text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">
                      SALE
                    </span>
                  )}
                </div>
              </div>

              {/* Grid Gallery for Varieties */}
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 w-full">
                <div
                  className={cn(
                    "relative w-full aspect-square rounded-lg overflow-hidden cursor-pointer border-2 bg-white transition-all",
                    currentImage === selectedProduct.image
                      ? "border-brand-purple"
                      : "border-gray-100",
                  )}
                  onClick={() => setCurrentImage(selectedProduct.image)}
                >
                  <Image
                    src={selectedProduct.image}
                    alt="Main"
                    fill
                    className="object-cover"
                  />
                </div>
                {selectedProduct.varieties?.map((v, i) => (
                  <div
                    key={i}
                    className={cn(
                      "relative w-full aspect-square rounded-lg overflow-hidden cursor-pointer border-2 bg-white transition-all",
                      currentImage === v.image
                        ? "border-brand-purple"
                        : "border-gray-100",
                    )}
                    onClick={() => setCurrentImage(v.image)}
                  >
                    <Image
                      src={v.image}
                      alt={v.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: INFO, CONTROLS & SUGGESTIONS */}
          <div className="w-full lg:w-[60%] flex flex-col gap-8">
            {/* ESSENTIAL INFO */}
            <div className="flex items-end justify-between border-b border-gray-100 pb-6">
              <div className="flex flex-col gap-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-brand-red">
                    ${formatPrice(selectedProduct.price)}
                  </span>
                  {selectedProduct.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      ${formatPrice(selectedProduct.originalPrice)}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex text-yellow-400">
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium">
                    (+99)
                  </span>
                </div>
              </div>
              <button className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-brand-red transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* SELECTIONS: COMPACT */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-900">
                    Size
                  </label>
                  <button className="text-[9px] text-brand-purple font-bold">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.sizes?.map((size) => {
                    const label = size.split(":")[0];
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          "w-12 h-10 flex flex-col items-center justify-center rounded-lg border transition-all",
                          selectedSize === size
                            ? "border-brand-purple bg-brand-purple text-white shadow-sm"
                            : "border-gray-100 hover:border-gray-300 text-gray-600 bg-gray-50",
                        )}
                      >
                        <span className="font-bold text-[11px]">{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-900 mb-3 block">
                    Quantity
                  </label>
                  <div className="inline-flex items-center border border-gray-100 rounded-lg overflow-hidden bg-gray-50 h-10">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 hover:bg-white transition-colors h-full border-r border-gray-100"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-10 text-center font-bold text-xs">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 hover:bg-white transition-colors h-full border-l border-gray-100"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ACTIONS: COMPACT BUT PREMIUM */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleBuyNow}
                className="bg-brand-red text-white h-10 rounded-lg font-bold uppercase tracking-wider text-[11px] hover:bg-red-600 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                Buy Now
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={handleAddToCart}
                className="border border-brand-purple text-brand-purple h-10 rounded-lg font-bold uppercase tracking-wider text-[11px] hover:bg-purple-50 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                Add to Cart
                <ShoppingBag className="w-4 h-4" />
              </button>
            </div>

            {/* COMPACT TABS */}
            <Tabs defaultValue="description" className="w-full mt-4">
              <TabsList className="w-full bg-gray-50/50 p-1 border border-gray-100 h-9">
                <TabsTrigger value="description" className="text-xs h-full">
                  Info
                </TabsTrigger>
                <TabsTrigger value="features" className="text-xs h-full">
                  Features
                </TabsTrigger>
                <TabsTrigger value="specs" className="text-xs h-full">
                  Specs
                </TabsTrigger>
              </TabsList>
              <div className="py-4 min-h-[140px]">
                <TabsContent
                  value="description"
                  className="mt-0 outline-none space-y-3"
                >
                  <p className="text-[13px] text-gray-600 leading-relaxed border-l-2 border-brand-purple/20 pl-3">
                    {selectedProduct.description}
                  </p>
                  <p className="text-[11px] text-gray-400 italic">
                    {selectedProduct.more}
                  </p>
                </TabsContent>
                <TabsContent value="features" className="mt-0 outline-none">
                  <ul className="space-y-2">
                    {selectedProduct.features?.map((f, i) => (
                      <li
                        key={i}
                        className="flex gap-2 text-[12px] text-gray-600"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-purple shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent
                  value="specs"
                  className="mt-0 outline-none border border-gray-100 rounded-lg overflow-hidden"
                >
                  {selectedProduct.specification?.map((s, i) => {
                    const [k, v] = s.split(" — ");
                    return (
                      <div
                        key={i}
                        className={cn(
                          "flex justify-between p-2 text-[10px]",
                          i % 2 === 0 ? "bg-white" : "bg-gray-50/50",
                        )}
                      >
                        <span className="text-gray-400 font-bold uppercase">
                          {k}
                        </span>
                        <span className="text-gray-900 font-medium">{v}</span>
                      </div>
                    );
                  })}
                </TabsContent>
              </div>
            </Tabs>

            <footer className="pt-6 border-t border-gray-50 flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Share2 className="w-3 h-3" /> Share
              </span>
              <div className="flex gap-4">
                <button className="text-gray-400 hover:text-brand-purple transition-colors">
                  <Facebook className="w-4 h-4" />
                </button>
                <button className="text-gray-400 hover:text-brand-purple transition-colors">
                  <Instagram className="w-4 h-4" />
                </button>
                <button className="text-gray-400 hover:text-brand-purple transition-colors">
                  <Twitter className="w-4 h-4" />
                </button>
              </div>
            </footer>
            {/* SUGGESTIONS: NOW AT THE BOTTOM OF THE RIGHT COLUMN */}
            <div className="mt-8 pt-8 border-t border-gray-100">
              <h4 className="text-[11px] font-bold text-gray-900 uppercase tracking-[0.15em] mb-4">
                You may also like
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {suggestions.map((p) => (
                  <div
                    key={p.id}
                    className="bg-gray-50 p-2 rounded-xl group cursor-pointer hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-brand-purple/10"
                    onClick={() => openDetail(p)}
                  >
                    <div className="relative aspect-square rounded-lg overflow-hidden mb-2">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <h5 className="text-[9px] font-bold text-gray-800 uppercase tracking-tight line-clamp-1 mb-0.5">
                      {p.name}
                    </h5>
                    <p className="text-brand-red font-bold text-[10px]">
                      ${formatPrice(p.price)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
