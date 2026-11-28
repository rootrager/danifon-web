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
  "سفید": "bg-white border border-[#141413]/30",
  "مشکی": "bg-[#141413]",
  "آبی یخی": "bg-sky-300",
  "آلبالویی": "bg-rose-800",
  "نارنجی": "bg-[#FF7A18]",
  "آبی": "bg-blue-600",
  "سبز": "bg-emerald-600",
  "بنفش": "bg-purple-500",
  "تیتانیوم صحرایی": "bg-amber-700/70",
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
  const shortRegistry = registry.includes("بدون") ? "بدون کد" : "کددار";
  const dotClass = (color && COLOR_DOTS[color]) || "bg-slate-300";

  return (
    <article
      role="article"
      className="group h-full bg-white rounded-3xl p-2.5 border border-[#141413]/12 hover:border-[#141413]/40 shadow-[0_2px_12px_rgba(20,20,19,0.04)] hover:shadow-[0_10px_24px_rgba(20,20,19,0.08)] transition-all duration-200 flex flex-col justify-between gap-2.5"
    >
      <Link href={`/product/${encodeURIComponent(id)}`} className="block space-y-2.5">
        {/* Clean 3:4 Image Frame with Single Corner Status Pill */}
        <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#141413]">
          <img
            src={image}
            alt={title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-300"
          />

          <span
            role="status"
            className={`absolute top-2 right-2 text-[10px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-md ${
              isNew
                ? "bg-white/90 text-[#141413]"
                : "bg-[#FBBF24]/95 text-[#141413]"
            }`}
          >
            {isNew ? "آکبند" : `کارکرده · ${battery}`}
          </span>
        </div>

        {/* Aligned Title & Specs */}
        <div className="space-y-1 px-1">
          <h2
            className="text-xs font-extrabold text-[#141413] truncate"
            style={{ fontFamily: "var(--font-english)" }}
            dir="ltr"
          >
            {title}
          </h2>
          <div className="flex items-center justify-between text-[10px] text-[#141413]/70 font-medium gap-1">
            <span className="inline-flex items-center gap-1 truncate">
              {color && (
                <>
                  <span className={`w-2 h-2 rounded-full shrink-0 ${dotClass}`} />
                  <span className="font-bold text-[#141413]">{color}</span>
                  <span>·</span>
                </>
              )}
              <span>{shortRegistry}</span>
            </span>
            <span className="font-bold text-[#141413]/85 shrink-0" dir="ltr">
              {capacity}
            </span>
          </div>
        </div>
      </Link>

      {/* Aligned Footer Price + Action */}
      <div className="pt-2 border-t border-[#141413]/8 flex items-center justify-between gap-2 px-1">
        <span className="text-xs font-black text-[#141413] tabular-nums truncate">
          {priceLabel}
        </span>

        <Link
          href={`/product/${encodeURIComponent(id)}`}
          aria-label={`مشاهده ${title}`}
          className="w-8 h-8 rounded-full bg-[#141413] group-hover:bg-[#FF7A18] text-white flex items-center justify-center shrink-0 active:scale-90 transition-all duration-200"
        >
          <ArrowUpLeft className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
}
