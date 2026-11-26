"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import inventoryData from "../data/inventory.json";
import BottomNav from "../components/BottomNav";

interface InventoryItem {
  item_id: string;
  type: string;
  series: string;
  model: string;
  capacity: string;
  part?: string;
  registry: string;
  battery: string;
  price: string;
}

const FILTERS = [
  { id: "all", label: "همه" },
  { id: "new", label: "آکبند" },
  { id: "used", label: "کارکرده" },
  { id: "18", label: "سری ۱۸" },
  { id: "17", label: "سری ۱۷" },
  { id: "16", label: "سری ۱۶" },
];

function cleanModelName(name: string): string {
  return name.replace(/\s*\([^)]*\)/g, "").trim();
}

function formatPriceToman(raw: string): string {
  const num = Number(raw);
  if (!Number.isFinite(num) || num <= 0) return "استعلام قیمت";
  return `${Math.round(num / 1_000_000).toLocaleString("fa-IR")} میلیون`;
}

export default function InventoryClient() {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  const items = inventoryData as InventoryItem[];

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (filter === "new" && item.type !== "new") return false;
      if (filter === "used" && item.type === "new") return false;
      if (["18", "17", "16"].includes(filter) && item.series !== filter) return false;

      if (query.trim()) {
        const q = query.trim().toLowerCase();
        return (
          item.model.toLowerCase().includes(q) ||
          item.capacity.toLowerCase().includes(q) ||
          item.registry.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [items, filter, query]);

  return (
    <div dir="rtl" className="min-h-screen bg-[#FAF6EE] text-[#141413] pb-28">
      <header className="max-w-md mx-auto px-4 pt-5 pb-3 flex items-center justify-between">
        <Link
          href="/"
          aria-label="بازگشت"
          className="w-10 h-10 rounded-full bg-white border border-[#141413]/15 flex items-center justify-center text-[#141413] active:scale-95 transition"
        >
          <ArrowRight className="w-4 h-4" />
        </Link>
        <h1 className="text-sm font-black">موجودی فروشگاه ({filtered.length})</h1>
        <span className="w-10" />
      </header>

      <main className="max-w-md mx-auto px-4 space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-[#141413]/45 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجوی مدل، ظرفیت یا رجیستری..."
            className="w-full h-11 pr-10 pl-4 rounded-full bg-white border border-[#141413]/15 text-sm focus:outline-none focus:border-[#141413]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                filter === f.id
                  ? "bg-[#FBBF24] text-[#141413] border border-[#141413]"
                  : "bg-white text-[#141413]/75 border border-[#141413]/15"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {filtered.map((item) => (
            <Link
              key={item.item_id}
              href={`/product/${encodeURIComponent(item.item_id)}`}
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
                <h2
                  className="text-xs font-bold text-[#141413] truncate"
                  style={{ fontFamily: "var(--font-english)" }}
                  dir="ltr"
                >
                  {cleanModelName(item.model)}
                </h2>
                <div className="flex items-center justify-between text-[11px] text-[#141413]/65">
                  <span>{item.capacity} · {item.battery}</span>
                  <span className="font-bold text-[#141413] tabular-nums">
                    {formatPriceToman(item.price)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
