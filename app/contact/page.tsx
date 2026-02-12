"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { MainFooter } from "@/components/layout/main-footer";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const isValid =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.comment.trim() !== "";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setShowSuccess(true);
    setFormData({ name: "", email: "", phone: "", comment: "" });
  };

  return (
    <main className="min-h-screen bg-white font-sans text-gray-800 flex flex-col relative">
      {/* Success Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 400 }}
              className="bg-white rounded-[8px] shadow-md max-w-[320px] w-full overflow-hidden relative"
            >
              <div className="p-6 flex flex-col items-center text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    damping: 12,
                    stiffness: 200,
                    delay: 0.1,
                  }}
                  className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4 shadow-lg shadow-black/20"
                >
                  <Check className="w-5 h-5 text-white stroke-[3]" />
                </motion.div>

                <h3 className="text-[17px] font-semibold text-gray-900 mb-1 font-poppins">
                  Message Sent
                </h3>
                <p className="text-gray-500 text-[12px] leading-relaxed mb-6 px-2">
                  We've received your message and will get back to you shortly.
                </p>
                <Button
                  onClick={() => setShowSuccess(false)}
                  className="w-full h-10 bg-gray-900 text-white hover:bg-gray-800 rounded-xl text-[12px] font-medium"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ANNOUNCEMENT BAR */}
      <div className="shrink-0 text-center py-2.5 text-[10px] lg:text-[11px] uppercase tracking-[0.2em] text-black font-bold bg-[#6ab5b1]">
        <span className="font-medium">100% Natural, Hand-crafted</span>
      </div>

      <Header />

      <div className="flex-1 w-full max-w-3xl mx-auto px-6 py-12 lg:py-20">
        <h1 className="text-3xl lg:text-5xl font-bold text-center mb-12 tracking-tight text-gray-900">
          Contact
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Row 1: Name and Email */}
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex-1">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name *"
                required
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-[5px] outline-none focus:border-gray-400 transition-colors text-sm placeholder:text-gray-500"
              />
            </div>
            <div className="flex-1">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email *"
                required
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-[5px] outline-none focus:border-gray-400 transition-colors text-sm placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* Row 2: Phone */}
          <div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone (Optional)"
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-[5px] outline-none focus:border-gray-400 transition-colors text-sm placeholder:text-gray-500"
            />
          </div>

          {/* Row 3: Comment */}
          <div>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              placeholder="Comment *"
              required
              rows={8}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-[5px] outline-none focus:border-gray-400 transition-colors text-sm resize-y placeholder:text-gray-500"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="w-full md:w-auto px-10 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors text-sm font-medium uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send"}
            </Button>
          </div>
        </form>
      </div>

      <MainFooter />
    </main>
  );
}
