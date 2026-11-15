"""
The page-transition ink: one splash filmed by Wan 2.2 (a real drop landing on
paper), saved as an alpha mask for src/components/InkTransition.tsx.

  public/ink/splash.webp   the settled splash, alpha = ink, 960x528

The browser grows this one image from a point at the splash centre until it
covers the screen (CSS mask-size, interpolated every display frame), so the
bloom is smooth at any duration. This script also prints the keyframes of that
growth: mask sizes that follow one smoothstep curve of covered area, so the
drop lands slowly, runs, then settles, without stalls or jumps.

Run: python scripts/ink-splash.py D:/AI/portfolio-out/ink-bloom-a.mp4 [ffmpeg]
Requires: pip install pillow numpy, and ffmpeg
"""
import os
import subprocess
import sys
import tempfile

import numpy as np
from PIL import Image, ImageFilter

SRC = sys.argv[1]
FFMPEG = sys.argv[2] if len(sys.argv) > 2 else r"D:\AI\Wan2GP\ffmpeg_bins\ffmpeg.exe"
OUT = os.path.join("public", "ink", "splash.webp")
W, H = 960, 528
STOPS = 12


def lum(path: str) -> np.ndarray:
    return np.asarray(Image.open(path).convert("L").filter(ImageFilter.GaussianBlur(2.0)), dtype=np.float32)


with tempfile.TemporaryDirectory() as tmp:
    subprocess.run([FFMPEG, "-loglevel", "error", "-i", SRC, "-vf", f"scale={W}:{H}", os.path.join(tmp, "f%03d.png")], check=True)
    names = sorted(os.listdir(tmp))
    clean = lum(os.path.join(tmp, names[0]))
    inks = [np.clip((clean - lum(os.path.join(tmp, n)) - 12) / 55, 0, 1) for n in names]
    cover = np.maximum.accumulate(np.array([m.mean() for m in inks]))
    last = int(np.argmax(cover >= cover.max() * 0.97))
    # ink thins toward the edge: lift the core to solid, keep a soft rim
    splash = np.clip(inks[last] * 1.6, 0, 1)
    splash = np.asarray(Image.fromarray((splash * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.5)), dtype=np.float32) / 255

ys, xs = np.nonzero(splash > 0.5)
cx, cy = xs.mean() / W, ys.mean() / H
Image.merge("LA", (Image.new("L", (W, H), 0), Image.fromarray((splash * 255).astype(np.uint8)))).save(OUT, "WEBP", quality=80, alpha_quality=80, method=6)
print("->", OUT, os.path.getsize(OUT) // 1024, "KB", f"centre {cx * 100:.1f}% {cy * 100:.1f}%")

# Coverage of the screen (sampled on a grid) for a mask size s (fraction of the
# screen, per axis), the splash centre pinned at (cx, cy) as CSS does with
# mask-position cx% cy%
gy, gx = np.mgrid[0:1:200j, 0:1:200j]


def coverage(s: float) -> float:
    if s <= 0:
        return 0.0
    # image left/top so that point cx of the image sits on point cx of the screen
    left, top = cx - cx * s, cy - cy * s
    u, v = (gx - left) / s, (gy - top) / s
    inside = (u >= 0) & (u < 1) & (v >= 0) & (v < 1)
    px = np.clip((u * W).astype(int), 0, W - 1)
    py = np.clip((v * H).astype(int), 0, H - 1)
    return float(np.where(inside, splash[py, px], 0).mean())


def size_for(target: float) -> float:
    lo, hi = 0.0, 60.0
    for _ in range(40):
        mid = (lo + hi) / 2
        lo, hi = (mid, hi) if coverage(mid) < target else (lo, mid)
    return hi


full = size_for(0.9995)
print(f"full cover at mask size {full * 100:.0f}%")
for k in range(STOPS + 1):
    t = k / STOPS
    target = t * t * (3 - 2 * t)
    s = 0.0 if k == 0 else (full if k == STOPS else size_for(target))
    print(f"  {t * 100:.0f}% {{ mask-size: {s * 100:.1f}% {s * 100:.1f}%, 100% 100%; }}")
