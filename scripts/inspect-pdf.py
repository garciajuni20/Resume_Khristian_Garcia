# -*- coding: utf-8 -*-
"""
Dev helper: verify CV PDF pagination without a PDF viewer. Pure stdlib (zlib).

Embedded fonts are written as hex-encoded glyph ids, so page *text* is not
recoverable without the font cmap. What is recoverable, and what actually
matters here, is structure: how many pages there are and how much each one
carries. A page with very few operators sitting next to a dense one means a
bad page break.

Usage:  python scripts/inspect-pdf.py [glob ...]
"""
import glob
import io
import os
import re
import sys
import zlib

TEXT_OP_RE = re.compile(r"(?:Tj|TJ)(?:\s|$)")
DRAW_OP_RE = re.compile(r"(?:^|\s)(?:re|l)(?:\s|$)")
SPARSE_THRESHOLD = 40


def _objects(raw):
    """Map object number -> (dict_bytes, stream_bytes or None)."""
    objs = {}
    for m in re.finditer(rb"(\d+)\s+0\s+obj\b", raw):
        num = int(m.group(1))
        end = raw.find(b"endobj", m.end())
        if end < 0:
            continue
        body = raw[m.end():end]
        sm = re.search(rb"stream\r?\n", body)
        if sm:
            se = body.find(b"endstream", sm.end())
            objs[num] = (body[:sm.start()], body[sm.end():se])
        else:
            objs[num] = (body, None)
    return objs


def page_stats(path):
    raw = io.open(path, "rb").read()
    objs = _objects(raw)
    out = []
    for num in sorted(objs):
        dict_bytes, _ = objs[num]
        if not re.search(rb"/Type\s*/Page\b", dict_bytes):
            continue
        ref = re.search(rb"/Contents\s+(\d+)\s+0\s+R", dict_bytes)
        if not ref:
            continue
        target = objs.get(int(ref.group(1)))
        if not target or target[1] is None:
            continue
        cdict, blob = target
        if b"FlateDecode" in cdict:
            try:
                blob = zlib.decompress(blob)
            except zlib.error:
                continue
        stream = blob.decode("latin-1", "replace")
        out.append({
            "text_ops": len(TEXT_OP_RE.findall(stream)),
            "draw_ops": len(DRAW_OP_RE.findall(stream)),
        })
    return out


def main():
    patterns = sys.argv[1:] or ["job-search/CVs/*.pdf"]
    files = []
    for p in patterns:
        files.extend(sorted(glob.glob(p)))
    problems = 0
    for f in files:
        stats = page_stats(f)
        over = len(stats) > 2
        if over:
            problems += 1
        print("%-44s %d page(s)%s"
              % (os.path.basename(f), len(stats), "   <-- OVER 2 PAGES" if over else "   OK"))
        for i, s in enumerate(stats, 1):
            total = s["text_ops"] + s["draw_ops"]
            note = "   <-- nearly empty, bad break" if total < SPARSE_THRESHOLD else ""
            if note:
                problems += 1
            print("   p%d  %4d text ops, %4d draw ops%s" % (i, s["text_ops"], s["draw_ops"], note))
        print()
    print("problems: %d" % problems)
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
