"use client";

import React, { useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { Pause, Play } from "lucide-react";
import MetalButton from "./ui/MetalButton";

export default function AmbientPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pathname = usePathname();
  const isInventory = pathname?.startsWith("/inventory");

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.22;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/danifon-ambient.mp3"
        loop
        preload="none"
        playsInline
      />

      <aside
        aria-label="کنترل موسیقی پس‌زمینه"
        className={`fixed left-3 sm:left-5 z-30 select-none transition-transform duration-200 ${
          isInventory ? "bottom-[84px] md:bottom-5" : "bottom-4 sm:bottom-5"
        }`}
      >
        <MetalButton
          size="sm"
          preset={isPlaying ? "chromatic" : "silver"}
          active={isPlaying}
          onClick={togglePlay}
          className="rounded-full"
          innerClassName="rounded-full px-3.5"
          title={isPlaying ? "توقف موزیک پس‌زمینه" : "پخش موزیک لایت"}
          ariaLabel={isPlaying ? "توقف موزیک پس‌زمینه" : "پخش موزیک لایت"}
          ariaPressed={isPlaying}
        >
          <span className="flex items-end gap-[2px] h-3.5 w-3.5 shrink-0 justify-center" aria-hidden="true">
            <span
              className={`w-[2px] rounded-full transition-colors ${
                isPlaying
                  ? "bg-white animate-eq-1 h-3"
                  : "bg-blue-500 dark:bg-blue-400 h-1"
              }`}
            />
            <span
              className={`w-[2px] rounded-full transition-colors ${
                isPlaying
                  ? "bg-sky-200 animate-eq-2 h-3.5"
                  : "bg-blue-500 dark:bg-blue-400 h-1.5"
              }`}
            />
            <span
              className={`w-[2px] rounded-full transition-colors ${
                isPlaying
                  ? "bg-white animate-eq-3 h-2.5"
                  : "bg-blue-500 dark:bg-blue-400 h-1"
              }`}
            />
            <span
              className={`w-[2px] rounded-full transition-colors ${
                isPlaying
                  ? "bg-sky-200 animate-eq-4 h-3"
                  : "bg-blue-500 dark:bg-blue-400 h-1.5"
              }`}
            />
          </span>

          <span className="text-xs font-medium whitespace-nowrap">
            {isPlaying ? "در حال پخش" : "موزیک لایت"}
          </span>

          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 shrink-0 opacity-90" />
          ) : (
            <Play className="w-3.5 h-3.5 shrink-0 opacity-80" />
          )}
        </MetalButton>
      </aside>
    </>
  );
}
