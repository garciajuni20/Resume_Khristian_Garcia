"""
Film-size versions of the site's ink set, for the Remotion career film.

The site and the PDF use the engravings at 400 px; the film shows them at
500-700 px on a 1080p frame, so this re-cuts them from the Flux 2 Klein
sources at their full 768 px with the same treatment as scripts/ink-assets.py
(same levels, same industry inks, same paper). It also builds the scene
transition from the site's page-transition strip.

  video/public/ink/<name>.jpg      engraving printed in its ink on paper
  video/public/ink/portrait-oval.jpg  the banknote portrait, larger
  video/public/ink/bloom.webp      16 mask frames, 960x540 each, stacked:
                                   alpha = ink that has landed (0 -> 1)

Run from the repo root: python video/scripts/film-ink.py [D:/AI/cv-out]
Requires: pip install pillow numpy
"""
import importlib.util
import os
import sys

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
spec = importlib.util.spec_from_file_location("ink_assets", os.path.join(ROOT, "scripts", "ink-assets.py"))
ink = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ink)

SRC = sys.argv[1] if len(sys.argv) > 1 else r"D:\AI\cv-out"
OUT = os.path.join(ROOT, "video", "public", "ink")

# name -> output width; the ink is the site's (ink.SET)
WIDTH = {"ink-hero": 1280}
VIGNETTE_W = 720


def engraving(name: str) -> None:
    _, left, tone = ink.SET[name]
    path = next((p for p in (os.path.join(SRC, f"{name}.{e}") for e in ("png", "jpg")) if os.path.exists(p)), None)
    if not path:
        print("skip", name)
        return
    src = Image.open(path)
    alpha = ink.ink_alpha(src) * ink.edge_fade(src.size[::-1], left)
    if not left:
        alpha = ink.crop_to_ink(alpha)
    width = WIDTH.get(name, VIGNETTE_W)
    h, w = alpha.shape
    a = Image.fromarray(alpha.astype(np.uint8)).resize((width, round(width * h / w)), Image.LANCZOS)
    k = np.asarray(a, np.float32)[..., None] / 255.0
    rgb = np.array(ink.PAPER, np.float32) * (1 - k) + ink.ink_field(tone, k.shape[:2]) * k
    Image.fromarray(rgb.astype(np.uint8), "RGB").save(os.path.join(OUT, f"{name}.jpg"), "JPEG", quality=90, optimize=True)
    print("ok", name, a.size)


def portrait() -> None:
    src = Image.open(os.path.join(ROOT, "public", "me", "khristian-portrait.jpg")).convert("L")
    w, _ = src.size
    crop = src.crop((10, 0, w - 10, round((w - 20) * 1.25))).resize((560, 700), Image.LANCZOS)
    g = np.asarray(crop, np.float32) / 255.0
    g = np.clip((g - 0.06) / 0.88, 0, 1) ** 0.95
    duo = np.array(ink.INK, np.float32) * (1 - g[..., None]) + np.array(ink.PAPER, np.float32) * g[..., None]
    img = Image.fromarray(duo.astype(np.uint8), "RGB")
    mask = Image.new("L", img.size, 0)
    ImageDraw.Draw(mask).ellipse((2, 2, img.size[0] - 3, img.size[1] - 3), fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(1.4))
    flat = Image.new("RGB", img.size, ink.PAPER)
    flat.paste(img, mask=mask)
    flat.save(os.path.join(OUT, "portrait-oval.jpg"), "JPEG", quality=90)
    print("ok portrait-oval", img.size)


def bloom() -> None:
    """The film's transition: the site's ink splash (public/ink/splash.webp, from
    scripts/ink-splash.py) grown from its centre over 16 frames, alpha = ink."""
    splash = Image.open(os.path.join(ROOT, "public", "ink", "splash.webp")).getchannel("A")
    W, H = 960, 540
    cx, cy = 0.558, 0.452  # splash centre, as in index.css (.ink-sheet)
    out = Image.new("LA", (W, H * 16))
    for k in range(16):
        t = k / 15
        s = 3.4 * (t * t * (3 - 2 * t)) ** 0.75  # mask size, fraction of the frame
        frame = Image.new("L", (W, H), 0)
        if s > 0:
            w, h = max(1, int(W * s)), max(1, int(H * s))
            big = splash.resize((w, h), Image.BICUBIC)
            frame.paste(big, (int(cx * W - cx * w), int(cy * H - cy * h)))
        # a steep curve gives the stain the crisp, ragged edge of wet ink at 1080p
        a = np.clip((np.asarray(frame, np.float32) / 255 - 0.38) / 0.24, 0, 1)
        a = a * a * (3 - 2 * a) * 255
        if k == 15:
            a[:] = 255
        out.paste(Image.merge("LA", (Image.new("L", (W, H), 0), Image.fromarray(a.astype(np.uint8)))), (0, H * k))
    out.save(os.path.join(OUT, "bloom.webp"), "WEBP", quality=80, alpha_quality=70, method=6)
    print("ok bloom", os.path.getsize(os.path.join(OUT, "bloom.webp")) // 1024, "KB")


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    # The engravings the film shows (scenes.tsx and the stops in copy.ts)
    for n in ("ink-hero", "ink-remesas", "ink-bi", "ink-data", "ink-barberia", "ink-educacion", "ink-bienestar"):
        engraving(n)
    portrait()
    bloom()
