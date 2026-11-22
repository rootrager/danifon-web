"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import MetalButton from "./ui/MetalButton";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="group"
      aria-label="تغییر حالت نمایش روز و شب"
      className={`inline-flex items-center gap-1.5 shrink-0 ${className}`}
    >
      <MetalButton
        size="xs"
        preset={theme === "light" ? "chromatic" : "silver"}
        active={theme === "light"}
        onClick={() => setTheme("light")}
        ariaPressed={theme === "light"}
      >
        <Sun className={`w-3.5 h-3.5 shrink-0 ${theme === "light" ? "text-white" : "text-blue-600 dark:text-blue-400"}`} />
        <span>حالت روز</span>
      </MetalButton>

      <MetalButton
        size="xs"
        preset={theme === "dark" ? "chromatic" : "silver"}
        active={theme === "dark"}
        onClick={() => setTheme("dark")}
        ariaPressed={theme === "dark"}
      >
        <Moon className={`w-3.5 h-3.5 shrink-0 ${theme === "dark" ? "text-blue-100" : "text-slate-500 dark:text-blue-300"}`} />
        <span>حالت شب</span>
      </MetalButton>
    </div>
  );
}
