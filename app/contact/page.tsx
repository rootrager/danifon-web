import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Clock,
  PhoneCall,
  Navigation,
  Camera,
  ExternalLink,
} from "lucide-react";
import config from "../../config.json";
import BottomNav from "../components/BottomNav";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#25D366" />
      <path
        fill="#FFFFFF"
        d="M16.6 14.3c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.8.9-.1.2-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.3.1-.5.1-.1.2-.3.4-.4.1-.1.2-.2.2-.4.1-.1 0-.3 0-.4-.1-.1-.5-1.3-.7-1.8-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.4c.1.2 1.6 2.5 3.9 3.5.5.2 1 .4 1.3.5.6.2 1.1.2 1.5.1.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1 0-.1-.2-.2-.4-.3z"
      />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#229ED9" />
      <path
        fill="#FFFFFF"
        d="M16.9 7.6 14.8 17c-.1.6-.5.7-1 .4l-2.9-2.1-1.4 1.3c-.1.1-.3.3-.6.3l.2-2.9 5.4-4.9c.2-.2 0-.3-.4-.1L7.4 13.2l-2.9-.9c-.6-.2-.6-.6.1-.9l11.4-4.4c.5-.2 1 .1.9.6z"
      />
    </svg>
  );
}

function BaleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#00BFA5" />
      <path
        fill="#FFFFFF"
        d="M12 6.5c-3.1 0-5.5 2.2-5.5 5.1 0 1.4.6 2.7 1.6 3.6l-.5 2.3 2.3-.9c.7.2 1.4.4 2.1.4 3.1 0 5.5-2.2 5.5-5.1S15.1 6.5 12 6.5zm-1.8 6.3a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm3.6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
      />
    </svg>
  );
}

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
      icon: <WhatsAppIcon />,
    },
    {
      title: "کانال تلگرام",
      subtitle: "موجودی و قیمت لحظه‌ای",
      url: contact.telegramChannelUrl,
      badge: "@daniphoneir",
      accent: "bg-sky-50 text-sky-700 border-sky-200",
      icon: <TelegramIcon />,
    },
    {
      title: "کارشناس تلگرام",
      subtitle: "مشاوره مستقیم خرید",
      url: contact.telegramExpertUrl,
      badge: "@danikamali",
      accent: "bg-blue-50 text-blue-700 border-blue-200",
      icon: <TelegramIcon />,
    },
    {
      title: "کانال بله",
      subtitle: "اطلاع‌رسانی و پشتیبانی",
      url: "https://ble.ir/daniphone",
      badge: "Bale",
      accent: "bg-teal-50 text-teal-700 border-teal-200",
      icon: <BaleIcon />,
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
        <h1 className="text-sm font-black text-[#0B1220]">ارتباط با دانیفون</h1>
        <span className="w-10" />
      </header>

      <main className="max-w-md mx-auto px-4 space-y-5 pt-1">
        {/* 1. Social Hub */}
        <section className="space-y-2.5">
          {/* Featured Instagram Card */}
          <a
            href="https://instagram.com/danifon.ir"
            target="_blank"
            rel="noreferrer"
            className="block bg-white rounded-3xl overflow-hidden border border-[#93C5FD] shadow-xs active:scale-[0.99] transition"
          >
            <div className="w-full bg-[#0B0E14]">
              <img
                src="/instagram-header.jpg"
                alt="پیج اینستاگرام danifon.ir"
                className="w-full h-auto block"
              />
            </div>

            <div className="px-4 py-3 flex items-center justify-between text-xs text-[#0B1220]">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-[#2563EB] shrink-0" />
                <span className="font-black">دنبال کردن پیج اینستاگرام (@danifon.ir)</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
            </div>
          </a>

          {/* 4 Channels Grid with Official App Logos */}
          <div className="grid grid-cols-2 gap-2.5">
            {socialChannels.map((ch) => (
              <a
                key={ch.title}
                href={ch.url}
                target="_blank"
                rel="noreferrer"
                className="bg-white rounded-2xl p-3.5 border border-[#BFDBFE] hover:border-[#2563EB] flex flex-col justify-between gap-2.5 shadow-xs active:scale-[0.98] transition"
              >
                <div className="flex items-center justify-between">
                  {ch.icon}
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${ch.accent}`}>
                    {ch.badge}
                  </span>
                </div>
                <div>
                  <h2 className="text-xs font-black text-[#0B1220]">{ch.title}</h2>
                  <p className="text-[10px] text-[#475569] mt-0.5">{ch.subtitle}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* 2. Store Location & Map */}
        <section className="space-y-2">
          <h2 className="text-xs font-black text-[#1E3A8A] px-1">مراجعه حضوری و لوکیشن فروشگاه</h2>
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
        </section>

        {/* 3. Direct Call */}
        <div className="bg-white rounded-2xl p-4 border border-[#BFDBFE] flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-[#2563EB] shrink-0" />
            <div>
              <h3 className="text-xs font-black text-[#0B1220]">تماس مستقیم با فروشگاه</h3>
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
