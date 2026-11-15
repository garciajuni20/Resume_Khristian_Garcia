"""
Turns a Wan 2.2 clip of an ink drop landing on paper into the page-transition
mask strip used by src/components/InkTransition.tsx.

  public/ink/transition.webp   16 frames stacked vertically, 480x264 each.
                               Alpha = paper still left: 1 on the first frame
                               (the new page is covered), 0 on the last.

A real drop only stains part of the sheet, and a page change needs the whole
sheet. So the strip is the real clip for the impact and the splash, then that
same splash keeps blooming: its exact shape grows from its own centre until it
covers the frame, edges softening as the ink thins. The organic edge stays the
one the camera filmed.

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
REAL = 5  # frames taken straight from the clip (impact and splash)
W, H = 480, 264


def lum(path: str) -> np.ndarray:
    return np.asarray(Image.open(path).convert("L").filter(ImageFilter.GaussianBlur(1.0)), dtype=np.float32)


def grow(mask: np.ndarray, scale: float, cx: float, cy: float, soften: float) -> np.ndarray:
    """The splash scaled around its centre, blurred a little more as it spreads."""
    img = Image.fromarray((mask * 255).astype(np.uint8))
    w, h = int(W * scale), int(H * scale)
    big = img.resize((w, h), Image.BICUBIC)
    # place so the splash centre stays where it was
    ox, oy = int(cx * scale - cx), int(cy * scale - cy)
    canvas = Image.new("L", (W, H), 0)
    canvas.paste(big.crop((ox, oy, ox + W, oy + H)), (0, 0))
    canvas = canvas.filter(ImageFilter.GaussianBlur(soften))
    a = np.asarray(canvas, dtype=np.float32) / 255
    # ink thins as it spreads: lower the threshold so the stain fills in
    return np.clip(a * 1.6, 0, 1)


with tempfile.TemporaryDirectory() as tmp:
    subprocess.run([FFMPEG, "-loglevel", "error", "-i", SRC, "-vf", f"scale={W}:{H}", os.path.join(tmp, "f%03d.png")], check=True)
    names = sorted(os.listdir(tmp))
    clean = lum(os.path.join(tmp, names[0]))
    # Ink = darker than the clean sheet at the same spot (paper grain is not ink)
    inks = [np.clip((clean - lum(os.path.join(tmp, n)) - 12) / 55, 0, 1) for n in names]
    cover = np.maximum.accumulate(np.array([m.mean() for m in inks]))
    first = int(np.argmax(cover > 0.004))
    last = int(np.argmax(cover >= cover.max() * 0.97))
    print(f"ink appears at frame {first}, splash settles at {last}, max coverage {cover.max():.2f}")

    real_ids = np.linspace(first, last, REAL).round().astype(int)
    splash = inks[last]
    ys, xs = np.nonzero(splash > 0.5)
    cx, cy = float(xs.mean()), float(ys.mean())

    frames = [inks[i] for i in real_ids]
    # Then the splash blooms on an ease-out curve of coverage: for each frame,
    # search the scale that reaches the target share of ink
    c0 = float(frames[-1].mean())
    for k in range(FRAMES - REAL):
        t = (k + 1) / (FRAMES - REAL)
        target = c0 + (1 - c0) * (1 - (1 - t) ** 2.2)
        lo, hi = 1.0, 14.0
        for _ in range(18):
            mid = (lo + hi) / 2
            m = np.maximum(frames[-1], grow(splash, mid, cx, cy, 1 + 6 * t))
            lo, hi = (mid, hi) if m.mean() < target else (lo, mid)
        frames.append(np.maximum(frames[-1], grow(splash, hi, cx, cy, 1 + 6 * t)))

    strip = Image.new("LA", (W, H * FRAMES))
    for k, ink in enumerate(frames):
        paper = 1 - ink
        if k == 0:
            paper[:] = 1.0
        if k >= FRAMES - 2:
            paper[:] = 0.0 if k == FRAMES - 1 else paper * 0.35
        strip.paste(Image.merge("LA", (Image.new("L", (W, H), 0), Image.fromarray((paper * 255).astype(np.uint8)))), (0, H * k))
        print(f"frame {k:2d}: ink {1 - paper.mean():.2f}")

    strip.save(OUT, "WEBP", quality=70, alpha_quality=60, method=6)
    print("->", OUT, os.path.getsize(OUT) // 1024, "KB")
