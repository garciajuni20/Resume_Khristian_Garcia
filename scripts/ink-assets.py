"""
Builds the "ink" art set from the Flux 2 Klein engravings (D:/AI/cv-out/ink-*.png|jpg)
and the portrait. One source, two outputs per image:

  public/ink/<name>.webp      ink as an alpha mask (black + alpha). The site tints it
                              with CSS `mask-image` + `background-color: var(--ink)`,
                              so one file works in the light and the dark theme.
  public/ink/pdf/<name>.jpg   the same ink already in the PDF's navy on the PDF's
                              paper, since react-pdf has no blend modes or masks.

The portrait becomes a duotone (ink -> paper) inside an oval, like a banknote
portrait, in both forms.

Run: python scripts/ink-assets.py [D:/AI/cv-out]
Requires: pip install pillow numpy
"""
import os
import sys

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

SRC = sys.argv[1] if len(sys.argv) > 1 else r"D:\AI\cv-out"
OUT = os.path.join("public", "ink")
OUT_PDF = os.path.join(OUT, "pdf")

INK = (0x16, 0x21, 0x3E)
PAPER = (0xF5, 0xF6, 0xF8)

# name -> (output width in px, fade the left side for the headline/portrait)
SET = {
    "ink-hero": (1400, True),
    "ink-remesas": (400, False),
    "ink-fintech": (400, False),
    "ink-barberia": (400, False),
    "ink-bienestar": (400, False),
    "ink-educacion": (400, False),
}


def ink_alpha(img: Image.Image, lo: int = 18, hi: int = 205) -> np.ndarray:
    """Darkness as alpha, with levels so paper is fully clear and lines are solid."""
    g = np.asarray(img.convert("L"), dtype=np.float32)
    dark = 255.0 - g
    a = np.clip((dark - lo) * (255.0 / (hi - lo)), 0, 255)
    return a


def edge_fade(shape, left: bool, feather: float = 0.06) -> np.ndarray:
    """Soft fade on every edge, plus a wide one on the left when asked."""
    h, w = shape
    y = np.linspace(0, 1, h)[:, None]
    x = np.linspace(0, 1, w)[None, :]
    def ramp(v, size):
        return np.clip(v / size, 0, 1)
    m = ramp(x, feather) * ramp(1 - x, feather) * ramp(y, feather) * ramp(1 - y, feather * 2.5)
    if left:
        # The left 42% dissolves into paper: room for the portrait and the name
        m = m * np.clip((x - 0.30) / 0.22, 0, 1) ** 1.4
    return m


def crop_to_ink(alpha: np.ndarray, pad: float = 0.05) -> np.ndarray:
    """Square crop around the drawn subject, so small vignettes read at icon size."""
    ys, xs = np.nonzero(alpha > 40)
    if len(xs) == 0:
        return alpha
    cx, cy = (xs.min() + xs.max()) / 2, (ys.min() + ys.max()) / 2
    half = max(xs.max() - xs.min(), ys.max() - ys.min()) * (0.5 + pad)
    h, w = alpha.shape
    x0, y0 = int(max(0, cx - half)), int(max(0, cy - half))
    x1, y1 = int(min(w, cx + half)), int(min(h, cy + half))
    return alpha[y0:y1, x0:x1]


def save_pair(name: str, alpha: np.ndarray, width: int):
    h, w = alpha.shape
    height = round(width * h / w)
    a = Image.fromarray(alpha.astype(np.uint8)).resize((width, height), Image.LANCZOS)
    # Web: black ink + alpha
    web = Image.new("RGBA", a.size, (0, 0, 0, 0))
    web.putalpha(a)
    # Only the alpha channel matters for a mask, so it is the one that gets compressed
    web.save(os.path.join(OUT, f"{name}.webp"), "WEBP", quality=80, alpha_quality=72, method=6)
    # PDF: navy composited on paper
    k = np.asarray(a, dtype=np.float32)[..., None] / 255.0
    rgb = np.array(PAPER, np.float32) * (1 - k) + np.array(INK, np.float32) * k
    # JPEG: the page is the same paper, so no alpha is needed and the PDF stays small
    Image.fromarray(rgb.astype(np.uint8), "RGB").save(os.path.join(OUT_PDF, f"{name}.jpg"), "JPEG", quality=88, optimize=True)
    print("ok", name, a.size)


def portrait():
    src = Image.open(os.path.join("public", "me", "khristian-portrait.jpg")).convert("L")
    w, h = src.size
    # Banknote portraits are ovals a little taller than wide; keep head and shoulders
    # Zoomed out enough that the oval clears the top of the head
    crop = src.crop((10, 0, w - 10, round((w - 20) * 1.25)))
    crop = crop.resize((480, 600), Image.LANCZOS)
    g = np.asarray(crop, np.float32) / 255.0
    g = np.clip((g - 0.06) / 0.88, 0, 1) ** 0.95  # keep skin tones out of the mud
    duo = np.array(INK, np.float32) * (1 - g[..., None]) + np.array(PAPER, np.float32) * g[..., None]
    img = Image.fromarray(duo.astype(np.uint8), "RGB")
    mask = Image.new("L", img.size, 0)
    ImageDraw.Draw(mask).ellipse((2, 2, img.size[0] - 3, img.size[1] - 3), fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(1.2))
    rgba = img.copy()
    rgba.putalpha(mask)
    rgba.save(os.path.join(OUT, "portrait-oval.webp"), "WEBP", quality=90, method=6)
    # PDF gets it on paper (no alpha needed, the page is the same paper)
    flat = Image.new("RGB", img.size, PAPER)
    flat.paste(img, mask=mask)
    flat.save(os.path.join(OUT_PDF, "portrait-oval.jpg"), "JPEG", quality=90)
    print("ok portrait-oval", img.size)


def main():
    os.makedirs(OUT_PDF, exist_ok=True)
    for name, (width, left) in SET.items():
        path = next((p for p in (os.path.join(SRC, f"{name}.{ext}") for ext in ("png", "jpg")) if os.path.exists(p)), None)
        if not path:
            print("skip", name, "(not generated yet)")
            continue
        src = Image.open(path)
        alpha = ink_alpha(src) * edge_fade(src.size[::-1], left)
        if not left:
            alpha = crop_to_ink(alpha)
        save_pair(name, alpha, width)
    portrait()


if __name__ == "__main__":
    main()
