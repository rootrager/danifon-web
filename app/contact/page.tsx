import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Clock,
  PhoneCall,
  MessageCircle,
  ShieldCheck,
  Navigation,
  Instagram,
  Send,
  ExternalLink,
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

  const socialChannels = [
    {
      title: "واتساپ",
      subtitle: "پیام و استعلام سریع",
      url: contact.whatsappUrl,
      badge: "WhatsApp",
      accent: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      title: "کانال تلگرام",
      subtitle: "موجودی و قیمت لحظه‌ای",
      url: contact.telegramChannelUrl,
      badge: "@daniphoneir",
      accent: "bg-sky-50 text-sky-700 border-sky-200",
    },
    {
      title: "کارشناس تلگرام",
      subtitle: "مشاوره مستقیم خرید",
      url: contact.telegramExpertUrl,
      badge: "@danikamali",
      accent: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      title: "کانال بله",
      subtitle: "اطلاع‌رسانی و پشتیبانی",
      url: "https://ble.ir/daniphone",
      badge: "Bale",
      accent: "bg-indigo-50 text-indigo-700 border-indigo-200",
    },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-[#EFF6FF] text-[#0B1220] pb-28">
      {/* Header */}
      <header className="max-w-md mx-auto px-4 pt-5 pb-3 flex items-center justify-between">
        <Link
          href="/"
          aria-label="بازگشت"
          className="w-10 h-10 rounded-full bg-white border border-[#BFDBFE] flex items-center justify-center text-[#0B1220] shadow-xs active:scale-95 transition"
        >
          <ArrowRight className="w-4 h-4" />
        </Link>
        <h1 className="text-sm font-black text-[#0B1220]">ارتباط و درباره دانیفون</h1>
        <span className="w-10" />
      </header>

      <main className="max-w-md mx-auto px-4 space-y-4 pt-1">
        {/* 1. Social Media Section Right After Header */}
        <section className="space-y-3">
          {/* Featured Larger Instagram Card with Header Preview */}
          <a
            href="https://instagram.com/daniphoneir"
            target="_blank"
            rel="noreferrer"
            className="block bg-white rounded-3xl overflow-hidden border border-[#93C5FD] shadow-sm active:scale-[0.99] transition"
          >
            {/* Mini Instagram Header Preview */}
            <div className="relative h-24 w-full bg-gradient-to-r from-[#0B1220] via-[#1D4ED8] to-[#2563EB] overflow-hidden">
              <img
                src="/danifon-showcase-poster.jpg"
                alt="Instagram Danifon"
                className="w-full h-full object-cover opacity-45"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/80 to-transparent" />
              <div className="absolute bottom-2.5 right-3.5 left-3.5 flex items-center justify-between text-white">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-white text-[#0B1220] flex items-center justify-center font-black text-sm ring-2 ring-[#3B82F6]">
                    D
                  </div>
                  <div>
                    <p className="text-xs font-black">پیج اینستاگرام دانیفون</p>
                    <p className="text-[10px] text-blue-100" dir="ltr">
                      @daniphoneir
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold">
                  <Instagram className="w-3.5 h-3.5" />
                  مشاهده پیج
                </span>
              </div>
            </div>

            <div className="px-4 py-3 flex items-center justify-between text-xs text-[#334155]">
              <span>استوری‌های قیمت روز، آنباکس و کارشناسی واقعی دستگاه‌ها</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
            </div>
          </a>

          {/* 4 Other Channels: WhatsApp, Telegram Channel, Telegram Expert, Bale */}
          <div className="grid grid-cols-2 gap-2.5">
            {socialChannels.map((ch) => (
              <a
                key={ch.title}
                href={ch.url}
                target="_blank"
                rel="noreferrer"
                className="bg-white rounded-2xl p-3.5 border border-[#BFDBFE] hover:border-[#2563EB] flex flex-col justify-between gap-2 shadow-xs active:scale-[0.98] transition"
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${ch.accent}`}>
                    {ch.badge}
                  </span>
                  <Send className="w-3.5 h-3.5 text-[#2563EB]" />
                </div>
                <div>
                  <h2 className="text-xs font-black text-[#0B1220]">{ch.title}</h2>
                  <p className="text-[10px] text-[#475569] mt-0.5">{ch.subtitle}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* 2. Trust Intro Card */}
        <div className="bg-gradient-to-br from-[#0B1220] to-[#1E3A8A] text-white rounded-3xl p-5 shadow-md space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-sky-300">
            <ShieldCheck className="w-4 h-4" />
            <span>{location.storeName}</span>
          </div>
          <h2 className="text-base font-black">خرید حضوری، معاوضه و مشاوره مستقیم</h2>
          <p className="text-xs text-blue-100/85 leading-relaxed">
            تمام دستگاه‌ها قبل از تحویل کارشناسی می‌شن تا با خیال راحت خرید یا معاوضه کنی.
          </p>
        </div>

        {/* 3. Live Map & Navigation Apps */}
        <div className="bg-white rounded-3xl p-3.5 border border-[#BFDBFE] space-y-3 shadow-xs">
          <div className="w-full h-44 rounded-2xl overflow-hidden border border-[#DBEAFE] bg-[#EFF6FF]">
            <iframe
              title="موقعیت فروشگاه دانیفون"
              src={mapEmbedUrl}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="flex items-start gap-2.5 px-1">
            <MapPin className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-xs font-bold leading-relaxed text-[#0B1220]">
                {location.addressText}
              </p>
              <p className="text-[11px] font-semibold text-[#2563EB]">
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
                className="flex items-center justify-center gap-1 py-2 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] hover:border-[#2563EB] text-[11px] font-bold text-[#0B1220] active:scale-95 transition"
              >
                <Navigation className="w-3 h-3 text-[#2563EB]" />
                {app.label}
              </a>
            ))}
          </div>
        </div>

        {/* 4. Hours & Direct Call */}
        <div className="bg-white rounded-2xl p-4 border border-[#BFDBFE] flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-[#2563EB] shrink-0" />
            <div>
              <h3 className="text-xs font-black text-[#0B1220]">تماس مستقیم فروشگاه</h3>
              <p className="text-[11px] text-[#475569] mt-0.5">همه‌روزه با هماهنگی قبلی</p>
            </div>
          </div>
          <a
            href={contact.phoneUrl}
            className="inline-flex items-center gap-1.5 bg-[#2563EB] text-white px-4 py-2 rounded-full text-xs font-bold tabular-nums active:scale-95 transition"
            dir="ltr"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            {contact.phone}
          </a>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
