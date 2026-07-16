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
      'Available for entry-level & fresher roles',
    ],
    floatingMetrics: [
      { value: '96%', label: 'Model accuracy' },
      { value: '<200ms', label: 'API inference' },
      { value: '2', label: 'ML applications' },
    ],
  },

  snapshot: {
    roles: [
      'Data Analyst',
      'Data Science Fresher',
      'AI/ML Fresher',
      'Python Developer',
      'Backend Developer',
      'Data Engineering Fresher',
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
      { value: '96%', label: 'Classification accuracy' },
      { value: '30', label: 'Clinical attributes analysed' },
      { value: '8%', label: 'Improvement over baseline' },
      { value: '<1s', label: 'Streamlit inference' },
      { value: '<200ms', label: 'FWI model inference' },
      { value: '2', label: 'Production-style ML apps' },
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
      tagline: 'End-to-end ML classification for malignant vs. benign tumours.',
      description:
        'An end-to-end machine-learning application that predicts whether a breast tumour is malignant or benign using clinical diagnostic attributes.',
      problem:
        'Manual differentiation of malignant and benign tumours is slow and error-prone. The goal was an accurate, real-time classifier that supports faster diagnostic decisions.',
      approach:
        'Built a full ETL and modelling pipeline: data cleaning with Pandas, feature scaling with NumPy, exploratory data analysis and feature engineering across 30 clinical attributes, then a Scikit-learn classification model served through an interactive Streamlit interface.',
      technologies: ['Python', 'Streamlit', 'Scikit-learn', 'Pandas', 'NumPy', 'Machine Learning'],
      keyResult: '≈96% accuracy on a 569-sample medical dataset',
      achievements: [
        'Engineered an ML classification pipeline achieving ≈96% accuracy on a 569-sample medical dataset.',
        'Built a complete ETL pipeline using Pandas for data cleaning and NumPy for feature scaling.',
        'Conducted EDA and feature engineering across 30 clinical attributes, improving performance ≈8% over baseline.',
        'Deployed a real-time Streamlit dashboard with sub-second inference latency.',
      ],
      caseStudy: [
        {
          heading: 'Problem',
          body: 'Differentiating malignant from benign tumours quickly and reliably is critical in diagnostics. The project set out to automate that classification from clinical measurements.',
        },
        {
          heading: 'Dataset',
          body: 'A widely used diagnostic dataset of 569 samples, each described by 30 numeric clinical attributes derived from digitised images of cell nuclei.',
        },
        {
          heading: 'Data cleaning',
          body: 'Pandas handled missing-value checks, type consistency and structuring, producing a clean, model-ready table.',
        },
        {
          heading: 'Exploratory analysis',
          body: 'EDA surfaced the distribution of each attribute and the correlation structure between features and the target class, guiding feature selection.',
        },
        {
          heading: 'Feature engineering',
          body: 'NumPy-based feature scaling normalised attribute ranges so no single measurement dominated the model, contributing to an ≈8% lift over the baseline.',
        },
        {
          heading: 'Model selection & evaluation',
          body: 'A Scikit-learn classification model was trained and validated, reaching ≈96% accuracy on held-out data.',
        },
        {
          heading: 'Application interface',
          body: 'A Streamlit front end lets a user enter clinical values and receive a malignant/benign prediction with sub-second latency.',
        },
        {
          heading: 'Future improvements',
          body: 'Add probability calibration, model explainability (e.g. feature importance per prediction) and a confusion-matrix view inside the app.',
        },
      ],
      metrics: [
        { value: '96%', label: 'Accuracy' },
        { value: '569', label: 'Samples' },
        { value: '30', label: 'Attributes' },
        { value: '8%', label: 'Over baseline' },
      ],
      links: {
        github: '',
        demo: '',
      },
      accent: 'violet',
    },
    {
      slug: 'fire-weather-index',
      title: 'Fire Weather Index Prediction Web App',
      year: '2025',
      status: 'shipped',
      featured: true,
      tagline: "Flask REST API forecasting Canada's Fire Weather Index.",
      description:
        "A Flask-based machine-learning application that predicts Canada's Fire Weather Index using environmental measurements.",
      problem:
        'Estimating fire risk from raw weather readings requires a fast, reliable regression service that can respond within tight latency budgets.',
      approach:
        'Built a Flask REST API around a Ridge Regression model optimised with k-fold cross-validation, taking four environmental inputs — temperature, humidity, wind speed and rainfall — through a production-oriented pipeline covering ingestion, preprocessing, model serialization and API deployment.',
      technologies: ['Python', 'Flask', 'Scikit-learn', 'Ridge Regression', 'REST API', 'Model Serialization'],
      keyResult: 'Under ≈200ms inference latency via a REST API',
      achievements: [
        "Developed a Flask REST API forecasting Canada's Fire Weather Index from 4 environmental KPIs.",
        'Optimised a Ridge Regression model via k-fold cross-validation.',
        'Achieved inference latency under ≈200ms, meeting enterprise-grade performance benchmarks.',
        'Designed a production-ready pipeline covering ingestion, preprocessing, serialization and deployment following MLOps practices.',
      ],
      caseStudy: [
        {
          heading: 'Fire-risk problem',
          body: "The Fire Weather Index summarises wildfire danger. Predicting it from live weather readings enables earlier, data-driven risk assessment.",
        },
        {
          heading: 'Environmental variables',
          body: 'The model consumes four inputs — temperature, humidity, wind speed and rainfall — chosen as the primary environmental drivers of fire risk.',
        },
        {
          heading: 'Preprocessing pipeline',
          body: 'A structured pipeline ingests raw readings, validates and preprocesses them, and prepares feature vectors for inference.',
        },
        {
          heading: 'Regression approach',
          body: 'Ridge Regression was selected for its stability with correlated inputs, regularising the fit to reduce overfitting.',
        },
        {
          heading: 'Cross-validation',
          body: 'k-fold cross-validation tuned the model and gave a trustworthy estimate of generalisation performance.',
        },
        {
          heading: 'API architecture',
          body: 'A Flask REST endpoint accepts the four inputs as JSON and returns the predicted index, with the trained model serialized for fast loading.',
        },
        {
          heading: 'Inference performance',
          body: 'End-to-end responses land under ≈200ms, satisfying enterprise-grade latency expectations.',
        },
        {
          heading: 'Future improvements',
          body: 'Add batch prediction, request validation schemas and a lightweight dashboard visualising risk over a region.',
        },
      ],
      metrics: [
        { value: '<200ms', label: 'Inference' },
        { value: '4', label: 'Input KPIs' },
        { value: 'k-fold', label: 'Validation' },
        { value: 'REST', label: 'API' },
      ],
      links: {
        github: '',
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
      tagline: 'Predicting telecom churn and turning it into retention action.',
      description:
        'An end-to-end machine-learning pipeline that predicts which telecom customers are likely to churn, served through an interactive retention dashboard.',
      problem:
        'Losing customers is expensive. The goal was to flag at-risk customers early — with enough recall to actually catch churners — so retention teams can act before they leave.',
      approach:
        'Cleaned a 7,043-customer dataset, built a Scikit-learn preprocessing + model pipeline (scaling + one-hot encoding), compared Logistic Regression and Random Forest with balanced class weights, and selected the best by ROC-AUC. Predictions are served through a Streamlit dashboard.',
      technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Streamlit', 'Machine Learning'],
      keyResult: '0.84 ROC-AUC, catching 78% of churners',
      achievements: [
        'Built an end-to-end churn pipeline on a 7,043-customer telecom dataset with 19 features.',
        'Achieved 0.84 ROC-AUC and 74% accuracy, with 78% recall on churners using balanced class weights.',
        'Identified the top churn drivers — tenure, contract type, fibre-optic internet and monthly charges.',
        'Deployed an interactive Streamlit dashboard that turns predictions into concrete retention actions.',
      ],
      caseStudy: [
        {
          heading: 'Problem',
          body: 'Customer churn directly hits revenue. The project set out to predict churn from customer attributes with high enough recall to be useful to a retention team, not just high headline accuracy.',
        },
        {
          heading: 'Dataset',
          body: 'The public Telco Customer Churn dataset — 7,043 customers described by 19 features (contract, tenure, services, charges) with a binary churn label. The base churn rate is ~26.5%.',
        },
        {
          heading: 'Data cleaning',
          body: 'Dropped the identifier column, coerced the text TotalCharges field to numeric (blank for new customers), and mapped the churn target to 0/1.',
        },
        {
          heading: 'Modelling & class imbalance',
          body: 'A ColumnTransformer scales numeric features and one-hot encodes categoricals inside a single pipeline. Logistic Regression and Random Forest were trained with balanced class weights so the minority churn class was not ignored.',
        },
        {
          heading: 'Evaluation',
          body: 'On a stratified held-out test set the best model reached 0.84 ROC-AUC and 74% accuracy, correctly identifying 78% of customers who actually churned.',
        },
        {
          heading: 'Key churn drivers',
          body: 'Short tenure, month-to-month contracts, fibre-optic internet and high monthly charges were the strongest churn signals — consistent with known telecom retention patterns.',
        },
        {
          heading: 'Dashboard',
          body: 'A Streamlit app loads the saved pipeline and scores a customer profile in real time, returning a churn probability and a suggested retention action.',
        },
        {
          heading: 'Future improvements',
          body: 'Probability calibration, a tunable decision threshold, SHAP explanations per prediction, and batch scoring from an uploaded CSV.',
        },
      ],
      metrics: [
        { value: '0.84', label: 'ROC-AUC' },
        { value: '74%', label: 'Accuracy' },
        { value: '7,043', label: 'Customers' },
        { value: '78%', label: 'Churn recall' },
      ],
      links: {
        github: '',
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
        github: '',
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

  education: [
    {
      institution: 'University of Rajasthan',
      location: 'Jaipur, Rajasthan, India',
      degree: 'Master of Computer Applications (MCA) — Computer Science',
      period: '2024 – Present',
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
          'End-to-end ML classification pipeline (≈96% accuracy) with a real-time Streamlit interface.',
        tech: ['Python', 'Streamlit', 'Scikit-learn'],
        url: '',
      },
      {
        name: 'Fire Weather Index Prediction API',
        description:
          "Flask REST API predicting Canada's Fire Weather Index with sub-200ms inference.",
        tech: ['Python', 'Flask', 'Ridge Regression'],
        url: '',
      },
      {
        name: 'Customer Churn Prediction',
        description:
          'End-to-end churn pipeline (0.84 ROC-AUC) on 7,043 customers with a Streamlit retention dashboard.',
        tech: ['Python', 'Scikit-learn', 'Streamlit'],
        url: '',
      },
      {
        name: 'AI Resume Analyzer',
        description:
          'NLP resume–job matcher using TF-IDF + cosine similarity with a skill-gap report.',
        tech: ['Python', 'Scikit-learn', 'NLP'],
        url: '',
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

  // Place your files at these public paths (see README for exact steps).
  resumePath: '/resume/Aakshat-Agarwal-Resume.pdf',
  profileImage: '/images/aakshat-profile.webp',
}

export default portfolio
