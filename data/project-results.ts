export interface ProjectResult {
  summary: string
  metrics: { value: string; label: string }[]
  context: string
}

/** Technical results supported by the existing case studies and source review. */
export const projectResults: Record<string, ProjectResult> = {
  'kalash-accounts': {
    summary: 'Document processing, reviewed Tally imports and reconciliation in one desktop application.',
    metrics: [
      { value: '4', label: 'Accounting workflows' },
      { value: 'HTTP/XML', label: 'TallyPrime integration' },
    ],
    context: 'Covers bank statements, broker contract notes, rent invoices and inter-company loans. Internal company project.',
  },
  'next-move-job-agent': {
    summary: 'A deployed workspace that combines job discovery, application tracking and scheduled email digests.',
    metrics: [
      { value: '7', label: 'Employer boards integrated' },
      { value: '96+', label: 'Automated checks' },
    ],
    context: 'Employer-board coverage supplements public job feeds. Checks cover backend and browser-DOM behavior.',
  },
  'jvvnl-bill-automation': {
    summary: 'Utility-portal bill downloads consolidated into structured Excel records.',
    metrics: [
      { value: '3', label: 'PDF layouts supported' },
      { value: 'Excel', label: 'Consolidated output' },
    ],
    context: 'Selenium handles the utility portal, OCR supports login, and pdfplumber extracts the supported bill layouts.',
  },
  'customer-churn-prediction': {
    summary: 'A churn model and Streamlit dashboard that connect predictions to retention review.',
    metrics: [
      { value: '0.845', label: 'ROC-AUC' },
      { value: '80.4%', label: 'Churn recall' },
    ],
    context: 'Offline evaluation on a 7,043-customer dataset. The case study also reports false alarms and precision.',
  },
}
