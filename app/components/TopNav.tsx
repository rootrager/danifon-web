"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpLeft } from "lucide-react";
import HaloButton from "./ui/HaloButton";
import TextGif from "./ui/TextGif";

export default function TopNav() {
  const pathname = usePathname();
  const isInventory = pathname?.startsWith("/inventory");

  return (
    <header className="w-full border-b border-blue-100 dark:border-blue-400/15 bg-white/90 dark:bg-[#04060c]/85 backdrop-blur-xl sticky top-0 z-40 transition-colors">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element Brand Wordmark with Cult UI TextGif */}
        <Link
          href="/"
          className="inline-flex items-center whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70 rounded-lg"
          dir="ltr"
          aria-label="danifon - صفحه اصلی"
        >
          <TextGif
            text="danifon"
            gifUrl="/danifon-text.gif"
            size="header"
            weight="black"
            compact
            fallbackColor="#0b63f6"
            className="tracking-[-0.04em]"
          />
        </Link>

        {/* Zone 2: 4 single-line text nav links */}
        <nav
          aria-label="ناوبری اصلی"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300"
        >
          <Link
            href="/"
            className={`whitespace-nowrap shrink-0 py-1.5 transition-colors border-b-2 ${
              !isInventory
                ? "text-blue-700 dark:text-blue-300 border-blue-600 dark:border-blue-400 font-semibold"
                : "border-transparent hover:text-[#0a1628] dark:hover:text-white hover:border-blue-200 dark:hover:border-blue-400/40"
            }`}
          >
            صفحه اصلی
          </Link>
          <Link
            href="/inventory"
            className={`whitespace-nowrap shrink-0 py-1.5 transition-colors border-b-2 ${
              isInventory
                ? "text-blue-700 dark:text-blue-300 border-blue-600 dark:border-blue-400 font-semibold"
                : "border-transparent hover:text-[#0a1628] dark:hover:text-white hover:border-blue-200 dark:hover:border-blue-400/40"
            }`}
          >
            موجودی آکبند
          </Link>
          <Link
            href="/?tab=waitlist#services"
            className="whitespace-nowrap shrink-0 py-1.5 border-b-2 border-transparent hover:text-[#0a1628] dark:hover:text-white hover:border-blue-200 dark:hover:border-blue-400/40 transition-colors"
          >
            خدمات و محاسبه‌گر
          </Link>
          <Link
            href="/#location"
            className="whitespace-nowrap shrink-0 py-1.5 border-b-2 border-transparent hover:text-[#0a1628] dark:hover:text-white hover:border-blue-200 dark:hover:border-blue-400/40 transition-colors"
          >
            آدرس فروشگاه
          </Link>
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center shrink-0">
          {isInventory ? (
            <HaloButton href="/?tab=waitlist#services" tone="blue" size="sm">
              <span>رزرو صف VIP</span>
              <ArrowUpLeft className="w-4 h-4" strokeWidth={2.2} />
            </HaloButton>
          ) : (
            <HaloButton href="/inventory" tone="blue" size="sm">
              <span>موجودی انبار</span>
              <ArrowUpLeft className="w-4 h-4" strokeWidth={2.2} />
            </HaloButton>
          )}
        </div>
      </div>
    </header>
  );
}
