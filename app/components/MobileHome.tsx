"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Menu,
  X,
  ArrowLeft,
  Calculator,
  ShieldCheck,
  Smartphone,
  Watch,
  Headphones,
  Gamepad2,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import inventoryData from "../data/inventory.json";

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
  condition?: string;
}

const CATEGORIES = [
  { id: "all", label: "همه محصولات", icon: Sparkles },
  { id: "mobile", label: "موبایل", icon: Smartphone },
  { id: "watch", label: "ساعت", icon: Watch },
  { id: "audio", label: "صوتی", icon: Headphones },
  { id: "gaming", label: "گیمینگ", icon: Gamepad2 },
];

const SHOWCASE_EXTRAS = [
  {
    id: "watch-11",
    category: "watch",
    title: "Apple Watch Series 11",
    specs: "46mm · GPS + Cellular",
    priceLabel: "قیمت روز",
    status: "موجود",
    statusColor: "bg-[#16A34A]/10 text-[#16A34A]",
    image: "/showcase-apple-watch-ultra.jpeg",
    href: "/inventory",
  },
  {
    id: "airpods-pro",
    category: "audio",
    title: "AirPods Pro (USB-C)",
    specs: "Active Noise Cancellation",
    priceLabel: "قیمت روز",
    status: "موجود",
    statusColor: "bg-[#16A34A]/10 text-[#16A34A]",
    image: "/showcase-airpods-pro.jpeg",
    href: "/inventory",
  },
];

function cleanModelName(name: string): string {
  return name.replace(/\s*\([^)]*\)/g, "").trim();
}

function formatPriceToman(raw: string): string {
  const num = Number(raw);
  if (!Number.isFinite(num) || num <= 0) return "استعلام قیمت";
  return `${Math.round(num / 1_000_000).toLocaleString("en-US")} میلیون تومان`;
}

