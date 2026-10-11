"""Builds the LinkedIn banner and Featured cards from the portfolio's own media.

Run from the repo root:  python scripts/linkedin-assets.py
Output: docs/linkedin/*.jpg  (needs Pillow)
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
PUB = ROOT / "public"
OUT = ROOT / "docs" / "linkedin"
OUT.mkdir(parents=True, exist_ok=True)

BG = (10, 10, 12)
WHITE = (245, 245, 245)
MUTED = (160, 160, 170)
ACCENT = (125, 140, 255)
LIME = (198, 244, 50)


def font(name: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(PUB / "fonts" / name), size)


def cover(img: Image.Image, w: int, h: int) -> Image.Image:
    """Scale and center-crop to exactly w x h."""
    scale = max(w / img.width, h / img.height)
    img = img.resize((round(img.width * scale), round(img.height * scale)), Image.LANCZOS)
    left, top = (img.width - w) // 2, (img.height - h) // 2
    return img.crop((left, top, left + w, top + h))


def fade_mask(w: int, h: int, start: float, end: float) -> Image.Image:
    """Horizontal alpha ramp: opaque before `start`, transparent after `end` (fractions of w)."""
    m = Image.new("L", (w, h))
    px = m.load()
    for x in range(w):
        f = x / w
        a = 255 if f <= start else 0 if f >= end else round(255 * (end - f) / (end - start))
        for y in range(h):
            px[x, y] = a
    return m


def pill(d: ImageDraw.ImageDraw, xy: tuple[int, int], text: str, f: ImageFont.FreeTypeFont) -> int:
    x, y = xy
    tw = d.textlength(text, font=f)
    d.rounded_rectangle((x, y, x + tw + 28, y + f.size + 18), radius=10, fill=(28, 28, 34), outline=(55, 55, 66))
    d.text((x + 14, y + 8), text, font=f, fill=WHITE)
    return round(x + tw + 28 + 10)


def banner() -> None:
    """1584x396. The profile photo covers the lower-left corner, so copy sits on the right."""
    W, H = 1584, 396
    canvas = Image.new("RGB", (W, H), BG)
    art = cover(Image.open(PUB / "ai" / "hero-data.webp").convert("RGB"), 760, H)
    canvas.paste(art, (0, 0), fade_mask(760, H, 0.55, 1.0))
    d = ImageDraw.Draw(canvas)
    x = 640
    d.ellipse((x, 58, x + 12, 70), fill=(34, 197, 94))
    d.text((x + 22, 52), "OPEN TO REMOTE ROLES · EN / ES · GUATEMALA (UTC-6)", font=font("GeistMono-Medium.ttf", 18), fill=MUTED)
    d.text((x, 92), "Data Engineer", font=font("Geist-Bold.ttf", 64), fill=WHITE)
    d.text((x, 168), "Analytics Engineering · Cloud Data Platforms · AI", font=font("Geist-SemiBold.ttf", 30), fill=ACCENT)
    px = x
    for t in ["Snowflake · dbt", "Databricks · ADF", "Power BI", "RAG · LLM agents"]:
        px = pill(d, (px, 228), t, font("Geist-Medium.ttf", 20))
    d.text((x, 300), "Built Flowber end-to-end: booking platform, AI agent with RAG, dbt warehouse with ML.",
           font=font("Geist-Regular.ttf", 21), fill=MUTED)
    d.text((x, 336), "garciajuni20.github.io/Resume_Khristian_Garcia", font=font("GeistMono-Medium.ttf", 18), fill=(110, 110, 120))
    canvas.save(OUT / "linkedin-banner.jpg", quality=92)


def featured_flowber() -> None:
    """1200x627 card for the Featured section, linking to the case study."""
    W, H = 1200, 627
    canvas = Image.new("RGB", (W, H), BG)
    art = cover(Image.open(PUB / "ai" / "flowber-cover.webp").convert("RGB"), W, H)
    art = Image.blend(art, Image.new("RGB", (W, H), BG), 0.35)
    canvas.paste(art)
    shade = Image.new("RGB", (W, H), BG)
    canvas.paste(shade, (0, 0), fade_mask(W, H, 0.38, 0.75))
    logo = Image.open(PUB / "flowber" / "logo-mark.webp").convert("RGB").resize((96, 96), Image.LANCZOS)
    m = Image.new("L", (96, 96), 0)
    ImageDraw.Draw(m).rounded_rectangle((0, 0, 95, 95), radius=18, fill=255)
    canvas.paste(logo, (64, 64), m)
    d = ImageDraw.Draw(canvas)
    d.text((64, 190), "CASE STUDY · JAN 2024 → TODAY", font=font("GeistMono-Medium.ttf", 20), fill=LIME)
    d.text((64, 228), "Flowber: a barbershop", font=font("Geist-Bold.ttf", 54), fill=WHITE)
    d.text((64, 292), "from a notebook to the cloud", font=font("Geist-Bold.ttf", 54), fill=WHITE)
    d.text((64, 372), "Full-stack · Solutions architecture · AI agent + RAG · dbt + DuckDB warehouse · BI",
           font=font("Geist-Regular.ttf", 22), fill=MUTED)
    px = 64
    for t in ["160+ appointments", "100% hit@1 RAG", "24 dbt models · 50 tests", "$0 infra"]:
        px = pill(d, (px, 430), t, font("Geist-Medium.ttf", 21))
    d.text((64, 540), "garciajuni20.github.io/Resume_Khristian_Garcia/#/flowber", font=font("GeistMono-Medium.ttf", 19), fill=(120, 120, 130))
    canvas.save(OUT / "featured-flowber.jpg", quality=90)


def featured_portfolio() -> None:
    """The site's own social card doubles as the portfolio Featured item."""
    Image.open(PUB / "og-image.jpg").convert("RGB").save(OUT / "featured-portfolio.jpg", quality=90)


if __name__ == "__main__":
    banner()
    featured_flowber()
    featured_portfolio()
    print("written to", OUT)
