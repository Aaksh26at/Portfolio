import { ArrowDownRight, ArrowUpRight, Check, FileInput, MapPin, Workflow } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { ResumeButton } from '@/components/ui/ResumeButton'
import { defaultContent, type SiteContent } from '@/lib/admin-content'

export function Introduction({ profile = defaultContent.profile }: { profile?: SiteContent['profile'] }) {
  return (
    <section id="home" aria-label="Introduction" className="section section--hero surface surface--paper new-hero">
      <div className="container-page">
        <div className="hero-layout"><div>
          <p className="availability"><span aria-hidden="true" />{profile.availability}</p>
          <p className="hero-intro">Hello, I’m {profile.name}.</p>
          <h1 className="hero-title">{profile.heading}<br /><span>{profile.headingAccent}</span></h1>
          <p className="hero-copy">{profile.introduction}</p>
          <div className="mt-8 flex flex-wrap gap-3"><MagneticButton href="#projects" variant="primary" size="lg" magnet={0}>Explore my work<ArrowDownRight className="h-4 w-4" aria-hidden="true" /></MagneticButton><ResumeButton variant="ghost" /></div>
          <div className="hero-location"><MapPin size={14} aria-hidden="true" />{profile.location}<span aria-hidden="true">/</span>{profile.role}</div>
        </div><aside className="workflow-plate" aria-label="Illustrated accounting workflow">
          <div className="workflow-topline"><span className="workflow-symbol" aria-hidden="true"><Workflow size={20} /></span><span>From manual to connected</span><span className="font-mono text-xs">01 / 03</span></div>
          <p className="workflow-caption">A little structure.<br />A lot less repetition.</p>
          <div className="workflow-steps">
            <div className="workflow-step"><FileInput size={18} aria-hidden="true" /><div><strong>Read the inputs</strong><span>Statements, invoices, documents</span></div><span className="step-number">01</span></div>
            <div className="workflow-connector" aria-hidden="true" />
            <div className="workflow-step workflow-step--active"><Workflow size={18} aria-hidden="true" /><div><strong>Validate & review</strong><span>Python rules. Human decisions.</span></div><span className="step-number">02</span></div>
            <div className="workflow-connector" aria-hidden="true" />
            <div className="workflow-step"><Check size={18} aria-hidden="true" /><div><strong>Deliver useful output</strong><span>Tally entries, reports, next steps</span></div><span className="step-number">03</span></div>
          </div><a className="workflow-link" href="/projects/kalash-accounts">Inside Kalash Accounts<ArrowUpRight size={16} aria-hidden="true" /></a><p className="workflow-note">Architecture illustration · internal company project</p>
        </aside></div>
        <div className="hero-bottom"><span className="font-mono text-xs uppercase tracking-widest">Built with purpose</span><ul aria-label="Core technologies">{['Python', 'Flask', 'PySide6', 'TallyPrime', 'Gemini', 'Supabase'].map(tool => <li key={tool}>{tool}</li>)}</ul><a href="#projects" className="hero-scroll">Selected work<ArrowDownRight size={16} aria-hidden="true" /></a></div>
      </div>
    </section>
  )
}
