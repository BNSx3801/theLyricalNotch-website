"use client";

import { setDemoMuted, useDemoMuted } from "@/lib/demoSound";
import { SpeakerIcon } from "./icons";
import { iconButton } from "./iconButton";

export function SoundToggle() {
  const muted = useDemoMuted();
  return (
    <button
      type="button"
      aria-pressed={!muted}
      aria-label={muted ? "Unmute the demo" : "Mute the demo"}
      onClick={() => setDemoMuted(!muted)}
      className={iconButton}
    >
      <SpeakerIcon muted={muted} className="h-[22px] w-[22px]" />
    </button>
  );
}
