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

    if failures:
        for f in failures:
            print(f"FAIL: {f}")
        sys.exit(1)

    print(f"OK: {PDF.name}, 1 page, {len(text)} chars of drawn text, no bad glyphs")


if __name__ == "__main__":
    main()
