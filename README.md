# The Lyrical Notch — website

Landing page for the Lyrics preview of [Boring Notch](https://github.com/TheBoredTeam/boring.notch), built from the "Main Frame" artboard in the Paper file *The Lyrical Notch*.

Next.js 16 (App Router) · TypeScript · Tailwind v4.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Where things live

- `lib/site.ts` — every external link (download DMG, PR, Boring Notch, maker) and the demo media paths.
- `components/Laptop.tsx` — the MacBook frame with the demo video positioned in the transparent screen cutout.
- `lib/demoSound.ts` — shared mute state; the nav's speaker button drives the video.
- `components/ThemeToggle.tsx` — light/dark with a circular View Transition sweep; saved in `localStorage` and applied before first paint by the inline script in `app/layout.tsx`.

## Download button

The DMG is served from GitHub Releases on `BNSx3801/boring.notch`. The button points at `releases/latest/download/Boring-Notch-Lyrics-Preview.dmg`, so shipping a new preview is just a new (non-prerelease) release with an asset of that name.

## Media

`public/assets/demo.mp4` is a 1280×816 H.264 re-encode of the raw recording `v3.mp4` (1920×1080, kept out of git). The crop matches the laptop screen's aspect ratio, centres on the Spotify window, and drops the macOS screen-recording toolbar at the bottom. Re-make it with:

```bash
ffmpeg -i v3.mp4 -vf "crop=1568:1000:176:0,scale=1280:-2,fps=30" -c:v libx264 -preset slow \
  -crf 24 -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 96k public/assets/demo.mp4
ffmpeg -ss 8 -i v3.mp4 -frames:v 1 -vf "crop=1568:1000:176:0,scale=1280:-2" -q:v 4 public/assets/demo-poster.jpg
```

The encoded video and poster are committed, so a deploy serves them straight from `public/`; only the raw sources are ignored.
