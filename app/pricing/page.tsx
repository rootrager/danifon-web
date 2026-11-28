"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  BatteryCharging,
  ShieldCheck,
  Wrench,
  PhoneCall,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import BottomNav from "../components/BottomNav";
import GlassCard from "../components/ui/GlassCard";
import AiTaskList, { AiTaskItem } from "../components/ui/AiTaskList";

interface QuoteResponse {
  ok: boolean;
  route: "auto" | "assisted" | "human" | "reject";
  model?: string;
  buy_center?: number;
  buy_min?: number;
  buy_max?: number;
  range?: string;
  confidence?: number;
  message?: string;
  explain?: string;
  comps?: {
    count?: number;
    median_sell?: number;
    spread_pct?: number;
  };
  deductions?: { reason: string; amount?: number; label: string }[];
}

const MODELS = [
  { label: "iPhone 17 Pro Max", series: 17, variant: "pro_max" },
  { label: "iPhone 17 Pro", series: 17, variant: "pro" },
  { label: "iPhone 17", series: 17, variant: "base" },
  { label: "iPhone 16 Pro Max", series: 16, variant: "pro_max" },
  { label: "iPhone 16 Pro", series: 16, variant: "pro" },
  { label: "iPhone 16", series: 16, variant: "base" },
  { label: "iPhone 15 Pro Max", series: 15, variant: "pro_max" },
  { label: "iPhone 15 Pro", series: 15, variant: "pro" },
  { label: "iPhone 14 Pro Max", series: 14, variant: "pro_max" },
  { label: "iPhone 14 Pro", series: 14, variant: "pro" },
  { label: "iPhone 13 Pro Max", series: 13, variant: "pro_max" },
  { label: "iPhone 13 Pro", series: 13, variant: "pro" },
  { label: "iPhone 13", series: 13, variant: "base" },
  { label: "iPhone 12 Pro Max", series: 12, variant: "pro_max" },
  { label: "iPhone 11", series: 11, variant: "base" },
];

const STORAGES = [128, 256, 512, 1024];

const REGISTRIES = [
  { id: "REGISTERED", label: "با رجیستری" },
  { id: "UNREGISTERED", label: "بدون رجیستری" },
  { id: "NATIONAL_ID", label: "کد ملی" },
];

const AI_TASKS: AiTaskItem[] = [
  { id: "usd", label: "بررسی نرخ لحظه‌ای دلار و شیب بازار" },
  { id: "comps", label: "تطبیق مدل و حافظه با معاملات واقعی امروز" },
  { id: "battery", label: "محاسبه سلامت باتری و وضعیت رجیستری" },
  { id: "parts", label: "بررسی قطعات و جمع‌بندی نهایی بازه خرید" },
];

function toEnDigits(str: string): string {
  return str
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
}

