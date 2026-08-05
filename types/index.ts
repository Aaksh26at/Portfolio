import type { LucideIcon } from 'lucide-react'

export type Proficiency = 'Strong' | 'Working knowledge' | 'Familiar' | 'Currently learning'

export interface NavItem {
  label: string
  href: string
}

export interface SocialLink {
  label: string
  href: string
  icon: 'github' | 'linkedin' | 'mail' | 'phone' | 'mapPin'
}

export interface Metric {
  value: string
  label: string
}

export interface HeroContent {
  availability: string
  heading: string
  headingAccent: string
  supportingHeading: string
  paragraph: string
  trustIndicators: string[]
  floatingMetrics: Metric[]
}

export interface RecruiterSnapshot {
  roles: string[]
  strengths: string[]
  metrics: Metric[]
}

export interface Project {
  slug: string
  title: string
  year: string
  status: 'shipped' | 'building'
  featured: boolean
  tagline: string
  description: string
  problem: string
  approach: string
  technologies: string[]
  keyResult: string
  achievements: string[]
  caseStudy: { heading: string; body: string }[]
  metrics: Metric[]
  links: {
    github?: string
    demo?: string
  }
  accent: 'violet' | 'cyan' | 'blue' | 'coral'
}

export type SkillIconKey =
  | 'code'
  | 'chart'
  | 'brain'
  | 'dashboard'
  | 'database'
  | 'server'

export interface SkillCategory {
  title: string
  icon: SkillIconKey
  skills: { name: string; level: Proficiency }[]
}

export interface EducationItem {
  institution: string
  location: string
  degree: string
  period: string
}

export interface Certification {
  title: string
  provider: string
  isSimulation: boolean
  year: string
  description: string
}

export interface LearningItem {
  title: string
  detail: string
}

export interface ContactInfo {
  email: string
  phone: string
  location: string
  linkedin: string
  github: string
}

export interface PortfolioData {
  person: {
    name: string
    initials: string
    role: string
    supportingRole: string
    location: string
    email: string
    phone: string
    summary: string
    /**
     * Path to a résumé PDF under /public, e.g. '/resume/aakshat-agarwal.pdf'.
     * Empty string means no file is published yet, and the résumé button
     * falls back to requesting one by email rather than serving a 404.
     */
    resumePath: string
    socials: SocialLink[]
  }
  nav: NavItem[]
  hero: HeroContent
  snapshot: RecruiterSnapshot
  about: { paragraphs: string[]; personalDetails: string[] }
  projects: Project[]
  skills: SkillCategory[]
  pipeline: string[]
  education: EducationItem[]
  certifications: Certification[]
  learningJourney: string[]
  currentlyLearning: LearningItem[]
  github: {
    username: string
    profileUrl: string
    featuredRepos: { name: string; description: string; tech: string[]; url: string }[]
  }
  contact: ContactInfo
}

// LucideIcon re-export so consumers can type icon props without a second import.
export type { LucideIcon }
