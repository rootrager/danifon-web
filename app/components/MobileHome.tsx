"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Search,
  Home,
  Smartphone,
  Sparkles,
  Calculator,
  PhoneCall,
  HelpCircle,
} from "lucide-react";
import inventoryData from "../data/inventory.json";
import OnboardingTutorial from "./OnboardingTutorial";

interface InventoryItem {
  item_id: string;
  type: string;
  series: string;
  model: string;
  capacity: string;
  part?: string;
  battery: string;
  price: string;
}

const TABS = [
  { id: "all", label: "همه" },
  { id: "18", label: "سری ۱۸" },
  { id: "17", label: "سری ۱۷" },
  { id: "16", label: "سری ۱۶" },
  { id: "used", label: "کارکرده" },
];

function cleanModelName(name: string): string {
  return name.replace(/\s*\([^)]*\)/g, "").trim();
}

function formatPriceToman(raw: string): string {
  const num = Number(raw);
  if (!Number.isFinite(num) || num <= 0) return "استعلام قیمت";
  return `${Math.round(num / 1_000_000).toLocaleString("fa-IR")} میلیون`;
}

export default function MobileHome() {
  const [activeTab, setActiveTab] = useState("all");
  const [query, setQuery] = useState("");
  const [replayTutorial, setReplayTutorial] = useState(false);

  const items = inventoryData as InventoryItem[];

  const filtered = useMemo(() => {
    return items
      .filter((item) => {
        if (activeTab === "used") {
          if (item.type === "new") return false;
        } else if (activeTab !== "all") {
          if (item.series !== activeTab) return false;
        }
        if (query.trim()) {
          const q = query.trim().toLowerCase();
          return (
            item.model.toLowerCase().includes(q) ||
            item.capacity.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .slice(0, 6);
  }, [items, activeTab, query]);

  return (
    <div dir="rtl" className="min-h-screen bg-[#FAF6EE] text-[#141413] pb-28">
      {/* First-Visit Animated Tutorial */}
      <OnboardingTutorial
        forceOpen={replayTutorial}
        onClose={() => setReplayTutorial(false)}
      />

      {/* App Shell Container */}
      <main className="max-w-md mx-auto px-4 pt-5 space-y-5">
        {/* Top App Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#141413] text-[#FAF6EE] flex items-center justify-center font-black text-sm border-2 border-[#141413]">
              D
            </div>
            <div>
              <p className="text-[11px] text-[#141413]/60 font-medium">سلام! خوش اومدی 👋</p>
              <h1 className="text-base font-black text-[#141413]">فروشگاه دانیفون</h1>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setReplayTutorial(true)}
            aria-label="مشاهده راهنما"
            className="w-10 h-10 rounded-full bg-white border border-[#141413]/15 flex items-center justify-center text-[#141413] active:scale-95 transition cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </header>

        {/* Capsule Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#141413]/45 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجوی مدل آیفون (مثلاً 17 Pro)..."
            className="w-full h-11 pr-10 pl-4 rounded-full bg-white border border-[#141413]/15 text-sm text-[#141413] placeholder:text-[#141413]/40 focus:outline-none focus:border-[#141413] transition"
          />
        </div>

        {/* Bold Creative Action Card (Inspired by Ref 1 & 2) */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="rounded-3xl bg-gradient-to-br from-[#FF7A18] via-[#FF5E1A] to-[#EA580C] p-5 text-white border-2 border-[#141413] shadow-[4px_4px_0px_#141413] flex items-center justify-between gap-3"
        >
          <div className="space-y-2.5">
            <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-black/20 px-2.5 py-0.5 rounded-full">
              هوشمند و زنده
            </span>
            <h2 className="text-lg font-black leading-snug">
              معاوضه یا فروش فوری گوشیت
            </h2>
            <p className="text-xs text-white/90 leading-relaxed">
              برآورد قیمت واقعی بازار + محاسبه اقساط در چند ثانیه.
            </p>
            <div className="pt-1">
              <Link
                href="/tools"
                className="inline-flex items-center gap-1.5 bg-[#141413] text-white px-4 py-2 rounded-full text-xs font-bold active:scale-95 transition"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FBBF24]" />
                شروع قیمت‌گذاری
              </Link>
            </div>
          </div>

          <div className="w-20 h-24 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/25 overflow-hidden shrink-0">
            <img
              src="/showcase-iphone-17-pro.jpeg"
              alt="iPhone"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.section>

        {/* Horizontal Pill Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {TABS.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  active
                    ? "bg-[#FBBF24] text-[#141413] border border-[#141413]"
                    : "bg-white text-[#141413]/75 border border-[#141413]/15 hover:border-[#141413]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Featured Section */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-[#141413]">موجودی برگزیده</h3>
            <Link href="/inventory" className="text-xs font-bold text-[#EA580C]">
              مشاهده همه
            </Link>
          </div>

          {/* 2-Column App Cards */}
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((item) => (
              <Link
                key={item.item_id}
                href={`/inventory?search=${encodeURIComponent(cleanModelName(item.model))}`}
                className="bg-white rounded-2xl p-3 border border-[#141413]/15 hover:border-[#141413] flex flex-col justify-between gap-2.5 active:scale-[0.98] transition"
              >
                <div className="aspect-square w-full rounded-xl overflow-hidden bg-[#FAF6EE]">
                  <img
                    src="/showcase-iphone-17-pro.jpeg"
                    alt={cleanModelName(item.model)}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <h4
                    className="text-xs font-bold text-[#141413] truncate"
                    style={{ fontFamily: "var(--font-english)" }}
                    dir="ltr"
                  >
                    {cleanModelName(item.model)}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-[#141413]/65">
                    <span>{item.capacity}</span>
                    <span className="font-bold text-[#141413] tabular-nums">
                      {formatPriceToman(item.price)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* 5-Icon Mobile App Bottom Bar (Inspired by Ref 1) */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-sm bg-white/95 backdrop-blur-xl border border-[#141413]/20 rounded-full px-3 py-2 shadow-xl shadow-black/10 flex items-center justify-between">
        <Link
          href="/"
          aria-label="خانه"
          className="w-10 h-10 rounded-full bg-[#141413] text-white flex items-center justify-center"
        >
          <Home className="w-4 h-4" />
        </Link>

        <Link
          href="/inventory"
          aria-label="موجودی"
          className="w-10 h-10 rounded-full text-[#141413]/70 hover:text-[#141413] flex items-center justify-center transition"
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
          className="w-10 h-10 rounded-full text-[#141413]/70 hover:text-[#141413] flex items-center justify-center transition"
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
    </div>
  );
}
