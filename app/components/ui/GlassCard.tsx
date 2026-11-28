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
      className={`relative overflow-hidden rounded-3xl bg-white/35 backdrop-blur-2xl border border-white/90 shadow-[0_10px_30px_rgba(20,20,19,0.08),inset_0_1px_1px_rgba(255,255,255,0.95)] ${className}`}
    >
      {/* Top-right glossy glass reflection */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full bg-white/70 blur-xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
