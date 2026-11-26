"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Sparkles,
  BatteryCharging,
  ShieldCheck,
  Wrench,
  PhoneCall,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import BottomNav from "../components/BottomNav";

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
  { id: "REGISTERED", label: "با رجیستری (کددار)" },
  { id: "UNREGISTERED", label: "بدون رجیستری" },
  { id: "NATIONAL_ID", label: "مصوبه کد ملی" },
];

function formatToman(num?: number): string {
  if (!num || num <= 0) return "—";
  return `${num.toLocaleString("fa-IR")} تومان`;
}

export default function PricingPage() {
  const [selectedModelIdx, setSelectedModelIdx] = useState(12); // iPhone 13 default
  const [storage, setStorage] = useState(128);
  const [battery, setBattery] = useState(88);
  const [registry, setRegistry] = useState("REGISTERED");
  const [partsReplaced, setPartsReplaced] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<QuoteResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selectedModel = MODELS[selectedModelIdx];

  const handleEstimate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/quote", {
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
      });
      const data: QuoteResponse = await res.json();
      setResult(data);
    } catch {
      setError("ارتباط با سرور قیمت‌گذاری برقرار نشد. لطفاً دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

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
        <h1 className="text-sm font-black">قیمت‌گذاری هوشمند آیفون</h1>
        <span className="w-10" />
      </header>

      <main className="max-w-md mx-auto px-4 space-y-4 pt-1">
        {/* Intro Card */}
        <div className="bg-gradient-to-br from-[#FF7A18] to-[#EA580C] text-white rounded-3xl p-4 border-2 border-[#141413] shadow-[4px_4px_0px_#141413] space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-[#FBBF24]" />
            <span>موتور قیمت‌گذاری زنده دانیفون</span>
          </div>
          <p className="text-xs text-white/90 leading-relaxed">
            مشخصات گوشی خود را انتخاب کنید تا بر اساس معاملات واقعی روز بازار قیمت خرید را ببینید.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl p-4 border border-[#141413]/15 space-y-4">
          {/* Model */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-[#141413]">مدل آیفون</label>
            <select
              value={selectedModelIdx}
              onChange={(e) => setSelectedModelIdx(Number(e.target.value))}
              dir="ltr"
              className="w-full h-11 px-3.5 rounded-2xl bg-[#FAF6EE] border border-[#141413]/20 text-sm font-bold focus:outline-none focus:border-[#141413]"
            >
              {MODELS.map((m, idx) => (
                <option key={m.label} value={idx}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          {/* Storage */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-[#141413]">ظرفیت حافظه</label>
            <div className="grid grid-cols-4 gap-2">
              {STORAGES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStorage(s)}
                  className={`py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                    storage === s
                      ? "bg-[#141413] text-white border-[#141413]"
                      : "bg-[#FAF6EE] text-[#141413] border-[#141413]/15"
                  }`}
                >
                  {s === 1024 ? "1TB" : `${s}GB`}
                </button>
              ))}
            </div>
          </div>

          {/* Battery */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-[#141413] flex items-center gap-1.5">
                <BatteryCharging className="w-4 h-4 text-[#EA580C]" />
                سلامت باتری
              </label>
              <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-[#FBBF24] border border-[#141413] tabular-nums">
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
          <div className="space-y-1.5">
            <label className="text-xs font-black text-[#141413] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              وضعیت رجیستری
            </label>
            <div className="grid grid-cols-3 gap-2">
              {REGISTRIES.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRegistry(r.id)}
                  className={`py-2 px-2 rounded-xl text-[11px] font-bold border transition cursor-pointer ${
                    registry === r.id
                      ? "bg-[#FBBF24] text-[#141413] border-[#141413]"
                      : "bg-[#FAF6EE] text-[#141413]/75 border-[#141413]/15"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Replaced Parts */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-[#141413] flex items-center gap-1.5">
              <Wrench className="w-4 h-4 text-slate-600" />
              قطعه تعویضی (ال‌سی‌دی / درب پشت / دوربین)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { val: 0, label: "بدون تعویض" },
                { val: 1, label: "۱ قطعه" },
                { val: 2, label: "۲+ قطعه" },
              ].map((p) => (
                <button
                  key={p.val}
                  type="button"
                  onClick={() => setPartsReplaced(p.val)}
                  className={`py-2 rounded-xl text-[11px] font-bold border transition cursor-pointer ${
                    partsReplaced === p.val
                      ? "bg-[#141413] text-white border-[#141413]"
                      : "bg-[#FAF6EE] text-[#141413]/75 border-[#141413]/15"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleEstimate}
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-[#141413] text-white text-sm font-bold shadow-md active:scale-[0.98] transition disabled:opacity-60 cursor-pointer"
          >
            {loading ? "در حال محاسبه قیمت زنده..." : "محاسبه قیمت واقعی دستگاه"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 text-xs font-bold">
            {error}
          </div>
        )}

        {/* Result Card */}
        <AnimatePresence>
          {result && (
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
                      {result.range || formatToman(result.buy_center)}
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
                            <span>{d.label}</span>
                            {typeof d.amount === "number" && d.amount !== 0 && (
                              <span className="font-bold tabular-nums">
                                {d.amount > 0 ? "+" : ""}
                                {d.amount.toLocaleString("fa-IR")}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <a
                    href="tel:02100000000"
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF7A18] to-[#EA580C] text-white py-3 rounded-full text-xs font-bold border border-[#141413] active:scale-95 transition"
                  >
                    <PhoneCall className="w-4 h-4" />
                    ثبت فروش یا معاوضه با کارشناس
                  </a>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <BottomNav />
    </div>
  );
}
