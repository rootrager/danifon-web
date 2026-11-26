"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Smartphone, Sparkles, Calculator, ShieldCheck, ArrowLeft } from "lucide-react";

const STORAGE_KEY = "danifon_onboarding_seen_v1";

const SLIDES = [
  {
    id: 1,
    bg: "bg-[#FAF6EE]",
    accent: "bg-[#FBBF24]",
    badge: "خوش اومدی به دانیفون 👋",
    title: "خرید و فروش آیفون، مثل آب خوردن!",
    desc: "اینجا خبری از قیمت‌های فضایی و سردرگمی نیست؛ همه‌چیز شفاف، سریع و واقعی پیش میره.",
    icon: Smartphone,
    emoji: "📱✨",
  },
  {
    id: 2,
    bg: "bg-[#FFF3EB]",
    accent: "bg-[#FF6B1A]",
    badge: "موتور هوشمند قیمت‌دهی",
    title: "گوشیت رو بر اساس بازار واقعی قیمت بذار",
    desc: "هوش مصنوعی ما معاملات واقعی امروز رو بررسی می‌کنه و منصفانه‌ترین بازه خرید و معاوضه رو میده.",
    icon: Sparkles,
    emoji: "🤖⚡",
  },
  {
    id: 3,
    bg: "bg-[#EFF6FF]",
    accent: "bg-[#2563EB]",
    badge: "اقساط و رجیستری",
    title: "تو ۱۰ ثانیه قسط و گمرکی رو حساب کن",
    desc: "قبل از خرید، دقیق بدون چقدر پیش‌پرداخت میدی، قسط ماهانت چقدره و هزینه رجیستری چطوره.",
    icon: Calculator,
    emoji: "💳🧮",
  },
  {
    id: 4,
    bg: "bg-[#ECFDF5]",
    accent: "bg-[#10B981]",
    badge: "ضمانت کارشناسی",
    title: "موجودی واقعی، به شرط تست و سلامت",
    desc: "تمام گوشی‌ها با ذکر دقیق درصد باتری، وضعیت رجیستری و تاییدیه کارشناسی دانیفون ارائه میشن.",
    icon: ShieldCheck,
    emoji: "🛡️✅",
  },
];

interface OnboardingTutorialProps {
  forceOpen?: boolean;
  onClose?: () => void;
}

export default function OnboardingTutorial({ forceOpen = false, onClose }: OnboardingTutorialProps) {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (forceOpen) {
      setStep(0);
      setVisible(true);
      return;
    }
    try {
      const seen = localStorage.getItem(STORAGE_KEY);
      if (!seen) {
        setVisible(true);
      }
    } catch {
      // Ignore storage errors in private browsing
    }
  }, [forceOpen]);

  const finish = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Ignore
    }
    setVisible(false);
    onClose?.();
  };

  if (!visible) return null;

  const current = SLIDES[step];
  const Icon = current.icon;
  const isLast = step === SLIDES.length - 1;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        dir="rtl"
        className={`fixed inset-0 z-[100] ${current.bg} text-[#141413] flex flex-col justify-between transition-colors duration-300`}
      >
        {/* Top Bar with Skip */}
        <div className="max-w-md w-full mx-auto px-6 pt-6 flex items-center justify-between">
          <span className="text-xs font-extrabold tracking-tight px-3 py-1 rounded-full bg-black/5">
            {step + 1} از {SLIDES.length}
          </span>
          <button
            type="button"
            onClick={finish}
            className="text-xs font-bold text-[#141413]/70 hover:text-[#141413] px-3 py-1.5 rounded-full border border-[#141413]/15 cursor-pointer transition"
          >
            رد کردن (Skip)
          </button>
        </div>

        {/* Animated Center Illustration + Copy */}
        <div className="max-w-md w-full mx-auto px-6 flex-1 flex flex-col items-center justify-center text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="w-full flex flex-col items-center space-y-6"
            >
              {/* Playful Animated Illustration Card */}
              <div className="relative w-48 h-48 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: [0, 6, -6, 0], scale: [1, 1.04, 1] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className={`absolute inset-3 rounded-[40px] ${current.accent} opacity-20`}
                />
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
                  className="relative w-32 h-32 rounded-[32px] bg-white border-2 border-[#141413] shadow-[6px_6px_0px_#141413] flex flex-col items-center justify-center gap-1"
                >
                  <Icon className="w-12 h-12 text-[#141413] stroke-[1.8]" />
                  <span className="text-lg">{current.emoji}</span>
                </motion.div>
              </div>

              <div className="space-y-3 max-w-xs">
                <span className="inline-block text-[11px] font-bold px-3 py-1 rounded-full bg-white border border-[#141413]/15">
                  {current.badge}
                </span>
                <h2 className="text-2xl font-black leading-snug text-[#141413]">
                  {current.title}
                </h2>
                <p className="text-sm text-[#141413]/70 leading-relaxed">
                  {current.desc}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Progress & CTA */}
        <div className="max-w-md w-full mx-auto px-6 pb-8 flex items-center justify-between gap-4">
          {/* Progress Pills */}
          <div className="flex items-center gap-1.5">
            {SLIDES.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                aria-label={`اسلاید ${idx + 1}`}
                onClick={() => setStep(idx)}
                className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                  idx === step ? "w-7 bg-[#141413]" : "w-2 bg-[#141413]/20"
                }`}
              />
            ))}
          </div>

          {/* Next / Start Button */}
          <button
            type="button"
            onClick={() => (isLast ? finish() : setStep((s) => s + 1))}
            className="inline-flex items-center gap-2 bg-[#141413] text-white px-6 py-3.5 rounded-full text-sm font-bold shadow-lg active:scale-95 transition cursor-pointer"
          >
            <span>{isLast ? "بزن بریم!" : "بعدی"}</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
