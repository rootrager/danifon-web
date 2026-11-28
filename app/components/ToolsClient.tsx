"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, ShieldCheck, Calculator, PhoneCall, AlertCircle } from "lucide-react";
import config from "../../config.json";
import BottomNav from "./BottomNav";
import GlassCard from "./ui/GlassCard";

interface RegistryModel {
  name: string;
  customsFee: number;
  passportFee: number;
  unavailable?: boolean;
}

function formatToman(n: number): string {
  return `${Math.round(n).toLocaleString("en-US")} تومان`;
}

export default function ToolsClient() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "installment" ? "installment" : "registry";
  const [tab, setTab] = useState<"registry" | "installment">(initialTab);

  useEffect(() => {
    const t = searchParams.get("tab");
    if (t === "installment" || t === "registry") {
      setTab(t);
    }
  }, [searchParams]);

  // Registry state
  const models = config.registry.models as RegistryModel[];
  const [selectedModelIdx, setSelectedModelIdx] = useState(2); // iPhone 17 Pro Max default
  const [withPassport, setWithPassport] = useState(true);

  const selectedModel = models[selectedModelIdx] || models[0];
  const registryTotal = selectedModel.unavailable
    ? 0
    : selectedModel.customsFee + (withPassport ? selectedModel.passportFee : 0);

  // Installment state
  const [devicePriceM, setDevicePriceM] = useState(180); // million toman
  const [downPaymentM, setDownPaymentM] = useState(70);
  const [months, setMonths] = useState(6);

  const devicePrice = devicePriceM * 1_000_000;
  const downPayment = Math.min(downPaymentM * 1_000_000, devicePrice);
  const remaining = Math.max(devicePrice - downPayment, 0);
  const feeRate = config.installment.baseFeeRate || 0.1;
  const monthlyRate = config.installment.monthlyInterestRate || 0.05;
  const totalPayableRemaining = remaining * (1 + feeRate + monthlyRate * months);
  const monthlyInstallment = months > 0 ? totalPayableRemaining / months : 0;

  return (
    <div dir="rtl" className="min-h-dvh bg-[#F8CFC8] text-[#111111] flex flex-col">
      {/* Pastel Pink Header */}
      <header className="max-w-md w-full mx-auto px-5 pt-5 pb-4 flex items-center justify-between">
        <Link
          href="/"
          aria-label="بازگشت"
          className="w-10 h-10 rounded-full bg-white text-[#111111] flex items-center justify-center shadow-xs active:scale-95 transition"
        >
          <ArrowRight className="w-4 h-4" />
        </Link>
        <h1 className="text-sm font-black text-[#111111]">
          {tab === "registry" ? "محاسبه هزینه رجیستری" : "محاسبه اقساط"}
        </h1>
        <span className="w-10" />
      </header>

      {/* Curved Pastel Sheet extending cleanly all the way to bottom */}
      <main className="relative overflow-hidden flex-1 max-w-md w-full mx-auto bg-gradient-to-b from-[#FFF2EF] via-[#FCE4DF] to-[#FAD6CF] rounded-t-[36px] px-5 pt-6 pb-28 shadow-[0_-8px_30px_rgba(0,0,0,0.04)] space-y-5">
        {/* Soft ambient orbs so GlassCard frosted blur shines */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-24 -right-12 w-56 h-56 rounded-full bg-[#FF7A18]/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-28 -left-12 w-60 h-60 rounded-full bg-[#F472B6]/20 blur-3xl"
        />

        {/* Two Pill Tabs */}
        <div className="relative z-10 grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => setTab("registry")}
            className={`py-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
              tab === "registry"
                ? "bg-[#111111] text-white"
                : "bg-transparent text-[#111111] border border-[#111111]/25"
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            هزینه رجیستری
          </button>
          <button
            type="button"
            onClick={() => setTab("installment")}
            className={`py-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
              tab === "installment"
                ? "bg-[#111111] text-white"
                : "bg-transparent text-[#111111] border border-[#111111]/25"
            }`}
          >
            <Calculator className="w-4 h-4" />
            محاسبه اقساط
          </button>
        </div>

        {tab === "registry" ? (
          <div className="relative z-10 space-y-4">
            <GlassCard className="p-4 space-y-3">
              <label className="block text-xs font-black text-[#111111]">
                مدل آیفون رو انتخاب کن
              </label>
              <select
                value={selectedModelIdx}
                onChange={(e) => setSelectedModelIdx(Number(e.target.value))}
                dir="ltr"
                className="w-full h-12 px-4 rounded-2xl bg-white/85 text-sm font-bold text-[#111111] focus:outline-none shadow-xs"
              >
                {models.map((m, i) => (
                  <option key={m.name} value={i}>
                    {m.name}
                  </option>
                ))}
              </select>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-bold text-[#111111]/80">
                  همراه با هزینه پاسپورت؟
                </span>
                <button
                  type="button"
                  onClick={() => setWithPassport((v) => !v)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                    withPassport
                      ? "bg-[#111111] text-white"
                      : "bg-white/80 text-[#111111] border border-[#111111]/20"
                  }`}
                >
                  {withPassport ? "بله، با پاسپورت" : "فقط عوارض گمرکی"}
                </button>
              </div>
            </GlassCard>

            {selectedModel.unavailable ? (
              <GlassCard className="p-5 text-center space-y-2">
                <AlertCircle className="w-8 h-8 text-[#111111] mx-auto" />
                <h2 className="text-sm font-black">{selectedModel.name}</h2>
                <p className="text-xs font-bold text-rose-600">
                  رجیستری این مدل فعلاً قابل انجام نیست.
                </p>
              </GlassCard>
            ) : (
              <GlassCard className="p-5 space-y-3">
                <div className="flex items-center justify-between text-xs text-[#111111]/70">
                  <span>عوارض گمرکی ({selectedModel.name})</span>
                  <span className="font-bold text-[#111111] tabular-nums">
                    {formatToman(selectedModel.customsFee)}
                  </span>
                </div>

                {withPassport && (
                  <div className="flex items-center justify-between text-xs text-[#111111]/70">
                    <span>هزینه پاسپورت و ثبت</span>
                    <span className="font-bold text-[#111111] tabular-nums">
                      {formatToman(selectedModel.passportFee)}
                    </span>
                  </div>
                )}

                <div className="pt-3 border-t border-[#111111]/10 flex items-center justify-between">
                  <span className="text-xs font-black">جمع کل رجیستری</span>
                  <span className="text-base font-black text-[#111111] tabular-nums">
                    {formatToman(registryTotal)}
                  </span>
                </div>
              </GlassCard>
            )}

            <a
              href={config.registry.telegramUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#111111] text-white py-3.5 rounded-full text-xs font-bold active:scale-95 transition"
            >
              <PhoneCall className="w-4 h-4" />
              ثبت درخواست رجیستری در تلگرام
            </a>

            {/* Concise Conversational Registry Guide */}
            <GlassCard className="p-4 space-y-2.5">
              <h3 className="text-xs font-black text-[#111111]">
                نکات مهم رجیستری (خیلی خلاصه)
              </h3>
              <ul className="space-y-1.5 text-[11px] text-[#111111]/80 leading-relaxed">
                <li>
                  • <strong>فرمول قیمت:</strong> هزینه نهایی رجیستری مجموع <strong>عوارض گمرکی + هزینه ثبت و پاسپورت</strong> هست.
                </li>
                <li>
                  • <strong>کی نیاز به پاسپورت نیست؟</strong> اگر گوشیت <strong>مصوبه</strong> باشه، دیگه نیازی به پاسپورت نداری و فقط عوارض گمرکی رو پرداخت می‌کنی.
                </li>
                <li>
                  • <strong>تغییر لحظه‌ای گمرک:</strong> تعرفه گمرکی از سمت دولت تعیین میشه و ممکنه لحظه‌ای کمی بالاتر بره؛ این موضوع دست ما نیست.
                </li>
              </ul>
            </GlassCard>
          </div>
        ) : (
          <div className="relative z-10 space-y-4">
            <GlassCard className="p-4 space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-black">
                  <span>قیمت گوشی (میلیون تومان)</span>
                  <span className="tabular-nums">{devicePriceM} میلیون</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={750}
                  step={5}
                  value={devicePriceM}
                  onChange={(e) => setDevicePriceM(Number(e.target.value))}
                  className="w-full accent-[#111111] cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-black">
                  <span>پیش‌پرداخت (میلیون تومان)</span>
                  <span className="tabular-nums">{Math.min(downPaymentM, devicePriceM)} میلیون</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={devicePriceM}
                  step={5}
                  value={Math.min(downPaymentM, devicePriceM)}
                  onChange={(e) => setDownPaymentM(Number(e.target.value))}
                  className="w-full accent-[#111111] cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-black block">تعداد اقساط (ماه)</span>
                <div className="grid grid-cols-4 gap-2">
                  {[3, 6, 9, 12].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMonths(m)}
                      className={`py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                        months === m
                          ? "bg-[#111111] text-white"
                          : "bg-white/80 text-[#111111]"
                      }`}
                    >
                      {m} ماهه
                    </button>
                  ))}
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-5 space-y-2.5">
              <div className="flex items-center justify-between text-xs text-[#111111]/70">
                <span>مانده مبلغ</span>
                <span className="font-bold text-[#111111] tabular-nums">
                  {formatToman(remaining)}
                </span>
              </div>
              <div className="pt-2 border-t border-[#111111]/10 flex items-center justify-between">
                <span className="text-xs font-black">قسط هر ماه</span>
                <span className="text-base font-black text-[#111111] tabular-nums">
                  {formatToman(monthlyInstallment)}
                </span>
              </div>
            </GlassCard>

            <a
              href={config.installment.telegramUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#111111] text-white py-3.5 rounded-full text-xs font-bold active:scale-95 transition"
            >
              <PhoneCall className="w-4 h-4" />
              هماهنگی خرید اقساطی با کارشناس
            </a>

            {/* Concise Conversational Installment Guide */}
            <GlassCard className="p-4 space-y-2.5">
              <h3 className="text-xs font-black text-[#111111]">
                اقساط چطوری حساب میشه؟ (خیلی خودمونی)
              </h3>
              <ul className="space-y-1.5 text-[11px] text-[#111111]/80 leading-relaxed">
                <li>
                  • <strong>فرمول شفاف:</strong> روی مبلغ باقی‌مانده (بعد از کسر پیش‌پرداخت)، <strong>10%</strong> کارمزد پایه به اضافه <strong>5%</strong> به ازای هر ماه حساب میشه.
                </li>
                <li>
                  • <strong>قسط سبک‌تر:</strong> هر چقدر پیش‌پرداختت بیشتر و تعداد ماه‌ها کمتر باشه، مبلغ نهایی خیلی به‌صرفه‌تر درمیاد.
                </li>
                <li>
                  • <strong>ثبت سریع:</strong> همین الان با کارشناس تلگرام هماهنگ کن تا همون روز گوشیت رو تحویل بگیری.
                </li>
              </ul>
            </GlassCard>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
