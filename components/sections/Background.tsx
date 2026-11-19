import { ArrowUpRight, GraduationCap } from 'lucide-react'
import { portfolio } from '@/data/portfolio'

export function Background({ about }: { about?: string }) {
  return (
    <section id="about" className="section surface surface--paper background-section">
      <div className="container-page background-layout"><div><p className="section-kicker">04 / A little about me</p><h2 className="background-title">Curious about the problem.<br /><span>Hands-on with the solution.</span></h2><div className="about-copy">{(about ? about.split(/\n\s*\n/).filter(Boolean) : portfolio.about.paragraphs).map(text => <p key={text}>{text}</p>)}</div><a href={portfolio.github.profileUrl} target="_blank" rel="noopener noreferrer" className="case-link">Find me on GitHub<ArrowUpRight size={16} aria-hidden="true" /></a></div><div className="background-record"><h3><GraduationCap size={20} aria-hidden="true" />Education</h3>{portfolio.education.map(item => <div className="education-entry" key={item.degree}><span>{item.period}</span><h4>{item.degree}</h4><p>{item.institution}</p></div>)}<details className="credentials"><summary>Certifications & learning<span aria-hidden="true">+</span></summary><ul>{portfolio.certifications.map(item => <li key={item.title}><h4>{item.title}</h4><p>{item.provider} / {item.year}</p><span className="credential-type">{item.isSimulation ? 'Job simulation' : 'Certification'}</span></li>)}</ul></details></div></div>
    </section>
  )
}
