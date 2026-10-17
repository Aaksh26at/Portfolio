import type { PortfolioData } from '@/types'

/* ============================================================================
   CENTRAL PORTFOLIO CONTENT
   ----------------------------------------------------------------------------
   This is the single source of truth for the whole site. Edit values here and
   every section updates automatically — you should not need to touch the page
   components for normal content changes.

   Rules kept while writing this file:
     • No invented employment, clients, testimonials, revenue or statistics.
     • Job simulations are labelled as simulations, never as employment.
     • Metrics only appear where the CV supports them.
   ============================================================================ */

export const portfolio: PortfolioData = {
  person: {
    name: 'Aakshat Agarwal',
    initials: 'AA',
    role: 'Data Analyst · AI/ML Enthusiast · Python Developer',
    supportingRole:
      'Building intelligent data products, predictive models, dashboards and scalable analytical solutions.',
    location: 'Jaipur, Rajasthan, India',
    email: 'aakshatagarwal2004@gmail.com',
    phone: '+91 79768 07739',
    resumePath: '/resume/aakshat-agarwal.pdf',
    summary:
      'Aakshat Agarwal is a data and technology professional with skills in Python, SQL, business intelligence, predictive modelling, data analysis, ETL pipeline design, machine learning, cloud services, APIs and dashboard development. He has experience building end-to-end machine-learning applications, interactive dashboards, REST APIs, data-processing pipelines and statistical analyses, and is interested in contributing to data-driven teams that solve real-world business problems using technology.',
    socials: [
      { label: 'GitHub', href: 'https://github.com/Aaksh26at', icon: 'github' },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/aakshatagarwal', icon: 'linkedin' },
      { label: 'Email', href: 'mailto:aakshatagarwal2004@gmail.com', icon: 'mail' },
      { label: 'Phone', href: 'tel:+917976807739', icon: 'phone' },
    ],
  },

  nav: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Contact', href: '#contact' },
  ],

  hero: {
    availability: 'Available for Data, AI/ML and Python opportunities',
    heading: 'Turning data into',
    headingAccent: 'intelligent, actionable products.',
    supportingHeading:
      'I build data-driven applications, predictive models and analytical experiences.',
    paragraph:
      "I'm Aakshat Agarwal, a data and technology professional from Jaipur working with Python, SQL, machine learning, business intelligence, cloud tools and backend technologies.",
    trustIndicators: [
      'Based in Jaipur, India',
      'Open to opportunities',
      'Python · SQL · Machine Learning · Power BI',
      'Building AI automations at Kalash Group',
    ],
    floatingMetrics: [
      { value: '97%', label: 'Malignant recall' },
      { value: '0.938', label: 'Fire model ROC-AUC' },
      { value: '5', label: 'Shipped projects' },
    ],
  },

  snapshot: {
    roles: [
      'Data Analyst',
      'Data Scientist',
      'AI/ML Engineer',
      'Python Developer',
      'Backend Developer',
      'Data Engineer',
    ],
    strengths: [
      'Python & SQL',
      'Machine-learning pipelines',
      'Data cleaning & EDA',
      'Predictive modelling',
      'ETL pipelines',
      'REST APIs',
      'Power BI & Tableau',
      'Cloud fundamentals',
      'Business intelligence',
      'Data-driven problem solving',
    ],
    metrics: [
      { value: '97.07%', label: 'Malignant recall vs 0% baseline' },
      { value: '30', label: 'Clinical attributes analysed' },
      { value: '0.9957', label: 'ROC-AUC, cancer classifier' },
      { value: '<1s', label: 'Streamlit inference' },
      { value: '0.938', label: 'Fire model ROC-AUC' },
      { value: '5', label: 'Production-style projects' },
    ],
  },

  about: {
    paragraphs: [
      'I enjoy converting raw information into useful products, insights and automated solutions. My work spans data analysis, machine learning, dashboard development, API creation and data-pipeline design. I am especially interested in projects where analytical thinking and software development work together to solve a practical problem.',
      'Alongside technical development, I am strengthening my understanding of AI, machine learning, Python, SQL, data engineering and backend systems through continuous learning and project-based practice.',
    ],
    personalDetails: [
      'Located in Jaipur, India',
      'Interested in AI and data products',
      'Enjoys building practical projects',
      'Open to networking and collaboration',
      'Focused on continuous learning',
    ],
  },

  projects: [
    {
      slug: 'breast-cancer-prediction',
      title: 'Breast Cancer Prediction Web App',
      year: '2025',
      status: 'shipped',
      featured: true,
      tagline: 'Classifying breast masses where a missed cancer costs more than a false alarm.',
      description:
        'A Streamlit classifier that labels a breast mass malignant or benign from 30 cell-nucleus measurements, tuned so that the errors it makes are the cheaper kind.',
      problem:
        'Accuracy is the wrong headline for this dataset. It is 62.7% benign, so a model that answers "benign" every time scores 62.74% and catches no cancers at all. The real target is recall on malignancy — and a decision threshold chosen to reflect what a miss actually costs.',
      approach:
        'Compared logistic regression, an RBF-kernel SVM and a random forest against an explicit majority-class baseline, scored with repeated stratified cross-validation — 10 folds by 5 repeats — rather than a single split. Selected the SVM on malignant recall with ROC-AUC as the tiebreaker, then moved the decision threshold off 0.5 by weighting a false negative as ten times costlier than a false alarm.',
      technologies: ['Python', 'Scikit-learn', 'SVM (RBF)', 'Streamlit', 'Pandas', 'NumPy'],
      keyResult: '97.07% malignant recall at a cost-weighted threshold, against a baseline that catches none',
      achievements: [
        'Scored every model against an explicit majority-class baseline — 62.74% ± 0.70 accuracy, 0% malignant recall, 0.500 ROC-AUC — so the headline number has something to beat.',
        'Selected an RBF-kernel SVM at 97.54% ± 1.72 accuracy, 97.07% ± 3.27 malignant recall and 0.9957 ROC-AUC, ahead of logistic regression (97.44%) and random forest (96.35%).',
        'Used repeated stratified cross-validation, 10 folds × 5 repeats, so each figure carries a spread rather than resting on one lucky seed.',
        'Tuned the decision threshold to 0.225 by weighting false negatives 10× false positives: nine more false alarms in exchange for two more cancers caught.',
        'Fixed a leakage bug where the scaler was fitted before the train-test split, and consolidated separate model and scaler pickles into a single pipeline artifact.',
      ],
      caseStudy: [
        {
          heading: 'Why accuracy is the wrong headline',
          body: 'The Wisconsin diagnostic dataset is 62.7% benign. A model that answers "benign" unconditionally therefore scores 62.74% accuracy while catching zero cancers. Any accuracy figure quoted without that number beside it is close to meaningless, which is why the baseline is reported alongside every model here.',
        },
        {
          heading: 'The data',
          body: '569 samples, each described by 30 numeric features computed from digitised images of cell nuclei — radius, texture, perimeter, area, smoothness and so on, each as a mean, a standard error and a worst-case value.',
        },
        {
          heading: 'Scoring that survives a reshuffle',
          body: 'A single train-test split on 569 rows moves by percentage points depending on the seed. Every model here is scored with repeated stratified cross-validation — 10 folds, 5 repeats — so each result comes with a standard deviation and the comparison between models means something.',
        },
        {
          heading: 'Model comparison',
          body: 'Against the 62.74% baseline: logistic regression reached 97.44% ± 1.93 accuracy with 96.68% malignant recall; the RBF-kernel SVM reached 97.54% ± 1.72 with 97.07% ± 3.27 recall and 0.9957 ROC-AUC; the random forest trailed at 96.35% with 93.88% recall. The SVM was selected on recall, with ROC-AUC breaking the tie against logistic regression.',
        },
        {
          heading: 'Moving the threshold off 0.5',
          body: 'The default 0.5 cutoff silently assumes a false alarm and a missed cancer cost the same. They do not. Weighting a false negative as ten times costlier puts the optimal threshold at 0.225 — which on this test set trades nine additional false alarms for two additional malignancies detected. That is the trade a screening tool should be making.',
        },
        {
          heading: 'A leakage bug worth naming',
          body: 'An earlier version fitted the feature scaler before splitting into train and test, letting test-set statistics inform the transform and flattering every score that followed. The scaler now lives inside the pipeline so it is refitted within each fold, and the model and scaler ship as one artifact rather than two pickles that could drift apart.',
        },
        {
          heading: 'Application interface',
          body: 'A Streamlit front end takes the clinical measurements and returns a malignant/benign call with its probability, using the tuned threshold rather than the default so the interface reflects the same cost assumption as the evaluation.',
        },
        {
          heading: 'What it is not',
          body: 'This is a classifier trained on one public dataset of 569 cases from a single source, evaluated by cross-validation rather than against an external cohort. It demonstrates a decision process. It is not a diagnostic instrument.',
        },
      ],
      metrics: [
        { value: '97.07%', label: 'Malignant recall' },
        { value: '0.9957', label: 'ROC-AUC' },
        { value: '62.74%', label: 'Baseline accuracy' },
        { value: '0.225', label: 'Tuned threshold' },
      ],
      links: {
        github: 'https://github.com/Aaksh26at/Cancer_Predict_streamlit',
        demo: '',
      },
      accent: 'violet',
    },
    {
      slug: 'jvvnl-bill-automation',
      title: 'JVVNL Electricity Bill Automation',
      year: '2026',
      status: 'shipped',
      featured: true,
      tagline: 'An unattended pipeline that collects, reads and files 34 utility bills a month.',
      description:
        'A scheduled Python system that logs into a state electricity portal, downloads every account\'s monthly bill, parses three different PDF layouts into one master ledger, works out what has actually been paid, and files each PDF where the accountant expects to find it.',
      problem:
        'Thirty-four electricity accounts were being handled by hand every month: log in, solve a CAPTCHA, pick each account, download the bill, read the numbers off it, type them into a spreadsheet, then save the PDF into the right client folder on a network drive. It is slow, it is dull, and every step is a place to make a quiet mistake that nobody catches until a payment is missed.',
      approach:
        'Selenium drives the portal login through a multi-engine CAPTCHA solver with escalating backoff and lockout detection. Downloaded bills go through a layout classifier into one of three dedicated parsers, because the same utility issues bills in English, in transliterated Hindi, and in Devanagari with CID-encoded fonts. Extracted fields merge into a single formatted workbook keyed on account and bill month, and a separate distribution step files each PDF into its per-client folder. The whole cycle runs from one idempotent entry point on Windows Task Scheduler.',
      technologies: ['Python', 'Selenium', 'pdfplumber', 'pandas', 'openpyxl', 'OpenCV', 'Tesseract / ddddocr'],
      keyResult: '34 accounts collected, parsed and filed without supervision',
      achievements: [
        'Built a layout classifier and three parsers so the same pipeline reads English, transliterated-Hindi and Devanagari bills, extracting 40+ fields from each.',
        'Replaced a text-order regex with a coordinate-based parser for solar bills, after the two-column layout made pdfplumber return a serial number — and once a day-of-month from a payment date — instead of the meter reading.',
        'Derived payment status from the utility\'s own ledger: the next bill\'s "Previous Outstanding" settles the previous one, so only the newest bill needs a portal check and every earlier verdict corrects itself.',
        'Made the run idempotent end to end — already-saved bills are not re-downloaded and already-filed PDFs are not re-copied — so it is safe to schedule hourly.',
        'Preserved the accountant\'s hand-typed columns across every automated rebuild of the sheet, keyed on account and bill month.',
        'Verified all 34 accounts field-by-field against their source PDFs: 34 matched, 0 mismatched.',
      ],
      caseStudy: [
        {
          heading: 'The manual loop being replaced',
          body: 'Every month, thirty-four accounts had to be pulled one at a time from the state electricity portal, read off the PDF, typed into a spreadsheet, and saved into the right client folder. The cost is not just the hours. It is that nothing about the process tells you when a number was mistyped or a bill was never fetched.',
        },
        {
          heading: 'Getting through the front door',
          body: 'The portal is behind a login with an image CAPTCHA. The solver tries ddddocr first, falls back to a Tesseract voting pass over several preprocessed variants of the image, then a paid service, then a human. Failures back off exponentially rather than retrying immediately, and an explicit lockout detector aborts the run and saves a resume point instead of hammering the login into a longer block.',
        },
        {
          heading: 'One utility, three bill layouts',
          body: 'The same provider issues bills in three forms: plain English, transliterated Hindi that extracts as ASCII noise, and Devanagari whose CID-encoded fonts come through as glyph codes. A classifier detects which one it is and dispatches to a parser written for that layout, so a single pipeline handles all of them instead of failing on two thirds of the accounts.',
        },
        {
          heading: 'When the text order lies',
          body: 'Solar bills carry a generator block that only appears on the English copy, in a two-column layout. Reading it with regex over extracted text worked until it did not: on one bill the pattern returned the right column\'s serial number, and on another it returned 13 — the day from a payment date printed on the same line — instead of a 2166 kWh reading. The fix pairs each label with the numeric value in its own row by word coordinates, and refuses the result unless net generation equals present minus previous.',
        },
        {
          heading: 'Payment status without asking',
          body: 'Rather than reconciling receipts for every bill, the system reads the utility\'s own arithmetic: the next month\'s bill states the previous outstanding, and a zero there means the earlier bill was settled. Only the newest bill, which has no successor yet, needs a receipt lookup. Every verdict becomes certain on its own once the following bill arrives, and the model distinguishes paid, unpaid, credit and nil rather than collapsing to a yes/no.',
        },
        {
          heading: 'Filing where a human would',
          body: 'Destinations are configuration, not code. Each account maps to a client folder; accounts without one share a fallback. The financial-year segment of every path is substituted at run time, so April needs no code change, and the month subfolder is matched against what already exists — if bills are filed under "June 2026", the new one joins them rather than starting a rival "June".',
        },
        {
          heading: 'Safe to run again',
          body: 'The scheduled entry point never rebuilds the workbook from scratch. New bills are added, existing rows are merged on account and bill month, PDFs already on disk are not re-downloaded, and files already filed are skipped by size comparison. That is what makes an hourly schedule reasonable: most runs correctly do nothing.',
        },
        {
          heading: 'Leaving room for the human',
          body: 'The accountant annotates each row by hand — payment mode, who paid, solar or not. Those columns are not part of the scraper\'s schema, so the canonical rebuild would drop them. They are snapshotted before the rewrite and reattached after, keyed on account and bill month, and unmatched new rows are left blank on purpose rather than guessed at.',
        },
      ],
      metrics: [
        { value: '34', label: 'Accounts automated' },
        { value: '3', label: 'Bill layouts parsed' },
        { value: '40+', label: 'Fields per bill' },
        { value: '34/34', label: 'Verified vs source PDFs' },
      ],
      links: {
        github: 'https://github.com/Aaksh26at/jvvnl-bill-scraper',
        demo: '',
      },
      accent: 'blue',
    },
    {
      // The slug is kept at its original value on purpose: it is a live URL,
      // and renaming it would break every link already shared. The project
      // itself is no longer an FWI regression — see the case study.
      slug: 'fire-weather-index',
      title: 'Fire Risk Classification from Weather',
      year: '2025',
      status: 'shipped',
      featured: true,
      tagline: 'Predicting Algerian fire days from weather alone, after removing the leakage.',
      description:
        'A Flask service that estimates the probability of a fire day in northern Algeria from six weather inputs, trained only on variables that are observed rather than derived from the label.',
      problem:
        'The obvious way to model this dataset scores extremely well and means nothing. The Fire Weather Index is a formula computed from the same weather already in the table, and the published fire labels are close to a single threshold on it. Any model handed those columns is reading the answer back. The problem was to build something that still works once the shortcut is removed.',
      approach:
        'Restricted the features to temperature, relative humidity, wind speed, rainfall, month and region, dropping all six FWI-system outputs. Compared logistic regression against a random forest under GroupKFold over region-month, so an entire region-month is held out at once and correlated consecutive days cannot straddle a fold. The selected model is served from a Flask app with an HTML form, a JSON endpoint and a health check.',
      technologies: ['Python', 'Scikit-learn', 'Random Forest', 'GroupKFold', 'Flask', 'Joblib'],
      keyResult: '0.938 ROC-AUC from weather alone, against a 0.500 baseline',
      achievements: [
        'Found two leakage paths in the original framing: FWI is reproducible from ISI and BUI at R² = 0.985, and the single rule FWI > 3.5 reproduces the published fire labels 94.2% of the time.',
        'Rebuilt the task as fire-occurrence classification from six observed weather variables, excluding FFMC, DMC, DC, ISI, BUI and FWI.',
        'Validated with GroupKFold over region-month instead of random splits, so adjacent days from the same region and month cannot appear on both sides of a fold.',
        'Random forest reached 88.1% accuracy, 89.8% recall and 0.938 ROC-AUC against an always-fire baseline of 56.4% accuracy and 0.500 ROC-AUC.',
        'Served the model through Flask with a form, a JSON /api/predict endpoint returning a fire probability, and a /health check.',
      ],
      caseStudy: [
        {
          heading: 'What the data is',
          body: 'Two regions of northern Algeria, June to September 2012, 243 days in total, each labelled fire or not fire. Fire days make up 56.4% of the record, so a model that answers "fire" every time is already right 56.4% of the time. That is the number worth beating.',
        },
        {
          heading: 'The shortcut that had to go',
          body: 'The dataset ships with the Fire Weather Index system — FFMC, DMC, DC, ISI, BUI and FWI. None of these are observations; they are computed from the same weather columns. Regressing FWI on ISI and BUI returns R² = 0.985. The label is compromised too: the single rule FWI > 3.5 reproduces the published fire labels 94.2% of the time.',
        },
        {
          heading: 'What honesty costs',
          body: 'Trained with the FWI columns included, the model reaches 94.2% accuracy and 0.992 ROC-AUC — the same figure the FWI > 3.5 rule reaches on its own, without any model at all. That accuracy is the label being handed back, so this project gives it up and reports the harder number instead.',
        },
        {
          heading: 'Features that survive',
          body: 'Six inputs remain: temperature, relative humidity, wind speed, rainfall, month and region. Each is either measured directly or known in advance, so a prediction made from them is a prediction rather than a restatement.',
        },
        {
          heading: 'Validation that respects place and time',
          body: 'Fire weather persists for days, so a random split can put Tuesday in training and Wednesday in test and flatter the result. GroupKFold over region-month holds out a whole region-month at once. The gap is visible in both models: the optimistic random split scores the random forest at 0.943 ROC-AUC and logistic regression at 0.890, against 0.938 and 0.877 under grouping.',
        },
        {
          heading: 'Model comparison',
          body: 'Logistic regression reached 78.6% accuracy and 0.877 ROC-AUC. The random forest reached 88.1% accuracy, 89.8% recall and 0.938 ROC-AUC, and was selected — recall carries the weight here, since a missed fire day costs more than a false alarm.',
        },
        {
          heading: 'Serving',
          body: 'A Flask app loads the joblib artifact produced by train.py and exposes three surfaces: an HTML form, POST /api/predict returning a fire probability and a verdict at the 0.5 threshold, and GET /health.',
        },
        {
          heading: 'Limits worth stating',
          body: 'One fire season, two regions, 243 rows. The model estimates fire occurrence on the same day as the weather it is given, so it is a classifier and not a forecast. The provenance of the labels is undocumented, which is exactly why the FWI threshold agreement matters.',
        },
      ],
      metrics: [
        { value: '0.938', label: 'ROC-AUC' },
        { value: '88.1%', label: 'Accuracy' },
        { value: '89.8%', label: 'Recall' },
        { value: '243', label: 'Days of data' },
      ],
      links: {
        github: 'https://github.com/Aaksh26at/Algerian_Fire_Forest',
        demo: '',
      },
      accent: 'cyan',
    },
    {
      slug: 'customer-churn-prediction',
      title: 'Customer Churn Prediction & Retention Dashboard',
      year: '2026',
      status: 'shipped',
      featured: true,
      tagline: 'Catching four in five churners, and being honest about the cost of that.',
      description:
        'A churn classifier over 7,043 telecom accounts that reports what it costs to catch churners rather than hiding behind an accuracy figure, served through a Streamlit scoring app.',
      problem:
        'Accuracy is the wrong target here. 73.5% of these customers do not churn, so a model that answers "will not churn" every time scores 73.46% and identifies nobody worth calling. The useful question is how many real churners you can catch, and how many pointless retention calls that costs.',
      approach:
        'Compared logistic regression and a random forest against an explicit never-churn baseline, both with balanced class weights, scored under repeated stratified cross-validation at 5 splits × 3 repeats. All preprocessing lives inside the pipeline so the scaler and encoder refit within each fold. Logistic regression ships — not because it wins on headline numbers, but for seven points more recall and coefficients a retention team can read.',
      technologies: ['Python', 'Scikit-learn', 'Pandas', 'Streamlit', 'Joblib'],
      keyResult: '80.4% of churners caught, at roughly one real save per two calls',
      achievements: [
        'Scored every model against a never-churn baseline — 73.46% accuracy, 0% recall, 0.500 ROC-AUC — so the headline figures have something to beat.',
        'Logistic regression reached 0.8449 ± 0.0107 ROC-AUC, 80.35% ± 2.16 recall on churners and 74.71% accuracy under repeated stratified cross-validation.',
        'Chose it over the random forest despite the forest scoring marginally higher on ROC-AUC (0.8459, inside the spread), because it gives up seven points of recall on the class that costs money.',
        'Reported the operating cost plainly: 1,501 churners caught against 1,422 false alarms, i.e. about one genuine save per two retention calls.',
        'Established that MonthlyCharges cannot be read from the coefficients, because TotalCharges is tenure × MonthlyCharges at R² = 0.9991 and the collinearity splits one signal across three columns.',
      ],
      caseStudy: [
        {
          heading: 'Why not accuracy',
          body: 'The dataset is 73.5% non-churners. A model that predicts "stays" for everyone scores 73.46% accuracy, beats a naive expectation, and is completely worthless — it flags nobody. That baseline is measured and reported alongside every model here, because an accuracy number without it says nothing.',
        },
        {
          heading: 'The data',
          body: 'The public Telco Customer Churn dataset: 7,043 customers, 19 features covering contract, tenure, services and charges, with a binary churn label. The base churn rate is 26.5%.',
        },
        {
          heading: 'Cleaning, and one decision worth naming',
          body: 'TotalCharges arrives as text and is blank for 11 customers — every one of them at tenure zero, meaning they have never been billed. They are kept with TotalCharges set to 0 rather than dropped, because a brand-new customer is precisely the case a retention model has to handle.',
        },
        {
          heading: 'Scoring that survives a reshuffle',
          body: 'A single train-test split on this data moves by more than a percentage point depending on the seed. Every figure comes from RepeatedStratifiedKFold at 5 splits × 3 repeats, so each carries a standard deviation, and the preprocessing is refitted inside each fold rather than on the full dataset.',
        },
        {
          heading: 'Choosing the model that loses on paper',
          body: 'The random forest scores 0.8459 ROC-AUC to logistic regression\'s 0.8449 — a gap of 0.001 against a spread of ±0.011, which is noise. What is not noise is recall: 73.07% for the forest against 80.35% for logistic regression. Since the whole point is catching churners, the regression ships, and its coefficients double as the retention story.',
        },
        {
          heading: 'What the errors cost',
          body: 'Out-of-fold across all 7,043 customers: 1,501 churners caught, 368 missed, and 1,422 customers flagged who were never going to leave. That is 51.5% precision — roughly one real save per two retention calls. Whether that trade is worth making depends on the cost of a call against the value of a retained customer, which is a business decision. The model surfaces it rather than burying it.',
        },
        {
          heading: 'Drivers, and one that does not survive scrutiny',
          body: 'Tenure dominates as a protective factor (−1.34), followed by two-year contracts (−0.81); month-to-month contracts (+0.62) and fibre-optic internet (+0.52) push the other way. MonthlyCharges lands at −0.42, which does not mean higher bills reduce churn — TotalCharges is tenure × MonthlyCharges at R² = 0.9991, and under collinearity that tight the individual coefficients become unstable and flip sign. Tenure and contract type are the pair worth trusting.',
        },
        {
          heading: 'What it is not',
          body: 'This dataset is a snapshot with no time dimension, so the model classifies customers who have already churned rather than forecasting who will churn next month. No temporal validation is possible, and calling it a forecast would be overclaiming.',
        },
      ],
      metrics: [
        { value: '0.845', label: 'ROC-AUC' },
        { value: '80.4%', label: 'Churners caught' },
        { value: '51.5%', label: 'Flag precision' },
        { value: '7,043', label: 'Customers' },
      ],
      links: {
        github: 'https://github.com/Aaksh26at/telco-churn-prediction',
        demo: '',
      },
      accent: 'blue',
    },
    {
      slug: 'ai-resume-analyzer',
      title: 'AI Resume Analyzer & Job-Description Matcher',
      year: '2026',
      status: 'shipped',
      featured: true,
      tagline: 'NLP app scoring resume–job fit with a skill-gap report.',
      description:
        'An NLP application that scores how well a resume matches a job description and reports the exact skills to add.',
      problem:
        "Applicants rarely know why their resume does or doesn't fit a role. The goal was an instant, explainable match score plus a concrete skill-gap report.",
      approach:
        'Cleaned and tokenised resume and job-description text, vectorised both with TF-IDF (uni- and bi-grams), and computed cosine similarity — blended with skill-coverage against a curated tech vocabulary — for an intuitive match score. Built a Streamlit interface for upload-and-analyse.',
      technologies: ['Python', 'Scikit-learn', 'NLP', 'TF-IDF', 'Streamlit'],
      keyResult: 'Instant match score + skill-gap report',
      achievements: [
        'Built an NLP matcher using TF-IDF and cosine similarity, blended with skill-coverage for an intuitive fit score.',
        'Engineered a text pipeline — cleaning, tokenisation and keyword extraction — over unstructured resume and job-description documents.',
        'Detects matched vs. missing skills against a curated technical vocabulary and surfaces the job description’s top keywords.',
        'Delivered a Streamlit app supporting PDF and text resume upload with an instant match score and skill-gap report.',
      ],
      caseStudy: [
        {
          heading: 'Problem',
          body: 'Tailoring a resume to each role is guesswork. The project provides an objective match score and a specific list of skills to add before applying.',
        },
        {
          heading: 'Inputs',
          body: 'A resume (uploaded as PDF or text) and a pasted job description. Text is extracted from PDFs and normalised for analysis.',
        },
        {
          heading: 'Text preprocessing',
          body: 'Both documents are lowercased, stripped of noise and collapsed to clean tokens, preserving technical tokens like c++ and c#.',
        },
        {
          heading: 'Matching approach',
          body: 'TF-IDF vectors (uni- and bi-grams, English stop-words removed) are compared with cosine similarity, then blended with skill-coverage so the score reflects how many of the role’s required skills the resume actually has.',
        },
        {
          heading: 'Skill-gap analysis',
          body: 'A curated technical vocabulary is matched (word-boundary aware) against both texts to report skills the resume already covers versus those it is missing.',
        },
        {
          heading: 'Interface',
          body: 'A Streamlit app returns an overall match score, matched vs. missing skills, and the top keywords from the job description — with a sample resume and JD preloaded to try instantly.',
        },
        {
          heading: 'Future improvements',
          body: 'Sentence-transformer embeddings for semantic matching, section-aware parsing, and ranking one resume against many job descriptions.',
        },
      ],
      metrics: [
        { value: 'TF-IDF', label: 'Vectorisation' },
        { value: 'Cosine', label: 'Similarity' },
        { value: 'PDF+TXT', label: 'Resume input' },
        { value: 'NLP', label: 'Text pipeline' },
      ],
      links: {
        github: 'https://github.com/Aaksh26at/AI-Resume-Analyzer-',
        demo: '',
      },
      accent: 'coral',
    },
  ],

  skills: [
    {
      title: 'Programming & Core Tools',
      icon: 'code',
      skills: [
        { name: 'Python', level: 'Strong' },
        { name: 'SQL', level: 'Strong' },
        { name: 'Advanced Excel', level: 'Working knowledge' },
        { name: 'Google Sheets', level: 'Working knowledge' },
      ],
    },
    {
      title: 'Data Analysis',
      icon: 'chart',
      skills: [
        { name: 'Pandas', level: 'Strong' },
        { name: 'NumPy', level: 'Strong' },
        { name: 'Exploratory Data Analysis', level: 'Strong' },
        { name: 'Feature Engineering', level: 'Working knowledge' },
        { name: 'Statistical Analysis', level: 'Working knowledge' },
        { name: 'A/B Testing', level: 'Familiar' },
        { name: 'Cohort Analysis', level: 'Familiar' },
        { name: 'Funnel Analysis', level: 'Familiar' },
      ],
    },
    {
      title: 'Machine Learning & AI',
      icon: 'brain',
      skills: [
        { name: 'Scikit-learn', level: 'Strong' },
        { name: 'Logistic Regression', level: 'Working knowledge' },
        { name: 'Ridge Regression', level: 'Working knowledge' },
        { name: 'Predictive Analytics', level: 'Working knowledge' },
        { name: 'Model Evaluation', level: 'Working knowledge' },
        { name: 'NLP Fundamentals', level: 'Currently learning' },
        { name: 'ML Pipeline Design', level: 'Working knowledge' },
      ],
    },
    {
      title: 'BI & Visualisation',
      icon: 'dashboard',
      skills: [
        { name: 'Power BI', level: 'Working knowledge' },
        { name: 'Tableau', level: 'Working knowledge' },
        { name: 'Looker', level: 'Familiar' },
        { name: 'Matplotlib', level: 'Strong' },
        { name: 'Seaborn', level: 'Working knowledge' },
        { name: 'Streamlit', level: 'Strong' },
        { name: 'KPI Reporting', level: 'Working knowledge' },
      ],
    },
    {
      title: 'Data Engineering & Databases',
      icon: 'database',
      skills: [
        { name: 'ETL Pipeline Design', level: 'Working knowledge' },
        { name: 'Data Warehousing', level: 'Familiar' },
        { name: 'SQL Query Optimisation', level: 'Working knowledge' },
        { name: 'MySQL', level: 'Working knowledge' },
        { name: 'PostgreSQL', level: 'Working knowledge' },
        { name: 'Data Pipeline Design', level: 'Working knowledge' },
      ],
    },
    {
      title: 'Backend, Cloud & Dev Tools',
      icon: 'server',
      skills: [
        { name: 'Flask', level: 'Working knowledge' },
        { name: 'REST APIs', level: 'Working knowledge' },
        { name: 'AWS EC2', level: 'Familiar' },
        { name: 'AWS S3', level: 'Familiar' },
        { name: 'AWS RDS', level: 'Familiar' },
        { name: 'Git & GitHub', level: 'Strong' },
        { name: 'Jupyter Notebook', level: 'Strong' },
        { name: 'VS Code', level: 'Strong' },
      ],
    },
  ],

  pipeline: [
    'Raw Data',
    'Cleaning',
    'Exploration',
    'Feature Engineering',
    'Model / Analysis',
    'API / Dashboard',
    'Insight / Prediction',
  ],

  // Real employment, stated no more strongly than the résumé states it. The
  // "no invented employment" rule at the top of this file cuts both ways: a job
  // that exists belongs here.
  experience: [
    {
      role: 'AI Automation Developer',
      organisation: 'Kalash Group',
      location: 'Jaipur, Rajasthan, India',
      period: 'March 2026 — Present',
      highlights: [
        'Use ChatGPT and Claude Code to design and build automations for repetitive business workflows.',
        'Built software integrated with Tally to create accounting entries and support related accounting workflows.',
        'Built a Moneycontrol automation that uses bulk templates to add or sell shares.',
        'Delivered two additional internal automation projects for Kalash Group.',
      ],
    },
  ],

  education: [
    {
      institution: 'University of Rajasthan',
      location: 'Jaipur, Rajasthan, India',
      degree: 'Master of Computer Applications (MCA) — Computer Science',
      period: '2024 – 2026',
    },
    {
      institution: 'University of Rajasthan',
      location: 'Jaipur, Rajasthan, India',
      degree: 'Bachelor of Computer Applications (BCA) — Computer Science',
      period: '2021 – 2024',
    },
  ],

  certifications: [
    {
      title: 'AWS Solutions Architecture Job Simulation',
      provider: 'Amazon Web Services · via Forage',
      isSimulation: true,
      year: '2024',
      description:
        'Completed a practical simulation covering cloud architecture, EC2, S3, RDS and cost-optimisation strategies.',
    },
    {
      title: 'Data Analytics Job Simulation',
      provider: 'Deloitte Australia · via Forage',
      isSimulation: true,
      year: '2024',
      description:
        'Analysed business datasets and produced data-driven recommendations, including a modelled scenario of ≈20% operational-efficiency improvement. Completed as a job simulation, not employment at Deloitte.',
    },
    {
      title: 'Software Engineering Job Simulation',
      provider: 'JPMorgan Chase & Co. · via Forage',
      isSimulation: true,
      year: '2024',
      description:
        'Completed a practical simulation focused on enterprise software-development workflows and engineering tasks. Completed as a job simulation, not employment at JPMorgan Chase.',
    },
    {
      title: 'Data Science 101 Certification',
      provider: 'Certification',
      isSimulation: false,
      year: '2023',
      description:
        'Covered foundational data-science concepts, algorithms, statistical modelling and structured problem-solving.',
    },
    {
      title: 'AI Tools & ChatGPT Workshop',
      provider: 'be10x',
      isSimulation: false,
      year: 'Feb 2026',
      description:
        'Completed a workshop focused on practical AI tools, ChatGPT and AI-assisted presentation creation.',
    },
  ],

  learningJourney: [
    'Building end-to-end machine-learning applications',
    'Developing Flask and Streamlit interfaces',
    'Working with data cleaning and feature engineering',
    'Creating predictive models',
    'Learning AWS architecture fundamentals',
    'Practising business-data analysis',
    'Building API-based application structures',
    'Strengthening Python, SQL and AI/ML fundamentals',
  ],

  currentlyLearning: [
    { title: 'AI/ML Systems', detail: 'Deepening production-ready ML workflows and model lifecycle.' },
    { title: 'Python Problem Solving', detail: 'Strengthening data structures and algorithmic fluency.' },
    { title: 'SQL & Data Engineering', detail: 'Query optimisation, warehousing and pipeline design.' },
    { title: 'Backend Development', detail: 'API design, serialization and deployment patterns.' },
  ],

  github: {
    username: 'Aaksh26at',
    profileUrl: 'https://github.com/Aaksh26at',
    // Featured repositories are configured manually to avoid fabricated stats.
    // Add repository URLs here as they become public; empty urls render as
    // "repository coming soon" and the link is disabled gracefully.
    featuredRepos: [
      {
        name: 'Breast Cancer Prediction Web App',
        description:
          'Breast-mass classifier at 97.07% malignant recall against a baseline that catches none, with a cost-weighted decision threshold.',
        tech: ['Python', 'Streamlit', 'Scikit-learn'],
        url: 'https://github.com/Aaksh26at/Cancer_Predict_streamlit',
      },
      {
        name: 'JVVNL Electricity Bill Automation',
        description:
          'Scheduled pipeline that scrapes, parses and files 34 utility bills a month across three PDF layouts.',
        tech: ['Python', 'Selenium', 'pdfplumber'],
        url: 'https://github.com/Aaksh26at/jvvnl-bill-scraper',
      },
      {
        name: 'Fire Risk Classification from Weather',
        description:
          'Flask service classifying Algerian fire days from weather alone — 0.938 ROC-AUC once the FWI-derived features are removed.',
        tech: ['Python', 'Scikit-learn', 'Flask'],
        url: 'https://github.com/Aaksh26at/Algerian_Fire_Forest',
      },
      {
        name: 'Customer Churn Prediction',
        description:
          'Churn classifier over 7,043 customers catching 80.4% of churners, with the false-alarm cost reported rather than hidden.',
        tech: ['Python', 'Scikit-learn', 'Streamlit'],
        url: '',
      },
      {
        name: 'AI Resume Analyzer',
        description:
          'NLP resume–job matcher using TF-IDF + cosine similarity with a skill-gap report.',
        tech: ['Python', 'Scikit-learn', 'NLP'],
        url: 'https://github.com/Aaksh26at/AI-Resume-Analyzer-',
      },
    ],
  },

  contact: {
    email: 'aakshatagarwal2004@gmail.com',
    phone: '+91 79768 07739',
    location: 'Jaipur, Rajasthan, India',
    linkedin: 'https://linkedin.com/in/aakshatagarwal',
    github: 'https://github.com/Aaksh26at',
  },
}

export default portfolio
