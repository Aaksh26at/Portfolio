"""Generate public/resume/aakshat-agarwal.pdf.

The résumé is a build artifact, not a hand-edited file. Regenerate it here so the
claims in it can be kept in step with the site and the repos:

    python scripts/generate_resume.py

Layout reproduces the previous PDF — US Letter, 45.6pt margins, Helvetica
throughout — with two changes: Breast Mass Classification replaces the AI Resume
Analyzer, and the bullet glyph is a real bullet.

Each project carries a GitHub link, right-aligned onto the heading's own line
via a two-column table. It has to go there rather than on a line of its own:
the page had about 30pt of slack, and four extra lines would have pushed it to
two pages. `_assert_fits` fails the build if a heading and its link no longer
share a line, since the wrap would be silent and the overflow only visible in
the page count. The header's contact URLs are linked too, but left black —
they already read as URLs.

Note on bullets, because there are two separate traps here:

1. ReportLab's ListFlowable defaults to start='bullet' when bulletType='bullet'
   and renders that as the literal word. The previous PDF printed "bullet"
   before all twelve points.
2. U+2022 (•) does not survive this ReportLab build. Its WinAnsi vector lists
   glyph 'bullet' at seven codes (127, 129, 141, 143, 144, 149, 157) and the
   unicode-to-Type1 conversion takes the first, emitting 0x7F — a control
   character. It renders only because the PDF spec maps unused WinAnsi codes to
   bullet, and it extracts as DEL. U+00B7 (·, periodcentered) maps uniquely to
   0xB7, so it is unambiguous to both viewers and ATS text extraction.

Verify after any change with `python scripts/check_resume.py`.
"""

