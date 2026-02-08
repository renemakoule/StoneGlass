"use client";

import Link from "next/link";
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
import { MobileNav } from "./mobile-nav";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  const { items } = useCartStore();
  const { toggle: toggleSearch } = useSearchStore();
  const itemCount = items.length;

  return (
    <header className="bg-white text-gray-900 border-b border-gray-100 px-6 lg:px-16 py-4 flex justify-between items-center shrink-0 sticky top-0 z-50 w-full">
      {/* LOGO */}
      <div className="flex items-center">
        <div className="text-xl lg:text-xl font-bold tracking-[0.15em] uppercase">
          Stone<span className="text-[#6ab5b1]">Glas</span>
        </div>
      </div>

      {/* NAVIGATION - CENTER */}
      <nav className="hidden lg:flex items-center space-x-10 text-[13px] font-medium tracking-wide">
        <Link href="/" className="hover:text-[#6ab5b1] transition-colors">
          Home
        </Link>
        <Link
          href="/catalog"
          className="hover:text-[#6ab5b1] transition-colors"
        >
          Catalog
        </Link>
        <Link
          href="/contact"
          className="hover:text-[#6ab5b1] transition-colors"
        >
          Contact
        </Link>
      </nav>

      {/* ICONS - RIGHT */}
      <div className="flex items-center space-x-6">
        <Search
          className="w-5 h-5 cursor-pointer hover:text-[#6ab5b1] transition-colors"
          onClick={toggleSearch}
        />
        <UserAccountNav />
        <CartSheet>
          <div className="relative cursor-pointer hover:text-[#6ab5b1] transition-colors">
            <ShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-gray-900 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </div>
        </CartSheet>
        <div className="lg:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
