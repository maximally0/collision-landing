"use client";

// Pixel / CRT console skin components. Visual only — no copy or SEO text.
// Every <PixelSlot> is a reserved space that auto-renders the generated pixel
// art once you drop the file at public/assets/pixel/<id>.png. Until then it
// shows a dashed placeholder. Drop the file, refresh, done.

import { useEffect, useRef, useState } from "react";

export function PixelSlot({
  id,
  label,
  dark = false,
  className = "",
}: {
  id: string;
  label: string;
  dark?: boolean;
  className?: string;
}) {
  const [missing, setMissing] = useState(false);
  return (
    <div data-visual-slot={id} className={className}>
      {missing ? (
        <div className={`${dark ? "pixel-slot-dark" : "pixel-slot"} h-full w-full`}>
          <span className="px-2 text-center leading-tight">
            🞂 {label}
            <br />
            <span className="lowercase opacity-70">/assets/pixel/{id}.png</span>
          </span>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`/assets/pixel/${id}.png`}
          alt={label}
          loading="lazy"
          className="h-full w-full object-cover"
          onError={() => setMissing(true)}
        />
      )}
    </div>
  );
}

const SPARKS = [
  { top: "18%", left: "12%", delay: 0 },
  { top: "26%", left: "82%", delay: 0.6 },
  { top: "60%", left: "8%", delay: 1.2 },
  { top: "70%", left: "88%", delay: 0.3 },
  { top: "42%", left: "90%", delay: 1.7 },
  { top: "78%", left: "20%", delay: 0.9 },
];

export function PixelSparkles() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {SPARKS.map((s, i) => (
        <span
          key={i}
          className="pixel-sparkle"
          style={{ top: s.top, left: s.left, animationDelay: `${s.delay}s` }}
        />
      ))}
    </div>
  );
}

export function PixelHeroBackdrop() {
  const [imgMissing, setImgMissing] = useState(false);
  return (
    <div className="absolute inset-0" aria-hidden="true">
      {/* Full-bleed hero art — crisp, no canvas, no blur overlays */}
      {!imgMissing && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/assets/pixel/hero-pixel-backdrop.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setImgMissing(true)}
        />
      )}
      {/* readability scrims — darken only, no blur */}
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,7,15,0.88),rgba(5,7,15,0.12)_45%,rgba(5,7,15,0.32))]" />
      <PixelSparkles />
    </div>
  );
}

