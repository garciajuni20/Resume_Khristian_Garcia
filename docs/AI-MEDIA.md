# AI and video media

Every clip and illustration on the site is either real footage or was generated **locally and for free** on the author's PC. No paid image or video APIs.

## Pipeline

| Step | Tool | Where |
|---|---|---|
| Generate stills and clips | **Wan 2.2 TI2V 5B** through [Wan2GP](https://github.com/deepbeepmeep/Wan2GP) on an RTX 3060 12 GB (`--profile 5`, SDPA attention) | `D:\AI\portfolio_gen.py` + `D:\AI\portfolio_jobs.json` → `D:\AI\portfolio-out\` |
| Generate stills (text-to-image) and edit photos | **Flux 2 Klein 4B** (int8, 4 steps, ~2 min per image) through the same Wan2GP install | `D:\AI\cv_headshot.py` + a jobs JSON → `D:\AI\cv-out\` |
| Generate the soundtrack (instrumental) | **ACE-Step 1.5 Turbo + 1.7B LM** through the same Wan2GP install (the RunComfy CLI has no Windows build, and local is free) | `D:\AI\music_gen.py` + a jobs JSON (`D:\AI\music_jobs*.json`) → `D:\AI\music-out\` |
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
| `public/ai/flowber-cover.webp`, `ind-*.webp` | Wan 2.2 stills (`ind-wellness` is Flux 2 Klein, resized to 960×528 with Pillow) | Case-study cover poster, industry rail |
| `public/ai/cover-*.webp` (8) | Flux 2 Klein 4B, 1280×704 → 960×528, one art direction: charcoal, glass objects, teal + amber light, no text (`D:\AI\cv_jobs4.json`) | Project cards without a real screenshot |
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

## Sound (`src/audio/engine.ts`, `src/context/SoundContext.tsx`, `src/components/SoundEffects.tsx`)

**Music: one melody per page**, generated with ACE-Step 1.5 (`D:\AI\music_jobs2.json`) and encoded by `bash scripts/encode-music.sh <wav> public/audio/<page>.mp3` (seamless crossfade loop, -16 LUFS, 112 kbps MP3). ACE-Step finishes early and leaves a silent tail: trim each WAV to where the music ends first (`silencedetect`, then `atrim`), or the loop has a gap. 48–56 s per loop, 400–780 KB (home: 99 s, 1.2 MB).

| Page | File | Character | Key, tempo |
|---|---|---|---|
| Home | `home.mp3` | Cinematic hybrid score: string ostinato, sub bass, big drums (track C of the first batch, `D:\AI\music_jobs1.json`, trimmed at 103.2 s, 96 kbps since it loops at 99 s) | D minor, 100 |
| Resume | `resume.mp3` | Neoclassical chamber: felt piano, pizzicato, cello (the engraved banknote) | D minor, 76 |
| Projects | `projects.mp3` | Playful electronic: plucks, wooden mallets, lofi groove | D minor, 104 |
| Flowber | `flowber.mp3` | Guatemalan marimba over a lofi hip hop beat (the barbershop) | F major, 90 |
| Contact | `contact.mp3` | Fingerpicked guitar, rhodes, string swells: an open door | F major, 84 |
| 404 | `notfound.mp3` | Music-box waltz, lost but curious | D minor, 108, 3/4 |

All tracks share one pitch set (D minor = relative of F major), so the crossfade on navigation sounds like a new movement, not a new song. Returning to a page continues its track where it was.

**Effects: synthesized, nothing to download.** Every pitch comes from the D F G A C pentatonic, so effects always harmonize with the music.

| Moment | Sound |
|---|---|
| Hover a control (mouse only) | Faint glass tick, throttled |
| Click any control | Marimba note pitched by its horizontal position: a row of buttons plays up the scale |
| Arrive on a page | Bell arpeggio rooted on that page's own degree |
| Dark / light mode | Dusk (descending, filter closing) / dawn (ascending, brightening) |
| EN / ES | Two mallet notes, up for Spanish, down for English |
| Sound on / off | A rolled D minor 9 bloom / two notes falling |
| Career map (resume) | Each bar rings one note up the scale, oldest role first: sweep it to hear the career climb |
| Resume header | The engraving printing in: paper pressed, then a low bell |
| Open / close a role's detail, mobile menu | Rising whoosh and bell / falling whoosh |
| Filter chip on / off | Two notes up / down |
| Typing in the contact form, driving the "/" menu | Soft key clicks |
| Message sent, PDF ready | F major resolving upward |
| Validation or network error | Two muted notes a semitone apart |

Rules:

- **Off by default.** Browsers block audible autoplay, and a recruiter at work should never be surprised. A first-visit invitation (bottom-left, after 3.5 s) offers it once; any choice hides it for good. One toggle covers music and effects.
- No audio file is requested before sound is turned on, and then only the current page's track.
- Music is routed through Web Audio gain nodes (volume on `HTMLAudioElement` is read-only on iOS), fades on every change, steps aside while any audible video plays (the career film) and pauses while the tab is hidden. The choice is remembered in `localStorage` and resumes on the first gesture of the next visit.
- Components opt in with attributes, not imports: `data-sfx="none"` silences a control that has its own sound, `data-sfx="open"` or `data-sfx="note:3"` picks one, `data-sfx-hover` sets the hover sound.
- In `npm run dev`, every effect can be auditioned from the console: `sfx('success')`, `sfx('note', { degree: 7 })`.
