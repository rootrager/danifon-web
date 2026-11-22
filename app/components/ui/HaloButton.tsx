"use client";

import React from "react";
import Link from "next/link";

export type HaloTone = "blue" | "emerald" | "neutral";
export type HaloSize = "sm" | "md" | "lg";

interface BaseHaloProps {
  children: React.ReactNode;
  tone?: HaloTone;
  size?: HaloSize;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  innerClassName?: string;
  ariaLabel?: string;
  title?: string;
}

type HaloLinkProps = BaseHaloProps & {
  href: string;
  external?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  type?: never;
};

type HaloButtonElementProps = BaseHaloProps & {
  href?: undefined;
  external?: never;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export type HaloButtonProps = HaloLinkProps | HaloButtonElementProps;

const TONE_MAP: Record<
  HaloTone,
  {
    rim: string;
    glow: string;
    surface: string;
    disabledSurface: string;
  }
> = {
  blue: {
    rim: "halo-btn-blue",
    glow: "bg-blue-500/30 dark:bg-blue-400/35",
    surface:
      "bg-gradient-to-b from-[#1d6ff8] via-[#0f5ee8] to-[#0a4cc7] hover:from-[#2678ff] hover:to-[#0c56db] dark:from-[#2c7bff] dark:via-[#1c64ec] dark:to-[#124dc4] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.42),inset_0_-1px_0_rgba(0,0,0,0.22)]",
    disabledSurface:
      "bg-slate-200 dark:bg-slate-800/80 text-slate-400 dark:text-slate-500 shadow-none",
  },
  emerald: {
    rim: "halo-btn-emerald",
    glow: "bg-emerald-500/25 dark:bg-emerald-400/30",
    surface:
      "bg-gradient-to-b from-[#0ea572] via-[#059669] to-[#047857] hover:from-[#10b981] hover:to-[#05845f] dark:from-[#10b981] dark:via-[#059669] dark:to-[#047857] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.38),inset_0_-1px_0_rgba(0,0,0,0.22)]",
    disabledSurface:
      "bg-slate-200 dark:bg-slate-800/80 text-slate-400 dark:text-slate-500 shadow-none",
  },
  neutral: {
    rim: "halo-btn-neutral",
    glow: "bg-blue-500/15 dark:bg-blue-400/20",
    surface:
      "bg-white/95 hover:bg-white dark:bg-[#0e1526]/95 dark:hover:bg-[#131d35] text-[#0a1628] dark:text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]",
    disabledSurface:
      "bg-slate-100 dark:bg-slate-800/60 text-slate-400 dark:text-slate-500 shadow-none",
  },
};

const SIZE_MAP: Record<HaloSize, { outer: string; inner: string }> = {
  sm: {
    outer: "rounded-[13px]",
    inner: "min-h-[40px] px-3.5 py-2 text-xs sm:text-sm rounded-[11.5px] gap-1.5",
  },
  md: {
    outer: "rounded-[15px]",
    inner: "min-h-[48px] px-4 py-2.5 text-sm rounded-[13.5px] gap-2",
  },
  lg: {
    outer: "rounded-[18px]",
    inner: "min-h-[54px] px-5 py-3 text-sm sm:text-base rounded-[16.5px] gap-2.5",
  },
};

export function HaloButton(props: HaloButtonProps) {
  const {
    children,
    tone = "blue",
    size = "md",
    fullWidth = false,
    loading = false,
    disabled = false,
    className = "",
    innerClassName = "",
    ariaLabel,
    title,
  } = props;

  const isDisabled = disabled || loading;
  const styles = TONE_MAP[tone];
  const sizeStyles = SIZE_MAP[size];

  const outerClasses = [
    "group relative inline-flex p-[1.5px] transition-transform duration-150 select-none touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8fbff] dark:focus-visible:ring-offset-[#04060c]",
    sizeStyles.outer,
    fullWidth ? "w-full" : "shrink-0",
    isDisabled
      ? "bg-slate-200 dark:bg-slate-800 cursor-not-allowed opacity-75"
      : `${styles.rim} cursor-pointer active:scale-[0.98] shadow-[0_8px_22px_-6px_rgba(11,99,246,0.34)] dark:shadow-[0_10px_28px_-6px_rgba(37,99,235,0.42)]`,
    className,
  ].join(" ");

  const innerClasses = [
    "relative z-10 w-full flex items-center justify-center font-bold whitespace-nowrap transition-colors duration-150 overflow-hidden",
    sizeStyles.inner,
    isDisabled ? styles.disabledSurface : styles.surface,
    innerClassName,
  ].join(" ");

  const innerContent = (
    <>
      {!isDisabled && (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute -inset-1 -z-10 rounded-[inherit] blur-md opacity-45 group-hover:opacity-75 transition-opacity duration-200 ${styles.glow}`}
        />
      )}
      <span className={innerClasses}>
        {/* Frosted specular top sheen */}
        {!isDisabled && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"
          />
        )}
        {loading && (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
        )}
        <span className="relative z-10 inline-flex items-center justify-center gap-[inherit] w-full">
          {children}
        </span>
      </span>
    </>
  );

  if (props.href !== undefined) {
    const isInternal =
      !props.external &&
      (props.href.startsWith("/") || props.href.startsWith("#"));

    if (isInternal) {
      return (
        <Link
          href={props.href}
          onClick={props.onClick}
          className={outerClasses}
          aria-label={ariaLabel}
          title={title}
        >
          {innerContent}
        </Link>
      );
    }

    const isTelOrMail =
      props.href.startsWith("tel:") || props.href.startsWith("mailto:");

    return (
      <a
        href={props.href}
        onClick={props.onClick}
        target={isTelOrMail ? undefined : "_blank"}
        rel={isTelOrMail ? undefined : "noopener noreferrer"}
        className={outerClasses}
        aria-label={ariaLabel}
        title={title}
      >
        {innerContent}
      </a>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={isDisabled}
      className={outerClasses}
      aria-label={ariaLabel}
      title={title}
    >
      {innerContent}
    </button>
  );
}

export default HaloButton;
