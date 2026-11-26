import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Clock,
  PhoneCall,
  MessageCircle,
  ShieldCheck,
  Navigation,
} from "lucide-react";
import config from "../../config.json";
import BottomNav from "../components/BottomNav";

export default function ContactPage() {
  const { contact, location } = config;
  const mapEmbedUrl = `https://maps.google.com/maps?q=${location.lat},${location.lng}&hl=fa&z=16&output=embed`;

  const navApps = [
    { label: "نشان", url: location.neshanUrl },
    { label: "بلد", url: location.baladUrl },
    { label: "گوگل مپ", url: location.mapUrl },
    { label: "ویز", url: location.wazeUrl },
  ];

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
        <h1 className="text-sm font-black">تماس و موقعیت فروشگاه</h1>
        <span className="w-10" />
      </header>

      <main className="max-w-md mx-auto px-4 space-y-4 pt-1">
        {/* Store Intro */}
        <div className="bg-white rounded-3xl p-5 border-2 border-[#141413] shadow-[4px_4px_0px_#141413] space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
            <ShieldCheck className="w-4 h-4" />
            <span>{location.storeName}</span>
          </div>
          <h2 className="text-lg font-black">خرید حضوری، معاوضه و مشاوره مستقیم</h2>
          <p className="text-xs text-[#141413]/70 leading-relaxed">
            برای بازدید حضوری، تست دستگاه، معاوضه و دریافت مشاوره تخصصی می‌توانید به فروشگاه مراجعه کنید یا مستقیم تماس بگیرید.
          </p>
        </div>

        {/* Live Map & Navigation Apps */}
        <div className="bg-white rounded-3xl p-3.5 border border-[#141413]/15 space-y-3">
          <div className="w-full h-44 rounded-2xl overflow-hidden border border-[#141413]/10 bg-[#FAF6EE]">
            <iframe
              title="موقعیت فروشگاه دانیفون"
              src={mapEmbedUrl}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="flex items-start gap-2.5 px-1">
            <MapPin className="w-4 h-4 text-[#EA580C] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-xs font-bold leading-relaxed text-[#141413]">
                {location.addressText}
              </p>
              <p className="text-[11px] font-semibold text-[#EA580C]">
                {location.laneNote}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 pt-1">
            {navApps.map((app) => (
              <a
                key={app.label}
                href={app.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1 py-2 rounded-xl bg-[#FAF6EE] border border-[#141413]/15 hover:border-[#141413] text-[11px] font-bold text-[#141413] active:scale-95 transition"
              >
                <Navigation className="w-3 h-3 text-[#EA580C]" />
                {app.label}
              </a>
            ))}
          </div>
        </div>

        {/* Hours & Phone */}
        <div className="bg-white rounded-2xl p-4 border border-[#141413]/15 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-blue-600 shrink-0" />
            <div>
              <h3 className="text-xs font-black">ساعت پاسخگویی</h3>
              <p className="text-[11px] text-[#141413]/70 mt-0.5">همه‌روزه با هماهنگی قبلی</p>
            </div>
          </div>
          <span className="text-xs font-black tabular-nums" dir="ltr">
            {contact.phone}
          </span>
        </div>

        {/* Direct Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <a
            href={contact.phoneUrl}
            className="flex items-center justify-center gap-2 bg-[#141413] text-white py-3.5 rounded-full text-xs font-bold active:scale-95 transition"
          >
            <PhoneCall className="w-4 h-4" />
            تماس مستقیم
          </a>
          <a
            href={contact.telegramExpertUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 bg-[#FBBF24] border border-[#141413] text-[#141413] py-3.5 rounded-full text-xs font-bold active:scale-95 transition"
          >
            <MessageCircle className="w-4 h-4" />
            تلگرام کارشناس
          </a>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
