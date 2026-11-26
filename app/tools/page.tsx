import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Calculators from "../components/Calculators";

export default function ToolsPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-[#F5F2EB] text-[#1C1917] pb-16">
      <div className="max-w-md mx-auto px-4 pt-5 space-y-5">
        <header className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#44403C] bg-[#FAF8F4] border border-[#E7E2D8] px-3.5 py-2 rounded-full"
          >
            <ArrowRight className="w-4 h-4" />
            بازگشت به خانه
          </Link>
          <h1 className="text-sm font-extrabold text-[#1C1917]">محاسبه‌گرهای دانیفون</h1>
        </header>

        <Calculators />
      </div>
    </div>
  );
}
