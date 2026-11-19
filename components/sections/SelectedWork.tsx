'use client'

import { useState } from 'react'
import { ArrowUpRight, Github, Plus } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import { ProjectVisual } from '@/components/ui/ProjectVisual'
import { ProjectResults } from '@/components/ui/ProjectResults'
import type { ManagedProject } from '@/lib/admin-content'

const categories = ['All work', 'Automation', 'AI & web', 'Data science'] as const
type Category = typeof categories[number]
const presentation: Record<string, { title: string; category: Category; kind: string }> = {
  'kalash-accounts': { title: 'Kalash Accounts', category: 'Automation', kind: 'Desktop software / Tally integration' },
  'next-move-job-agent': { title: 'Next Move', category: 'AI & web', kind: 'AI agent / Deployed web application' },
  'jvvnl-bill-automation': { title: 'Utility Bill Automation', category: 'Automation', kind: 'Document processing / Data extraction' },
  'customer-churn-prediction': { title: 'Customer Churn Analytics', category: 'Data science', kind: 'Machine learning / Decision support' },
}

export function SelectedWork({ projects = portfolio.projects }: { projects?: (typeof portfolio.projects[number] & Partial<Pick<ManagedProject, 'category'>>)[] }) {
  const [category, setCategory] = useState<Category>('All work')
  const featured = projects.filter(project => project.featured)
  const visible = featured.filter(project => category === 'All work' || (project.category || presentation[project.slug]?.category) === category)
  const archive = projects.filter(project => !project.featured)
  return (
    <section id="projects" className="section surface surface--paper work-section">
      <div className="container-page">
        <div className="section-intro"><div><p className="section-kicker">01 / Selected work</p><h2>Built for a real problem.</h2></div><p>From accounting desks to the job search.<br />A closer look at the software I build.</p></div>
        <div className="work-toolbar"><div className="work-filters" role="group" aria-label="Filter projects">{categories.map(item => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div><p className="work-count" role="status" aria-live="polite">{visible.length} {visible.length === 1 ? 'project' : 'projects'}</p></div>
        <div className="work-grid">{visible.map(project => {
          const item = presentation[project.slug]
          return <article className="work-card" key={project.slug}>
            <a className={`work-preview work-preview--${project.slug}`} href={`/projects/${project.slug}`} aria-label={`Read ${project.title} case study`}><ProjectVisual project={project} /><span className="preview-action" aria-hidden="true"><ArrowUpRight size={22} /></span></a>
            <div className="work-card-body"><div className="work-meta"><span>{item?.kind || project.category || 'Software project'}</span><span>{project.year}</span></div><h3><a href={`/projects/${project.slug}`}>{project.title}</a></h3><p className="work-description">{project.tagline}</p><ul className="work-tech" aria-label="Technologies">{project.technologies.slice(0, 4).map(tool => <li key={tool}>{tool}</li>)}</ul><ProjectResults slug={project.slug} summary={project.keyResult} metrics={project.metrics} /><div className="work-card-footer"><a className="case-link" href={`/projects/${project.slug}`}>View case study<ArrowUpRight size={16} aria-hidden="true" /></a>{project.links.github ? <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="source-link"><Github size={15} aria-hidden="true" />Source code</a> : <span className="source-label">{project.links.sourceLabel}</span>}</div>{project.links.demo && <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="project-live-link">{project.links.demoLabel || 'Open live demo'}<ArrowUpRight size={14} aria-hidden="true" /></a>}</div>
          </article>
        })}</div>
        <details className="project-archive"><summary>Earlier projects & experiments<span>{archive.length} case studies<Plus size={18} aria-hidden="true" /></span></summary><ul>{archive.map(project => <li key={project.slug}><a href={`/projects/${project.slug}`}><span>{project.title}</span><span className="archive-tech">{project.technologies.slice(0, 2).join(' / ')}</span><ArrowUpRight size={18} aria-hidden="true" /></a></li>)}</ul></details>
      </div>
    </section>
  )
}
