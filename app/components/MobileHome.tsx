"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  Search,
  Sparkles,
  ShieldCheck,
  Calculator,
  HelpCircle,
  Gamepad2,
  ArrowLeft,
} from "lucide-react";
import OnboardingTutorial from "./OnboardingTutorial";
import BottomNav from "./BottomNav";
import PixelFlowField from "./ui/PixelFlowField";

const CATEGORY_ITEMS = [
  {
    id: "iphone",
    title: "آیفون‌ها",
    subtitle: "آکبند و کارکرده به‌شرط",
    image: "/showcase-iphone-17-pro.jpeg",
    href: "/inventory",
    comingSoon: false,
  },
  {
    id: "watch",
    title: "اپل واچ",
    subtitle: "رفیق مچ دستت",
    image: "/showcase-apple-watch-ultra.jpeg",
    href: "/inventory",
    comingSoon: false,
  },
  {
    id: "airpods",
    title: "ایرپاد",
    subtitle: "موسیقی بدون مزاحم",
    image: "/showcase-airpods-pro.jpeg",
    href: "/inventory",
    comingSoon: false,
  },
  {
    id: "console",
    title: "کنسول بازی",
    subtitle: "تو راهه، به‌زودی!",
    image: null,
    href: "#",
    comingSoon: true,
  },
];

export default function MobileHome() {
  const [query, setQuery] = useState("");
  const [replayTutorial, setReplayTutorial] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/inventory?search=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/inventory");
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#FAF6EE] text-[#141413] pb-28">
      <OnboardingTutorial
        forceOpen={replayTutorial}
        onClose={() => setReplayTutorial(false)}
      />

      <main className="max-w-md mx-auto px-4 pt-5 space-y-4">
        {/* Top Interactive Pixel Flow Field Header (DANIFON) */}
        <header className="relative rounded-3xl bg-[#141413] border-2 border-[#141413] shadow-[4px_4px_0px_#FBBF24] overflow-hidden h-20 flex items-center justify-between px-3">
          <div className="w-10 shrink-0" />
          <div className="flex-1 h-full">
            <PixelFlowField
              text="DANIFON"
              color="#FAF6EE"
              accentColor="#FF7A18"
              className="w-full h-full"
            />
          </div>
          <button
            type="button"
            onClick={() => setReplayTutorial(true)}
            aria-label="راهنمای اپ"
            className="relative z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-[#FAF6EE] active:scale-95 transition cursor-pointer shrink-0"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </header>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative">
          <Search className="w-4 h-4 text-[#141413]/45 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="دنبال چه گوشی‌ای هستی؟ (مثلاً 16 Pro)..."
            className="w-full h-11 pr-10 pl-4 rounded-full bg-white border border-[#141413]/15 text-sm text-[#141413] placeholder:text-[#141413]/45 focus:outline-none focus:border-[#141413] transition"
          />
        </form>

        {/* 1. Hero Card: قیمت گوشیت همین الان چنده؟ */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="rounded-3xl bg-gradient-to-br from-[#FF7A18] via-[#FF5E1A] to-[#EA580C] p-5 text-white border-2 border-[#141413] shadow-[4px_4px_0px_#141413] space-y-3"
        >
          <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-black/20 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#FBBF24]" />
            قیمت زنده بازار
          </span>

          <div className="space-y-1">
            <h2 className="text-xl font-black leading-snug">
              قیمت گوشیت همین الان چنده؟
            </h2>
            <p className="text-xs text-white/90 leading-relaxed">
              مدل و درصد باتریش رو بگو تا همون لحظه بر اساس معاملات واقعی امروز، قیمت دقیقش رو دربیاریم.
            </p>
          </div>

          <div className="pt-1">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 bg-[#141413] text-white px-5 py-2.5 rounded-full text-xs font-bold active:scale-95 transition"
            >
              <span>ببینم چند می‌ارزه!</span>
              <ArrowLeft className="w-3.5 h-3.5 text-[#FBBF24]" />
            </Link>
          </div>
        </motion.section>

        {/* 2. Registry & Installment Quick Buttons */}
        <section className="grid grid-cols-2 gap-3">
          <Link
            href="/tools"
            className="bg-white rounded-2xl p-3.5 border border-[#141413]/15 hover:border-[#141413] flex items-center gap-3 active:scale-[0.98] transition"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-black text-[#141413]">رجیستریش چنده؟</h3>
              <p className="text-[10px] text-[#141413]/60 mt-0.5">استعلام گمرکی و کد ملی</p>
            </div>
          </Link>

          <Link
            href="/tools"
            className="bg-white rounded-2xl p-3.5 border border-[#141413]/15 hover:border-[#141413] flex items-center gap-3 active:scale-[0.98] transition"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FBBF24]/25 text-[#141413] flex items-center justify-center shrink-0">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-black text-[#141413]">قسطی حساب کنیم؟</h3>
              <p className="text-[10px] text-[#141413]/60 mt-0.5">پیش‌پرداخت و قسط ماهانه</p>
            </div>
          </Link>
        </section>

        {/* 3. Four Product Categories (Mobile, Watch, AirPods, Console) */}
        <section className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-[#141413]">توی دانیفون چی داریم؟</h3>
            <Link href="/inventory" className="text-xs font-bold text-[#EA580C]">
              همه موجودی‌ها
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {CATEGORY_ITEMS.map((cat) =>
              cat.comingSoon ? (
                <div
                  key={cat.id}
                  className="bg-white/70 rounded-3xl p-3.5 border border-dashed border-[#141413]/25 flex flex-col justify-between gap-2.5"
                >
                  <div className="aspect-[4/3] w-full rounded-2xl bg-[#FAF6EE] flex flex-col items-center justify-center gap-1.5 text-[#141413]/45">
                    <Gamepad2 className="w-10 h-10 stroke-[1.5]" />
                    <span className="text-[10px] font-bold bg-[#FBBF24] text-[#141413] px-2.5 py-0.5 rounded-full">
                      به‌زودی
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-[#141413]/75">{cat.title}</h4>
                    <p className="text-[10px] text-[#141413]/50 mt-0.5">{cat.subtitle}</p>
                  </div>
                </div>
              ) : (
                <Link
                  key={cat.id}
                  href={cat.href}
                  className="bg-white rounded-3xl p-3.5 border border-[#141413]/15 hover:border-[#141413] flex flex-col justify-between gap-2.5 active:scale-[0.98] transition"
                >
                  <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#FAF6EE]">
                    <img
                      src={cat.image!}
                      alt={cat.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-[#141413]">{cat.title}</h4>
                    <p className="text-[10px] text-[#141413]/60 mt-0.5">{cat.subtitle}</p>
                  </div>
                </Link>
              )
            )}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
