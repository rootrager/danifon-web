import Link from "next/link";
import { ArrowRight, MapPin, Clock, PhoneCall, MessageCircle, ShieldCheck } from "lucide-react";
import BottomNav from "../components/BottomNav";

export default function ContactPage() {
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
        <h1 className="text-sm font-black">تماس و اطلاعات فروشگاه</h1>
        <span className="w-10" />
      </header>

      <main className="max-w-md mx-auto px-4 space-y-4 pt-2">
        <div className="bg-white rounded-3xl p-5 border-2 border-[#141413] shadow-[4px_4px_0px_#141413] space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
            <ShieldCheck className="w-4 h-4" />
            <span>فروشگاه تخصصی اپل دانیفون</span>
          </div>
          <h2 className="text-lg font-black">مشاوره خرید، معاوضه و فروش مستقیم</h2>
          <p className="text-xs text-[#141413]/70 leading-relaxed">
            برای استعلام قیمت لحظه‌ای، کارشناسی حضوری و رزرو دستگاه می‌توانید مستقیماً با ما در ارتباط باشید.
          </p>
        </div>

        <div className="space-y-2.5">
          <div className="bg-white rounded-2xl p-4 border border-[#141413]/15 flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[#EA580C] shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs font-black">آدرس فروشگاه</h3>
              <p className="text-xs text-[#141413]/70 mt-1">تهران — مراجعه حضوری با هماهنگی قبلی</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-[#141413]/15 flex items-start gap-3">
            <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs font-black">ساعت پاسخگویی</h3>
              <p className="text-xs text-[#141413]/70 mt-1">شنبه تا پنج‌شنبه: ۱۱ تا ۲۰</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <a
            href="tel:02100000000"
            className="flex items-center justify-center gap-2 bg-[#141413] text-white py-3.5 rounded-full text-xs font-bold active:scale-95 transition"
          >
            <PhoneCall className="w-4 h-4" />
            تماس تلفنی
          </a>
          <a
            href="https://t.me/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 bg-[#FBBF24] border border-[#141413] text-[#141413] py-3.5 rounded-full text-xs font-bold active:scale-95 transition"
          >
            <MessageCircle className="w-4 h-4" />
            پیام در تلگرام
          </a>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
