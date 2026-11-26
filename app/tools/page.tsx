import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Calculators from "../components/Calculators";
import BottomNav from "../components/BottomNav";

export default function ToolsPage() {
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
        <h1 className="text-sm font-black">محاسبه‌گر اقساط و رجیستری</h1>
        <span className="w-10" />
      </header>

      <main className="max-w-md mx-auto px-4 pt-2">
        <Calculators />
      </main>

      <BottomNav />
    </div>
  );
}
