"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, Smartphone, Calculator, Home } from "lucide-react";
import inventoryData from "../data/inventory.json";

interface InventoryItem {
  item_id: string;
  type: string;
  series: string;
  model: string;
  capacity: string;
  price: string;
}

const TABS = [
  { id: "all", label: "همه" },
  { id: "18", label: "سری ۱۸" },
  { id: "17", label: "سری ۱۷" },
  { id: "16", label: "سری ۱۶" },
  { id: "used", label: "کارکرده" },
];

function formatPriceToman(raw: string): string {
  const num = Number(raw);
  if (!Number.isFinite(num) || num <= 0) return "تماس بگیرید";
  return `${Math.round(num / 1_000_000).toLocaleString("fa-IR")} میلیون تومان`;
}

function cleanModelName(name: string): string {
  return name.replace(/\s*\([^)]*\)/g, "").trim();
}

export default function MobileHome() {
  const [activeTab, setActiveTab] = useState("all");
  const [query, setQuery] = useState("");

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
    <div dir="rtl" className="min-h-screen bg-[#F8CFC8] text-[#111111] flex flex-col">
      {/* Top Peach Header */}
      <header className="max-w-md w-full mx-auto px-5 pt-6 pb-5 flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-[#111111]/45 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجو..."
            className="w-full h-11 pr-10 pl-4 rounded-full bg-white text-sm text-[#111111] placeholder:text-[#111111]/40 focus:outline-none shadow-xs"
          />
        </div>
        <Link
          href="/tools"
          aria-label="ابزارها"
          className="w-11 h-11 rounded-full bg-[#111111] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm"
        >
          D
        </Link>
      </header>

      {/* Main Curved Sheet */}
      <main className="flex-1 max-w-md w-full mx-auto bg-[#FFF2EF] rounded-t-[36px] px-5 pt-7 pb-28 shadow-[0_-8px_30px_rgba(0,0,0,0.04)] space-y-5">
        {/* Title Row */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold tracking-tight text-[#111111]">
            موجودی جدید
          </h1>
          <Link
            href="/inventory"
            aria-label="فیلتر و همه موجودی"
            className="p-2 text-[#111111]/80 hover:text-[#111111] transition"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </Link>
        </div>

        {/* Outline & Solid Black Pill Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {TABS.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  active
                    ? "bg-[#111111] text-white border border-[#111111]"
                    : "bg-transparent text-[#111111] border border-[#111111]/30 hover:border-[#111111]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Minimal 2-Column Product Cards */}
        <div className="grid grid-cols-2 gap-3.5">
          {filtered.map((item) => (
            <Link
              key={item.item_id}
              href={`/inventory?search=${encodeURIComponent(cleanModelName(item.model))}`}
              className="bg-[#F7DFDA] rounded-3xl p-4 flex flex-col items-center text-center gap-3 active:scale-[0.98] transition"
            >
              <div className="w-full aspect-square rounded-2xl flex items-center justify-center">
                <Smartphone className="w-14 h-14 text-[#111111]/80 stroke-[1.4]" />
              </div>
              <div className="space-y-0.5 w-full">
                <h2 className="text-xs font-bold text-[#111111] truncate">
                  {cleanModelName(item.model)} · {item.capacity}
                </h2>
                <p className="text-[11px] font-medium text-[#111111]/65 tabular-nums">
                  {formatPriceToman(item.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Compact Floating Black Pill */}
      <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-[#111111] text-white rounded-full px-4 py-2.5 shadow-xl shadow-black/20 flex items-center gap-5">
        <Link href="/" className="flex items-center gap-1.5 text-xs font-bold">
          <Home className="w-4 h-4" />
          <span>خانه</span>
        </Link>
        <span className="w-px h-4 bg-white/20" />
        <Link href="/inventory" className="text-xs font-medium text-white/80 hover:text-white">
          موجودی
        </Link>
        <span className="w-px h-4 bg-white/20" />
        <Link
          href="/tools"
          className="flex items-center gap-1 text-xs font-medium text-white/80 hover:text-white"
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>اقساط و رجیستری</span>
        </Link>
      </nav>
    </div>
  );
}
