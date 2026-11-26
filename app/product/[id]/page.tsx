import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BatteryCharging,
  ShieldCheck,
  Cpu,
  Smartphone,
  CheckCircle2,
  Calculator,
  PhoneCall,
} from "lucide-react";
import inventoryData from "../../data/inventory.json";
import BottomNav from "../../components/BottomNav";

interface InventoryItem {
  item_id: string;
  type: string;
  series: string;
  model: string;
  capacity: string;
  part?: string;
  sim?: string;
  registry: string;
  battery: string;
  color?: string;
  price: string;
  condition?: string;
}

function cleanModelName(name: string): string {
  return name.replace(/\s*\([^)]*\)/g, "").trim();
}

function formatPriceFull(raw: string): string {
  const num = Number(raw);
  if (!Number.isFinite(num) || num <= 0) return "تماس بگیرید";
  return `${num.toLocaleString("fa-IR")} تومان`;
}

export function generateStaticParams() {
  return (inventoryData as InventoryItem[]).map((item) => ({
    id: item.item_id,
  }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const items = inventoryData as InventoryItem[];
  const item = items.find((i) => i.item_id === id);

  if (!item) {
    notFound();
  }

  const title = cleanModelName(item.model);

  return (
    <div dir="rtl" className="min-h-screen bg-[#FAF6EE] text-[#141413] pb-28">
      {/* Top App Bar */}
      <header className="max-w-md mx-auto px-4 pt-5 pb-3 flex items-center justify-between">
        <Link
          href="/"
          aria-label="بازگشت"
          className="w-10 h-10 rounded-full bg-white border border-[#141413]/15 flex items-center justify-center text-[#141413] active:scale-95 transition"
        >
          <ArrowRight className="w-4 h-4" />
        </Link>

        <span className="text-xs font-extrabold tracking-tight">جزئیات دستگاه</span>

        <Link
          href="/tools"
          aria-label="محاسبه اقساط"
          className="w-10 h-10 rounded-full bg-[#FBBF24] border border-[#141413] flex items-center justify-center text-[#141413] active:scale-95 transition"
        >
          <Calculator className="w-4 h-4" />
        </Link>
      </header>

      <main className="max-w-md mx-auto px-4 space-y-5">
        {/* Product Showcase Image Card */}
        <div className="bg-white rounded-[32px] p-4 border-2 border-[#141413] shadow-[5px_5px_0px_#141413]">
          <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#FAF6EE]">
            <img
              src="/showcase-iphone-17-pro.jpeg"
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Title & Status Badges */}
        <div className="space-y-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#141413] text-white">
              {item.condition || (item.type === "new" ? "آکبند" : "کارکرده تمیز")}
            </span>
            <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#FBBF24] border border-[#141413] text-[#141413]">
              {item.capacity}
            </span>
            {item.color && (
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-white border border-[#141413]/20 text-[#141413]">
                {item.color}
              </span>
            )}
          </div>

          <h1
            className="text-2xl font-black text-[#141413]"
            style={{ fontFamily: "var(--font-english)" }}
            dir="ltr"
          >
            {title}
          </h1>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
            <CheckCircle2 className="w-4 h-4" />
            <span>تاییدشده توسط کارشناسی فنی دانیفون</span>
          </div>
        </div>

        {/* Technical Specs Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-white rounded-2xl p-3.5 border border-[#141413]/15 space-y-1">
            <div className="flex items-center gap-1.5 text-[11px] text-[#141413]/60">
              <BatteryCharging className="w-3.5 h-3.5 text-[#EA580C]" />
              <span>سلامت باتری</span>
            </div>
            <p className="text-sm font-black tabular-nums">{item.battery}</p>
          </div>

          <div className="bg-white rounded-2xl p-3.5 border border-[#141413]/15 space-y-1">
            <div className="flex items-center gap-1.5 text-[11px] text-[#141413]/60">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>وضعیت رجیستری</span>
            </div>
            <p className="text-xs font-black">{item.registry}</p>
          </div>

          <div className="bg-white rounded-2xl p-3.5 border border-[#141413]/15 space-y-1">
            <div className="flex items-center gap-1.5 text-[11px] text-[#141413]/60">
              <Cpu className="w-3.5 h-3.5 text-blue-600" />
              <span>پارت نامبر</span>
            </div>
            <p className="text-sm font-black" style={{ fontFamily: "var(--font-english)" }}>
              {item.part || "ZA/A"}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-3.5 border border-[#141413]/15 space-y-1">
            <div className="flex items-center gap-1.5 text-[11px] text-[#141413]/60">
              <Smartphone className="w-3.5 h-3.5 text-[#141413]" />
              <span>سیم‌کارت</span>
            </div>
            <p className="text-xs font-black">{item.sim || "دو سیم‌کارت"}</p>
          </div>
        </div>

        {/* Price & Direct Order Card */}
        <div className="bg-white rounded-3xl p-4 border-2 border-[#141413] flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] text-[#141413]/60 font-medium">قیمت فروش نقدی</p>
            <p className="text-base font-black text-[#141413] tabular-nums">
              {formatPriceFull(item.price)}
            </p>
          </div>

          <a
            href="tel:02100000000"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF7A18] to-[#EA580C] text-white px-5 py-3 rounded-full text-xs font-bold border border-[#141413] shadow-[3px_3px_0px_#141413] active:scale-95 transition"
          >
            <PhoneCall className="w-4 h-4" />
            رزرو و سفارش
          </a>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
