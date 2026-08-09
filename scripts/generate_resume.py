"""Generate public/resume/aakshat-agarwal.pdf.

The résumé is a build artifact, not a hand-edited file. Regenerate it here so the
claims in it can be kept in step with the site and the repos:

    python scripts/generate_resume.py

Layout reproduces the previous PDF — US Letter, 45.6pt margins, Helvetica
throughout — with two changes: Breast Mass Classification replaces the AI Resume
Analyzer, and the bullet glyph is a real bullet.

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

from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    HRFlowable,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
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


def section(label):
    return [
        Paragraph(label, SECTION),
        HRFlowable(
            width=CONTENT_WIDTH, thickness=0.7, color="black", spaceBefore=1, spaceAfter=4
        ),
    ]


def bullets(*items):
    return [Paragraph(t, BULLET, bulletText=BULLET_GLYPH) for t in items]


def entry(heading, tech=None, date=None):
    """A project or job heading, optionally with a tech stack or a date line."""
    out = []
    if tech:
        out.append(Paragraph(f"<b>{heading} | </b><b><i>{tech}</i></b>", ENTRY))
    else:
        out.append(Paragraph(heading, ENTRY))
    if date:
        out.append(Paragraph(date, DATE))
    return out


story = []

# Header
story += [
    Paragraph("Aakshat Agarwal", NAME),
    Paragraph("Data Analyst", TITLE),
    Paragraph(
        "Jaipur, Rajasthan, India | +91 79768 07739 | aakshatagarwal2004@gmail.com",
        CONTACT,
    ),
    Paragraph(
        "linkedin.com/in/aakshatagarwal | github.com/Aaksh26at | "
        "portfolio-seven-lemon-63.vercel.app",
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
)
story += bullets(
    "Built an ML pipeline on a 7,043-customer telecom dataset reaching 0.845 ROC-AUC "
    "and catching 80.4% of churners, against a never-churn baseline of 0% recall.",
    "Reported the operating cost honestly — 1,501 churners caught against 1,422 "
    "false alarms — and shipped a Streamlit app translating predictions into "
    "retention actions.",
)

story += entry("Fire Risk Classification from Weather", tech="Python, Scikit-learn, Flask")
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
