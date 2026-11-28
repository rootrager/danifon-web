"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";
import inventoryData from "../data/inventory.json";
import BottomNav from "../components/BottomNav";
import SmoothProductCard from "../components/ui/SmoothProductCard";

interface InventoryItem {
  item_id: string;
  type: string;
  series: string;
  model: string;
  capacity: string;
  part?: string;
  registry: string;
  battery: string;
  color?: string;
  price: string;
  image?: string;
}

type SectionTab = "new" | "used" | "accessories";

const SECTION_TABS: { id: SectionTab; label: string }[] = [
  { id: "new", label: "آکبند" },
  { id: "used", label: "کارکرده" },
  { id: "accessories", label: "واچ و ایرپاد" },
];

// مدل‌های آکبند پرمخاطب که در اولویت اول نمایش قرار می‌گیرند (به ترتیب لیست کاربر قابل تنظیم است)
const PRIORITY_NEW_MODELS: string[] = [
  "iPhone 17 Pro Max",
  "iPhone 17 Pro",
  "iPhone 16 Pro Max",
  "iPhone 16 Pro",
  "iPhone 16",
];

const ACCESSORY_ITEMS: InventoryItem[] = [
  {
    item_id: "watch-series-11",
    type: "accessory",
    series: "watch",
    model: "Apple Watch Series 11",
    capacity: "46mm · GPS",
    registry: "آکبند پلمپ",
    battery: "100%",
    price: "0",
    image: "/showcase-apple-watch-ultra.jpeg",
  },
  {
    item_id: "airpods-pro-usbc",
    type: "accessory",
    series: "audio",
    model: "AirPods Pro (USB-C)",
    capacity: "اورجینال اپل",
    registry: "آکبند پلمپ",
    battery: "100%",
    price: "0",
    image: "/showcase-airpods-pro.jpeg",
  },
];

function cleanModelName(name: string): string {
  return name.replace(/\s*\([^)]*\)/g, "").trim();
}

function formatPriceToman(raw: string): string {
  const num = Number(raw);
  if (!Number.isFinite(num) || num <= 0) return "استعلام قیمت";
  return `${Math.round(num / 1_000_000).toLocaleString("en-US")} میلیون`;
}

function priorityScore(model: string): number {
  const clean = cleanModelName(model).toLowerCase();
  const idx = PRIORITY_NEW_MODELS.findIndex((p) => clean.includes(p.toLowerCase()));
  return idx === -1 ? 999 : idx;
}

export default function InventoryClient() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const initialTab = (searchParams.get("tab") as SectionTab) || "new";

  const [activeSection, setActiveSection] = useState<SectionTab>(
    ["new", "used", "accessories"].includes(initialTab) ? initialTab : "new"
  );
  const [query, setQuery] = useState(initialSearch);

  useEffect(() => {
    const t = searchParams.get("tab") as SectionTab;
    if (t && ["new", "used", "accessories"].includes(t)) {
      setActiveSection(t);
    }
  }, [searchParams]);

  const items = inventoryData as InventoryItem[];

  const filtered = useMemo(() => {
    let pool: InventoryItem[] = [];

    if (activeSection === "new") {
      pool = items.filter((i) => i.type === "new");
    } else if (activeSection === "used") {
      pool = items.filter((i) => i.type !== "new" && i.type !== "accessory");
    } else {
      const fromJson = items.filter((i) => i.type === "accessory");
      pool = fromJson.length > 0 ? fromJson : ACCESSORY_ITEMS;
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      pool = pool.filter(
        (item) =>
          item.model.toLowerCase().includes(q) ||
          item.capacity.toLowerCase().includes(q) ||
          item.registry.toLowerCase().includes(q)
      );
    }

    return pool;
  }, [items, activeSection, query]);

  return (
    <div dir="rtl" className="min-h-screen bg-[#0D0E12] text-white pb-24">
      {/* Dark Sticky Header + 3 Main Section Tabs */}
      <header className="sticky top-0 z-30 bg-[#0D0E12]/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-md mx-auto px-4 pt-3.5 pb-2.5 space-y-2.5">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              aria-label="بازگشت"
              className="w-9 h-9 rounded-full bg-[#171920] border border-white/15 flex items-center justify-center text-white active:scale-95 transition"
            >
              <ArrowRight className="w-4 h-4" />
            </Link>
            <h1 className="text-sm font-black text-white">
              موجودی فروشگاه ({filtered.length})
            </h1>
            <span className="w-9" />
          </div>

          {/* 3 Separate Sections: New | Used | Watch & AirPods */}
          <div className="grid grid-cols-3 gap-1.5 bg-[#171920] p-1 rounded-2xl border border-white/10">
            {SECTION_TABS.map((tab) => {
              const active = activeSection === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveSection(tab.id)}
                  className={`py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    active
                      ? "bg-[#FBBF24] text-[#111111] shadow-xs"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-3.5 space-y-3 pt-3">
        {/* Compact Dark Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجوی مدل، رنگ یا ظرفیت..."
            className="w-full h-10 pr-10 pl-4 rounded-full bg-[#171920] border border-white/12 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-[#FBBF24]"
          />
        </div>

        {/* Compact 2x3+ Product Grid (6+ cards visible per mobile screen) */}
        {filtered.length === 0 ? (
          <div className="bg-[#171920] rounded-3xl p-8 border border-white/10 text-center space-y-2">
            <p className="text-sm font-black text-white">موردی پیدا نشد</p>
            <p className="text-xs text-slate-400">
              عبارت جستجو رو تغییر بده یا بخش‌های دیگه رو ببین.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2.5 items-stretch">
            {filtered.map((item) => (
              <SmoothProductCard
                key={item.item_id}
                id={item.item_id}
                title={cleanModelName(item.model)}
                capacity={item.capacity}
                battery={item.battery}
                registry={item.registry}
                color={item.color}
                priceLabel={formatPriceToman(item.price)}
                isNew={item.type === "new" || item.type === "accessory"}
                image={item.image || "/showcase-iphone-17-pro.jpeg"}
              />
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
