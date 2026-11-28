"use client";

import React, { useEffect, useRef } from "react";

interface PixelFlowFieldProps {
  text?: string;
  className?: string;
  color?: string;
  accentColor?: string;
}

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  fill: string;
}

export default function PixelFlowField({
  text = "DANIFON",
  className = "",
  color = "#FAF6EE",
  accentColor = "#FF7A18",
}: PixelFlowFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let particles: Particle[] = [];
    let animId = 0;
    const pointer = { x: -9999, y: -9999, active: false };

    const initParticles = () => {
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(Math.floor(rect.width), 200);
      const height = Math.max(Math.floor(rect.height), 64);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Draw text offscreen on temporary canvas to sample pixel grid
      const off = document.createElement("canvas");
      off.width = width;
      off.height = height;
      const octx = off.getContext("2d");
      if (!octx) return;

      const fontSize = Math.min(Math.floor(height * 0.62), Math.floor(width / 5.2));
      octx.fillStyle = "#ffffff";
      octx.font = `900 ${fontSize}px Inter, system-ui, sans-serif`;
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.fillText(text, width / 2, height / 2 + 1);

      const img = octx.getImageData(0, 0, width, height).data;
      const gap = width < 360 ? 3 : 4;
      const next: Particle[] = [];

      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const alpha = img[(y * width + x) * 4 + 3];
          if (alpha > 110) {
            const isAccent = (x + y) % 7 === 0;
            next.push({
              x: prefersReduced ? x : x + (Math.random() - 0.5) * 16,
              y: prefersReduced ? y : y + (Math.random() - 0.5) * 16,
              originX: x,
              originY: y,
              vx: 0,
              vy: 0,
              size: gap === 3 ? 2.1 : 2.6,
              fill: isAccent ? accentColor : color,
            });
          }
        }
      }
      particles = next;
    };

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReduced && pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const distSq = dx * dx + dy * dy;
          const radius = 44;
          if (distSq < radius * radius && distSq > 0.01) {
            const dist = Math.sqrt(distSq);
            const force = (radius - dist) / radius;
            p.vx += (dx / dist) * force * 4.2;
            p.vy += (dy / dist) * force * 4.2;
          }
        }

        // Spring back to origin
        p.vx += (p.originX - p.x) * 0.14;
        p.vy += (p.originY - p.y) * 0.14;
        p.vx *= 0.78;
        p.vy *= 0.78;
        p.x += p.vx;
        p.y += p.vy;

        ctx.fillStyle = p.fill;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }

      if (!prefersReduced) {
        animId = requestAnimationFrame(render);
      }
    };

    initParticles();
    render();

    const ro = new ResizeObserver(() => {
      initParticles();
      if (prefersReduced) render();
    });
    ro.observe(canvas);

    const setPointer = (clientX: number, clientY: number) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = clientX - r.left;
      pointer.y = clientY - r.top;
      pointer.active = true;
    };

    const onMouseMove = (e: MouseEvent) => setPointer(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) setPointer(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onLeave = () => {
      pointer.active = false;
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("touchstart", onTouchMove, { passive: true });
    canvas.addEventListener("touchmove", onTouchMove, { passive: true });
    canvas.addEventListener("touchend", onLeave);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("touchstart", onTouchMove);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onLeave);
    };
  }, [text, color, accentColor]);

  return (
    <canvas
      ref={canvasRef}
      aria-label={text}
      className={`block touch-none select-none ${className}`}
    />
  );
}
