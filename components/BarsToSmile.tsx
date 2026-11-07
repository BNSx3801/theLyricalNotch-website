"use client";

import { useEffect, useId, useRef } from "react";

// Port of bars_to_smile.html: a seven-bar equalizer that morphs into a smiley and back.
// Timeline per loop (ms): equalizer 0–1800, morph in 1800–4800, hold 4800–6800, morph out 6800–9800.

const N = 7;
const CY = 70;
const XS = [40, 66.67, 93.33, 120, 146.67, 173.33, 200];
const WIDTH = 7;

const EQ_END = 1800;
const IN_END = 4800;
const HOLD_END = 6800;
const OUT_END = 9800;
const MORPH_MS = 3000;

type Bar = { x: number; y: number; len: number; ang: number; w: number };

// Smile: quadratic curve, same blue → orange sweep as the gradient.
const P0 = { x: 60, y: 80 };
const P1 = { x: 120, y: 130 };
const P2 = { x: 180, y: 80 };
function bez(t: number) {
  const u = 1 - t;
  return {
    x: u * u * P0.x + 2 * u * t * P1.x + t * t * P2.x,
    y: u * u * P0.y + 2 * u * t * P1.y + t * t * P2.y,
  };
}

// Final shape: bars 1 and 5 become the eyes, the other five form the smile arc.
const targets: Bar[] = new Array(N);
targets[1] = { x: 76, y: 48, len: 22, ang: Math.PI / 2, w: WIDTH };
targets[5] = { x: 164, y: 48, len: 22, ang: Math.PI / 2, w: WIDTH };
const arcBars = [0, 2, 3, 4, 6];
const T_START = 0.1;
const T_END = 0.9;
const step = (T_END - T_START) / arcBars.length;
arcBars.forEach((barIndex, k) => {
  const t0 = T_START + k * step;
  const t1 = t0 + step;
  const a = bez(t0);
  const b = bez(t1);
  const mid = bez((t0 + t1) / 2);
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  targets[barIndex] = {
    x: mid.x,
    y: mid.y,
    len: Math.hypot(dx, dy) + 3, // slight overlap so the segments join
    ang: Math.atan2(dy, dx),
    w: WIDTH,
  };
});

// Equalizer motion for each bar, driven by absolute time in seconds.
const FREQ = [1.7, 2.3, 1.9, 2.6, 2.1, 2.4, 1.8];
const PHASE = [0, 1.3, 2.1, 0.6, 1.9, 2.8, 0.9];
function eqState(i: number, sec: number): Bar {
  const h = 0.5 + 0.5 * Math.sin(2 * Math.PI * FREQ[i] * sec + PHASE[i]);
  return { x: XS[i], y: CY, len: 16 + 64 * h, ang: Math.PI / 2, w: WIDTH };
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Each bar starts a little after the previous one (stagger up to 15% of the morph).
function morphState(from: Bar, to: Bar, tp: number, i: number): Bar {
  const delay = 0.15 * (i / (N - 1));
  const p = Math.min(1, Math.max(0, (tp - delay) / (1 - 0.15)));
  const e = easeInOutCubic(p);
  return {
    x: from.x + (to.x - from.x) * e,
    y: from.y + (to.y - from.y) * e,
    len: from.len + (to.len - from.len) * e,
    ang: from.ang + (to.ang - from.ang) * e,
    w: from.w + (to.w - from.w) * e,
  };
}

function endpoints(s: Bar) {
  const cx = (Math.cos(s.ang) * s.len) / 2;
  const cy = (Math.sin(s.ang) * s.len) / 2;
  return {
    x1: (s.x - cx).toFixed(2),
    y1: (s.y - cy).toFixed(2),
    x2: (s.x + cx).toFixed(2),
    y2: (s.y + cy).toFixed(2),
    strokeWidth: s.w.toFixed(2),
  };
}

export function BarsToSmile({ className }: { className?: string }) {
  const id = useId();
  const gradId = `${id}grad`;
  const glowId = `${id}glow`;
  const lines = useRef<(SVGLineElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const draw = (i: number, s: Bar) => {
      const l = lines.current[i];
      if (!l) return;
      const e = endpoints(s);
      l.setAttribute("x1", e.x1);
      l.setAttribute("y1", e.y1);
      l.setAttribute("x2", e.x2);
      l.setAttribute("y2", e.y2);
      l.setAttribute("stroke-width", e.strokeWidth);
    };

    const start = performance.now();
    let lastPhase: string | null = null;
    let from: Bar[] = [];
    const cur: Bar[] = targets.map((t) => ({ ...t }));
    let raf = 0;

    const frame = (now: number) => {
      const c = (now - start) % OUT_END;
      const sec = now / 1000;
      let phase: "eq" | "in" | "hold" | "out";
      let tp = 0;

      if (c < EQ_END) {
        phase = "eq";
      } else if (c < IN_END) {
        phase = "in";
        tp = (c - EQ_END) / MORPH_MS;
      } else if (c < HOLD_END) {
        phase = "hold";
      } else {
        phase = "out";
        tp = (c - HOLD_END) / MORPH_MS;
      }

      if (phase !== lastPhase) {
        from = cur.map((s) => ({ ...s })); // snapshot where the bars are right now
        lastPhase = phase;
      }

      for (let i = 0; i < N; i++) {
        let s: Bar;
        if (phase === "eq") s = eqState(i, sec);
        else if (phase === "in") s = morphState(from[i], targets[i], Math.min(tp, 1), i);
        else if (phase === "hold") s = targets[i];
        else s = morphState(from[i], eqState(i, sec), Math.min(tp, 1), i);
        cur[i] = s;
        draw(i, s);
      }

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <svg
      viewBox="0 0 240 140"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="The Lyrical Notch: an equalizer that turns into a smile"
      className={className}
    >
      <defs>
        <linearGradient id={gradId} gradientUnits="userSpaceOnUse" x1="40" y1="0" x2="200" y2="0">
          <stop offset="0" stopColor="#38bdf8" />
          <stop offset="0.45" stopColor="#8b5cf6" />
          <stop offset="0.75" stopColor="#ec4899" />
          <stop offset="1" stopColor="#fb923c" />
        </linearGradient>
        <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter={`url(#${glowId})`} stroke={`url(#${gradId})`} strokeLinecap="round">
        {/* Server-rendered as the held smiley, so nothing flashes before hydration. */}
        {targets.map((t, i) => (
          <line
            key={i}
            ref={(el) => {
              lines.current[i] = el;
            }}
            {...endpoints(t)}
          />
        ))}
      </g>
    </svg>
  );
}
