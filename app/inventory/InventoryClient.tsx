"use client";

import React, { useMemo, useState } from "react";
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
    <div dir="rtl" className="min-h-screen bg-[#FAF6EE] text-[#141413] pb-28">
      {/* Header + 3 Main Section Tabs */}
      <header className="sticky top-0 z-30 bg-[#FAF6EE]/95 backdrop-blur-md border-b border-[#141413]/10">
        <div className="max-w-md mx-auto px-4 pt-4 pb-3 space-y-3">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              aria-label="بازگشت"
              className="w-10 h-10 rounded-full bg-white border border-[#141413]/15 flex items-center justify-center text-[#141413] active:scale-95 transition"
            >
              <ArrowRight className="w-4 h-4" />
            </Link>
            <h1 className="text-sm font-black">موجودی فروشگاه ({filtered.length})</h1>
            <span className="w-10" />
          </div>

          {/* 3 Separate Sections: New | Used | Watch & AirPods */}
          <div className="grid grid-cols-3 gap-2 bg-white/80 p-1 rounded-2xl border border-[#141413]/15">
            {SECTION_TABS.map((tab) => {
              const active = activeSection === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveSection(tab.id)}
                  className={`py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    active
                      ? "bg-[#141413] text-white shadow-xs"
                      : "text-[#141413]/70 hover:text-[#141413]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 space-y-4 pt-3">
        {/* Simple Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#141413]/45 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجوی مدل یا ظرفیت..."
            className="w-full h-11 pr-10 pl-4 rounded-full bg-white border border-[#141413]/15 text-sm focus:outline-none focus:border-[#141413]"
          />
        </div>

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 border border-[#141413]/15 text-center space-y-2">
            <p className="text-sm font-black text-[#141413]">موردی پیدا نشد</p>
            <p className="text-xs text-[#141413]/60">
              عبارت جستجو رو تغییر بده یا بخش‌های دیگه رو ببین.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
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
