type IconProps = { className?: string };

export function GitHubMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.1 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3" />
    </svg>
  );
}

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.9,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function SunIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...stroke}>
      <circle cx="12" cy="12" r="3.6" />
      <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.5 1.5M17.2 17.2l1.5 1.5M5.3 18.7l1.5-1.5M17.2 6.8l1.5-1.5" />
    </svg>
  );
}

export function MoonIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...stroke}>
      <path d="M19.5 14.6A7.7 7.7 0 0 1 9.4 4.5a7.9 7.9 0 1 0 10.1 10.1Z" />
    </svg>
  );
}

export function SpeakerIcon({ className, muted }: IconProps & { muted: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        d="M3 9.3A1.3 1.3 0 0 1 4.3 8H7.8l4.5-3.8c.8-.7 2-.1 2 .9v13.8c0 1-1.2 1.6-2 .9L7.8 16H4.3A1.3 1.3 0 0 1 3 14.7V9.3Z"
        fill="currentColor"
      />
      {muted ? (
        <path d="M17.2 9.6l4.8 4.8M22 9.6l-4.8 4.8" {...stroke} />
      ) : (
        <path d="M17 8.7a4.7 4.7 0 0 1 0 6.6M19.8 5.9a8.6 8.6 0 0 1 0 12.2" {...stroke} />
      )}
    </svg>
  );
}
