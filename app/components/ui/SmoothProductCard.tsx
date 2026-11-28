"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpLeft, BatteryCharging } from "lucide-react";

interface SmoothProductCardProps {
  id: string;
  title: string;
  capacity: string;
  battery: string;
  registry: string;
  priceLabel: string;
  isNew: boolean;
  image?: string;
}

export default function SmoothProductCard({
  id,
  title,
  capacity,
  battery,
  registry,
  priceLabel,
  isNew,
  image = "/showcase-iphone-17-pro.jpeg",
}: SmoothProductCardProps) {
  return (
    <article
      role="article"
      className="group bg-white rounded-3xl p-3 border border-[#141413]/15 hover:border-[#141413] hover:shadow-md transition-all duration-200 flex flex-col justify-between gap-3"
    >
      <Link href={`/product/${encodeURIComponent(id)}`} className="block space-y-2.5">
        {/* Exact 3:4 Aspect Frame Matching public/models/*.jpg (Full Phone Visible, Uniform Size) */}
        <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#141413] border border-[#141413]/10">
          <img
            src={image}
            alt={title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />

          <span
            role="status"
            className={`absolute top-2 right-2 text-[10px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-md ${
              isNew
                ? "bg-[#141413]/85 text-white"
                : "bg-[#FBBF24]/95 text-[#141413] border border-[#141413]/20"
            }`}
          >
            {isNew ? "آکبند" : "کارکرده"}
          </span>

          <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 text-[#141413] tabular-nums">
            <BatteryCharging className="w-3 h-3 text-emerald-600" />
            {battery}
          </span>
        </div>

        {/* Title & Specs */}
        <div className="space-y-1 px-0.5">
          <h2
            className="text-xs font-extrabold text-[#141413] truncate"
            style={{ fontFamily: "var(--font-english)" }}
            dir="ltr"
          >
            {title}
          </h2>
          <p className="text-[10px] text-[#141413]/60 truncate">
            {capacity} · {registry}
          </p>
        </div>
      </Link>

      {/* Price & Action CTA */}
      <div className="pt-2 border-t border-[#141413]/10 flex items-center justify-between gap-2 px-0.5">
        <span className="text-xs font-black text-[#141413] tabular-nums">
          {priceLabel}
        </span>

        <Link
          href={`/product/${encodeURIComponent(id)}`}
          aria-label={`مشاهده ${title}`}
          className="w-8 h-8 rounded-full bg-[#141413] group-hover:bg-[#FF7A18] text-white flex items-center justify-center active:scale-90 transition-all duration-200"
        >
          <ArrowUpLeft className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
}
