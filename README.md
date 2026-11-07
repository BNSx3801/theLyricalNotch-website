# The Lyrical Notch — website

Landing page for the Lyrics preview of [Boring Notch](https://theboring.name/), built from the "Frame-01" artboard in the Paper file *The Lyrical Notch*.

Next.js 16 (App Router) · TypeScript · Tailwind v4. Dark only, as designed.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Where things live

- `lib/site.ts` — every external link (download DMG, PR, Boring Notch, maker) and the demo media paths.
- `components/BarsToSmile.tsx` — the logo: a seven-bar equalizer that morphs into a smiley and back on a 9.8 s loop (static smiley under `prefers-reduced-motion`).
- `components/TiltedDemo.tsx` + the `.tilt-*` rules in `app/globals.css` — the demo video inside a flat bezel, rotated away with CSS 3D at rest and eased flat on hover.
- `lib/demoSound.ts` — shared mute state; the nav's "Sound Off / Sound On" button drives the `<video>`.
- `.link-underline` in `app/globals.css` — the left-to-right underline used on every text link.

## Download button

The DMG is served from GitHub Releases on `BNSx3801/boring.notch`. The button points at `releases/latest/download/Boring-Notch-Lyrics-Preview.dmg`, so shipping a new preview is just a new (non-prerelease) release with an asset of that name.

## Media

`public/assets/polished-demo.mp4` is a 1732×974 H.264 re-encode of the raw recording `polished_demo.mp4` (1920×1080, kept out of git). The crop keeps the Spotify window and drops the macOS screen-recording toolbar at the bottom; the result is 16:9 so it fills the bezel. Re-make it with:

```bash
ffmpeg -i polished_demo.mp4 -t 14.8 -vf "crop=1732:974:94:0,fps=30" -af "apad,atrim=0:14.8" -shortest \
  -c:v libx264 -preset slow -crf 24 -g 30 \
  -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 96k public/assets/polished-demo.mp4
ffmpeg -ss 0.5 -i polished_demo.mp4 -frames:v 1 -vf "crop=1732:974:94:0" -q:v 4 public/assets/polished-demo-poster.jpg
```

The encoded video and poster are committed, so a deploy serves them straight from `public/`; only the raw sources are ignored.
