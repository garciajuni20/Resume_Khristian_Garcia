"""
Open Graph images, one per route, set like the CV: paper, one navy ink, the
route's engraving, Bodoni for the name and the figure, a guilloché rule.
LinkedIn, Slack and X show these when a link is shared, so each page reads as
its own card instead of the same generic preview.

  public/og/<route>.jpg   1200x630, drawn at 2x and reduced for clean edges

Run from the repo root: python scripts/og-images.py
Requires: pip install pillow numpy
"""
import math
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
PUB = ROOT / "public"
OUT = PUB / "og"
OUT.mkdir(parents=True, exist_ok=True)

S = 2  # supersampling
W, H = 1200, 630
M = 60  # safe margin (LinkedIn crops close to the edges)

PAPER = (0xF5, 0xF6, 0xF8)
INK = (0x16, 0x21, 0x3E)
INK_2 = (0x4A, 0x56, 0x77)
TONE = {
    "teal": (0x0B, 0x7A, 0x75),
    "blue": (0x1F, 0x4F, 0xA3),
    "coral": (0xC4, 0x2B, 0x47),
    "violet": (0x6A, 0x3F, 0xA0),
    "green": (0x2E, 0x7D, 0x4A),
}
TONES = list(TONE.values())

NAME = "Khristian Garcia"
HEADLINE = "Data Engineer · Snowflake, dbt, Azure Data Factory"
HOST = "resume-khristian-garcia.pages.dev"


def font(name: str, size: float) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(PUB / "fonts" / name), round(size * S))


BODONI = lambda s: font("BodoniModa-400.ttf", s)  # noqa: E731
BODONI_M = lambda s: font("BodoniModa-500.ttf", s)  # noqa: E731
GEIST = lambda s: font("Geist-Regular.ttf", s)  # noqa: E731
GEIST_M = lambda s: font("Geist-Medium.ttf", s)  # noqa: E731

# Bodoni's "+" is a hairline and it has no arrow: those glyphs are set in Geist,
# like figureRuns() in src/data/ink.ts
GEIST_GLYPHS = set("+→")

# route -> page label, tone, art, figures [(value, label)], big line (when no figure)
ROUTES = {
    "home": {
        "label": "Portfolio and interactive CV",
        "tone": "blue",
        "art": [("ink-hero", (600, 150, 560, 320))],
        "figures": [("85% → 99.5%", "data accuracy across 5 departments"), ("2+ days → 30 min", "financial reporting cycle")],
        "path": "",
    },
    "resume": {
        "label": "Interactive resume",
        "tone": "blue",
        "art": [("portrait-oval", (850, 60, 290, 360)), ("ink-data", (690, 330, 210, 210))],
        "figures": [("85% → 99.5%", "data accuracy across 5 departments"), ("2+ days → 30 min", "financial reporting cycle")],
        "path": "resume",
    },
    "projects": {
        "label": "Projects",
        "tone": "violet",
        "art": [("ink-bi", (720, 70, 420, 440))],
        "figures": [("2", "full case studies: Alleviate and Flowber")],
        "path": "projects",
    },
    "alleviate": {
        "label": "Case study · Alleviate Financial Solutions",
        "tone": "blue",
        "art": [("ink-data", (720, 70, 420, 440))],
        "figures": [("85% → 99.5%", "data accuracy, one Snowflake source of truth for 5 departments")],
        "path": "alleviate",
    },
    "flowber": {
        "label": "Case study · Flowber",
        "tone": "coral",
        "art": [("ink-barberia", (720, 70, 420, 440))],
        "figures": [("160+", "appointments in production, built and run by one engineer")],
        "path": "flowber",
    },
    "contact": {
        "label": "Contact",
        "tone": "teal",
        "art": [("portrait-oval", (800, 60, 340, 425))],
        "line": "Open to remote Data Engineer roles",
        "sub": "You talk to me directly. I answer within 24 hours.",
        "path": "contact",
    },
}


def runs(text: str, size: float):
    """Split a figure into (text, font) runs: Bodoni, with + and → in Geist."""
    merged: list[tuple[str, bool]] = []
    for ch in text:
        g = ch in GEIST_GLYPHS
        if merged and merged[-1][1] == g:
            merged[-1] = (merged[-1][0] + ch, g)
        else:
            merged.append((ch, g))
    return [(t, GEIST(size * 0.62) if g else BODONI(size), g) for t, g in merged]


