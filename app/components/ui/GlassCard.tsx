"use client";

import React from "react";
import { motion } from "motion/react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.18 }}
      className={`relative overflow-hidden rounded-3xl bg-white/55 backdrop-blur-xl border border-white/80 shadow-[0_8px_28px_rgba(20,20,19,0.07),inset_0_1px_0_rgba(255,255,255,0.85)] ${className}`}
    >
      {/* Subtle top-right glass sheen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 -right-10 h-24 w-24 rounded-full bg-white/50 blur-2xl"
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
