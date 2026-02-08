"use client";

export function SkeletonProductCard() {
  return (
    <div className="flex flex-col items-start animate-pulse w-full">
      {/* IMAGE PLACEHOLDER */}
      <div className="relative w-full aspect-square bg-gray-200 mb-4 rounded-sm" />

      {/* TITLE PLACEHOLDER */}
      <div className="w-full h-4 bg-gray-200 rounded-sm mb-2" />
      <div className="w-2/3 h-4 bg-gray-200 rounded-sm mb-2" />

      {/* PRICE PLACEHOLDER */}
      <div className="w-16 h-4 bg-gray-200 rounded-sm mt-1" />
    </div>
  );
}