// 8-bit pixel "collision" glyph (a pixel star/spark) for the brand mark.
export function PixelMark({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      <rect x="7" y="0" width="2" height="4" fill="currentColor" />
      <rect x="7" y="12" width="2" height="4" fill="currentColor" />
      <rect x="0" y="7" width="4" height="2" fill="currentColor" />
      <rect x="12" y="7" width="4" height="2" fill="currentColor" />
      <rect x="7" y="7" width="2" height="2" fill="currentColor" />
      <rect x="4" y="3" width="2" height="2" fill="currentColor" />
      <rect x="10" y="3" width="2" height="2" fill="currentColor" />
      <rect x="4" y="11" width="2" height="2" fill="currentColor" />
      <rect x="10" y="11" width="2" height="2" fill="currentColor" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Tier-2 / Tier-3 animation components
// ─────────────────────────────────────────────────────────────

// Hero art that starts as giant pixels and un-pixelates to sharp (Codrops-style).
export function PixelatedReveal({
  src,
  className = "",
  onFail,
}: {
  src: string;
  className?: string;
  onFail?: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let cancelled = false;
    let raf = 0;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setFailed(true);
      onFail?.();
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const img = new Image();
    img.onerror = () => {
      if (!cancelled) {
        setFailed(true);
        onFail?.();
      }
    };
    img.onload = () => {
      const parent = canvas.parentElement;
      let step = reduce ? 1 : 96;
      const draw = () => {
        if (cancelled || !parent) return;
        const W = parent.clientWidth;
        const H = parent.clientHeight;
        if (W === 0 || H === 0) return;
        canvas.width = W;
        canvas.height = H;
        ctx.imageSmoothingEnabled = false;
        const sw = Math.max(1, Math.round(W / step));
        const sh = Math.max(1, Math.round(H / step));
        ctx.clearRect(0, 0, W, H);
        ctx.drawImage(img, 0, 0, sw, sh, 0, 0, W, H);
        if (step > 1) {
          step = Math.max(1, Math.round(step * 0.76));
          raf = requestAnimationFrame(draw);
        }
      };
      draw();
    };
    img.src = src;
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [src, onFail]);
  if (failed) return null;
  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}

// Terminal line that types itself out with a blinking cursor.
export function Typewriter({
  text,
  className = "",
  speed = 36,
  startDelay = 700,
}: {
  text: string;
  className?: string;
  speed?: number;
  startDelay?: number;
}) {
  const [out, setOut] = useState("");
  useEffect(() => {
    let i = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const t = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setOut(text.slice(0, i));
        if (i >= text.length && interval) clearInterval(interval);
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(t);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, startDelay]);
  return (
    <span className={`pixel-cursor ${className}`} aria-hidden="true">
      {out}
    </span>
  );
}

// Endless marquee ticker strip (aiwithremy-style). Seamless loop via -50%.
export function PixelMarquee({
  items,
  dark = true,
  className = "",
}: {
  items: string[];
  dark?: boolean;
  className?: string;
}) {
  const row = items.join("  ·  ");
  return (
    <div
      aria-hidden="true"
      className={`overflow-hidden whitespace-nowrap ${
        dark
          ? "border-y border-white/10 bg-[#05070f] text-white/55"
          : "border-y border-ink/10 bg-white text-ink/50"
      } ${className}`}
    >
      <div className="pixel-marquee flex w-max items-center py-2.5">
        <span className="px-6 font-mono text-[11px] font-medium uppercase tracking-[0.3em]">{row}</span>
        <span className="px-6 font-mono text-[11px] font-medium uppercase tracking-[0.3em]">{row}</span>
      </div>
    </div>
  );
}

// Pixel-square trail that follows the cursor on desktop.
export function PixelCursorTrail() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    const pts: { x: number; y: number; life: number }[] = [];
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      pts.push({ x: e.clientX, y: e.clientY, life: 1 });
      if (pts.length > 28) pts.shift();
    };
    window.addEventListener("mousemove", onMove);
    const tick = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.life -= 0.045;
        if (p.life <= 0) continue;
        const s = Math.max(2, 7 * p.life);
        ctx.fillStyle = `rgba(107, 140, 255, ${0.55 * p.life})`;
        ctx.fillRect(Math.round(p.x - s / 2), Math.round(p.y - s / 2), Math.round(s), Math.round(s));
      }
      raf = requestAnimationFrame(tick);
    };
    if (!reduce) raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden="true" />;
}

// Deep-space blue dust drifting toward the cursor — sits behind section content.
export function PixelParticles({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    const parts = Array.from({ length: 42 }, () => ({
      x: Math.random(),
      y: Math.random(),
      s: 1 + Math.random() * 2.5,
      a: 0.15 + Math.random() * 0.5,
      vx: (Math.random() - 0.5) * 0.00035,
      vy: (Math.random() - 0.5) * 0.00035,
    }));
    let mx = -1;
    let my = -1;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener("mousemove", onMove);
    const tick = () => {
      const r = canvas.getBoundingClientRect();
      const w = Math.max(1, r.width);
      const h = Math.max(1, r.height);
      if (canvas.width !== Math.round(w) || canvas.height !== Math.round(h)) {
        canvas.width = Math.round(w);
        canvas.height = Math.round(h);
      }
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
        if (mx >= 0) {
          const px = p.x * w;
          const py = p.y * h;
          const dx = mx - r.left - px;
          const dy = my - r.top - py;
          const d2 = dx * dx + dy * dy;
          if (d2 < 14400 && d2 > 4) {
            const d = Math.sqrt(d2);
            const f = (1 - d / 120) * 0.02;
            p.x += (dx / d) * f;
            p.y += (dy / d) * f;
          }
        }
        ctx.fillStyle = `rgba(140, 170, 255, ${p.a})`;
        ctx.fillRect(Math.round(p.x * w), Math.round(p.y * h), p.s, p.s);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <canvas ref={ref} className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden="true" />;
}
