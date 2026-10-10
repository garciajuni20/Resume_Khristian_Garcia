"""
Renders page 1 of each generated CV (job-search/CVs) to a WebP thumbnail in
public/cv-previews, used by the download cards on the Resume page.

Requires: pip install pymupdf pillow
Run after scripts/generate-pdfs.tsx:  python scripts/pdf-previews.py
"""
import os
import pymupdf
from PIL import Image

SRC = os.path.join("job-search", "CVs")
OUT = os.path.join("public", "cv-previews")
FILES = {
    "khristian-garcia-resume-creative-en.pdf": "creative-en.webp",
    "khristian-garcia-cv-creative-es.pdf": "creative-es.webp",
    "khristian-garcia-resume-ats-en.pdf": "ats-en.webp",
    "khristian-garcia-cv-ats-es.pdf": "ats-es.webp",
}

os.makedirs(OUT, exist_ok=True)
for pdf, out in FILES.items():
    page = pymupdf.open(os.path.join(SRC, pdf))[0]
    pix = page.get_pixmap(dpi=96)
    img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    img.save(os.path.join(OUT, out), "WEBP", quality=80, method=6)
    print("ok", out, img.size)
