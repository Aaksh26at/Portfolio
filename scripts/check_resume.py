"""Verify public/resume/aakshat-agarwal.pdf is sane before it ships.

    python scripts/check_resume.py

Checks the generated PDF rather than the generating code, because the failures
that mattered here were both encoding-level and invisible in the source: a
bullet that rendered as the literal word "bullet", and one that rendered as a
control character. Exits non-zero on any failure.
"""

import base64
import re
import sys
import zlib
from pathlib import Path

PDF = Path(__file__).resolve().parent.parent / "public" / "resume" / "aakshat-agarwal.pdf"


def content_streams(data):
    out = []
    for m in re.finditer(rb"stream\r?\n", data):
        start = m.end()
        end = data.find(b"endstream", start)
        if end == -1:
            continue
        raw = re.sub(rb"\s", b"", data[start:end])
        if raw.endswith(b"~>"):
            raw = raw[:-2]
        for dec in (
            lambda b: zlib.decompress(base64.a85decode(b, adobe=False)),
            zlib.decompress,
        ):
            try:
                out.append(dec(raw))
                break
            except Exception:
                continue
    return b"\n".join(out).decode("latin-1")


def drawn_text(stream):
    frags = re.findall(r"\((?:[^()\\]|\\.)*\)", stream)
    return " ".join(f[1:-1] for f in frags)


def link_box_collisions():
    """Catch link annotations that close over the text line above them.

    ReportLab sizes a link's clickable box from its baseline up by a full font
    size, which is taller than a tightly-led line. Nothing is drawn, so the
    rendered page looks perfect and every text check here passes — but viewers
    that outline links rule a line through the neighbouring text, which is how
    this was found: by eye, in a PDF reader, after it had shipped.
    """
    try:
        import pymupdf
    except ImportError:
        return ["pymupdf is needed to check link boxes — pip install pymupdf"]

    page = pymupdf.open(PDF)[0]
    spans = [
        (s["bbox"][1], s["bbox"][3], s["text"].strip())
        for b in page.get_text("dict")["blocks"]
        for line in b.get("lines", [])
        for s in line["spans"]
        if s["text"].strip()
    ]

    out = []
    for link in page.get_links():
        uri, box = link.get("uri"), link["from"]
        if not uri:
            continue
        for top, bottom, text in spans:
            # Its own line starts at or below the box top; anything whose
            # bottom edge falls inside the box is a line it has swallowed.
            if box.y0 < bottom <= box.y1 and top < box.y0:
                out.append(
                    f"link box for {uri} (top {box.y0:.2f}) overlaps {text[:34]!r} "
                    f"above it (bottom {bottom:.2f}) — increase the leading"
                )
    return out


def main():
    if not PDF.exists():
        sys.exit(f"FAIL: {PDF} does not exist — run scripts/generate_resume.py")

    data = PDF.read_bytes()
    stream = content_streams(data)
    text = drawn_text(stream)
    failures = []

    pages = len(re.findall(rb"/Type\s*/Page[^s]", data))
    if pages != 1:
        failures.append(f"résumé is {pages} pages; it must be exactly 1")

    if re.search(r"\(bullet\)\s*Tj", stream):
        failures.append('the literal word "bullet" is drawn as a bullet glyph')

    for octal, why in (("177", "DEL"), ("201", "unused"), ("215", "unused")):
        if f"\\{octal}" in text:
            failures.append(
                f"control character \\{octal} ({why}) is drawn — use a glyph "
                f"with a unique WinAnsi code"
            )

    required = [
        "Aakshat Agarwal",
        "Breast Mass Classification",
        "Customer Churn Prediction",
        "Fire Risk Classification",
        "Electricity Bill Data Scraper",
        "Kalash Group",
        "97.07%",
        "0.845 ROC-AUC",
        "0.938 ROC-AUC",
    ]
    for needle in required:
        if needle not in text:
            failures.append(f"missing expected content: {needle!r}")

    # Dropped from the résumé on 2026-08-09 to keep it to one page; still on the site.
    if "Resume Analyzer" in text:
        failures.append("AI Resume Analyzer is back on the résumé — page will overflow")

    # Links are checked as annotations, not as drawn text. A URL that is only
    # painted looks identical on the page but is not clickable, and that is
    # exactly the failure a reader would hit and the author would never see.
    uris = {m.decode("latin-1") for m in re.findall(rb"/URI\s*\(([^)]*)\)", data)}
    for expected in (
        "https://github.com/Aaksh26at/jvvnl-bill-scraper",
        "https://github.com/Aaksh26at/Cancer_Predict_streamlit",
        "https://github.com/Aaksh26at/telco-churn-prediction",
        "https://github.com/Aaksh26at/Algerian_Fire_Forest",
        "https://github.com/Aaksh26at",
        "https://linkedin.com/in/aakshatagarwal",
        "https://aakshatagarwal.vercel.app",
        "mailto:aakshatagarwal2004@gmail.com",
    ):
        if expected not in uris:
            failures.append(f"no clickable link annotation for {expected}")

    # Each project link must also be readable on paper, where nothing is clickable.
    for repo in (
        "jvvnl-bill-scraper",
        "Cancer_Predict_streamlit",
        "telco-churn-prediction",
        "Algerian_Fire_Forest",
    ):
        if f"GitHub: {repo}" not in text:
            failures.append(f"project link for {repo} is not drawn as visible text")

    failures += link_box_collisions()

    if failures:
        for f in failures:
            print(f"FAIL: {f}")
        sys.exit(1)

    print(f"OK: {PDF.name}, 1 page, {len(text)} chars of drawn text, no bad glyphs")


if __name__ == "__main__":
    main()