export default function MobileHome() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const inventoryItems = inventoryData as InventoryItem[];

  const productCards = useMemo(() => {
    const mobileCards = inventoryItems.slice(0, 6).map((item) => ({
      id: item.item_id,
      category: "mobile",
      title: cleanModelName(item.model),
      specs: `${item.capacity} · ${item.part || "ZA/A"}${item.color ? ` · ${item.color}` : ""}`,
      priceLabel: formatPriceToman(item.price),
      status: Number(item.price) > 0 ? "موجود" : "استعلام قیمت",
      statusColor:
        Number(item.price) > 0
          ? "bg-[#16A34A]/10 text-[#16A34A]"
          : "bg-[#D97706]/10 text-[#D97706]",
      image: "/showcase-iphone-17-pro.jpeg",
      href: `/inventory?search=${encodeURIComponent(cleanModelName(item.model))}`,
    }));

    const allCards = [...mobileCards.slice(0, 2), ...SHOWCASE_EXTRAS, ...mobileCards.slice(2, 6)];

    if (activeCategory === "all") return allCards.slice(0, 8);
    if (activeCategory === "mobile") return mobileCards;
    return allCards.filter((c) => c.category === activeCategory);
  }, [inventoryItems, activeCategory]);

  return (
    <div dir="rtl" className="min-h-screen bg-[#F8FAFC] text-[#111827]">
      {/* Header: White with Navy Logo */}
      <header className="sticky top-0 z-50 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E2E8F0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-[#0B1220] font-extrabold tracking-tight text-xl"
            style={{ fontFamily: "var(--font-english)" }}
          >
            <span className="w-8 h-8 rounded-[10px] bg-[#0B1220] text-white flex items-center justify-center text-sm font-bold">
              D
            </span>
            DANIFON
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#475569]">
            <Link href="/inventory" className="hover:text-[#111827] transition-colors duration-150">
              محصولات
            </Link>
            <Link href="/tools" className="hover:text-[#111827] transition-colors duration-150">
              محاسبه اقساط
            </Link>
            <Link href="/tools" className="hover:text-[#111827] transition-colors duration-150">
              استعلام رجیستری
            </Link>
            <a href="#trust" className="hover:text-[#111827] transition-colors duration-150">
              تماس با ما
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/inventory"
              className="hidden sm:inline-flex items-center justify-center h-10 px-4 rounded-[10px] bg-[#2563EB] hover:bg-[#3B82F6] text-white text-sm font-semibold transition-colors duration-150"
            >
              مشاهده محصولات
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="منو"
              className="md:hidden w-10 h-10 rounded-[10px] border border-[#E2E8F0] flex items-center justify-center text-[#111827] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-[#E2E8F0] bg-[#FFFFFF] overflow-hidden"
            >
              <div className="px-4 py-4 flex flex-col gap-3 text-sm font-medium text-[#111827]">
                <Link href="/inventory" onClick={() => setMobileMenuOpen(false)} className="py-2">
                  مشاهده همه محصولات
                </Link>
                <Link href="/tools" onClick={() => setMobileMenuOpen(false)} className="py-2">
                  محاسبه اقساط
                </Link>
                <Link href="/tools" onClick={() => setMobileMenuOpen(false)} className="py-2">
                  استعلام قیمت و رجیستری
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-12 md:space-y-14 py-6 md:py-10">
        {/* 1. Hero Section (Mobile Compact / Desktop 2-Col) */}
        <section className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-[20px] p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 text-right">
            <span
              className="inline-block text-[11px] font-semibold tracking-widest uppercase text-[#2563EB] bg-[#EFF6FF] px-3 py-1 rounded-full"
              style={{ fontFamily: "var(--font-english)" }}
            >
              DIGITAL EXPERIENCE
            </span>
            <h1 className="text-[30px] md:text-[40px] font-bold leading-tight text-[#111827]">
              تکنولوژی، ساده‌تر از همیشه.
            </h1>
            <p className="text-sm md:text-base text-[#475569] leading-relaxed max-w-md">
              محصولات دیجیتال منتخب، تجربه خرید مطمئن و مشاوره مستقیم.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/inventory"
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-[10px] bg-[#2563EB] hover:bg-[#3B82F6] text-white text-sm font-semibold transition-colors duration-200"
              >
                مشاهده محصولات
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <Link
                href="/tools"
                className="inline-flex items-center justify-center min-h-[48px] px-5 rounded-[10px] border border-[#E2E8F0] hover:border-[#2563EB] text-[#111827] text-sm font-semibold transition-colors duration-200"
              >
                محاسبه اقساط
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/3] md:aspect-[16/11] w-full rounded-[12px] overflow-hidden bg-[#F8FAFC] border border-[#E2E8F0]">
            <img
              src="/showcase-iphone-17-pro.jpeg"
              alt="Danifon Flagship Apple Devices"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* 2. Categories */}
        <section className="space-y-4">
          <h2 className="text-[21px] font-bold text-[#111827]">دسته‌بندی محصولات</h2>
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 no-scrollbar">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-4 h-11 rounded-[10px] text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    active
                      ? "bg-[#0B1220] text-white border border-[#0B1220]"
                      : "bg-[#FFFFFF] text-[#475569] border border-[#E2E8F0] hover:border-[#2563EB] hover:text-[#111827]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 3. Featured Products Grid (2-col mobile, 4-col desktop) */}
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-[21px] font-bold text-[#111827]">محصولات منتخب</h2>
            <Link
              href="/inventory"
              className="text-sm font-semibold text-[#2563EB] hover:text-[#3B82F6] flex items-center gap-1 transition-colors duration-150"
            >
              مشاهده همه
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          {productCards.length === 0 ? (
            <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-[12px] p-8 text-center text-sm text-[#475569]">
              موجودی این دسته‌بندی به‌زودی تکمیل می‌شود. برای استعلام مستقیم با فروشگاه تماس بگیرید.
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {productCards.map((product) => (
                <Link
                  key={product.id}
                  href={product.href}
                  className="group bg-[#FFFFFF] border border-[#E2E8F0] rounded-[12px] p-3 md:p-4 flex flex-col justify-between gap-3 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
                >
                  <div className="space-y-3">
                    <div className="aspect-square w-full rounded-[10px] overflow-hidden bg-[#F8FAFC] border border-[#E2E8F0]/60">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <span
                        className={`inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-full ${product.statusColor}`}
                      >
                        {product.status}
                      </span>
                      <h3
                        className="text-[15px] font-semibold text-[#111827] leading-snug line-clamp-1"
                        style={{ fontFamily: "var(--font-english)" }}
                        dir="ltr"
                      >
                        {product.title}
                      </h3>
                      <p
                        className="text-xs text-[#475569] truncate"
                        style={{ fontFamily: "var(--font-english)" }}
                        dir="ltr"
                      >
                        {product.specs}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between gap-2">
                    <span className="text-sm md:text-base font-bold text-[#111827] tabular-nums">
                      {product.priceLabel}
                    </span>
                    <span className="text-xs font-semibold text-[#2563EB] group-hover:text-[#3B82F6]">
                      مشاهده محصول
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* 4. Special Offers */}
        <section className="bg-[#EFF6FF] border border-[#DBEAFE] rounded-[20px] p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2">
            <span
              className="text-[11px] font-bold tracking-widest uppercase text-[#2563EB]"
              style={{ fontFamily: "var(--font-english)" }}
            >
              SPECIAL OFFERS
            </span>
            <h2 className="text-[21px] font-bold text-[#111827]">پیشنهادهای ویژه Danifon</h2>
            <p className="text-sm text-[#475569]">انتخاب‌هایی با قیمت و شرایط ویژه.</p>
          </div>
          <Link
            href="/inventory"
            className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-[10px] bg-[#2563EB] hover:bg-[#3B82F6] text-white text-sm font-semibold transition-colors duration-200 shrink-0"
          >
            مشاهده پیشنهادها
          </Link>
        </section>

        {/* 5. Services & Tools */}
        <section className="space-y-4">
          <h2 className="text-[21px] font-bold text-[#111827]">خدمات و ابزارهای ما</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <Link
              href="/tools"
              className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-[12px] p-5 flex items-center justify-between hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-[10px] bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-[#111827]">محاسبه اقساط</h3>
                  <p className="text-xs text-[#475569]">محاسبه شفاف پیش‌پرداخت و اقساط ماهانه</p>
                </div>
              </div>
              <ArrowLeft className="w-4 h-4 text-[#475569]" />
            </Link>

            <Link
              href="/tools"
              className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-[12px] p-5 flex items-center justify-between hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-[10px] bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-[#111827]">استعلام قیمت و رجیستری</h3>
                  <p className="text-xs text-[#475569]">برآورد هزینه گمرکی و کد ملی قبل از خرید</p>
                </div>
              </div>
              <ArrowLeft className="w-4 h-4 text-[#475569]" />
            </Link>
          </div>
        </section>

        {/* 6. Trust Section */}
        <section
          id="trust"
          className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-[20px] p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[#16A34A] text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>ضمانت اصالت و کارشناسی فنی</span>
            </div>
            <h2 className="text-[21px] font-bold text-[#111827]">خرید مطمئن، با انتخاب آگاهانه</h2>
            <p className="text-sm text-[#475569]">
              مشاوره، شفافیت و ارتباط مستقیم با فروشگاه.
            </p>
          </div>
          <a
            href="tel:02100000000"
            className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-[10px] bg-[#0B1220] hover:bg-[#1E293B] text-white text-sm font-semibold transition-colors duration-200 shrink-0"
          >
            ارتباط مستقیم با فروشگاه
          </a>
        </section>
      </main>

      {/* Footer: Navy 950 */}
      <footer className="bg-[#0B1220] text-white mt-12">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <div
              className="text-lg font-extrabold tracking-tight"
              style={{ fontFamily: "var(--font-english)" }}
            >
              DANIFON
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              فروشگاه تخصصی محصولات اپل و دیجیتال با تمرکز بر شفافیت قیمت و کارشناسی واقعی.
            </p>
          </div>

          <div className="space-y-2 text-xs text-slate-300">
            <div className="font-semibold text-white">دسترسی سریع</div>
            <div className="flex flex-col gap-1.5">
              <Link href="/inventory" className="hover:text-white">محصولات منتخب</Link>
              <Link href="/tools" className="hover:text-white">محاسبه اقساط</Link>
              <Link href="/tools" className="hover:text-white">استعلام رجیستری</Link>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-300">
            <div className="font-semibold text-white">ارتباط با ما</div>
            <p className="text-slate-400">درباره ما · تماس با ما · شبکه‌های اجتماعی</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