function formatToman(num?: number): string {
  if (!num || num <= 0) return "—";
  return `${num.toLocaleString("en-US")} تومان`;
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function PricingPage() {
  const [selectedModelIdx, setSelectedModelIdx] = useState(12);
  const [storage, setStorage] = useState(128);
  const [battery, setBattery] = useState(88);
  const [registry, setRegistry] = useState("REGISTERED");
  const [partsReplaced, setPartsReplaced] = useState(0);
  const [loading, setLoading] = useState(false);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [result, setResult] = useState<QuoteResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selectedModel = MODELS[selectedModelIdx];

  const handleEstimate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    setCompletedTasks(0);

    try {
      const fetchPromise = fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          spec: {
            series: selectedModel.series,
            variant: selectedModel.variant,
            storage,
            battery,
            registry,
            condition: "CLEAN",
            parts_replaced: partsReplaced,
            national_id_rule: registry === "NATIONAL_ID",
          },
        }),
      }).then((r) => r.json() as Promise<QuoteResponse>);

      for (let i = 1; i <= AI_TASKS.length; i++) {
        await wait(550);
        setCompletedTasks(i);
      }

      const data = await fetchPromise;
      setResult(data);
    } catch {
      setError("ارتباط با سرور قیمت‌گذاری برقرار نشد. لطفاً دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      dir="rtl"
      className="relative min-h-screen bg-gradient-to-b from-[#FAF6EE] via-[#F7EFE2] to-[#FCEEE3] text-[#141413] pb-28 overflow-x-hidden"
    >
      {/* Ambient orbs for GlassCard */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-28 -right-14 w-64 h-64 rounded-full bg-[#FF7A18]/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-28 -left-14 w-64 h-64 rounded-full bg-[#FBBF24]/25 blur-3xl"
      />

      <header className="relative z-10 max-w-md mx-auto px-4 pt-5 pb-3 flex items-center justify-between">
        <Link
          href="/"
          aria-label="بازگشت"
          className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-[#141413]/15 flex items-center justify-center text-[#141413] active:scale-95 transition"
        >
          <ArrowRight className="w-4 h-4" />
        </Link>
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#EA580C]" />
          <h1 className="text-sm font-black">قیمت‌گذاری هوشمند</h1>
        </div>
        <span className="w-10" />
      </header>

      <main className="relative z-10 max-w-md mx-auto px-4 space-y-5 pt-2">
        {/* Clean Glass Form Card with Comfortable Spacing */}
        <GlassCard className="p-5 space-y-5">
          <p className="text-xs font-bold text-[#141413]/80 leading-relaxed">
            مشخصات گوشیت رو انتخاب کن تا قیمت زنده بازار رو دربیاریم:
          </p>

          {/* Model */}
          <div className="space-y-2">
            <label className="block text-xs font-black text-[#141413]">مدل آیفون</label>
            <select
              value={selectedModelIdx}
              onChange={(e) => setSelectedModelIdx(Number(e.target.value))}
              dir="ltr"
              className="w-full h-12 px-4 rounded-2xl bg-white/85 border border-[#141413]/15 text-sm font-bold focus:outline-none focus:border-[#141413]"
            >
              {MODELS.map((m, idx) => (
                <option key={m.label} value={idx}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          {/* Storage */}
          <div className="space-y-2">
            <label className="block text-xs font-black text-[#141413]">ظرفیت حافظه</label>
            <div className="grid grid-cols-4 gap-2.5">
              {STORAGES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStorage(s)}
                  className={`py-2.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                    storage === s
                      ? "bg-[#141413] text-white border-[#141413]"
                      : "bg-white/80 text-[#141413] border-[#141413]/15"
                  }`}
                >
                  {s === 1024 ? "1TB" : `${s}GB`}
                </button>
              ))}
            </div>
          </div>

          {/* Battery */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-[#141413] flex items-center gap-1.5">
                <BatteryCharging className="w-4 h-4 text-[#EA580C]" />
                سلامت باتری
              </label>
              <span className="text-xs font-black px-3 py-1 rounded-full bg-[#FBBF24] border border-[#141413] tabular-nums">
                {battery}%
              </span>
            </div>
            <input
              type="range"
              min={65}
              max={100}
              value={battery}
              onChange={(e) => setBattery(Number(e.target.value))}
              className="w-full accent-[#141413] cursor-pointer"
            />
          </div>

          {/* Registry */}
          <div className="space-y-2">
            <label className="text-xs font-black text-[#141413] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              وضعیت رجیستری
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {REGISTRIES.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRegistry(r.id)}
                  className={`py-2.5 px-2 rounded-xl text-[11px] font-bold border transition cursor-pointer ${
                    registry === r.id
                      ? "bg-[#FBBF24] text-[#141413] border-[#141413]"
                      : "bg-white/80 text-[#141413]/75 border-[#141413]/15"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Replaced Parts */}
          <div className="space-y-2">
            <label className="text-xs font-black text-[#141413] flex items-center gap-1.5">
              <Wrench className="w-4 h-4 text-slate-600" />
              قطعه تعویضی (ال‌سی‌دی / درب پشت / دوربین)
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { val: 0, label: "بدون تعویض" },
                { val: 1, label: "۱ قطعه" },
                { val: 2, label: "۲+ قطعه" },
              ].map((p) => (
                <button
                  key={p.val}
                  type="button"
                  onClick={() => setPartsReplaced(p.val)}
                  className={`py-2.5 rounded-xl text-[11px] font-bold border transition cursor-pointer ${
                    partsReplaced === p.val
                      ? "bg-[#141413] text-white border-[#141413]"
                      : "bg-white/80 text-[#141413]/75 border-[#141413]/15"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleEstimate}
              disabled={loading}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#FF7A18] to-[#EA580C] text-white text-sm font-black border-2 border-[#141413] shadow-[3px_3px_0px_#141413] active:scale-[0.98] transition disabled:opacity-60 cursor-pointer"
            >
              {loading ? "در حال بررسی مراحل..." : "ببینم چند می‌ارزه!"}
            </button>
          </div>
        </GlassCard>

        {/* AI Task List while calculating */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <AiTaskList tasks={AI_TASKS} completedCount={completedTasks} />
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 text-xs font-bold">
            {error}
          </div>
        )}

        {/* Result Card */}
        <AnimatePresence>
          {!loading && result && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-3xl p-5 border-2 border-[#141413] shadow-[4px_4px_0px_#141413] space-y-4"
            >
              {result.route === "reject" || !result.ok ? (
                <div className="space-y-2 text-center">
                  <AlertTriangle className="w-8 h-8 text-amber-600 mx-auto" />
                  <h2 className="text-sm font-black">نیاز به بررسی کارشناس</h2>
                  <p className="text-xs text-[#141413]/75 leading-relaxed">
                    {result.message || "برای این مشخصات لطفاً مستقیم با کارشناس دانیفون تماس بگیرید."}
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {result.route === "auto" ? "تخمین دقیق بازار" : "بازه تخمینی"}
                    </span>
                    {typeof result.confidence === "number" && (
                      <span className="text-[11px] font-bold text-[#141413]/60 tabular-nums">
                        اطمینان: {Math.round(result.confidence * 100)}%
                      </span>
                    )}
                  </div>

                  <div className="bg-[#FAF6EE] rounded-2xl p-4 text-center space-y-1">
                    <p className="text-[11px] text-[#141413]/60 font-medium">
                      بازه پیشنهادی خرید از شما
                    </p>
                    <p className="text-lg font-black text-[#141413] tabular-nums">
                      {result.buy_min && result.buy_max
                        ? `${result.buy_min.toLocaleString("en-US")} تا ${result.buy_max.toLocaleString("en-US")} تومان`
                        : result.range
                          ? toEnDigits(result.range)
                          : formatToman(result.buy_center)}
                    </p>
                    {result.comps?.median_sell && (
                      <p className="text-[11px] text-[#141413]/65 tabular-nums">
                        میانگین فروش بازار: {formatToman(result.comps.median_sell)}
                      </p>
                    )}
                  </div>

                  {result.deductions && result.deductions.length > 0 && (
                    <div className="space-y-1.5">
                      <p className="text-[11px] font-bold text-[#141413]/60">جزئیات تعدیل قیمت:</p>
                      <div className="space-y-1">
                        {result.deductions.map((d, i) => (
                          <div
                            key={`${d.reason}-${i}`}
                            className="flex items-center justify-between text-xs bg-[#FAF6EE] px-3 py-1.5 rounded-xl"
                          >
                            <span>{toEnDigits(d.label)}</span>
                            {typeof d.amount === "number" && d.amount !== 0 && (
                              <span className="font-bold tabular-nums" dir="ltr">
                                {d.amount > 0 ? "+" : ""}
                                {d.amount.toLocaleString("en-US")}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <a
                    href="tel:+989128404028"
                    className="w-full flex items-center justify-center gap-2 bg-[#141413] text-white py-3.5 rounded-full text-xs font-bold active:scale-95 transition"
                  >
                    <PhoneCall className="w-4 h-4 text-[#FBBF24]" />
                    ثبت فروش یا معاوضه با کارشناس
                  </a>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Friendly Plain-Language Pricing Guide */}
        <GlassCard className="p-4 space-y-2.5">
          <h3 className="text-xs font-black text-[#141413]">
            قیمت چطوری حساب میشه؟ (خیلی خودمونی)
          </h3>
          <ul className="space-y-1.5 text-[11px] text-[#141413]/75 leading-relaxed">
            <li>
              • <strong>بازه ۵ میلیونی:</strong> عددی که میبینی یک بازه‌ی ۵ میلیونی واقعیه؛ یعنی گوشیِ تر‌وتمیز معمولاً سمت سقف بازه خریداری میشه.
            </li>
            <li>
              • <strong>ظاهر و رد قاب:</strong> خط‌وخش، ضربه یا رد قاب روی فریم، موقع کارشناسی حضوری یه مقدار جزئی افت قیمت داره.
            </li>
            <li>
              • <strong>شفافیت کامل:</strong> قیمت‌ها بر اساس معاملات واقعی روز در فروشگاه دانیفون محاسبه میشن، نه حدس و گمان.
            </li>
          </ul>
        </GlassCard>
      </main>

      <BottomNav />
    </div>
  );
}
