"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export function MainFooter() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please fill in the empty field.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    setIsDialogOpen(true);
    setEmail("");
  };

  return (
    <footer className="bg-black text-white pt-10 pb-4 px-4 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-20">
        {/* BRAND COLUMN */}
        <div>
          <div className="text-2xl font-bold tracking-[0.2em] uppercase mb-8">
            Stone<span className="text-[#6ab5b1]">Glas</span>
          </div>
          <p className="text-[13px] text-gray-400 leading-relaxed tracking-wider mb-8">
            Premium gemstone jewelry designed to bring balance and focused
            energy to your daily life. Hand-crafted with intention.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] mb-8">
            Quick Links
          </h4>
          <ul className="space-y-4 text-[13px] text-gray-400 tracking-wider">
            <li>
              <Link href="/" className="hover:text-[#6ab5b1] transition-all">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/catalog"
                className="hover:text-[#6ab5b1] transition-all"
              >
                Catalog
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#6ab5b1] transition-all">
                Collections
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-[#6ab5b1] transition-all"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* CUSTOMER CARE - Commeneted out as in original */}

        {/* NEWSLETTER */}
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] mb-8">
            Stay Connected
          </h4>
          <p className="text-[13px] text-gray-400 mb-6 tracking-wide">
            Subscribe to receive updates, access to exclusive deals, and more.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="YOUR EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border-b border-gray-800 py-3 text-[11px] tracking-widest focus:border-[#6ab5b1] outline-none transition-all placeholder:text-gray-600"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#6ab5b1] text-white py-4 uppercase tracking-[0.2em] rounded-sm text-[10px] font-bold hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader className="w-3 h-3 animate-spin" />
                  Processing...
                </>
              ) : (
                "Subscribe"
              )}
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-900 pt-12 text-center">
        <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">
          &copy; {new Date().getFullYear()} StoneGlas. All rights reserved.
        </p>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-black border-gray-800 text-white rounded-sm">
          <DialogHeader>
            <DialogTitle className="text-[#6ab5b1] uppercase tracking-[0.2em]">
              Subscription Successful
            </DialogTitle>
            <DialogDescription className="text-gray-400 mt-4 leading-relaxed">
              Thank you for subscribing, you will be notified of our new
              products from StoneGlas.
            </DialogDescription>
          </DialogHeader>
          {/* <div className="mt-6 flex justify-end">
            <button
              onClick={() => setIsDialogOpen(false)}
              className="px-6 py-2 bg-gray-900 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all rounded-sm"
            >
              Close
            </button>
          </div> */}
        </DialogContent>
      </Dialog>
    </footer>
  );
}
