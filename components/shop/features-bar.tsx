"use client";

import { Truck, Gift, ShieldCheck } from "lucide-react";

export function FeaturesBar() {
  const features = [
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Fast Delivery",
      description:
        "We deliver quickly and securely worldwide, with clear tracking at every stage.",
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: "Gift Wrap",
      description:
        "Luxury gift wrap and personal message delivered without billing details",
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Quality Promise",
      description:
        "Crafted from genuine gemstones,sterling silver and gold that lasts.",
    },
  ];

  return (
    <div className="bg-white py-10 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="text-[#6ab5b1] mb-6">{feature.icon}</div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-2">
              {feature.title}
            </h3>
            <p className="text-xs text-gray-500 uppercase tracking-widest leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
