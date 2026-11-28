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
  const pixels = Array.from({ length: 16 }, (_, i) => i);

  return (
    <div className="relative flex items-center justify-center w-20 h-20 mx-auto">
      {/* Ambient Aura */}
      <motion.div
        animate={{
          scale: isThinking ? [1, 1.22, 1] : [1, 1.06, 1],
          opacity: isThinking ? [0.45, 0.85, 0.45] : [0.25, 0.4, 0.25],
        }}
        transition={{ repeat: Infinity, duration: isThinking ? 1.1 : 3, ease: "easeInOut" }}
        className={`absolute inset-1 rounded-full blur-xl ${
          isDone
            ? "bg-emerald-500/45"
            : isThinking
              ? "bg-[#FF7A18]/60"
              : "bg-[#FBBF24]/35"
        }`}
      />

      {/* Precision Rotating Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: isThinking ? 1.6 : 8,
          ease: "linear",
        }}
        className={`absolute inset-1 rounded-full p-[2px] ${
          isDone
            ? "bg-gradient-to-tr from-emerald-500 via-teal-300 to-transparent"
            : "bg-gradient-to-tr from-[#FF7A18] via-[#FBBF24] to-transparent"
        }`}
      >
        <div className="w-full h-full rounded-full bg-[#FAF6EE]" />
      </motion.div>

      {/* Dark Precision Core with Synchronized 4x4 Pixel Matrix */}
      <div className="relative w-14 h-14 rounded-full bg-[#141413] border border-white/15 shadow-inner flex items-center justify-center overflow-hidden">
        {isDone ? (
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 360, damping: 22 }}
            className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400"
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
          </motion.div>
        ) : (
          <div className="grid grid-cols-4 gap-1" aria-hidden="true">
            {pixels.map((i) => {
              const row = Math.floor(i / 4);
              const col = i % 4;
              return (
                <motion.span
                  key={i}
                  animate={{
                    opacity: isThinking ? [0.2, 1, 0.2] : [0.25, 0.7, 0.25],
                    scale: isThinking ? [0.8, 1.15, 0.8] : [0.9, 1, 0.9],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: isThinking ? 0.9 : 2.2,
                    delay: (row + col) * (isThinking ? 0.08 : 0.14),
                  }}
                  className={`w-1.5 h-1.5 rounded-[2px] block ${
                    (row + col) % 3 === 0 ? "bg-[#FF7A18]" : "bg-[#FAF6EE]"
                  }`}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
