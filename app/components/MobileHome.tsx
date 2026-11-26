"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Bell,
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
import MetalButton from "./ui/MetalButton";

interface InventoryItem {
  item_id: string;
  type: string;
  series: string;
  model: string;
  capacity: string;
  part: string;
  sim: string;
  registry: string;
  battery: string;
  color: string;
  price: string;
  condition: string;
}

const SLIDES = [
  {
    id: "trade",
    badge: "معاوضه فوری",
    title: "گوشی قدیمیت رو بده، آیفون جدید ببر",
    subtitle: "قیمت‌گذاری منصفانه بر اساس معاملات واقعی بازار",
    cta: "قیمت‌گذاری گوشی من",
    href: "/#calculators",
    gradient: "from-[#FF7A18] via-[#FF5E1A] to-[#E64500]",
  },
  {
    id: "installment",
    badge: "خرید اقساطی",
    title: "آیفون دلخواهت رو اقساطی بخر",
    subtitle: "محاسبه دقیق پیش‌پرداخت و اقساط ماهانه در ۱۰ ثانیه",
    cta: "محاسبه قسط",
    href: "/#calculators",
    gradient: "from-[#1E293B] via-[#0F172A] to-[#020617]",
  },
  {
    id: "registry",
    badge: "رجیستری و گمرک",
    title: "استعلام هزینه رجیستری قبل از خرید",
    subtitle: "محاسبه تعرفه گمرکی و کد ملی تمام مدل‌های آیفون",
    cta: "استعلام هزینه",
    href: "/#calculators",
    gradient: "from-[#0EA5E9] via-[#0284C7] to-[#0369A1]",
  },
];

const CATEGORIES = [
  { id: "all", label: "همه مدل‌ها" },
  { id: "18", label: "سری ۱۸" },
  { id: "17", label: "سری ۱۷" },
  { id: "16", label: "سری ۱۶" },
  { id: "used", label: "کارکرده" },
];

function formatPriceToman(raw: string): string {
  const num = Number(raw);
  if (!Number.isFinite(num) || num <= 0) return "تماس بگیرید";
  return `${Math.round(num / 1_000_000).toLocaleString("fa-IR")} میلیون`;
}

