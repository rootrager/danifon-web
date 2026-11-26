"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Smartphone, Sparkles, Calculator, PhoneCall } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isInventory = pathname.startsWith("/inventory") || pathname.startsWith("/product");
  const isTools = pathname.startsWith("/tools");

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-sm bg-white/95 backdrop-blur-xl border border-[#141413]/20 rounded-full px-3 py-2 shadow-xl shadow-black/10 flex items-center justify-between">
      <Link
        href="/"
        aria-label="خانه"
        className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
          isHome ? "bg-[#141413] text-white" : "text-[#141413]/70 hover:text-[#141413]"
        }`}
      >
        <Home className="w-4 h-4" />
      </Link>

      <Link
        href="/inventory"
        aria-label="موجودی"
        className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
          isInventory ? "bg-[#141413] text-white" : "text-[#141413]/70 hover:text-[#141413]"
        }`}
      >
        <Smartphone className="w-4 h-4" />
      </Link>

      {/* Center Highlight Action Button */}
      <Link
        href="/tools"
        aria-label="قیمت‌گذاری هوشمند"
        className="w-11 h-11 rounded-full bg-[#FBBF24] border border-[#141413] text-[#141413] flex items-center justify-center shadow-sm active:scale-95 transition"
      >
        <Sparkles className="w-5 h-5" />
      </Link>

      <Link
        href="/tools"
        aria-label="اقساط و رجیستری"
        className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
          isTools ? "bg-[#141413] text-white" : "text-[#141413]/70 hover:text-[#141413]"
        }`}
      >
        <Calculator className="w-4 h-4" />
      </Link>

      <a
        href="tel:02100000000"
        aria-label="تماس"
        className="w-10 h-10 rounded-full text-[#141413]/70 hover:text-[#141413] flex items-center justify-center transition"
      >
        <PhoneCall className="w-4 h-4" />
      </a>
    </nav>
  );
}
