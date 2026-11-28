"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Sparkles,
  ShieldCheck,
  Calculator,
  HelpCircle,
  Gamepad2,
  ArrowLeft,
  MapPin,
} from "lucide-react";
import OnboardingTutorial from "./OnboardingTutorial";
import BottomNav from "./BottomNav";
import PixelFlowField from "./ui/PixelFlowField";
import GlassCard from "./ui/GlassCard";
import AmbientPlayer from "./AmbientPlayer";

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
  const [replayTutorial, setReplayTutorial] = useState(false);

  return (
    <div
      dir="rtl"
      className="relative min-h-dvh bg-gradient-to-b from-[#FAF6EE] via-[#F7EFE2] to-[#FCEEE3] text-[#141413] pb-20 overflow-x-hidden"
    >
      {/* Stronger ambient color orbs so GlassCard frosted blur is clearly visible */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-64 -right-12 w-72 h-72 rounded-full bg-[#FF7A18]/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-24 -left-12 w-72 h-72 rounded-full bg-[#3B82F6]/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-[420px] left-1/3 w-56 h-56 rounded-full bg-[#FBBF24]/30 blur-3xl"
      />

      <OnboardingTutorial
        forceOpen={replayTutorial}
        onClose={() => setReplayTutorial(false)}
      />

      <main className="relative z-10 max-w-md mx-auto px-4 pt-3 space-y-3">
        {/* Top Interactive Pixel Flow Field Header (DANIFON) */}
        <header className="relative rounded-2xl bg-[#141413] border-2 border-[#141413] shadow-[3px_3px_0px_#FBBF24] overflow-hidden h-16 flex items-center justify-between px-3">
          <div className="w-8 shrink-0" />
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
            className="relative z-10 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-[#FAF6EE] active:scale-95 transition cursor-pointer shrink-0"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </header>

        {/* 1. Hero Card: قیمت گوشیت همین الان چنده؟ */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="rounded-3xl bg-gradient-to-br from-[#FF7A18] via-[#FF5E1A] to-[#EA580C] p-4 text-white border-2 border-[#141413] shadow-[4px_4px_0px_#141413] space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-black/20 px-2.5 py-0.5 rounded-full">
              <Sparkles className="w-3 h-3 text-[#FBBF24]" />
              قیمت زنده بازار
            </span>
          </div>

          <h2 className="text-lg font-black leading-snug">
            قیمت گوشیت همین الان چنده؟
          </h2>
          <p className="text-[11px] text-white/90 leading-relaxed">
            مدل و باتریش رو بگو تا همون لحظه قیمت واقعی امروزش رو دربیاریم.
          </p>

          <div className="pt-0.5">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 bg-[#141413] text-white px-4 py-2 rounded-full text-xs font-bold active:scale-95 transition"
            >
              <span>ببینم چند می‌ارزه!</span>
              <ArrowLeft className="w-3.5 h-3.5 text-[#FBBF24]" />
            </Link>
          </div>
        </motion.section>

        {/* 2. Registry & Installment Quick Glass Buttons */}
        <section className="grid grid-cols-2 gap-2.5">
          <Link href="/tools" className="block active:scale-[0.98] transition">
            <GlassCard className="!rounded-2xl p-3 h-full">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-100/90 text-emerald-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-[#141413]">رجیستریش چنده؟</h3>
                  <p className="text-[10px] text-[#141413]/60">گمرکی و کد ملی</p>
                </div>
              </div>
            </GlassCard>
          </Link>

          <Link href="/tools" className="block active:scale-[0.98] transition">
            <GlassCard className="!rounded-2xl p-3 h-full">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#FBBF24]/30 text-[#141413] flex items-center justify-center shrink-0">
                  <Calculator className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-[#141413]">قسطی حساب کنیم؟</h3>
                  <p className="text-[10px] text-[#141413]/60">پیش‌پرداخت و قسط</p>
                </div>
              </div>
            </GlassCard>
          </Link>
        </section>

        {/* 3. Four Glass Product Categories (Mobile, Watch, AirPods, Console) */}
        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-[#141413]">توی دانیفون چی داریم؟</h3>
            <Link href="/inventory" className="text-[11px] font-bold text-[#EA580C]">
              همه موجودی‌ها
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {CATEGORY_ITEMS.map((cat) =>
              cat.comingSoon ? (
                <GlassCard key={cat.id} className="!rounded-2xl p-2.5 !bg-white/40 border-dashed !border-[#141413]/20">
                  <div className="flex flex-col justify-between gap-2">
                    <div className="aspect-[16/10] w-full rounded-xl bg-white/50 flex flex-col items-center justify-center gap-1 text-[#141413]/45">
                      <Gamepad2 className="w-7 h-7 stroke-[1.5]" />
                      <span className="text-[9px] font-bold bg-[#FBBF24] text-[#141413] px-2 py-0.5 rounded-full">
                        به‌زودی
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-[#141413]/75">{cat.title}</h4>
                      <p className="text-[10px] text-[#141413]/50 truncate">{cat.subtitle}</p>
                    </div>
                  </div>
                </GlassCard>
              ) : (
                <Link
                  key={cat.id}
                  href={cat.href}
                  className="block active:scale-[0.98] transition"
                >
                  <GlassCard className="!rounded-2xl p-2.5 h-full">
                    <div className="flex flex-col justify-between gap-2">
                      <div className="aspect-[16/10] w-full rounded-xl overflow-hidden bg-white/60">
                        <img
                          src={cat.image!}
                          alt={cat.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-[#141413]">{cat.title}</h4>
                        <p className="text-[10px] text-[#141413]/60 truncate">{cat.subtitle}</p>
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              )
            )}
          </div>
        </section>

        {/* 4. Trust & Location Bar + Inline Music Button side by side */}
        <section className="flex items-center justify-between gap-2.5 pt-0.5">
          <Link href="/contact" className="flex-1 min-w-0 block active:scale-[0.98] transition">
            <GlassCard className="!rounded-full px-3.5 py-2.5">
              <div className="flex items-center gap-2 min-w-0">
                <MapPin className="w-4 h-4 text-[#EA580C] shrink-0" />
                <p className="text-[11px] font-bold text-[#141413] truncate">
                  تهران، میدان آزادی • ضمانت کارشناسی
                </p>
              </div>
            </GlassCard>
          </Link>

          <AmbientPlayer inline />
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
