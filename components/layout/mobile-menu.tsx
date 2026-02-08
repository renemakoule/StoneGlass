"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useState } from "react";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div className="lg:hidden cursor-pointer hover:text-[#6ab5b1] transition-colors">
          <Menu className="w-6 h-6" />
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] bg-white p-0">
        <SheetHeader className="p-6 border-b border-gray-100 text-left">
          <SheetTitle asChild>
            <div className="flex items-center">
              <div className="text-xl font-bold tracking-[0.15em] uppercase text-gray-900">
                Stone<span className="text-[#6ab5b1]">Glas</span>
              </div>
            </div>
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col p-6 space-y-6">
          <SheetClose asChild>
            <Link
              href="/"
              className="text-lg font-medium tracking-wide text-gray-900 hover:text-[#6ab5b1] transition-colors uppercase"
            >
              Home
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="/catalog"
              className="text-lg font-medium tracking-wide text-gray-900 hover:text-[#6ab5b1] transition-colors uppercase"
            >
              Catalog
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="/contact"
              className="text-lg font-medium tracking-wide text-gray-900 hover:text-[#6ab5b1] transition-colors uppercase"
            >
              Contact
            </Link>
          </SheetClose>
        </nav>

        <div className="absolute bottom-10 left-6 right-6 text-center">
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
            100% Natural, Hand-crafted
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
