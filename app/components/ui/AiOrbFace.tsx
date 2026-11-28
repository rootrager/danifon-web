"use client";

import React from "react";
import { motion } from "motion/react";

interface AiOrbFaceProps {
  state: "idle" | "thinking" | "done";
}

export default function AiOrbFace({ state }: AiOrbFaceProps) {
  const isThinking = state === "thinking";
  const isDone = state === "done";

  return (
    <div className="relative flex items-center justify-center w-20 h-20 mx-auto">
      {/* Outer Glow */}
      <motion.div
        animate={{
          scale: isThinking ? [1, 1.18, 1] : [1, 1.06, 1],
          opacity: isThinking ? [0.45, 0.8, 0.45] : [0.3, 0.45, 0.3],
        }}
        transition={{ repeat: Infinity, duration: isThinking ? 1.2 : 3, ease: "easeInOut" }}
        className={`absolute inset-0 rounded-full blur-xl ${
          isDone
            ? "bg-emerald-400/50"
            : isThinking
              ? "bg-[#FF7A18]/65"
              : "bg-[#FBBF24]/50"
        }`}
      />

      {/* Orb Body */}
      <motion.div
        animate={{
          rotate: isThinking ? [0, 8, -8, 0] : 0,
          y: isThinking ? [-2, 2, -2] : [0, -3, 0],
        }}
        transition={{ repeat: Infinity, duration: isThinking ? 0.9 : 3.2, ease: "easeInOut" }}
        className={`relative w-16 h-16 rounded-full border-2 border-[#141413] shadow-[3px_3px_0px_#141413] flex flex-col items-center justify-center gap-1.5 overflow-hidden ${
          isDone
            ? "bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600"
            : "bg-gradient-to-br from-[#FBBF24] via-[#FF7A18] to-[#EA580C]"
        }`}
      >
        {/* Gloss highlight */}
        <div className="absolute top-1.5 right-2.5 w-5 h-2.5 rounded-full bg-white/45 rotate-[-25deg]" />

        {/* Eyes */}
        <div className="flex items-center gap-3 relative z-10">
          <motion.span
            animate={
              isThinking
                ? { scaleY: [1, 0.25, 1], x: [-1.5, 1.5, -1.5] }
                : { scaleY: [1, 1, 0.15, 1] }
            }
            transition={{
              repeat: Infinity,
              duration: isThinking ? 0.8 : 3.5,
              times: isThinking ? undefined : [0, 0.9, 0.95, 1],
            }}
            className="w-2.5 h-3 rounded-full bg-[#141413] block"
          />
          <motion.span
            animate={
              isThinking
                ? { scaleY: [1, 0.25, 1], x: [-1.5, 1.5, -1.5] }
                : { scaleY: [1, 1, 0.15, 1] }
            }
            transition={{
              repeat: Infinity,
              duration: isThinking ? 0.8 : 3.5,
              times: isThinking ? undefined : [0, 0.9, 0.95, 1],
            }}
            className="w-2.5 h-3 rounded-full bg-[#141413] block"
          />
        </div>

        {/* Mouth */}
        <motion.div
          animate={
            isThinking
              ? { width: [6, 12, 6], height: [6, 4, 6] }
              : isDone
                ? { width: 14, height: 7 }
                : { width: 10, height: 4 }
          }
          transition={{ repeat: isThinking ? Infinity : 0, duration: 0.7 }}
          className={`bg-[#141413] ${
            isDone ? "rounded-b-full" : "rounded-full"
          }`}
        />
      </motion.div>
    </div>
  );
}
