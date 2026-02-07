"use client";

export function SkeletonProductCard() {
  return (
    <div className="flex flex-col items-center animate-pulse">
      {/* IMAGE PLACEHOLDER */}
      <div className="relative w-full aspect-3/4 bg-gray-200 mb-3 rounded-sm">
        <div className="absolute bottom-2 right-2 flex flex-col items-end gap-1.5">
          <div className="w-7 h-7 bg-gray-300 rounded-full" />
          <div className="w-16 h-6 bg-gray-300 rounded-sm" />
        </div>
      </div>

      {/* RATING PLACEHOLDER */}
      <div className="flex gap-0.5 mb-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="w-3 h-3 bg-gray-200 rounded-full" />
        ))}
      </div>

      {/* TITLE PLACEHOLDER */}
      <div className="w-3/4 h-3 bg-gray-200 rounded-sm mb-2" />

      {/* SWATCHES PLACEHOLDER */}
      <div className="flex flex-col items-center gap-2 mb-2">
        <div className="flex gap-1.5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-2.5 h-2.5 rounded-full bg-gray-200" />
          ))}
        </div>
        <div className="w-20 h-2 bg-gray-200 rounded-sm" />
      </div>

      {/* PRICE PLACEHOLDER */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-12 h-4 bg-gray-200 rounded-sm" />
      </div>
    </div>
  );
}