export default function MobileHome() {
  const [islandExpanded, setIslandExpanded] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeCat, setActiveCat] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const items = inventoryData as InventoryItem[];

  const filteredItems = useMemo(() => {
    return items
      .filter((item) => {
        if (activeCat === "used") {
          if (item.type === "new") return false;
        } else if (activeCat !== "all") {
          if (item.series !== activeCat) return false;
        }
        if (searchQuery.trim()) {
          const q = searchQuery.trim().toLowerCase();
          return (
            item.model.toLowerCase().includes(q) ||
            item.capacity.toLowerCase().includes(q) ||
            item.color.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .slice(0, 8);
  }, [items, activeCat, searchQuery]);

  const slide = SLIDES[activeSlide];

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#F7F8FA] text-[#0F172A] pb-28 selection:bg-[#FF6B1A]/20"
    >
      {/* Dynamic Island (Cult-UI Inspired) */}
      <div className="sticky top-2 z-40 flex justify-center px-4 pt-2">
        <motion.button
          type="button"
          onClick={() => setIslandExpanded((v) => !v)}
          layout
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
          className="bg-[#0B0F17] text-white rounded-full px-4 py-2 shadow-lg shadow-black/15 flex items-center gap-2.5 cursor-pointer border border-white/10"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7A18] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF7A18]" />
          </span>
          <span className="text-xs font-medium tracking-tight">
            {islandExpanded
              ? "دانیفون آنلاین • تحویل فوری تهران + گارانتی کارشناسی"
              : "دانیفون • استعلام زنده موجودی"}
          </span>
        </motion.button>
      </div>

      {/* Main Mobile-First Container */}
      <main className="max-w-md mx-auto px-4 pt-3 space-y-5">
        {/* Top App Header */}
        <header className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#FF7A18] to-[#FF4D00] flex items-center justify-center text-white font-bold text-lg shadow-md shadow-orange-500/25">
              D
            </div>
            <div>
              <p className="text-[11px] text-slate-500 font-medium">فروشگاه تخصصی اپل</p>
              <h1 className="text-base font-extrabold text-slate-900">دانیفون</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/inventory"
              aria-label="موجودی"
              className="w-10 h-10 rounded-full bg-white border border-slate-200/80 flex items-center justify-center text-slate-700 shadow-xs active:scale-95 transition"
            >
              <Bell className="w-4 h-4" />
            </Link>
          </div>
        </header>

        {/* App Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجوی مدل، ظرفیت یا رنگ (مثلاً 17 Pro)..."
            className="w-full h-11 pr-10 pl-4 rounded-2xl bg-white border border-slate-200/80 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B1A]/30 focus:border-[#FF6B1A] shadow-xs transition"
          />
        </div>

        {/* Hero Action Banner (16:9 Mobile App Feel) */}
        <section className="relative overflow-hidden rounded-3xl shadow-lg shadow-orange-500/10">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className={`bg-gradient-to-br ${slide.gradient} p-5 text-white min-h-[178px] flex flex-col justify-between`}
            >
              <div className="space-y-1.5">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full">
                  <Sparkles className="w-3 h-3" />
                  {slide.badge}
                </span>
                <h2 className="text-lg font-extrabold leading-snug pt-1">
                  {slide.title}
                </h2>
                <p className="text-xs text-white/85 leading-relaxed">
                  {slide.subtitle}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4">
                <Link href={slide.href}>
                  {activeSlide === 1 ? (
                    <MetalButton className="!py-2 !px-4 !text-xs">
                      {slide.cta}
                    </MetalButton>
                  ) : (
                    <HaloButton className="!py-2 !px-4 !text-xs bg-white text-slate-900 font-bold rounded-full shadow-md">
                      {slide.cta}
                    </HaloButton>
                  )}
                </Link>

                {/* Slide Dots */}
                <div className="flex items-center gap-1.5">
                  {SLIDES.map((s, idx) => (
                    <button
                      key={s.id}
                      type="button"
                      aria-label={`اسلاید ${idx + 1}`}
                      onClick={() => setActiveSlide(idx)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        idx === activeSlide ? "w-5 bg-white" : "w-1.5 bg-white/45"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* 4 Quick Actions */}
        <section className="grid grid-cols-4 gap-2.5">
          {[
            { label: "معاوضه", icon: RefreshCw, href: "/#calculators", color: "text-[#FF6B1A] bg-orange-50" },
            { label: "اقساط", icon: CreditCard, href: "/#calculators", color: "text-blue-600 bg-blue-50" },
            { label: "رجیستری", icon: ShieldCheck, href: "/#calculators", color: "text-emerald-600 bg-emerald-50" },
            { label: "موجودی", icon: Smartphone, href: "/inventory", color: "text-slate-700 bg-slate-100" },
          ].map((act) => {
            const Icon = act.icon;
            return (
              <Link
                key={act.label}
                href={act.href}
                className="bg-white rounded-2xl p-3 border border-slate-200/70 flex flex-col items-center gap-1.5 shadow-xs active:scale-95 transition"
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${act.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-semibold text-slate-700">{act.label}</span>
              </Link>
            );
          })}
        </section>

        {/* Categories Header */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-900">دسته‌بندی موجودی</h3>
            <Link
              href="/inventory"
              className="text-xs font-semibold text-[#FF6B1A] flex items-center gap-0.5"
            >
              مشاهده همه
              <ChevronLeft className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Horizontal Pill Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {CATEGORIES.map((cat) => {
              const isActive = activeCat === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCat(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-[#FF7A18] to-[#FF5100] text-white shadow-md shadow-orange-500/25"
                      : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* 2-Column App Product Grid */}
          <div className="grid grid-cols-2 gap-3">
            {filteredItems.map((item) => (
              <Link
                key={item.item_id}
                href={`/inventory?search=${encodeURIComponent(item.model)}`}
                className="bg-white rounded-3xl p-3.5 border border-slate-200/75 shadow-xs flex flex-col justify-between gap-3 active:scale-[0.98] transition"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {item.capacity}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-600">
                      {item.battery}
                    </span>
                  </div>
                  <h4 className="text-xs font-extrabold text-slate-900 line-clamp-2 leading-snug pt-1">
                    {item.model}
                  </h4>
                  <p className="text-[10px] text-slate-500 truncate">{item.registry}</p>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                  <div>
                    <p className="text-[10px] text-slate-400">قیمت</p>
                    <p className="text-xs font-extrabold text-slate-900 tabular-nums">
                      {formatPriceToman(item.price)}
                    </p>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF7A18] to-[#FF5100] text-white flex items-center justify-center shadow-sm shadow-orange-500/30">
                    <ArrowUpLeft className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Floating Bottom Tab Bar (Mobile App Navigation) */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-sm bg-white/90 backdrop-blur-xl border border-slate-200/90 rounded-full p-1.5 shadow-xl shadow-slate-900/10 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-1.5 bg-gradient-to-r from-[#FF7A18] to-[#FF5100] text-white px-4 py-2.5 rounded-full text-xs font-bold shadow-md shadow-orange-500/25"
        >
          <Home className="w-4 h-4" />
          <span>خانه</span>
        </Link>
        <Link
          href="/inventory"
          className="p-2.5 rounded-full text-slate-500 hover:text-slate-900 transition"
          aria-label="موجودی"
        >
          <Smartphone className="w-5 h-5" />
        </Link>
        <Link
          href="/#calculators"
          className="p-2.5 rounded-full text-slate-500 hover:text-slate-900 transition"
          aria-label="محاسبه‌گرها"
        >
          <Calculator className="w-5 h-5" />
        </Link>
        <a
          href="tel:02100000000"
          className="p-2.5 rounded-full text-slate-500 hover:text-slate-900 transition"
          aria-label="تماس"
        >
          <PhoneCall className="w-5 h-5" />
        </a>
      </nav>
    </div>
  );
}
