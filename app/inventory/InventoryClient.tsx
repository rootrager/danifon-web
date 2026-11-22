"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  X,
  SlidersHorizontal,
  ArrowUpDown,
  Send,
  MessageCircle,
  Target,
  Smartphone,
  RotateCcw,
  LayoutGrid,
  Table2,
  ArrowLeft,
  PhoneCall,
} from "lucide-react";
import type { InventoryItem } from "./page";
import config from "../../config.json";
import TopNav from "../components/TopNav";
import ThemeToggle from "../components/ThemeToggle";
import HaloButton from "../components/ui/HaloButton";
import MetalButton, { MetalIconButton } from "../components/ui/MetalButton";
import InventoryCard from "./components/InventoryCard";
import TechnicalInspectionSheet from "./components/TechnicalInspectionSheet";
import {
  parseModelAndColor,
  getColorMeta,
  getPartCountry,
  getActivationMeta,
  getRegistryMeta,
  formatPrice,
  formatMillionHelper,
  capacityRank,
} from "./components/inventoryHelpers";

export default function InventoryClient({
  items,
}: {
  items: InventoryItem[];
  fetchedAt?: string;
}) {
  const [registryFilter, setRegistryFilter] = useState<"all" | "with-reg" | "no-reg">("all");
  const [selectedSeriesFilter, setSelectedSeriesFilter] = useState<string>("all");
  const [selectedModelFilter, setSelectedModelFilter] = useState<string>("all");
  const [selectedCapacityFilter, setSelectedCapacityFilter] = useState<string>("all");
  const [selectedColorFilter, setSelectedColorFilter] = useState<string>("all");
  const [activationFilter, setActivationFilter] = useState<"all" | "not-active" | "active">("all");
  const [sortOption, setSortOption] = useState<"default" | "price-asc" | "price-desc">("default");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileAdvanced, setShowMobileAdvanced] = useState(false);
  const [inspectedItem, setInspectedItem] = useState<InventoryItem | null>(null);
  const [heroImgError, setHeroImgError] = useState(false);

  const registryCounts = useMemo(() => {
    let withReg = 0;
    let noReg = 0;
    items.forEach((item) => {
      if (getRegistryMeta(item.registry).isRegistered) withReg++;
      else noReg++;
    });
    return { withReg, noReg };
  }, [items]);

  const availableModels = useMemo(() => {
    const map = new Map<string, number>();
    items.forEach((item) => {
      if (selectedSeriesFilter !== "all" && item.series !== selectedSeriesFilter) return;
      if (registryFilter !== "all") {
        const isReg = getRegistryMeta(item.registry).isRegistered;
        if (registryFilter === "with-reg" && !isReg) return;
        if (registryFilter === "no-reg" && isReg) return;
      }
      const { modelName } = parseModelAndColor(item.model, item.color);
      map.set(modelName, (map.get(modelName) || 0) + 1);
    });
    return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
  }, [items, selectedSeriesFilter, registryFilter]);

  const availableCapacities = useMemo(() => {
    const set = new Set<string>();
    items.forEach((item) => {
      if (item.capacity) set.add(item.capacity);
    });
    return Array.from(set).sort((a, b) => capacityRank(a) - capacityRank(b));
  }, [items]);

  const availableColors = useMemo(() => {
    const map = new Map<string, { compactName: string; hex: string }>();
    items.forEach((item) => {
      const { modelName, extractedColor } = parseModelAndColor(item.model, item.color);
      const meta = getColorMeta(extractedColor, modelName);
      if (!map.has(meta.shortName)) {
        map.set(meta.shortName, {
          compactName: meta.compactName,
          hex: meta.hex,
        });
      }
    });
    return Array.from(map.entries()).map(([name, data]) => ({
      name,
      compactName: data.compactName,
      hex: data.hex,
    }));
  }, [items]);

  const filteredItems = useMemo(() => {
    let result = [...items];

    if (registryFilter !== "all") {
      result = result.filter((i) => {
        const isReg = getRegistryMeta(i.registry).isRegistered;
        return registryFilter === "with-reg" ? isReg : !isReg;
      });
    }

    if (selectedSeriesFilter !== "all") {
      result = result.filter((i) => i.series === selectedSeriesFilter);
    }

    if (selectedModelFilter !== "all") {
      result = result.filter(
        (i) => parseModelAndColor(i.model, i.color).modelName === selectedModelFilter
      );
    }

    if (selectedCapacityFilter !== "all") {
      result = result.filter((i) => i.capacity === selectedCapacityFilter);
    }

    if (selectedColorFilter !== "all") {
      result = result.filter((i) => {
        const { modelName, extractedColor } = parseModelAndColor(i.model, i.color);
        return getColorMeta(extractedColor, modelName).shortName === selectedColorFilter;
      });
    }

    if (activationFilter !== "all") {
      result = result.filter((i) => {
        const meta = getActivationMeta(i.condition);
        return activationFilter === "not-active" ? meta.isNotActive : !meta.isNotActive;
      });
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((i) => {
        const c = (i.color ?? "").toLowerCase();
        const enColorAlias =
          c.includes("آلبالویی") || c.includes("زرشکی")
            ? "burgundy crimson red"
            : c.includes("آبی")
            ? "blue glacier"
            : c.includes("سفید")
            ? "silver white"
            : c.includes("مشکی")
            ? "black blk"
            : c.includes("نارنجی")
            ? "orange"
            : c.includes("بنفش")
            ? "purple perpul"
            : c.includes("سبز")
            ? "sage green"
            : "";
        const text = `${i.model ?? ""} ${i.capacity ?? ""} ${i.part ?? ""} ${i.color ?? ""} ${enColorAlias} ${i.condition ?? ""} ${i.registry ?? ""}`.toLowerCase();
        return text.includes(q);
      });
    }

    if (sortOption !== "default") {
      result.sort((a, b) => {
        const priceA = formatPrice(a.price).rawNum;
        const priceB = formatPrice(b.price).rawNum;
        return sortOption === "price-asc" ? priceA - priceB : priceB - priceA;
      });
    }

    return result;
  }, [
    items,
    registryFilter,
    selectedSeriesFilter,
    selectedModelFilter,
    selectedCapacityFilter,
    selectedColorFilter,
    activationFilter,
    searchQuery,
    sortOption,
  ]);

  const groupedByModel = useMemo(() => {
    const groups = new Map<
      string,
      {
        modelName: string;
        items: InventoryItem[];
        minPrice: number;
        previewPhotos: string[];
      }
    >();

    filteredItems.forEach((item) => {
      const { modelName, extractedColor } = parseModelAndColor(item.model, item.color);
      const { imageSrc } = getColorMeta(extractedColor, modelName);
      const priceNum = formatPrice(item.price).rawNum;
      const existing = groups.get(modelName);
      if (!existing) {
        groups.set(modelName, {
          modelName,
          items: [item],
          minPrice: priceNum > 0 ? priceNum : Infinity,
          previewPhotos: [imageSrc],
        });
      } else {
        existing.items.push(item);
        if (priceNum > 0 && priceNum < existing.minPrice) {
          existing.minPrice = priceNum;
        }
        if (!existing.previewPhotos.includes(imageSrc) && existing.previewPhotos.length < 4) {
          existing.previewPhotos.push(imageSrc);
        }
      }
    });

    return Array.from(groups.values());
  }, [filteredItems]);

  const advancedFilterCount =
    (selectedModelFilter !== "all" ? 1 : 0) +
    (selectedCapacityFilter !== "all" ? 1 : 0) +
    (selectedColorFilter !== "all" ? 1 : 0) +
    (activationFilter !== "all" ? 1 : 0);

  const hasActiveFilters =
    registryFilter !== "all" ||
    selectedSeriesFilter !== "all" ||
    advancedFilterCount > 0 ||
    searchQuery.trim() !== "";

  const resetAllFilters = () => {
    setRegistryFilter("all");
    setSelectedSeriesFilter("all");
    setSelectedModelFilter("all");
    setSelectedCapacityFilter("all");
    setSelectedColorFilter("all");
    setActivationFilter("all");
    setSearchQuery("");
  };

  return (
    <div className="flex flex-col min-h-dvh w-full" dir="rtl">
      <TopNav />

      <div className="w-full px-4 sm:px-6 lg:px-8 pt-5 pb-28 md:pb-14 flex flex-col gap-6 flex-1">
        {/* TOP UTILITY STRIP */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-blue-100 dark:border-blue-400/15">
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            <span className="font-semibold text-[#0a1628] dark:text-white">فروشگاه دانیفون</span>
            <span aria-hidden="true">·</span>
            <span className="text-blue-700 dark:text-blue-300 font-semibold tabular-nums">
              {items.length} دستگاه پلمپ آماده تحویل
            </span>
            <span aria-hidden="true">·</span>
            <span>۱۰ روز مهلت تست کتبی</span>
          </div>

          <div className="flex items-center gap-2.5">
            <MetalButton
              href={config.contact.phoneUrl}
              preset="silver"
              size="xs"
              className="hidden sm:inline-flex"
            >
              <PhoneCall className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
              <span className="tabular-nums">{config.contact.phone}</span>
            </MetalButton>
            <ThemeToggle />
          </div>
        </div>

        {/* Header & Banner Split */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-center gap-2.5">
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl text-[#0a1628] dark:text-white leading-tight text-balance">
              لیست قیمت و موجودی آیفون‌های آکبند
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              تمامی گوشی‌ها پلمپ اصلی شرکت اپل هستند. روی هر گوشی بزنید تا مشخصات فنی به زبان ساده و شماره تماس مستقیم را ببینید.
            </p>
          </div>

          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-blue-100 dark:border-blue-400/20 bg-slate-100 dark:bg-[#0b101d] aspect-[21/9] lg:aspect-[16/7] flex items-center justify-center">
            {!heroImgError ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src="/models/hero-4colors-framed.jpg"
                alt="رنگ‌بندی آیفون‌های سری ۱۸ در فروشگاه دانیفون"
                referrerPolicy="no-referrer"
                onError={() => setHeroImgError(true)}
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <Smartphone className="w-8 h-8 text-slate-400" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#04060c]/85 via-[#04060c]/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-3 inset-x-4 flex items-center justify-between text-xs text-white">
              <span className="font-semibold">سری ۱۸، ۱۷ و ۱۶ پلمپ کارخانه</span>
              <span className="text-blue-300 font-semibold">تحویل فوری تهران</span>
            </div>
          </div>
        </section>

        {/* MOBILE-ONLY ABOVE-THE-FOLD FILTER BAR (< lg) */}
        <section
          aria-label="فیلترهای سریع موبایل"
          className="lg:hidden w-full p-3.5 rounded-2xl bg-white dark:bg-[#0b101d] border border-blue-100 dark:border-blue-400/18 flex flex-col gap-3"
        >
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                aria-label="جستجوی مدل، رنگ یا پارت‌نامبر"
                placeholder="جستجوی مدل یا رنگ (مثلاً 17، آبی)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full min-h-[46px] py-2 pr-10 pl-9 rounded-xl bg-blue-50/40 dark:bg-[#060913] border border-blue-200 dark:border-blue-400/20 focus:border-blue-600 text-sm text-[#0a1628] dark:text-white placeholder:text-slate-400 outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="w-8 h-8 flex items-center justify-center absolute left-1.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0a1628] dark:hover:text-white cursor-pointer"
                  aria-label="پاک کردن جستجو"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <MetalButton
              size="md"
              preset={showMobileAdvanced || advancedFilterCount > 0 ? "chromatic" : "silver"}
              active={showMobileAdvanced || advancedFilterCount > 0}
              onClick={() => setShowMobileAdvanced((prev) => !prev)}
              ariaExpanded={showMobileAdvanced}
              innerClassName="px-3.5 text-xs"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 shrink-0" />
              <span>فیلترها</span>
              {advancedFilterCount > 0 && (
                <span className="px-1.5 py-0.5 rounded bg-white text-blue-700 text-[11px] font-mono tabular-nums leading-none font-bold">
                  {advancedFilterCount}
                </span>
              )}
            </MetalButton>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
            {(
              [
                { id: "all", label: "همه" },
                { id: "18", label: "سری ۱۸" },
                { id: "17", label: "سری ۱۷" },
                { id: "16", label: "سری ۱۶" },
              ] as const
            ).map((s) => {
              const active = selectedSeriesFilter === s.id;
              return (
                <MetalButton
                  key={s.id}
                  size="xs"
                  active={active}
                  onClick={() => {
                    setSelectedSeriesFilter(active && s.id !== "all" ? "all" : s.id);
                    setSelectedModelFilter("all");
                  }}
                >
                  {s.label}
                </MetalButton>
              );
            })}

            <MetalButton
              size="xs"
              preset={sortOption !== "default" ? "chromatic" : "silver"}
              active={sortOption !== "default"}
              onClick={() =>
                setSortOption((prev) =>
                  prev === "default" ? "price-asc" : prev === "price-asc" ? "price-desc" : "default"
                )
              }
              className="mr-auto"
            >
              <ArrowUpDown className={`w-3.5 h-3.5 shrink-0 ${sortOption !== "default" ? "text-white" : "text-blue-600 dark:text-blue-400"}`} />
              <span>
                {sortOption === "default"
                  ? "پیشنهادی"
                  : sortOption === "price-asc"
                  ? "ارزان‌ترین"
                  : "گران‌ترین"}
              </span>
            </MetalButton>
          </div>

          <AnimatePresence initial={false}>
            {showMobileAdvanced && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="flex flex-col gap-3 pt-3 border-t border-blue-100 dark:border-blue-400/15">
                  <div className="grid grid-cols-3 gap-1.5">
                    <MetalButton
                      size="xs"
                      fullWidth
                      active={registryFilter === "all"}
                      onClick={() => setRegistryFilter("all")}
                    >
                      همه ({items.length})
                    </MetalButton>
                    <MetalButton
                      size="xs"
                      fullWidth
                      active={registryFilter === "with-reg"}
                      onClick={() =>
                        setRegistryFilter(registryFilter === "with-reg" ? "all" : "with-reg")
                      }
                    >
                      با رجیستر ({registryCounts.withReg})
                    </MetalButton>
                    <MetalButton
                      size="xs"
                      fullWidth
                      active={registryFilter === "no-reg"}
                      onClick={() =>
                        setRegistryFilter(registryFilter === "no-reg" ? "all" : "no-reg")
                      }
                    >
                      بدون رجیستر ({registryCounts.noReg})
                    </MetalButton>
                  </div>

                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
                    <MetalButton
                      size="xs"
                      active={selectedModelFilter === "all"}
                      onClick={() => setSelectedModelFilter("all")}
                    >
                      همه مدل‌ها
                    </MetalButton>
                    {availableModels.map((m) => (
                      <MetalButton
                        key={m.name}
                        size="xs"
                        dir="ltr"
                        active={selectedModelFilter === m.name}
                        onClick={() =>
                          setSelectedModelFilter(selectedModelFilter === m.name ? "all" : m.name)
                        }
                      >
                        {m.name} ({m.count})
                      </MetalButton>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    <MetalButton
                      size="xs"
                      active={selectedCapacityFilter === "all"}
                      onClick={() => setSelectedCapacityFilter("all")}
                    >
                      همه ظرفیت‌ها
                    </MetalButton>
                    {availableCapacities.map((cap) => (
                      <MetalButton
                        key={cap}
                        size="xs"
                        active={selectedCapacityFilter === cap}
                        onClick={() =>
                          setSelectedCapacityFilter(selectedCapacityFilter === cap ? "all" : cap)
                        }
                        innerClassName="font-mono"
                      >
                        {cap}
                      </MetalButton>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
                    <MetalButton
                      size="xs"
                      active={selectedColorFilter === "all"}
                      onClick={() => setSelectedColorFilter("all")}
                    >
                      همه رنگ‌ها
                    </MetalButton>
                    {availableColors.map((col) => (
                      <MetalButton
                        key={col.name}
                        size="xs"
                        active={selectedColorFilter === col.name}
                        onClick={() =>
                          setSelectedColorFilter(selectedColorFilter === col.name ? "all" : col.name)
                        }
                      >
                        <span
                          className="w-3 h-3 rounded-full border border-black/20 dark:border-white/40 shrink-0"
                          style={{ backgroundColor: col.hex }}
                        />
                        <span>{col.compactName}</span>
                      </MetalButton>
                    ))}
                  </div>

                  {hasActiveFilters && (
                    <MetalButton
                      size="sm"
                      preset="chromatic"
                      fullWidth
                      onClick={resetAllFilters}
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>پاک کردن همه فیلترها</span>
                    </MetalButton>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* DESKTOP SPLIT ARCHITECTURE */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Desktop Sticky Sidebar Filter Panel */}
          <aside
            aria-label="فیلترهای موجودی"
            className="hidden lg:flex flex-col gap-5 w-72 xl:w-80 shrink-0 sticky top-20 rounded-3xl bg-white dark:bg-[#0b101d] border border-blue-100 dark:border-blue-400/18 p-5 max-h-[calc(100dvh-6rem)] overflow-y-auto no-scrollbar"
          >
            <div className="flex items-center justify-between pb-3 border-b border-blue-100 dark:border-blue-400/15">
              <div className="flex items-center gap-2 text-sm font-bold text-[#0a1628] dark:text-white">
                <SlidersHorizontal className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>انتخاب سریع گوشی</span>
              </div>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="text-xs font-semibold text-blue-700 dark:text-blue-300 hover:underline cursor-pointer inline-flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>پاک کردن</span>
                </button>
              )}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                aria-label="جستجوی مدل، رنگ یا پارت‌نامبر"
                placeholder="جستجو (مثلاً 17، آبی، ZA/A)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full min-h-[44px] py-2 pr-10 pl-9 rounded-xl bg-blue-50/40 dark:bg-[#060913] border border-blue-200 dark:border-blue-400/20 focus:border-blue-600 text-sm text-[#0a1628] dark:text-white placeholder:text-slate-400 outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="w-8 h-8 flex items-center justify-center absolute left-1 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0a1628] dark:hover:text-white cursor-pointer"
                  aria-label="پاک کردن جستجو"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Registry */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">وضعیت رجیستری</span>
              <div className="flex flex-col gap-1.5">
                {[
                  {
                    id: "all" as const,
                    label: `همه دستگاه‌ها (${items.length})`,
                    hint: null,
                  },
                  {
                    id: "with-reg" as const,
                    label: `با رجیستری رسمی (${registryCounts.withReg})`,
                    hint: "آنتن دائمی آماده با کد همتا",
                  },
                  {
                    id: "no-reg" as const,
                    label: `بدون رجیستری (${registryCounts.noReg})`,
                    hint: "قیمت اقتصادی‌تر",
                  },
                ].map((opt) => (
                  <MetalButton
                    key={opt.id}
                    size="sm"
                    fullWidth
                    active={registryFilter === opt.id}
                    onClick={() => {
                      setRegistryFilter(opt.id);
                      setSelectedModelFilter("all");
                    }}
                    innerClassName="justify-start text-right py-2 px-3"
                  >
                    <span className="flex flex-col items-start gap-0.5 text-right w-full">
                      <span className="text-xs">{opt.label}</span>
                      {opt.hint && (
                        <span
                          className={`text-[11px] font-normal ${
                            registryFilter === opt.id
                              ? "text-blue-100"
                              : "text-slate-500 dark:text-slate-400"
                          }`}
                        >
                          {opt.hint}
                        </span>
                      )}
                    </span>
                  </MetalButton>
                ))}
              </div>
            </div>

            {/* Series */}
            <div className="flex flex-col gap-2 pt-3 border-t border-blue-100 dark:border-blue-400/15">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">سری آیفون</span>
              <div className="grid grid-cols-2 gap-1.5">
                {(
                  [
                    { id: "all", label: "همه سری‌ها" },
                    { id: "18", label: "سری ۱۸" },
                    { id: "17", label: "سری ۱۷" },
                    { id: "16", label: "سری ۱۶" },
                  ] as const
                ).map((s) => {
                  const active = selectedSeriesFilter === s.id;
                  return (
                    <MetalButton
                      key={s.id}
                      size="xs"
                      fullWidth
                      active={active}
                      onClick={() => {
                        setSelectedSeriesFilter(active && s.id !== "all" ? "all" : s.id);
                        setSelectedModelFilter("all");
                      }}
                    >
                      {s.label}
                    </MetalButton>
                  );
                })}
              </div>
            </div>

            {/* Models */}
            <div className="flex flex-col gap-2 pt-3 border-t border-blue-100 dark:border-blue-400/15">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">مدل دقیق</span>
              <div className="flex flex-col gap-1.5">
                <MetalButton
                  size="xs"
                  fullWidth
                  active={selectedModelFilter === "all"}
                  onClick={() => setSelectedModelFilter("all")}
                  innerClassName="justify-start px-3"
                >
                  همه مدل‌ها
                </MetalButton>
                {availableModels.map((m) => {
                  const active = selectedModelFilter === m.name;
                  return (
                    <MetalButton
                      key={m.name}
                      size="xs"
                      fullWidth
                      active={active}
                      onClick={() => setSelectedModelFilter(active ? "all" : m.name)}
                      innerClassName="justify-between px-3"
                    >
                      <span dir="ltr">{m.name}</span>
                      <span
                        className={`text-xs font-mono tabular-nums ${
                          active ? "text-blue-100" : "text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        {m.count}
                      </span>
                    </MetalButton>
                  );
                })}
              </div>
            </div>

            {/* Capacity */}
            <div className="flex flex-col gap-2 pt-3 border-t border-blue-100 dark:border-blue-400/15">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">ظرفیت حافظه</span>
              <div className="flex flex-wrap gap-1.5">
                {availableCapacities.map((cap) => {
                  const active = selectedCapacityFilter === cap;
                  return (
                    <MetalButton
                      key={cap}
                      size="xs"
                      active={active}
                      onClick={() => setSelectedCapacityFilter(active ? "all" : cap)}
                      innerClassName="font-mono"
                    >
                      {cap}
                    </MetalButton>
                  );
                })}
              </div>
            </div>

            {/* Colors */}
            <div className="flex flex-col gap-2 pt-3 border-t border-blue-100 dark:border-blue-400/15">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">رنگ بدنه</span>
              <div className="flex flex-wrap gap-1.5">
                {availableColors.map((col) => {
                  const active = selectedColorFilter === col.name;
                  return (
                    <MetalButton
                      key={col.name}
                      size="xs"
                      active={active}
                      onClick={() => setSelectedColorFilter(active ? "all" : col.name)}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-black/20 dark:border-white/40 shrink-0"
                        style={{ backgroundColor: col.hex }}
                      />
                      <span>{col.compactName}</span>
                    </MetalButton>
                  );
                })}
              </div>
            </div>

            {/* Activation Status */}
            <div className="flex flex-col gap-2 pt-3 border-t border-blue-100 dark:border-blue-400/15">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">وضعیت پلمپ</span>
              <div className="grid grid-cols-3 gap-1.5">
                {(
                  [
                    { id: "all", label: "همه" },
                    { id: "not-active", label: "نات‌اکتیو" },
                    { id: "active", label: "اکتیو" },
                  ] as const
                ).map((st) => (
                  <MetalButton
                    key={st.id}
                    size="xs"
                    fullWidth
                    active={activationFilter === st.id}
                    onClick={() => setActivationFilter(st.id)}
                  >
                    {st.label}
                  </MetalButton>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Catalog Area */}
          <div className="flex-1 min-w-0 w-full flex flex-col gap-4">
            {/* Desktop Toolbar */}
            <div className="hidden md:flex items-center justify-between gap-4 px-4 py-3 rounded-2xl bg-white dark:bg-[#0b101d] border border-blue-100 dark:border-blue-400/18">
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 tabular-nums">
                <span className="font-bold text-[#0a1628] dark:text-white">{filteredItems.length}</span>
                <span>کانفیگ موجود</span>
                <span className="text-slate-300 dark:text-slate-600" aria-hidden="true">·</span>
                <span>{groupedByModel.length} مدل آیفون</span>
              </div>

              <div className="flex items-center gap-2">
                <MetalButton
                  size="xs"
                  preset={sortOption !== "default" ? "chromatic" : "silver"}
                  active={sortOption !== "default"}
                  onClick={() =>
                    setSortOption((prev) =>
                      prev === "default" ? "price-asc" : prev === "price-asc" ? "price-desc" : "default"
                    )
                  }
                >
                  <ArrowUpDown className={`w-3.5 h-3.5 shrink-0 ${sortOption !== "default" ? "text-white" : "text-blue-600 dark:text-blue-400"}`} />
                  <span>
                    {sortOption === "default"
                      ? "مرتب‌سازی: پیشنهادی"
                      : sortOption === "price-asc"
                      ? "مرتب‌سازی: ارزان‌ترین"
                      : "مرتب‌سازی: گران‌ترین"}
                  </span>
                </MetalButton>

                <div className="flex items-center gap-1.5">
                  <MetalButton
                    size="xs"
                    preset={viewMode === "cards" ? "chromatic" : "silver"}
                    active={viewMode === "cards"}
                    onClick={() => setViewMode("cards")}
                    ariaLabel="نمای کارتی"
                  >
                    <LayoutGrid className="w-3.5 h-3.5 shrink-0" />
                    <span>کارتی</span>
                  </MetalButton>
                  <MetalButton
                    size="xs"
                    preset={viewMode === "table" ? "chromatic" : "silver"}
                    active={viewMode === "table"}
                    onClick={() => setViewMode("table")}
                    ariaLabel="نمای جدولی مقایسه‌ای"
                  >
                    <Table2 className="w-3.5 h-3.5 shrink-0" />
                    <span>جدولی</span>
                  </MetalButton>
                </div>
              </div>
            </div>

            {/* Empty State */}
            {groupedByModel.length === 0 ? (
              <div className="flex flex-col items-center text-center py-14 px-4 rounded-3xl bg-white dark:bg-[#0b101d] border border-blue-100 dark:border-blue-400/18 gap-3 animate-fadeIn">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-500/15 border border-blue-200 dark:border-blue-400/25 flex items-center justify-center text-blue-600 dark:text-blue-300">
                  <Search className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-[#0a1628] dark:text-white">
                  دستگاهی با این فیلتر یافت نشد
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
                  فیلترها را پاک کنید یا مدل دلخواه خود را در صف انتظار VIP ثبت کنید تا به محض موجود شدن با شما تماس بگیریم.
                </p>
                <div className="flex items-center gap-2.5 mt-2">
                  <HaloButton tone="blue" size="sm" onClick={resetAllFilters}>
                    نمایش کل موجودی
                  </HaloButton>
                  <MetalButton href="/?tab=waitlist#services" preset="silver" size="sm">
                    ثبت در صف VIP
                  </MetalButton>
                </div>
              </div>
            ) : (
              <>
                {viewMode === "table" && (
                  /* DESKTOP COMPARISON TABLE VIEW */
                  <div className="hidden md:block w-full rounded-3xl bg-white dark:bg-[#0b101d] border border-blue-100 dark:border-blue-400/18 overflow-hidden animate-fadeIn">
                    <div className="overflow-x-auto">
                      <table className="w-full text-right border-collapse">
                        <thead>
                          <tr className="border-b border-blue-100 dark:border-blue-400/15 text-xs font-bold text-slate-600 dark:text-slate-300 bg-blue-50/60 dark:bg-[#11192e]/70">
                            <th className="py-3.5 px-4">مدل و رنگ</th>
                            <th className="py-3.5 px-3">ظرفیت</th>
                            <th className="py-3.5 px-3">سفارش / پارت</th>
                            <th className="py-3.5 px-3">وضعیت پلمپ</th>
                            <th className="py-3.5 px-3">رجیستری</th>
                            <th className="py-3.5 px-3">قیمت نقدی</th>
                            <th className="py-3.5 px-4 text-left">اقدام</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-blue-100/70 dark:divide-blue-400/10 text-sm">
                          {filteredItems.map((item) => {
                            const { modelName, extractedColor } = parseModelAndColor(item.model, item.color);
                            const colorMeta = getColorMeta(extractedColor, modelName);
                            const partInfo = getPartCountry(item);
                            const actMeta = getActivationMeta(item.condition);
                            const regMeta = getRegistryMeta(item.registry);
                            const { formatted, millionHelper } = formatPrice(item.price);

                            return (
                              <tr
                                key={item.item_id}
                                onClick={() => setInspectedItem(item)}
                                className="hover:bg-blue-50/40 dark:hover:bg-[#11192e]/60 transition-colors cursor-pointer group"
                              >
                                <td className="py-3.5 px-4">
                                  <div className="flex items-center gap-3">
                                    <span
                                      className="w-3 h-3 rounded-full border border-black/15 dark:border-white/30 shrink-0"
                                      style={{ backgroundColor: colorMeta.hex }}
                                    />
                                    <div className="flex flex-col">
                                      <span className="font-bold text-[#0a1628] dark:text-white" dir="ltr">
                                        {modelName}
                                      </span>
                                      <span className="text-xs text-slate-500 dark:text-slate-400">
                                        {colorMeta.compactName}
                                      </span>
                                    </div>
                                  </div>
                                </td>
                                <td className="py-3.5 px-3 font-mono font-bold text-[#0a1628] dark:text-slate-200 tabular-nums">
                                  {item.capacity}
                                </td>
                                <td className="py-3.5 px-3 text-slate-700 dark:text-slate-300 text-xs">
                                  <span>{partInfo.flag} {partInfo.code}</span>
                                  <span className="block text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                                    {partInfo.plainSummary}
                                  </span>
                                </td>
                                <td className="py-3.5 px-3">
                                  <span className={actMeta.isNotActive ? "text-emerald-700 dark:text-emerald-300 font-semibold text-xs" : "text-blue-700 dark:text-blue-300 font-semibold text-xs"}>
                                    {actMeta.isNotActive ? "پلمپ کارخانه" : "پلمپ اکتیو"}
                                  </span>
                                </td>
                                <td className="py-3.5 px-3">
                                  <span className={regMeta.isRegistered ? "text-amber-700 dark:text-amber-300 font-semibold text-xs" : "text-slate-500 dark:text-slate-400 text-xs"}>
                                    {regMeta.shortLabel}
                                  </span>
                                </td>
                                <td className="py-3.5 px-3 whitespace-nowrap">
                                  <span className="font-extrabold text-[#0a1628] dark:text-white tabular-nums block">
                                    {formatted}
                                  </span>
                                  {millionHelper && (
                                    <span className="text-[11px] text-slate-500 dark:text-slate-400 tabular-nums">
                                      {millionHelper}
                                    </span>
                                  )}
                                </td>
                                <td className="py-3.5 px-4 text-left">
                                  <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">
                                    <span>بررسی و رزرو</span>
                                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* GROUPED CATALOG (always visible on mobile, and on desktop when cards mode is active) */}
                <div className={`flex flex-col gap-5 ${viewMode === "table" ? "md:hidden" : ""}`}>
                  {groupedByModel.map((group) => (
                    <article
                      key={group.modelName}
                      className="w-full rounded-3xl bg-white dark:bg-[#0b101d] border border-blue-100 dark:border-blue-400/18 p-4 sm:p-5 flex flex-col gap-4 animate-fadeIn"
                    >
                    <div className="flex items-center justify-between pb-3.5 border-b border-blue-100 dark:border-blue-400/15 gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="flex items-center -space-x-2 space-x-reverse shrink-0">
                          {group.previewPhotos.map((src, idx) => (
                            <div
                              key={src}
                              style={{ zIndex: 10 - idx }}
                              className="w-9 h-12 rounded-lg overflow-hidden border border-blue-100 dark:border-blue-400/25 bg-slate-50 dark:bg-[#060913] shrink-0"
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={src}
                                alt={group.modelName}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-col min-w-0">
                          <h2
                            className="text-lg sm:text-xl font-extrabold text-[#0a1628] dark:text-white tracking-tight truncate"
                            dir="ltr"
                          >
                            {group.modelName}
                          </h2>
                          <span className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                            {group.items.length} کانفیگ آماده تحویل
                          </span>
                        </div>
                      </div>

                      {group.minPrice < Infinity && (
                        <div className="flex flex-col items-end shrink-0">
                          <span className="text-xs text-slate-500 dark:text-slate-400">شروع قیمت از</span>
                          <span className="text-sm sm:text-base font-extrabold text-blue-700 dark:text-blue-300 tabular-nums">
                            {group.minPrice.toLocaleString("en-US")} تومان
                          </span>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 tabular-nums">
                            {formatMillionHelper(group.minPrice)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Mobile rows */}
                    <div className="flex flex-col gap-2.5 md:hidden">
                      {group.items.map((item) => (
                        <InventoryCard
                          key={item.item_id}
                          item={item}
                          variant="row"
                          onInspect={setInspectedItem}
                        />
                      ))}
                    </div>

                    {/* Desktop Studio Product Cards */}
                    <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                      {group.items.map((item) => (
                        <InventoryCard
                          key={item.item_id}
                          item={item}
                          variant="card"
                          onInspect={setInspectedItem}
                        />
                      ))}
                    </div>
                  </article>
                ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Quick-Help Bar (Mobile Only, <=15% viewport height) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden" dir="rtl">
        <div className="bg-white/95 dark:bg-[#04060c]/95 backdrop-blur-xl border-t border-blue-100 dark:border-blue-400/18 px-4 pt-2.5 pb-safe flex items-center justify-between gap-2 shadow-[0_-6px_24px_rgba(11,99,246,0.08)] dark:shadow-[0_-8px_28px_rgba(0,0,0,0.7)]">
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-[#0a1628] dark:text-white truncate">
              نیاز به راهنمایی دارید؟
            </span>
            <span className="text-[11px] text-blue-700 dark:text-blue-300 truncate font-medium">
              تماس مستقیم یا صف انتظار VIP
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <HaloButton href={config.contact.phoneUrl} tone="blue" size="sm">
              <PhoneCall className="w-3.5 h-3.5 shrink-0" />
              <span>تماس</span>
            </HaloButton>
            <MetalButton href="/?tab=waitlist#services" preset="silver" size="sm">
              <Target className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
              <span>صف VIP</span>
            </MetalButton>
            <MetalIconButton
              href={config.contact.telegramExpertUrl}
              preset="chromatic"
              ariaLabel="ارتباط با کارشناس تلگرام"
            >
              <Send className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            </MetalIconButton>
            <MetalIconButton
              href={config.contact.whatsappUrl}
              preset="silver"
              ariaLabel="ارتباط در واتساپ"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </MetalIconButton>
          </div>
        </div>
      </div>

      {/* Technical Inspection Modal / Sheet */}
      <AnimatePresence>
        {inspectedItem && (
          <TechnicalInspectionSheet
            key={inspectedItem.item_id}
            item={inspectedItem}
            onClose={() => setInspectedItem(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
