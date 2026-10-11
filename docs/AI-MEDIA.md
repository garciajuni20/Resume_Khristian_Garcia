# AI and video media

Every clip and illustration on the site is either real footage or was generated **locally and for free** on the author's PC. No paid image or video APIs.

## Pipeline

| Step | Tool | Where |
|---|---|---|
| Generate stills and clips | **Wan 2.2 TI2V 5B** through [Wan2GP](https://github.com/deepbeepmeep/Wan2GP) on an RTX 3060 12 GB (`--profile 5`, SDPA attention) | `D:\AI\portfolio_gen.py` + `D:\AI\portfolio_jobs.json` → `D:\AI\portfolio-out\` |
| Trim, loop, compress | ffmpeg (bundled with Wan2GP) | `scripts/encode-ai-media.sh` (brand stills were resized to display size with Pillow) |
| Career film (54 s, EN/ES) | Remotion (video as React code) | `video/` |
| Flowber brand film (50 s) | Remotion in the Flowber repo, real shop footage + local AI clips | `Flowber/flowber-barberia/remotion` |
| LinkedIn banner and Featured cards | Pillow, built from the assets above | `scripts/linkedin-assets.py` → `docs/linkedin/` |

Typical cost on the RTX 3060: a 1280×704 still takes ~5–8 min (model load dominates); a 97-frame clip ~20 min.

```bash
# 1. Generate (Wan2GP venv). Pass job names to run only some of them.
D:\AI\Wan2GP\.venv\Scripts\python.exe D:\AI\portfolio_gen.py D:\AI\portfolio_jobs.json hero-data flowber-cover
# 2. Encode for the web
bash scripts/encode-ai-media.sh
```

## Assets and where they appear

| Asset | Source | Used in |
|---|---|---|
| `public/ai/hero-data.{webm,mp4,webp}` (≈0.9 MB) | Wan 2.2 text-to-video, slowed 2× and boomeranged | Home, tagline band (`AmbientVideo`) |
| `public/ai/flowber-cover.{webm,mp4}` (≈0.1 MB) | Wan 2.2 image-to-video from `ind-retail`, trimmed to 2 s (a stray figure walks in at 2.2 s) and boomeranged | Flowber case-study cover, Flowber card on /projects |
| `public/ai/flowber-cover.webp`, `ind-*.webp` | Wan 2.2 stills | Case-study cover poster, industry rail |
| `public/flowber/flowber-film.{mp4,webp}` (4.2 MB, click to play) | Flowber brand film | Case study → Brand and business |
| `public/flowber/cortes/*.{mp4,webp}` | Real footage from the shop | Case study → Brand and business |
| `public/flowber/brand/logo-v1, logo-v2, mascot` | Flowber logos and campaign illustration | Case study → identity evolution |
| `public/flowber/brand/ig-profile, ig-grid` | Screenshots of the client's public @danover.barbero profile | Case study → audience |
| `public/flowber/world-landscape.webp` | Flowber campaign art | Case-study CTA background |
| `public/me/*` | Author's photo (`khristian-garcia.png`) | Home hero, Resume, Contact, CV PDF, OG image |

## Playback rules (`src/components/AmbientVideo.tsx`)

- Sources are attached only when the clip comes within 200 px of the viewport; `preload="none"` until then.
- Plays while visible, pauses when it leaves.
- `prefers-reduced-motion` keeps the poster frame and never downloads the video.
- Decorative loops are `aria-hidden`; clips that carry meaning get an `aria-label`.
- Large films (brand film, career film) load only after the visitor presses play.
