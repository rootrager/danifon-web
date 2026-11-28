import { Suspense } from "react";
import { Metadata } from "next";
import InventoryClient from "./InventoryClient";

export const metadata: Metadata = {
  title: "موجودی آیفون‌های آکبند | Danifon",
  description: "لیست کامل آیفون‌های آکبند و پلمپ اصلی آماده تحویل فوری دانیفون",
};

export const revalidate = 30;

export interface InventoryItem {
  item_id: string;
  type: string;
  series: string | null;
  model: string | null;
  capacity: string | null;
  part: string | null;
  sim: string | null;
  registry: string | null;
  battery: string | null;
  color?: string | null;
  price: string | null;
  condition: string | null;
  photo_id: string | null;
}

export default async function InventoryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF6EE]" />}>
      <InventoryClient />
    </Suspense>
  );
}