def draw_figure(d: ImageDraw.ImageDraw, x: float, y: float, text: str, size: float, color) -> float:
    """Draw a figure on a common baseline; returns its width (1x units)."""
    base = (y + size) * S
    cx = x * S
    for t, f, small in runs(text, size):
        d.text((cx, base), t, font=f, fill=color if not small else INK_2, anchor="ls")
        cx += d.textlength(t, font=f)
    return cx / S - x


def guilloche_rule(d: ImageDraw.ImageDraw, x0: float, x1: float, y: float, height=8.0, period=18.0):
    """Port of guillocheRule() in src/utils/guilloche.ts, one strand per industry ink."""
    length = x1 - x0
    steps = int(length * S / 1.5)
    for s, color in enumerate(TONES):
        phase = s / len(TONES) * math.tau
        pts = []
        for i in range(steps + 1):
            x = i / steps * length
            t = x / period * math.tau
            yy = height / 2 + height / 2 * (0.62 * math.sin(t + phase) + 0.38 * math.sin(t / 2 - phase))
            pts.append(((x0 + x) * S, (y + yy) * S))
        d.line(pts, fill=color, width=max(1, round(0.75 * S)), joint="curve")


def place_art(canvas: Image.Image, name: str, box):
    """Engraving fitted inside box (x, y, w, h); darken-blended so its paper vanishes."""
    x, y, w, h = box
    art = Image.open(PUB / "ink" / "pdf" / f"{name}.jpg").convert("RGB")
    scale = min(w / art.width, h / art.height)
    aw, ah = round(art.width * scale * S), round(art.height * scale * S)
    art = art.resize((aw, ah), Image.LANCZOS)
    px, py = round((x + (w - aw / S) / 2) * S), round((y + (h - ah / S) / 2) * S)
    region = canvas.crop((px, py, px + aw, py + ah))
    canvas.paste(ImageChops.darker(region, art), (px, py))


def fit(d: ImageDraw.ImageDraw, text: str, maker, size: float, max_w: float) -> ImageFont.FreeTypeFont:
    f = maker(size)
    while d.textlength(text, font=f) / S > max_w and size > 10:
        size -= 1
        f = maker(size)
    return f


def build(key: str, cfg: dict) -> Path:
    canvas = Image.new("RGB", (W * S, H * S), PAPER)
    for name, box in cfg["art"]:
        place_art(canvas, name, box)
    d = ImageDraw.Draw(canvas)
    tone = TONE[cfg["tone"]]
    col = 640 if key != "home" else 560  # text column width

    d.text((M * S, M * S), cfg["label"], font=fit(d, cfg["label"], GEIST_M, 22, col), fill=tone)
    d.text((M * S, 92 * S), NAME, font=BODONI_M(76), fill=INK)
    d.text((M * S, 190 * S), HEADLINE, font=fit(d, HEADLINE, GEIST, 23, col), fill=INK_2)
    guilloche_rule(d, M, M + col, 238)

    if cfg.get("figures"):
        figs = cfg["figures"]
        size = 104 if len(figs) == 1 else 64
        y = 272
        for value, label in figs:
            draw_figure(d, M, y, value, size, INK)
            d.text((M * S, (y + size + 14) * S), label, font=fit(d, label, GEIST, 21, col), fill=INK_2)
            y += size + 54
    else:
        d.text((M * S, 270 * S), cfg["line"], font=fit(d, cfg["line"], BODONI, 54, col), fill=INK)
        d.text((M * S, 350 * S), cfg["sub"], font=fit(d, cfg["sub"], GEIST, 22, col), fill=INK_2)

    url = HOST + ("/" + cfg["path"] if cfg["path"] else "")
    d.text((M * S, (H - M - 20) * S), url, font=GEIST_M(19), fill=INK_2)

    out = OUT / f"{key}.jpg"
    canvas.resize((W, H), Image.LANCZOS).save(out, "JPEG", quality=86, optimize=True, progressive=True)
    return out


if __name__ == "__main__":
    for k, c in ROUTES.items():
        p = build(k, c)
        print(p.relative_to(ROOT), p.stat().st_size // 1024, "KB")
