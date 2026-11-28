"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";

interface SmoothProductCardProps {
  id: string;
  title: string;
  capacity: string;
  battery: string;
  registry: string;
  color?: string;
  priceLabel: string;
  isNew: boolean;
  image?: string;
}

const COLOR_DOTS: Record<string, string> = {
  "سفید": "bg-white border border-white/40",
  "مشکی": "bg-zinc-800 border border-white/30",
  "آبی یخی": "bg-sky-300",
  "آلبالویی": "bg-rose-700",
  "نارنجی": "bg-[#FF7A18]",
  "آبی": "bg-blue-500",
  "سبز": "bg-emerald-500",
  "بنفش": "bg-purple-400",
  "تیتانیوم صحرایی": "bg-amber-600",
  "نقره‌ای/طوسی": "bg-slate-400",
  "صورتی": "bg-pink-400",
  "زرد": "bg-amber-300",
};

export default function SmoothProductCard({
  id,
  title,
  capacity,
  battery,
  registry,
  color,
  priceLabel,
  isNew,
  image = "/showcase-iphone-17-pro.jpeg",
}: SmoothProductCardProps) {
  const shortRegistry = registry.includes("بدون نیاز")
    ? "اورجینال"
    : registry.includes("بدون")
      ? "بدون کد"
      : "کددار";
  const dotClass = (color && COLOR_DOTS[color]) || "bg-slate-400";

  return (
    <article
      role="article"
      className="group h-full bg-[#171920] rounded-2xl p-2 border border-white/10 hover:border-[#FBBF24]/60 shadow-[0_6px_18px_rgba(0,0,0,0.28)] transition-all duration-200 flex flex-col justify-between gap-1.5"
    >
      <Link href={`/product/${encodeURIComponent(id)}`} className="block space-y-1.5">
        {/* Compact Image Frame (~96px) so 6 cards fit cleanly on a mobile screen */}
        <div className="relative h-24 w-full rounded-xl overflow-hidden bg-[#0E1015] border border-white/5">
          <img
            src={image}
            alt={title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-300"
          />

          <span
            role="status"
            className={`absolute top-1.5 right-1.5 text-[9px] font-bold px-2 py-0.5 rounded-full ${
              isNew
                ? "bg-white/15 text-white backdrop-blur-md border border-white/15"
                : "bg-[#FBBF24] text-[#111111]"
            }`}
          >
            {isNew ? "آکبند" : battery}
          </span>
        </div>

        {/* High-Contrast Dark-Mode Specs */}
        <div className="space-y-0.5 px-0.5">
          <h2
            className="text-[11px] font-extrabold text-white truncate"
            style={{ fontFamily: "var(--font-english)" }}
            dir="ltr"
          >
            {title}
          </h2>
          <div className="flex items-center justify-between text-[10px] text-slate-300 gap-1">
            <span className="inline-flex items-center gap-1 truncate">
              {color && (
                <>
                  <span className={`w-2 h-2 rounded-full shrink-0 ${dotClass}`} />
                  <span className="font-semibold text-slate-100">{color}</span>
                  <span className="text-slate-500">·</span>
                </>
              )}
              <span className="text-slate-400">{shortRegistry}</span>
            </span>
            <span className="font-bold text-slate-200 shrink-0" dir="ltr">
              {capacity}
            </span>
          </div>
        </div>
      </Link>

      {/* Price & Action */}
      <div className="pt-1.5 border-t border-white/10 flex items-center justify-between gap-1.5 px-0.5">
        <span className="text-[11px] font-black text-[#FBBF24] tabular-nums truncate">
          {priceLabel}
        </span>

        <Link
          href={`/product/${encodeURIComponent(id)}`}
          aria-label={`مشاهده ${title}`}
          className="w-6 h-6 rounded-full bg-white/10 group-hover:bg-[#FF7A18] text-white flex items-center justify-center shrink-0 active:scale-90 transition-all duration-200"
        >
          <ArrowUpLeft className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}
