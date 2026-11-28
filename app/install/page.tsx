import Link from "next/link";
import { ArrowRight, Share, MoreVertical, PlusSquare, ShieldCheck, Smartphone } from "lucide-react";
import GlassCard from "../components/ui/GlassCard";
import BottomNav from "../components/BottomNav";

export default function InstallGuidePage() {
  return (
    <div
      dir="rtl"
      className="relative min-h-screen bg-gradient-to-b from-[#FAF6EE] via-[#F7EFE2] to-[#FCEEE3] text-[#141413] pb-28 overflow-x-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-24 -right-12 w-56 h-56 rounded-full bg-[#FF7A18]/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-24 -left-12 w-60 h-60 rounded-full bg-[#FBBF24]/25 blur-3xl"
      />

      <header className="relative z-10 max-w-md mx-auto px-4 pt-5 pb-3 flex items-center justify-between">
        <Link
          href="/"
          aria-label="بازگشت"
          className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-[#141413]/15 flex items-center justify-center text-[#141413] active:scale-95 transition"
        >
          <ArrowRight className="w-4 h-4" />
        </Link>
        <h1 className="text-sm font-black">نصب اپلیکیشن دانیفون</h1>
        <span className="w-10" />
      </header>

      <main className="relative z-10 max-w-md mx-auto px-4 space-y-4 pt-1">
        {/* Safe Usage Intro */}
        <GlassCard className="p-5 space-y-2.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
            <ShieldCheck className="w-4 h-4" />
            <span>استفاده ایمن و همیشگی</span>
          </div>
          <h2 className="text-base font-black leading-snug">
            دانیفون رو بیار روی صفحه گوشیت!
          </h2>
          <p className="text-xs text-[#141413]/75 leading-relaxed">
            با اضافه کردن سایت به صفحه اصلی گوشی (Add to Home Screen)، هم با یک لمس مستقیم وارد میشی و هم همیشه به صورت ایمن از نسخه اصلی اپلیکیشن استفاده می‌کنی.
          </p>
        </GlassCard>

        {/* iPhone (Safari) Steps */}
        <GlassCard className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#141413] text-white flex items-center justify-center">
              <Smartphone className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-black">برای آیفون (مرورگر Safari)</h3>
          </div>

          <ol className="space-y-2 text-xs text-[#141413]/85 leading-relaxed">
            <li className="flex items-start gap-2 bg-white/60 rounded-xl p-2.5">
              <span className="font-black text-[#EA580C]">1.</span>
              <span>
                توی نوار پایین مرورگر، دکمه <strong>Share</strong>{" "}
                <Share className="w-3.5 h-3.5 inline text-[#2563EB]" /> (یا سه خط / منوی پایین) رو بزن.
              </span>
            </li>
            <li className="flex items-start gap-2 bg-white/60 rounded-xl p-2.5">
              <span className="font-black text-[#EA580C]">2.</span>
              <span>
                بیا پایین و گزینه <strong>Add to Home Screen</strong>{" "}
                <PlusSquare className="w-3.5 h-3.5 inline text-[#141413]" /> رو انتخاب کن.
              </span>
            </li>
            <li className="flex items-start gap-2 bg-white/60 rounded-xl p-2.5">
              <span className="font-black text-[#EA580C]">3.</span>
              <span>
                بالا سمت راست دکمه <strong>Add</strong> رو بزن؛ تمام! آیکون اپل دانیفون میاد روی صفحه‌ت.
              </span>
            </li>
          </ol>
        </GlassCard>

        {/* Android (Chrome) Steps */}
        <GlassCard className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
              <MoreVertical className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-black">برای اندروید (مرورگر Chrome)</h3>
          </div>

          <ol className="space-y-2 text-xs text-[#141413]/85 leading-relaxed">
            <li className="flex items-start gap-2 bg-white/60 rounded-xl p-2.5">
              <span className="font-black text-emerald-700">1.</span>
              <span>
                دکمه سه نقطه بالا سمت راست مرورگر رو بزن.
              </span>
            </li>
            <li className="flex items-start gap-2 bg-white/60 rounded-xl p-2.5">
              <span className="font-black text-emerald-700">2.</span>
              <span>
                گزینه <strong>Add to Home screen</strong> (یا نصب برنامه) رو بزن و تایید کن.
              </span>
            </li>
          </ol>
        </GlassCard>
      </main>

      <BottomNav />
    </div>
  );
}
