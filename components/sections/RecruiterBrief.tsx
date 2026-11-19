import { ArrowUpRight } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import { ResumeButton } from '@/components/ui/ResumeButton'

export function RecruiterBrief({ location = portfolio.person.location }: { location?: string }) {
  const currentRole = portfolio.experience[0]
  return (
    <section aria-labelledby="recruiter-heading" className="recruiter-section">
      <div className="container-page">
        <div className="recruiter-brief">
          <div className="recruiter-overview">
            <p className="section-kicker">For recruiters</p>
            <h2 id="recruiter-heading">Experience at a glance.</h2>
            <p>Python applications for business workflows, API integrations and practical AI tools.</p>
            <div className="recruiter-actions">
              <ResumeButton variant="primary" label="Download résumé" />
              <a href="#contact" className="case-link">Discuss a role<ArrowUpRight size={16} aria-hidden="true" /></a>
            </div>
          </div>
          <dl className="recruiter-facts">
            <div>
              <dt>Looking for</dt>
              <dd><ul>{portfolio.snapshot.roles.map(role => <li key={role}>{role}</li>)}</ul></dd>
            </div>
            <div>
              <dt>Current experience</dt>
              <dd>{currentRole.role} at {currentRole.organisation}<span>{currentRole.period}</span></dd>
            </div>
            <div>
              <dt>Core skills</dt>
              <dd>Python · SQL · Flask · REST APIs · PySide6 · TallyPrime</dd>
            </div>
            <div>
              <dt>Based in</dt>
              <dd>{location}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
