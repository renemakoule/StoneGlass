"use client";

import { Header } from "@/components/layout/header";
import { MainFooter } from "@/components/layout/main-footer";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white font-sans text-gray-800 flex flex-col">
      {/* ANNOUNCEMENT BAR */}
      <div className="shrink-0 text-center py-2.5 text-[10px] lg:text-[11px] uppercase tracking-[0.2em] text-black font-bold bg-[#6ab5b1]">
        <span className="font-medium">100% Natural, Hand-crafted</span>
      </div>

      <Header />

      <div className="flex-1 w-full max-w-3xl mx-auto px-6 py-12 lg:py-20">
        <h1 className="text-3xl lg:text-5xl font-bold text-center mb-12 tracking-tight text-gray-900">
          Contact
        </h1>

        <form className="space-y-5">
          {/* Row 1: Name and Email */}
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-[5px] outline-none focus:border-gray-400 transition-colors text-sm placeholder:text-gray-500"
              />
            </div>
            <div className="flex-1">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-[5px] outline-none focus:border-gray-400 transition-colors text-sm placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* Row 2: Phone */}
          <div>
            <input
              type="tel"
              placeholder="Phone"
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-[5px] outline-none focus:border-gray-400 transition-colors text-sm placeholder:text-gray-500"
            />
          </div>

          {/* Row 3: Comment */}
          <div>
            <textarea
              placeholder="Comment"
              rows={8}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-[5px] outline-none focus:border-gray-400 transition-colors text-sm resize-y placeholder:text-gray-500"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              className="w-full md:w-auto px-10 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors text-sm font-medium uppercase tracking-wide"
            >
              Send
            </Button>
          </div>
        </form>
      </div>

      <MainFooter />
    </main>
  );
}
