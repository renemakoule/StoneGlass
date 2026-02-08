"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function MainFooter() {
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

        {/* CUSTOMER CARE */}
        {/* <div>
          <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] mb-8">
            Customer Care
          </h4>
          <ul className="space-y-4 text-[13px] text-gray-400 tracking-wider">
            <li>
              <Link href="#" className="hover:text-[#6ab5b1] transition-all">
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#6ab5b1] transition-all">
                Returns & Exchanges
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#6ab5b1] transition-all">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#6ab5b1] transition-all">
                Size Guide
              </Link>
            </li>
          </ul>
        </div> */}

        {/* NEWSLETTER */}
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] mb-8">
            Stay Connected
          </h4>
          <p className="text-[13px] text-gray-400 mb-6 tracking-wide">
            Subscribe to receive updates, access to exclusive deals, and more.
          </p>
          <div className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="YOUR EMAIL"
              className="bg-transparent border-b border-gray-800 py-3 text-[11px] uppercase tracking-widest focus:border-[#6ab5b1] outline-none transition-all placeholder:text-gray-600"
            />
            <button className="bg-[#6ab5b1] text-white py-4 uppercase tracking-[0.2em] rounded-sm text-[10px] font-bold hover:bg-white hover:text-black transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-900 pt-12 text-center">
        <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">
          &copy; {new Date().getFullYear()} StoneGlas. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
