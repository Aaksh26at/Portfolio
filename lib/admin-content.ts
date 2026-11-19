import { portfolio } from '@/data/portfolio'
import type { Project } from '@/types'

export type ManagedProject = Project & { published: boolean; category: 'Automation' | 'AI & web' | 'Data science' }
export type SiteContent = {
  profile: { name: string; role: string; location: string; email: string; phone: string; availability: string; heading: string; headingAccent: string; introduction: string; about: string }
  projects: ManagedProject[]
}

export const defaultContent: SiteContent = {
  profile: {
    name: portfolio.person.name, role: portfolio.person.role, location: portfolio.person.location,
    email: portfolio.contact.email, phone: portfolio.contact.phone,
    availability: 'Open to Python & automation roles', heading: 'Less repetitive work.', headingAccent: 'More useful software.',
    introduction: 'I build Python applications that connect the tools people use every day. Accounting workflows, AI agents and document automation — built around a real problem.',
    about: portfolio.about.paragraphs.join('\n\n'),
  },
  projects: portfolio.projects.map(project => ({ ...project, published: true,
    category: ['kalash-accounts', 'jvvnl-bill-automation'].includes(project.slug) ? 'Automation' : project.slug === 'next-move-job-agent' ? 'AI & web' : 'Data science' })),
}

function text(value: unknown, max: number, required = true): string {
  if (typeof value !== 'string' || value.length > max || (required && !value.trim())) throw new Error('Check required text fields and their lengths.')
  return value.trim()
}
function url(value: unknown): string {
  const v = text(value, 1500, false)
  if (v && !/^https:\/\//i.test(v)) throw new Error('Project links must start with https://.')
  if (v) { const u = new URL(v); if (u.username || u.password) throw new Error('Links must not contain credentials.') }
  return v
}
function strings(value: unknown, max: number): string[] {
  if (!Array.isArray(value) || value.length > max) throw new Error('Too many list entries.')
  return value.map(v => text(v, 3000, false)).filter(Boolean)
}
export function validateContent(raw: unknown): SiteContent {
  if (!raw || typeof raw !== 'object') throw new Error('Invalid content.')
  const r = raw as SiteContent
  if (!r.profile || typeof r.profile !== 'object' || !Array.isArray(r.projects) || r.projects.length > 30) throw new Error('Invalid profile or projects.')
  const profile = {} as SiteContent['profile']
  for (const key of Object.keys(defaultContent.profile) as (keyof SiteContent['profile'])[]) {
    profile[key] = text(r.profile[key], key === 'about' ? 10000 : key === 'introduction' ? 3000 : 300)
  }
  if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(profile.email)) throw new Error('Enter a valid public email.')
  const seen = new Set<string>()
  const projects = r.projects.map(p => {
    if (!p || typeof p !== 'object') throw new Error('Invalid project.')
    const slug = text(p.slug, 80)
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || seen.has(slug)) throw new Error('Each project needs a unique lowercase URL slug.')
    seen.add(slug)
    if (!['Automation', 'AI & web', 'Data science'].includes(p.category) || !['shipped', 'building'].includes(p.status)
      || !['violet', 'cyan', 'blue', 'coral'].includes(p.accent) || typeof p.featured !== 'boolean' || typeof p.published !== 'boolean') throw new Error('Check project category and visibility.')
    if (!p.links || !Array.isArray(p.caseStudy) || p.caseStudy.length > 20 || !Array.isArray(p.metrics) || p.metrics.length > 10) throw new Error('Invalid project details.')
    if (p.published) {
      for (const [field, label] of Object.entries({ tagline: 'tagline', description: 'description', problem: 'problem statement', approach: 'approach', keyResult: 'verified key result' })) {
        const value = p[field as keyof ManagedProject]
        if (typeof value !== 'string' || !value.trim()) throw new Error(`${p.title || slug}: add a ${label} before publishing, or save it as a draft.`)
      }
    }
    return {
      slug, title: text(p.title, 180), year: text(p.year, 20), status: p.status, featured: p.featured, published: p.published, category: p.category,
      tagline: text(p.tagline, 1000, p.published), description: text(p.description, 5000, p.published), problem: text(p.problem, 10000, p.published), approach: text(p.approach, 10000, p.published),
      keyResult: text(p.keyResult, 1500, p.published), technologies: strings(p.technologies, 30), achievements: strings(p.achievements, 30), accent: p.accent,
      caseStudy: p.caseStudy.map(c => ({ heading: text(c.heading, 180), body: text(c.body, 10000) })),
      metrics: p.metrics.map(m => ({ value: text(m.value, 60), label: text(m.label, 150) })),
      links: { github: url(p.links.github || ''), demo: url(p.links.demo || ''), sourceLabel: text(p.links.sourceLabel || '', 100, false), demoLabel: text(p.links.demoLabel || '', 100, false) },
    } satisfies ManagedProject
  })
  return { profile, projects }
}
