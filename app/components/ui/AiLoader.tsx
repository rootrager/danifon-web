"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function AiLoader() {
  const [elapsedMs, setElapsedMs] = useState(0);

  useEffect(() => {
    const started = Date.now();
    const timer = setInterval(() => {
      setElapsedMs(Date.now() - started);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const cells = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="flex items-center justify-between gap-3 bg-[#FAF6EE] rounded-2xl px-3.5 py-2.5 border border-[#141413]/15">
      <div className="flex items-center gap-2.5">
        {/* 3x3 Synchronized Pixel Grid */}
        <div className="grid grid-cols-3 gap-0.5 w-4 h-4 shrink-0" aria-hidden="true">
          {cells.map((i) => (
            <motion.span
              key={i}
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.85, 1, 0.85] }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                delay: (i % 3) * 0.14 + Math.floor(i / 3) * 0.1,
              }}
              className="w-1 h-1 rounded-[1px] bg-[#FF7A18] block"
            />
          ))}
        </div>

        {/* Sweep Progress Bar */}
        <div className="space-y-1">
          <span className="text-[11px] font-black text-[#141413] block">
            در حال پردازش بازار زنده...
          </span>
          <div className="w-28 h-1 rounded-full bg-[#141413]/10 overflow-hidden">
            <motion.div
              animate={{ x: ["100%", "-100%"] }}
              transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }}
              className="w-1/2 h-full rounded-full bg-gradient-to-r from-[#FBBF24] to-[#FF7A18]"
            />
          </div>
        </div>
      </div>

      {/* Live Elapsed Timer */}
      <span className="text-[11px] font-bold text-[#141413]/65 tabular-nums" dir="ltr">
        {(elapsedMs / 1000).toFixed(1)}s
      </span>
    </div>
  );
}
