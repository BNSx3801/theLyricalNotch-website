"use client";

import { setDemoMuted, useDemoMuted } from "@/lib/demoSound";

// Label reads the current state: the demo starts muted (the only way autoplay is allowed),
// so the page loads with "Sound Off" and flips to "Sound On" once the user unmutes.
export function SoundToggle() {
  const muted = useDemoMuted();
  return (
    <button
      type="button"
      aria-pressed={!muted}
      onClick={() => setDemoMuted(!muted)}
      className={`link-underline cursor-pointer ${muted ? "text-ink-muted" : "text-ink"}`}
    >
      {muted ? "Sound Off" : "Sound On"}
    </button>
  );
}