from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_CENTER, TA_RIGHT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.platypus import (
    HRFlowable,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

OUT = Path(__file__).resolve().parent.parent / "public" / "resume" / "aakshat-agarwal.pdf"

MARGIN = 45.6
CONTENT_WIDTH = letter[0] - 2 * MARGIN  # 520.8

NAME = ParagraphStyle(
    "name", fontName="Helvetica-Bold", fontSize=17.5, leading=20, alignment=TA_CENTER
)
TITLE = ParagraphStyle(
    "title", fontName="Helvetica", fontSize=9.8, leading=12, alignment=TA_CENTER
)
CONTACT = ParagraphStyle(
    "contact", fontName="Helvetica", fontSize=8.1, leading=10, alignment=TA_CENTER
)
SECTION = ParagraphStyle(
    "section", fontName="Helvetica-Bold", fontSize=9.8, leading=12, spaceBefore=7.5
)
BODY = ParagraphStyle("body", fontName="Helvetica", fontSize=8.35, leading=10.4)
ENTRY = ParagraphStyle(
    "entry", fontName="Helvetica-Bold", fontSize=8.9, leading=11, spaceBefore=5
)
DATE = ParagraphStyle("date", fontName="Helvetica-Oblique", fontSize=8.1, leading=10.4)
BULLET = ParagraphStyle(
    "bullet",
    fontName="Helvetica",
    fontSize=8.35,
    leading=10.4,
    leftIndent=12,
    bulletIndent=0,
    bulletFontName="Helvetica",
    bulletFontSize=9,
    spaceBefore=1.5,
)

BULLET_GLYPH = "·"  # periodcentered — see module docstring

REPO_BASE = "https://github.com/Aaksh26at/"
LINK_COLOR = HexColor(0x1F3D7A)

# Sits in the right-hand cell of a project heading row. See the TOPPADDING note
# in entry() for why the leading is short by BASELINE_DROP.
BASELINE_DROP = 8.9 - 7.6  # ENTRY.fontSize - LINK.fontSize

LINK = ParagraphStyle(
    "link",
    fontName="Helvetica",
    fontSize=7.6,
    leading=11 - BASELINE_DROP,
    alignment=TA_RIGHT,
    textColor=LINK_COLOR,
)


def section(label):
    return [
        Paragraph(label, SECTION),
        HRFlowable(
            width=CONTENT_WIDTH, thickness=0.7, color="black", spaceBefore=1, spaceAfter=4
        ),
    ]


def bullets(*items):
    return [Paragraph(t, BULLET, bulletText=BULLET_GLYPH) for t in items]


def entry(heading, tech=None, date=None, repo=None):
    """A project or job heading, optionally with a tech stack, date, or repo.

    `repo` is a bare repository name under REPO_BASE. It renders as a
    right-aligned link sharing the heading's own line, laid out as a
    two-column table so it costs no vertical space: the page has roughly
    30pt of slack, and four extra lines would not fit.

    The link column is measured to its text rather than fixed, so the heading
    keeps every remaining point. `_assert_fits` fails the build if a heading
    would still wrap, because a wrapped heading overflows the page silently.
    """
    out = []
    if tech:
        head = Paragraph(f"<b>{heading} | </b><b><i>{tech}</i></b>", ENTRY)
    else:
        head = Paragraph(heading, ENTRY)

    if repo:
        label = f"GitHub: {repo}"
        right_w = stringWidth(label, LINK.fontName, LINK.fontSize) + 6
        _assert_fits(heading, tech, CONTENT_WIDTH - right_w)
        row = Table(
            [[head, Paragraph(f'<link href="{REPO_BASE}{repo}">{label}</link>', LINK)]],
            colWidths=[CONTENT_WIDTH - right_w, right_w],
            style=TableStyle(
                [
                    ("LEFTPADDING", (0, 0), (-1, -1), 0),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                    ("TOPPADDING", (0, 0), (-1, -1), 0),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    # ReportLab puts a paragraph's first baseline one font size
                    # below the cell top, so the smaller link would otherwise
                    # ride that difference high. Push it down by exactly that,
                    # and take the same amount off its leading so the row does
                    # not grow taller than the heading it sits beside.
                    ("TOPPADDING", (1, 0), (1, 0), BASELINE_DROP),
                ]
            ),
        )
        row.spaceBefore = ENTRY.spaceBefore
        out.append(row)
    else:
        out.append(head)

    if date:
        out.append(Paragraph(date, DATE))
    return out


def _assert_fits(heading, tech, available):
    """Fail loudly if a heading plus its tech stack would wrap.

    Entities are unescaped first: `&amp;` is five characters of markup that
    draws as one glyph, and measuring it raw would overstate the width by
    enough to reject a heading that actually fits.
    """
    plain = lambda s: s.replace("&amp;", "&").replace("&lt;", "<").replace("&gt;", ">")
    used = stringWidth(f"{plain(heading)} | ", ENTRY.fontName, ENTRY.fontSize)
    if tech:
        used += stringWidth(plain(tech), "Helvetica-BoldOblique", ENTRY.fontSize)
    if used > available:
        raise SystemExit(
            f"ERROR: heading {heading!r} needs {used:.1f}pt but only "
            f"{available:.1f}pt is left beside its link; shorten one of them."
        )


story = []

# Header
story += [
    Paragraph("Aakshat Agarwal", NAME),
    Paragraph("Data Analyst", TITLE),
    # The header URLs were already spelled out but were dead text in the PDF.
    # They are linked here and left black: the text is visibly a URL already,
    # so colouring it would change the look without telling a reader anything.
    Paragraph(
        "Jaipur, Rajasthan, India | "
        '<link href="tel:+917976807739">+91 79768 07739</link> | '
        '<link href="mailto:aakshatagarwal2004@gmail.com">'
        "aakshatagarwal2004@gmail.com</link>",
        CONTACT,
    ),
    Paragraph(
        '<link href="https://linkedin.com/in/aakshatagarwal">'
        "linkedin.com/in/aakshatagarwal</link> | "
        '<link href="https://github.com/Aaksh26at">github.com/Aaksh26at</link> | '
        '<link href="https://portfolio-seven-lemon-63.vercel.app">'
        "portfolio-seven-lemon-63.vercel.app</link>",
        CONTACT,
    ),
    Spacer(1, 4),
]

story += section("PROFESSIONAL SUMMARY")
story += [
    Paragraph(
        "Data analyst with hands-on experience turning raw data into reports and "
        "decisions using Python, SQL and Excel. Built data pipelines, dashboards and "
        "machine-learning models across academic and work projects. Seeking a data "
        "analyst role where I can deliver clear, actionable insights.",
        BODY,
    )
]

story += section("TECHNICAL SKILLS")
for label, items in [
    ("Languages &amp; Tools", "Python, SQL, Advanced Excel, Google Sheets, Git, GitHub, Jupyter, VS Code"),
    ("Data Analysis", "Pandas, NumPy, Exploratory Data Analysis, Data Cleaning, Feature Engineering, Statistical Analysis"),
    ("Visualization &amp; BI", "Power BI, Matplotlib, Seaborn, Streamlit, KPI &amp; Dashboard Reporting"),
    ("Machine Learning", "Scikit-learn, Regression, Classification, Model Evaluation, Cross-Validation, Threshold Tuning"),
    ("Databases &amp; Backend", "MySQL, PostgreSQL, SQL Query Optimization, Flask, REST APIs"),
    ("Web Scraping", "Requests, BeautifulSoup, Selenium, OCR-based PDF extraction (ddddocr)"),
]:
    story.append(Paragraph(f"<b>{label}:</b>  {items}", BODY))

story += section("EXPERIENCE")
story += entry("Data / CRM Executive — Kalash Group, Jaipur", date="May 2026 – Present")
story += bullets(
    "Built and maintained CRM lead-tracking reports in Excel, consolidating scattered "
    "lead data into structured trackers for sales follow-up and reporting.",
    "Developed a Python automation tool to retrieve and digitize electricity bill data, "
    "cutting a manual, repetitive task down to an automated pipeline that outputs clean "
    "Excel records.",
)

story += section("PROJECTS")

story += entry(
    "Electricity Bill Data Scraper &amp; Extractor",
    tech="Python, Selenium, pdfplumber, ddddocr, Pandas",
    repo="jvvnl-bill-scraper",
)
story += bullets(
    "Built an end-to-end automation that logs into a utility portal by consumer (K) "
    "number, downloads PDF bills, and extracts billing data into a consolidated Excel "
    "dataset.",
    "Used OCR (ddddocr) to automate the login step and pdfplumber to parse three "
    "different bill layouts, removing hours of manual data entry.",
)

story += entry(
    "Breast Mass Classification — Wisconsin Diagnostic",
    tech="Python, Scikit-learn, Streamlit",
    repo="Cancer_Predict_streamlit",
)
story += bullets(
    "Classified breast masses from 30 cytology measurements, selecting an RBF-kernel "
    "SVM on malignant recall — 97.07% ± 3.27 against a majority-class baseline "
    "that catches none — over 50 fits of repeated stratified cross-validation.",
    "Moved the decision threshold off the 0.5 default to 0.225 by costing a missed "
    "malignancy at 10× a false alarm, trading nine extra false positives for two "
    "more cancers caught, and shipped the threshold inside the model artifact.",
)

story += entry(
    "Customer Churn Prediction &amp; Retention Dashboard",
    tech="Python, Scikit-learn, Pandas, Streamlit",
    repo="telco-churn-prediction",
)
story += bullets(
    "Built an ML pipeline on a 7,043-customer telecom dataset reaching 0.845 ROC-AUC "
    "and catching 80.4% of churners, against a never-churn baseline of 0% recall.",
    "Reported the operating cost honestly — 1,501 churners caught against 1,422 "
    "false alarms — and shipped a Streamlit app translating predictions into "
    "retention actions.",
)

story += entry(
    "Fire Risk Classification from Weather",
    tech="Python, Scikit-learn, Flask",
    repo="Algerian_Fire_Forest",
)
story += bullets(
    "Classified fire occurrence in Algerian forest data from weather variables alone, "
    "reaching 0.938 ROC-AUC against a 0.500 baseline.",
    "Identified and removed the Fire Weather Index features that were reproducing the "
    "label, and validated with GroupKFold over region-month to prevent correlated days "
    "leaking across folds.",
)

story += section("EDUCATION")
story += [
    Paragraph(
        "Master of Computer Applications (MCA), Computer Science — University of "
        "Rajasthan, Jaipur (2024–2026)",
        BODY,
    ),
    Paragraph(
        "Bachelor of Computer Applications (BCA), Computer Science — University of "
        "Rajasthan, Jaipur (2021–2024)",
        BODY,
    ),
]

story += section("CERTIFICATIONS")
story += bullets(
    "AWS Solutions Architecture — Job Simulation, Forage (2024)",
    "Data Analytics — Job Simulation, Deloitte Australia via Forage (2024)",
    "Software Engineering — Job Simulation, JPMorgan Chase &amp; Co. via Forage (2024)",
    "Data Science 101 Certification (2023)",
)


def build():
    OUT.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(OUT),
        pagesize=letter,
        leftMargin=MARGIN,
        rightMargin=MARGIN,
        topMargin=MARGIN,
        bottomMargin=MARGIN,
        title="Aakshat Agarwal - Resume",
        author="Aakshat Agarwal",
        subject="Data Analyst",
    )
    doc.build(story)
    print(f"wrote {OUT} ({OUT.stat().st_size} bytes, {doc.page} page(s))")
    if doc.page > 1:
        raise SystemExit(f"ERROR: résumé ran to {doc.page} pages; it must fit one.")


if __name__ == "__main__":
    build()
