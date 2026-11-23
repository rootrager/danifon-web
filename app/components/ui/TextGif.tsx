"use client";

import React, { useEffect, useMemo, useState, type CSSProperties } from "react";

export type TextGifSize =
  | "default"
  | "header"
  | "xxs"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "xxl"
  | "xll"
  | "xxxl";

export type TextGifWeight = "default" | "thin" | "base" | "semi" | "bold" | "black";
export type TextGifFont = "default" | "serif" | "mono" | "display";

export interface TextGifProps {
  gifUrl?: string;
  text: string;
  size?: TextGifSize;
  weight?: TextGifWeight;
  font?: TextGifFont;
  className?: string;
  fallbackColor?: string;
  transitionDuration?: number;
  compact?: boolean;
}

export const CULT_TEXT_GIF_DEFAULT = "/danifon-text.gif";

const SIZE_CLASSES: Record<TextGifSize, string> = {
  default: "text-2xl sm:text-3xl lg:text-4xl",
  header: "text-[27px] sm:text-[31px]",
  xxs: "text-base sm:text-lg lg:text-lg",
  xs: "text-lg sm:text-xl lg:text-2xl",
  sm: "text-xl sm:text-2xl lg:text-3xl",
  md: "text-2xl sm:text-3xl lg:text-4xl",
  lg: "text-3xl sm:text-4xl lg:text-5xl",
  xl: "text-4xl sm:text-5xl lg:text-6xl",
  xxl: "text-[2.5rem] sm:text-6xl lg:text-[6rem]",
  xll: "text-5xl sm:text-6xl lg:text-[7rem]",
  xxxl: "text-[6rem] leading-5 sm:text-6xl lg:text-[8rem] lg:leading-8",
};

const WEIGHT_CLASSES: Record<TextGifWeight, string> = {
  default: "font-bold",
  thin: "font-thin",
  base: "font-normal",
  semi: "font-semibold",
  bold: "font-bold",
  black: "font-black",
};

const FONT_CLASSES: Record<TextGifFont, string> = {
  default: "font-sans",
  serif: "font-serif",
  mono: "font-mono",
  display: "font-display",
};

export const TextGif = React.memo(function TextGifComponent({
  gifUrl = CULT_TEXT_GIF_DEFAULT,
  text,
  size = "default",
  weight = "black",
  font = "default",
  className = "",
  fallbackColor = "#0b63f6",
  transitionDuration = 280,
  compact = false,
}: TextGifProps) {
  const [loadedUrl, setLoadedUrl] = useState<string | null>(null);
  const [failedUrl, setFailedUrl] = useState<string | null>(null);

  const loaded = loadedUrl === gifUrl;
  const error = failedUrl === gifUrl;

  useEffect(() => {
    if (!gifUrl || typeof window === "undefined") return;
    let active = true;
    const img = new window.Image();

    const markLoaded = () => {
      if (active) {
        setLoadedUrl(gifUrl);
        setFailedUrl(null);
      }
    };

    const markError = () => {
      if (active) {
        setFailedUrl(gifUrl);
      }
    };

    img.onload = markLoaded;
    img.onerror = markError;
    img.src = gifUrl;

    let rafId: number | undefined;
    if (img.complete && img.naturalWidth > 0) {
      rafId = window.requestAnimationFrame(markLoaded);
    }

    return () => {
      active = false;
      if (rafId !== undefined) window.cancelAnimationFrame(rafId);
    };
  }, [gifUrl]);

  const textClassName = useMemo(() => {
    const isClipped = loaded && !error;
    return [
      "inline-block select-none leading-none",
      SIZE_CLASSES[size],
      WEIGHT_CLASSES[weight],
      FONT_CLASSES[font],
      isClipped
        ? "bg-clip-text text-transparent brightness-[0.8] contrast-[1.22] saturate-[1.2] drop-shadow-[0_1px_1px_rgba(10,22,40,0.16)] dark:brightness-110 dark:contrast-105 dark:drop-shadow-[0_0_12px_rgba(59,130,246,0.35)]"
        : "",
      compact ? "py-0.5" : "pb-1.5 md:pb-4",
      className,
    ]
      .filter(Boolean)
      .join(" ");
  }, [size, weight, font, className, loaded, error, compact]);

  const textStyle = useMemo(() => {
    const style: CSSProperties = {
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      lineHeight: 1,
      textAlign: "center",
      color: fallbackColor,
      WebkitTextFillColor: fallbackColor,
      transition: `background-image ${transitionDuration}ms ease-in-out, color ${transitionDuration}ms ease-in-out`,
    };

    if (loaded && !error) {
      style.backgroundImage = `url(${gifUrl})`;
      style.color = "transparent";
      style.WebkitTextFillColor = "transparent";
    }

    return style;
  }, [loaded, error, gifUrl, transitionDuration, fallbackColor]);

  return (
    <span className="relative inline-flex items-center">
      <span className={textClassName} style={textStyle}>
        {text}
      </span>
    </span>
  );
});

export default TextGif;
