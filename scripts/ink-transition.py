"""
Turns a Wan 2.2 clip of an ink drop blooming on paper into the page-transition
mask strip used by src/components/InkTransition.tsx.

  public/ink/transition.webp   16 frames stacked vertically, 480x264 each.
                               Alpha = paper still left: 1 on the first frame
                               (the new page is covered), 0 on the last.

Frames are picked by ink coverage, not by time, so the bloom advances evenly
even when the real drop starts slowly and races at the end.

Run: python scripts/ink-transition.py D:/AI/portfolio-out/ink-bloom-a.mp4 [ffmpeg]
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
OUT = os.path.join("public", "ink", "transition.webp")
FRAMES = 16
W, H = 480, 264


def paper(img: Image.Image) -> np.ndarray:
    """0..1 paper amount per pixel: bright paper -> 1, ink -> 0, soft edge between."""
    g = np.asarray(img.convert("L").filter(ImageFilter.GaussianBlur(1.2)), dtype=np.float32)
    lo, hi = np.percentile(g, 2), np.percentile(g, 98)
    return np.clip((g - (lo + 0.25 * (hi - lo))) / (0.5 * (hi - lo) + 1e-6), 0, 1)


with tempfile.TemporaryDirectory() as tmp:
    subprocess.run([FFMPEG, "-loglevel", "error", "-i", SRC, "-vf", f"scale={W}:{H}", os.path.join(tmp, "f%03d.png")], check=True)
    names = sorted(os.listdir(tmp))
    clean = paper(Image.open(os.path.join(tmp, names[0])))
    masks = []
    for n in names:
        p = paper(Image.open(os.path.join(tmp, n)))
        # Measure the ink relative to the first, clean frame (paper texture is not ink)
        masks.append(np.clip(p + (1 - clean) * 0.0, 0, 1))
    cover = np.array([1 - m.mean() for m in masks])
    # Monotonic coverage, so the strip only ever adds ink
    cover = np.maximum.accumulate(cover)
    print("coverage first/last:", round(float(cover[0]), 3), round(float(cover[-1]), 3))

    lo, hi = cover[0], cover[-1]
    picks = []
    for k in range(FRAMES):
        target = lo + (hi - lo) * k / (FRAMES - 1)
        picks.append(int(np.argmin(np.abs(cover - target))))

    strip = Image.new("LA", (W, H * FRAMES))
    acc = np.ones((H, W), np.float32)
    for k, i in enumerate(picks):
        m = masks[i]
        acc = np.minimum(acc, m)  # ink never lifts off the paper
        a = acc.copy()
        if k == 0:
            a[:] = 1.0
        if k == FRAMES - 1:
            a[:] = 0.0
        # Ease the last frames to nothing, so the page lands without a residue
        fade = 1.0 if k < FRAMES - 4 else (FRAMES - 1 - k) / 3
        a = (a * fade * 255).astype(np.uint8)
        strip.paste(Image.merge("LA", (Image.new("L", (W, H), 0), Image.fromarray(a))), (0, H * k))

    strip.save(OUT, "WEBP", quality=70, alpha_quality=60, method=6)
    print("frames", picks, "->", OUT, os.path.getsize(OUT) // 1024, "KB")
