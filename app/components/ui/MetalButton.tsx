"use client";

import React from "react";
import Link from "next/link";

export type MetalPreset = "silver" | "chromatic" | "gold" | "cobalt";
export type MetalSize = "xs" | "sm" | "md" | "lg";

interface BaseMetalProps {
  children: React.ReactNode;
  preset?: MetalPreset;
  size?: MetalSize;
  active?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  innerClassName?: string;
  ariaLabel?: string;
  ariaPressed?: boolean;
  ariaExpanded?: boolean;
  title?: string;
  dir?: "rtl" | "ltr";
}

type MetalLinkProps = BaseMetalProps & {
  href: string;
  external?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  type?: never;
};

type MetalButtonElementProps = BaseMetalProps & {
  href?: undefined;
  external?: never;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export type MetalButtonProps = MetalLinkProps | MetalButtonElementProps;

const PRESET_RIM: Record<MetalPreset, string> = {
  silver: "metal-rim-silver",
  chromatic: "metal-rim-chromatic",
  gold: "metal-rim-gold",
  cobalt: "metal-rim-cobalt",
};

const SIZE_STYLES: Record<MetalSize, { outer: string; inner: string }> = {
  xs: {
    outer: "rounded-[11px]",
    inner: "min-h-[34px] px-2.5 py-1 text-xs rounded-[9.5px] gap-1.5",
  },
  sm: {
    outer: "rounded-[13px]",
    inner: "min-h-[40px] px-3.5 py-1.5 text-xs sm:text-sm rounded-[11.5px] gap-1.5",
  },
  md: {
    outer: "rounded-[15px]",
    inner: "min-h-[46px] px-4 py-2 text-sm rounded-[13.5px] gap-2",
  },
  lg: {
    outer: "rounded-[18px]",
    inner: "min-h-[54px] px-5 py-3 text-sm sm:text-base rounded-[16.5px] gap-2",
  },
};

export function MetalButton(props: MetalButtonProps) {
  const {
    children,
    preset = "silver",
    size = "md",
    active = false,
    fullWidth = false,
    disabled = false,
    className = "",
    innerClassName = "",
    ariaLabel,
    ariaPressed,
    ariaExpanded,
    title,
    dir,
  } = props;

  const effectivePreset: MetalPreset = active && preset === "silver" ? "cobalt" : preset;
  const rimClass = PRESET_RIM[effectivePreset];
  const sizeClass = SIZE_STYLES[size];

  const outerClasses = [
    "group relative inline-flex p-[1.5px] transition-transform duration-150 select-none touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70 focus-visible:ring-offset-1 focus-visible:ring-offset-[#f8fbff] dark:focus-visible:ring-offset-[#04060c]",
    sizeClass.outer,
    fullWidth ? "w-full" : "shrink-0",
    disabled
      ? "bg-slate-200 dark:bg-slate-800 cursor-not-allowed opacity-60"
      : `${rimClass} metal-btn-interactive ${active ? "metal-btn-active shadow-[0_6px_18px_-6px_rgba(37,99,235,0.34)]" : "shadow-[0_2px_10px_-4px_rgba(15,23,42,0.16)] dark:shadow-[0_4px_14px_-4px_rgba(0,0,0,0.55)]"} cursor-pointer active:scale-[0.975]`,
    className,
  ].join(" ");

  const activeSurface =
    effectivePreset === "gold"
      ? "bg-gradient-to-b from-amber-500 via-amber-600 to-amber-700 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.38)]"
      : "bg-gradient-to-b from-[#1d6bf3] via-[#1359da] to-[#0d48bd] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.36)]";

  const idleSurface =
    "bg-gradient-to-b from-white via-[#f7faff] to-[#edf3fc] hover:from-white hover:to-[#e5effd] text-[#0a1628] shadow-[inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-1px_0_rgba(15,23,42,0.06)] dark:from-[#172036] dark:via-[#101729] dark:to-[#0b101d] dark:hover:from-[#1d2842] dark:hover:to-[#11192e] dark:text-slate-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.13),inset_0_-1px_0_rgba(0,0,0,0.45)]";

  const innerClasses = [
    "relative z-10 w-full flex items-center justify-center font-semibold whitespace-nowrap transition-colors duration-150 overflow-hidden",
    sizeClass.inner,
    active ? activeSurface : idleSurface,
    innerClassName,
  ].join(" ");

  const content = (
    <span className={innerClasses}>
      {/* Brushed metallic horizontal sheen */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b ${
          active
            ? "from-white/18 to-transparent"
            : "from-white/55 dark:from-white/[0.06] to-transparent"
        }`}
      />
      <span className="relative z-10 inline-flex items-center justify-center gap-[inherit] min-w-0">
        {children}
      </span>
    </span>
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
          dir={dir}
        >
          {content}
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
        dir={dir}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={disabled}
      className={outerClasses}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      aria-expanded={ariaExpanded}
      title={title}
      dir={dir}
    >
      {content}
    </button>
  );
}

interface MetalIconButtonBase {
  children: React.ReactNode;
  preset?: MetalPreset;
  active?: boolean;
  size?: "sm" | "md";
  className?: string;
  innerClassName?: string;
  ariaLabel: string;
  title?: string;
}

type MetalIconLinkProps = MetalIconButtonBase & {
  href: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  type?: never;
};

type MetalIconActionProps = MetalIconButtonBase & {
  href?: undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
};

export type MetalIconButtonProps = MetalIconLinkProps | MetalIconActionProps;

export function MetalIconButton(props: MetalIconButtonProps) {
  const {
    children,
    preset = "silver",
    active = false,
    size = "md",
    className = "",
    innerClassName = "",
    ariaLabel,
    title,
  } = props;

  const rimClass = PRESET_RIM[preset];
  const dim = size === "sm" ? "w-[38px] h-[38px]" : "w-[42px] h-[42px]";

  const outerClasses = [
    "group relative inline-flex p-[1.5px] rounded-full transition-transform duration-150 select-none shrink-0 touch-manipulation cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70",
    rimClass,
    "metal-btn-interactive",
    active ? "metal-btn-active" : "",
    dim,
    className,
  ].join(" ");

  const innerClasses = [
    "w-full h-full rounded-full flex items-center justify-center transition-colors duration-150",
    "bg-gradient-to-b from-white via-[#f7faff] to-[#eaf1fc] hover:from-white hover:to-[#e2ecfc] text-[#0a1628] shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] dark:from-[#19233a] dark:via-[#11182a] dark:to-[#0a101d] dark:hover:from-[#202d4a] dark:text-slate-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]",
    innerClassName,
  ].join(" ");

  const content = <span className={innerClasses}>{children}</span>;

  if (props.href !== undefined) {
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
        {content}
      </a>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      className={outerClasses}
      aria-label={ariaLabel}
      title={title}
    >
      {content}
    </button>
  );
}

export default MetalButton;
