import type { Project } from '@/types'

/** Public case studies use implementation facts, never private company records. */
export const automationProjects: Project[] = [
  {
    slug: 'kalash-accounts',
    title: 'Kalash Accounts - Tally Automation Platform',
    year: '2026',
    status: 'shipped',
    featured: true,
    tagline: 'Accounting documents to reviewed Tally vouchers, with reconciliation built into the workflow.',
    description:
      'A Python/PySide6 desktop application for bank-statement processing, broker contract notes, rental invoices and inter-company loan reconciliation. It connects to TallyPrime through HTTP/XML and keeps review decisions visible before accounting entries are imported.',
    problem:
      'Accounting work spans different document formats, company books and ledger names. Moving figures between spreadsheets and Tally is only part of the problem: incomplete inputs, ambiguous mappings and a repeated import can change the books incorrectly.',
    approach:
      'Separate parsing, financial calculations, company-scoped mapping, review and Tally transport. Use Decimal arithmetic, explicit reconciliation states, duplicate-voucher preflights and configurable second-person approval. Keep read operations separate from imports and package the review interface as a Windows desktop app.',
    technologies: ['Python', 'PySide6', 'TallyPrime', 'HTTP / XML', 'openpyxl', 'pdfplumber', 'ReportLab', 'PyInstaller'],
    keyResult: 'One desktop workflow for document processing, reviewed accounting imports and reconciled reports.',
    achievements: [
      'Integrated TallyPrime company, ledger, voucher and balance reads with explicit HTTP/XML import operations.',
      'Built workflows for bank statements, broker contract notes, rent invoicing and inter-company loan reconciliation.',
      'Kept company-specific ledger choices and learned mapping rules separate from unapproved suggestions.',
      'Added duplicate-voucher checks and configurable maker-checker approval that prevents the preparer approving their own work.',
      'Produced Excel reconciliation workbooks and PDF rental invoices, and configured Windows packaging with PyInstaller.',
      'Maintained regression tests around parsing, financial calculations, XML transport, duplicate detection and shared-master conflicts.',
    ],
    caseStudy: [
      {
        heading: 'A review workflow, not a blind import',
        body: 'The application separates document reading from accounting writes. Parsed transactions are reviewed against the selected company and its ledger masters before a file is exported or entries are sent to Tally. Unknown mappings and incomplete inputs remain review cases rather than silently becoming accounting assumptions.',
      },
      {
        heading: 'Tally integration with a deliberate write boundary',
        body: 'The Tally client sends XML over HTTP and reads the resulting import counts and error messages. Reads can retry, but a direct import is deliberately not retried automatically: a delayed reply may mean Tally already accepted the vouchers. Duplicate preflights reduce repeat imports without claiming an atomic transaction across accountant PCs.',
      },
      {
        heading: 'Financial arithmetic and reconciliation',
        body: 'Decimal-based calculations feed bank, rent and inter-company workflows. The loan engine compares counterparties across company books, identifies matched, mismatched, one-sided and missing-data cases, and checks aggregate positions against pair differences. These are explicit accounting rules with review output, not an LLM making financial decisions.',
      },
      {
        heading: 'Human decisions stay scoped',
        body: 'Ledger mappings and transaction corrections are scoped to their relevant company and workflow. Optional maker-checker approval checks a second person through a salted PIN hash and prevents self-approval. Approval logging is implemented, but its current best-effort write behavior is not presented as a guaranteed immutable audit trail.',
      },
      {
        heading: 'Desktop delivery and testable boundaries',
        body: 'PySide6 provides the review screens, while parsing, calculation and transport live in separate Python modules. The project includes a PyInstaller Windows build and regression tests using mocked Tally transport. Source review confirms these implementations; it does not establish that every workflow has passed live office acceptance.',
      },
      {
        heading: 'Scope and access',
        body: 'This is an internal Kalash Group project. Company source code, financial records and account credentials are not published here. The architecture illustration is a diagram, not a screenshot of company data. Supported text-based statement and contract-note formats are parsed; general scanned-document OCR is not claimed.',
      },
    ],
    metrics: [
      { value: 'HTTP/XML', label: 'Tally integration' },
      { value: 'PySide6', label: 'Desktop review UI' },
      { value: 'Decimal', label: 'Financial arithmetic' },
      { value: 'Windows', label: 'Packaged application' },
    ],
    links: { sourceLabel: 'Internal company source' },
    accent: 'blue',
  },
  {
    slug: 'next-move-job-agent',
    title: 'Next Move - AI Job Search & Application Agent',
    year: '2026',
    status: 'shipped',
    featured: true,
    tagline: 'A deployed search companion that finds opportunities, tracks applications and prepares the next step.',
    description:
      'A personal job-search workspace built with a custom Python tool-calling agent, Flask, Gemini and Supabase. It combines real job feeds, resume-based matching, application timelines, interview practice and scheduled email digests.',
    problem:
      'Searching repeatedly can surface the same vacancies, while application dates and follow-ups disappear into notes. A useful assistant needs real source data, durable state and honest freshness information, rather than generated listings or an unexplained match score.',
    approach:
      'Use provider adapters and bounded pagination for discovery, keyword-based matching for explainable scores, and a constrained tool-calling loop for assistance. Persist workspace state in Supabase and trigger the existing authenticated service from GitHub Actions, with Resend handling the daily digest.',
    technologies: ['Python', 'Flask', 'Gemini', 'Supabase', 'GitHub Actions', 'Resend', 'JavaScript'],
    keyResult: 'A live personal workspace with daily digests, persistent application history and job-specific interview practice.',
    achievements: [
      'Expanded discovery to three broad Himalayas pages per role, an entry-level pass and seven India-focused employer boards alongside Remotive.',
      'Distinguished newly discovered vacancies from previous matches and exposed cache fetch and refresh times.',
      'Batched provider-cache persistence to avoid transferring the whole database cache separately for every feed.',
      'Implemented a daily India-time digest with persisted delivery state, frozen retry payloads and provider idempotency keys.',
      'Added application dates, seven-day follow-up flags, interview schedules and deadlines to both the workspace and email digest.',
      'Validated backend and DOM behavior with more than 96 automated checks, including authentication, persistence, retry safety and unsafe Markdown handling.',
    ],
    caseStudy: [
      {
        heading: 'Real feeds, bounded coverage',
        body: 'Remotive and Himalayas supply public remote listings. Seven selected employer boards add India-eligible on-site and hybrid openings. Himalayas discovery uses up to three broad pages per role plus an entry-level pass, with bounded network concurrency. This is targeted coverage, not a crawl of every Indian job board.',
      },
      {
        heading: 'Explain the match and its limits',
        body: 'Scores reflect explicit skill overlap, title relevance and experience warnings. They are not a hiring probability. Company/title identities help suppress repeated vacancies across changed URLs while keeping application notes and interview answers. Provider cache and publication delays remain visible instead of being labelled fresh on every click.',
      },
      {
        heading: 'A custom agent over real tools',
        body: 'The Python agent uses structured tool calls for reading the resume profile, searching jobs and helping with tracking and drafts. Gemini is the hosted model; Flask serves the workspace and Supabase persists state. This is a custom agent loop, not a LangGraph or CrewAI implementation. The applicant still submits applications through employer websites.',
      },
      {
        heading: 'Scheduling without an always-on PC',
        body: 'GitHub Actions calls the authenticated Render service around 9:00 AM India time, with 9:35 and 10:35 AM catch-up checks. A missed scheduled event led to adding those checks. GitHub scheduling is best effort; the application records a completed digest by India calendar day so catch-up checks do not resend it.',
      },
      {
        heading: 'Retry-safe delivery and useful failures',
        body: 'A digest is saved before contacting Resend, then reused with the same idempotency key on retry. An uncertain delivery older than the supported retry window stops for review rather than being silently resent. If job feeds fail but saved application reminders are due, a clearly labelled reminder-only email can still be sent.',
      },
      {
        heading: 'From discovery to the next action',
        body: 'Application dates, actual employer responses and sent follow-ups determine seven-day follow-up flags. The workspace shows interviews and deadlines for the next 30 days; daily email includes the next seven days. Interview practice saves answers and requests job-specific AI feedback without inventing candidate experience.',
      },
      {
        heading: 'Public case study, private workspace',
        body: 'The application is deployed on Render, but the personal workspace requires sign-in and its source repository is private. The link below is labelled accordingly. This page documents the implementation; it does not promise public access to the workspace or expose resume records, credentials or application history.',
      },
    ],
    metrics: [
      { value: '7', label: 'Employer boards integrated' },
      { value: '96+', label: 'Automated checks' },
      { value: '7 days', label: 'Follow-up interval' },
      { value: '1/day', label: 'Completed daily digest' },
    ],
    links: {
      sourceLabel: 'Private source repository',
      demo: 'https://next-move-job-agent.onrender.com/',
      demoLabel: 'Personal app - sign-in required',
    },
    accent: 'cyan',
  },
]
