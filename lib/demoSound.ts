import { useSyncExternalStore } from "react";

// Shared mute state for the demo video, so the nav's speaker button can drive the
// <video> inside the laptop without prop drilling. Starts muted: that is the only way
// browsers allow autoplay.
let muted = true;
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

export function isDemoMuted() {
  return muted;
}

export function setDemoMuted(next: boolean) {
  if (next === muted) return;
  muted = next;
  listeners.forEach((l) => l());
}

export function useDemoMuted() {
  return useSyncExternalStore(subscribe, isDemoMuted, () => true);
}
