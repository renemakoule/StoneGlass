"use client";

import {
  Search,
  Heart,
  User,
  ShoppingBag,
  ChevronDown,
  Menu,
} from "lucide-react";

import { CartSheet } from "@/components/shop/cart-sheet";
import { useCartStore } from "@/stores/cartStore";
import { useSearchStore } from "@/stores/searchStore";
import { UserAccountNav } from "@/components/auth/user-account-nav";

export function Header() {
  const { items } = useCartStore();
  const { toggle: toggleSearch } = useSearchStore();
  const itemCount = items.length;

  return (
    <header className="bg-white text-cyan-500 px-4 lg:px-8 py-3 flex justify-between items-center shrink-0">
      <div className="flex items-center space-x-3 lg:space-x-4">
        <div className="text-2xl lg:text-3xl font-serif italic tracking-tightest">
          StoneGlass.
        </div>
      </div>
      <div className="hidden lg:flex items-center space-x-6 text-[13px] font-medium">
        {/* <span className="flex items-center cursor-pointer hover:opacity-80">
          English <ChevronDown className="w-3.5 h-3.5 ml-1" />
        </span> */}
        <div className="flex items-center border-l border-cyan-500/20 pl-6 space-x-6">
          {/* <span className="flex items-center cursor-pointer hover:opacity-80">
            <span className="mr-1">🇺🇸</span> USD{" "}
            <ChevronDown className="w-3.5 h-3.5 ml-1" />
          </span> */}
          <Search
            className="w-5 h-5 cursor-pointer hover:opacity-80"
            onClick={toggleSearch}
          />
          <UserAccountNav />
          <CartSheet>
            <div className="relative cursor-pointer hover:opacity-80">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-2 bg-brand-red text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                {itemCount}
              </span>
            </div>
          </CartSheet>
        </div>
      </div>

      {/* Mobile-only Search/Bag if needed, but we have MobileNav */}
      {/* <div className="lg:hidden flex items-center gap-4">
        <Search
          className="w-5 h-5 cursor-pointer hover:opacity-80"
          onClick={toggleSearch}
        />
      </div> */}
    </header>
  );
}
