"use client";

import { Home, Search, Heart, ShoppingBag, User } from "lucide-react";
import { CartSheet } from "@/components/shop/cart-sheet";
import { useCartStore } from "@/stores/cartStore";
import { useSearchStore } from "@/stores/searchStore";
import { UserAccountNav } from "@/components/auth/user-account-nav";

export function MobileNav() {
  const { items } = useCartStore();
  const { toggle: toggleSearch } = useSearchStore();
  const itemCount = items.length;

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 px-6 py-3 bg-white/80 backdrop-blur-md border-t border-gray-100 flex justify-between items-center shadow-[0_-4px_10px_rgba(0,0,0,0.03)] pb-safe-offset-3">
      <button className="flex flex-col items-center gap-1 text-brand-purple">
        <Home className="w-5 h-5" />
        <span className="text-[10px] font-medium uppercase tracking-wider">
          Home
        </span>
      </button>
      <button
        onClick={toggleSearch}
        className="flex flex-col items-center gap-1 text-gray-400 hover:text-brand-purple transition-colors"
      >
        <Search className="w-5 h-5" />
        <span className="text-[10px] font-medium uppercase tracking-wider">
          Search
        </span>
      </button>
      {/* <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-brand-purple transition-colors">
        <Heart className="w-5 h-5" />
        <span className="text-[10px] font-medium uppercase tracking-wider">
          Wishlist
        </span>
      </button> */}
      <CartSheet>
        <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-brand-purple transition-colors relative">
          <ShoppingBag className="w-5 h-5" />
          <span className="bg-brand-red text-white text-[8px] absolute -top-1 -right-1 w-3.5 h-3.5 flex items-center justify-center rounded-full border border-white">
            {itemCount}
          </span>
          <span className="text-[10px] font-medium uppercase tracking-wider">
            Cart
          </span>
        </button>
      </CartSheet>
      <UserAccountNav mobile />
    </nav>
  );
}
