"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { useDemoMuted } from "@/lib/demoSound";
import { demo } from "@/lib/site";

export function DemoVideo({ className, style }: { className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLVideoElement>(null);
  const muted = useDemoMuted();

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = muted;
    // Autoplay is only honoured while muted. After hydration, and again after an unmute
    // (a user gesture), make sure the loop is actually running.
    video.play().catch(() => {
      /* blocked until the user interacts; the poster stays up */
    });
  }, [muted]);

  return (
    <video
      ref={ref}
      className={className}
      style={style}
      src={demo.src}
      poster={demo.poster}
      autoPlay
      muted
      loop
      playsInline
      aria-label="Demo of The Lyrical Notch showing synced lyrics inside the MacBook notch"
    />
  );
}
