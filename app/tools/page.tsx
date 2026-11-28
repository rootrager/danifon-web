import { Suspense } from "react";
import ToolsClient from "../components/ToolsClient";

export default function ToolsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8CFC8]" />}>
      <ToolsClient />
    </Suspense>
  );
}
