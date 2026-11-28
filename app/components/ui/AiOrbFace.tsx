"use client";

import React from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";

interface AiOrbFaceProps {
  state: "idle" | "thinking" | "done";
}

export default function AiOrbFace({ state }: AiOrbFaceProps) {
  const isThinking = state === "thinking";
  const isDone = state === "done";
  const pixels = Array.from({ length: 9 }, (_, i) => i);

  return (
    <div className="relative flex items-center justify-center w-24 h-24 mx-auto">
      {/* Soft Glow Behind Orb */}
      <motion.div
        animate={{
          scale: isThinking ? [1, 1.25, 1] : [1, 1.08, 1],
          opacity: isThinking ? [0.5, 0.9, 0.5] : [0.3, 0.5, 0.3],
        }}
        transition={{ repeat: Infinity, duration: isThinking ? 1.1 : 3, ease: "easeInOut" }}
        className={`absolute inset-2 rounded-full blur-xl ${
          isDone
            ? "bg-emerald-400/60"
            : isThinking
              ? "bg-[#FF7A18]/70"
              : "bg-[#FBBF24]/50"
        }`}
      />

      {/* Rotating Outer Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: isThinking ? 1.5 : 7,
          ease: "linear",
        }}
        className={`relative w-20 h-20 rounded-full p-[3px] shadow-lg ${
          isDone
            ? "bg-gradient-to-tr from-emerald-500 via-teal-300 to-emerald-600"
            : "bg-gradient-to-tr from-[#FF7A18] via-[#FBBF24] to-[#EA580C]"
        }`}
      >
        {/* Inner Precision Dark Core */}
        <div className="w-full h-full rounded-full bg-[#141413] flex items-center justify-center">
          {isDone ? (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 360, damping: 20 }}
              className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400"
            >
              <Check className="w-5 h-5 stroke-[2.5]" />
            </motion.div>
          ) : (
            <div className="grid grid-cols-3 gap-1.5" aria-hidden="true">
              {pixels.map((i) => {
                const row = Math.floor(i / 3);
                const col = i % 3;
                return (
                  <motion.span
                    key={i}
                    animate={{
                      opacity: isThinking ? [0.25, 1, 0.25] : [0.35, 0.85, 0.35],
                      scale: isThinking ? [0.8, 1.2, 0.8] : [0.9, 1.05, 0.9],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: isThinking ? 0.8 : 2,
                      delay: (row + col) * (isThinking ? 0.1 : 0.16),
                    }}
                    className={`w-2 h-2 rounded-[2px] block ${
                      (row + col) % 2 === 0 ? "bg-[#FF7A18]" : "bg-[#FAF6EE]"
                    }`}
                  />
                );
              })}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
