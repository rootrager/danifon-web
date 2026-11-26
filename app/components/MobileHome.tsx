"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Search,
  Home,
  Smartphone,
  Calculator,
  PhoneCall,
  ArrowUpLeft,
  Sparkles,
  RefreshCw,
  ShieldCheck,
  CreditCard,
  ChevronLeft,
} from "lucide-react";
import inventoryData from "../data/inventory.json";
import HaloButton from "./ui/HaloButton";

interface InventoryItem {
  item_id: string;
  type: string;
  series: string;
  model: string;
  capacity: string;
  registry: string;
  battery: string;
  price: string;
}

function formatPriceToman(raw: string): string {
  const num = Number(raw);
  if (!Number.isFinite(num) || num <= 0) return "تماس بگیرید";
  return `${Math.round(num / 1_000_000).toLocaleString("fa-IR")} میلیون`;
}

export default function MobileHome() {
  const [islandExpanded, setIslandExpanded] = useState(false);
  const featuredItems = (inventoryData as InventoryItem[]).slice(0, 4);

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#F5F2EB] text-[#1C1917] pb-28 selection:bg-[#FF6B1A]/20"
    >
      {/* Dynamic Island */}
      <div className="sticky top-2 z-40 flex justify-center px-4 pt-2">
        <motion.button
          type="button"
          onClick={() => setIslandExpanded((v) => !v)}
          layout
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
          className="bg-[#1C1917] text-[#FAF8F4] rounded-full px-4 py-2 shadow-lg shadow-black/15 flex items-center gap-2.5 cursor-pointer border border-white/10"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7A18] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF7A18]" />
          </span>
          <span className="text-[11px] font-medium tracking-tight">
            {islandExpanded
              ? "دانیفون • تحویل فوری تهران + ضمانت کارشناسی"
              : "دانیفون آنلاین"}
          </span>
        </motion.button>
      </div>

      {/* Minimal Mobile Container */}
      <main className="max-w-md mx-auto px-5 pt-4 space-y-6">
        {/* Clean Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF7A18] to-[#EA580C] flex items-center justify-center text-white font-bold text-base shadow-sm shadow-orange-500/20">
              D
            </div>
            <div>
              <h1 className="text-base font-extrabold text-[#1C1917]">دانیفون</h1>
              <p className="text-[11px] text-[#78716C]">تخصصی‌ترین مرجع آیفون</p>
            </div>
          </div>

          <Link
            href="/inventory"
            aria-label="جستجو در موجودی"
            className="w-10 h-10 rounded-full bg-[#FAF8F4] border border-[#E7E2D8] flex items-center justify-center text-[#44403C] shadow-xs active:scale-95 transition"
          >
            <Search className="w-4 h-4" />
          </Link>
        </header>

        {/* Single Clean Hero Card */}
        <section className="rounded-3xl bg-gradient-to-br from-[#FF7A18] via-[#FF5E1A] to-[#DC4A09] p-6 text-white shadow-lg shadow-orange-900/10 space-y-4">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
            <Sparkles className="w-3 h-3" />
            معاوضه و خرید آسان
          </span>
          <div className="space-y-1.5">
            <h2 className="text-xl font-extrabold leading-snug">
              آیفون قدیمیت رو بده، جدید ببر
            </h2>
            <p className="text-xs text-white/85 leading-relaxed">
              قیمت‌گذاری واقعی بر اساس معاملات روز، خرید اقساطی و استعلام رجیستری.
            </p>
          </div>
          <div className="pt-1">
            <Link href="/tools">
              <HaloButton className="!py-2.5 !px-5 !text-xs bg-[#FAF8F4] text-[#1C1917] font-bold rounded-full shadow-md">
                شروع قیمت‌گذاری و اقساط
              </HaloButton>
            </Link>
          </div>
        </section>

        {/* 3 Minimal Service Cards */}
        <section className="grid grid-cols-3 gap-2.5">
          {[
            { label: "معاوضه فوری", icon: RefreshCw, href: "/tools", color: "text-[#EA580C] bg-orange-100/70" },
            { label: "محاسبه اقساط", icon: CreditCard, href: "/tools", color: "text-[#0284C7] bg-sky-100/70" },
            { label: "هزینه رجیستری", icon: ShieldCheck, href: "/tools", color: "text-[#059669] bg-emerald-100/70" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="bg-[#FAF8F4] rounded-2xl p-3.5 border border-[#E7E2D8] flex flex-col items-center gap-2 text-center shadow-xs active:scale-95 transition"
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${item.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-[#292524]">{item.label}</span>
              </Link>
            );
          })}
        </section>

        {/* 4 Featured Phones Only (Clean & Uncluttered) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-[#1C1917]">منتخب موجودی</h3>
            <Link
              href="/inventory"
              className="text-xs font-bold text-[#EA580C] flex items-center gap-0.5"
            >
              همه مدل‌ها
              <ChevronLeft className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {featuredItems.map((item) => (
              <Link
                key={item.item_id}
                href={`/inventory?search=${encodeURIComponent(item.model)}`}
                className="bg-[#FAF8F4] rounded-3xl p-3.5 border border-[#E7E2D8] shadow-xs flex flex-col justify-between gap-3 active:scale-[0.98] transition"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EDE8DD] text-[#57534E]">
                      {item.capacity}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-700">
                      {item.battery}
                    </span>
                  </div>
                  <h4 className="text-xs font-extrabold text-[#1C1917] line-clamp-2 leading-snug pt-0.5">
                    {item.model}
                  </h4>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#E7E2D8]/80">
                  <span className="text-xs font-extrabold text-[#1C1917] tabular-nums">
                    {formatPriceToman(item.price)}
                  </span>
                  <span className="w-7 h-7 rounded-full bg-gradient-to-br from-[#FF7A18] to-[#EA580C] text-white flex items-center justify-center shadow-xs">
                    <ArrowUpLeft className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Floating Bottom Tab Bar */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-sm bg-[#FAF8F4]/95 backdrop-blur-xl border border-[#E7E2D8] rounded-full p-1.5 shadow-xl shadow-stone-900/10 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-1.5 bg-gradient-to-r from-[#FF7A18] to-[#EA580C] text-white px-4 py-2.5 rounded-full text-xs font-bold shadow-sm"
        >
          <Home className="w-4 h-4" />
          <span>خانه</span>
        </Link>
        <Link
          href="/inventory"
          className="p-2.5 rounded-full text-[#78716C] hover:text-[#1C1917] transition"
          aria-label="موجودی"
        >
          <Smartphone className="w-5 h-5" />
        </Link>
        <Link
          href="/tools"
          className="p-2.5 rounded-full text-[#78716C] hover:text-[#1C1917] transition"
          aria-label="ابزارها"
        >
          <Calculator className="w-5 h-5" />
        </Link>
        <a
          href="tel:02100000000"
          className="p-2.5 rounded-full text-[#78716C] hover:text-[#1C1917] transition"
          aria-label="تماس"
        >
          <PhoneCall className="w-5 h-5" />
        </a>
      </nav>
    </div>
  );
}
