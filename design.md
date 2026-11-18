# Portfolio design: quiet technical studio

This redesign replaces the earlier atmospheric, serif-led layout. The user requested a new UI/UX and internet research. Preserve the AA identity, real project evidence, custom domain, contact behavior and resume download.

## Reference principles

- Brittany Chiang (https://brittanychiang.com/): experience and project evidence are easy to reach.
- Rauno Freiberg (https://rauno.me/): concise navigation and deliberate interface details.
- Paco Coursey (https://paco.me/): short introduction and a direct project index.

These inform structure, not a copied layout, source code or personal claims.

## Visual language

Cool near-white surfaces, navy ink, cobalt links and restrained mint highlights. Dark mode uses blue graphite and retains the same hierarchy. Colors remain centralized in tokens.css. IBM Plex Sans handles headings and body; IBM Plex Mono handles small technical labels. The older Fraunces font is no longer loaded.

Use generous margins, fine rules and moderately rounded containers. Avoid decorative background grids, ambient 3D, fake terminal output and invented product screenshots. The hero workflow and project SVGs are clearly identified architecture illustrations. No new image or font downloads are required.

## Visitor journey

Introduction and resume actions -> compact recruiter summary -> four selected projects -> professional experience -> skills -> about and education -> contact. Earlier projects and certifications remain accessible in native disclosure elements. Public case-study routes remain intact.

The header has four section links, contact and the existing theme toggle. Below 1024px it becomes a disclosure menu, closes on Escape/outside click/link activation and restores focus to its trigger on Escape. It does not trap focus or lock scrolling because it is not a modal.

Projects have two columns on desktop and one below 768px. Category filters use native buttons with aria-pressed; result counts use an aria-live status. Case-study links are prominent. Private/internal source is a label, never a misleading GitHub link. Authenticated demo access is explicitly labeled.

## Shared implementation

New composition styles live in app/redesign.css; tokens.css remains authoritative for shared values. SiteHeader is re-exported by Header so case studies share the redesign. Existing buttons, theme toggle, contact form, project visuals and case-study primitives are reused. Retired homepage sections remain in source for reference, outside the active page composition.

## Accessibility and motion

Native links/buttons/summary controls, visible focus, minimum 44px control targets and explicit control names. Important hero/project content is visible without entrance animation. The existing reduced-motion setting and persisted theme remain supported. Do not claim visual browser QA when preview infrastructure is unavailable.

## Recruiter evidence

Keep the recruiter summary compact and based on profile data. Each featured project shows a short deliverable summary, two technical metrics and context. Coverage counts and offline evaluation are labeled explicitly. Any future business impact number needs a recorded measurement; do not infer hours saved from workflow coverage.
