# Aakshat Agarwal — Portfolio

A premium, production-ready personal portfolio for **Aakshat Agarwal** — Data Analyst, AI/ML enthusiast and Python developer based in Jaipur, India.

Apple-inspired minimal-futuristic design, an interactive 3D "Intelligence Core", editorial typography, a bento project grid, accessible interactions and graceful fallbacks everywhere.

---

## 1. Project overview

- Single-page experience (`/`) with smooth in-page navigation, plus dynamic project **case-study pages** (`/projects/[slug]`).
- All content lives in **one typed file**: [`data/portfolio.ts`](data/portfolio.ts). Edit it to update text — no component changes needed.
- Works **without WebGL** (CSS fallback for the 3D scene), **without JavaScript** for core content, and respects **reduced-motion**.
- The contact form works **with or without** an email service (graceful `mailto:` fallback).

## 2. Technology stack

| Area        | Tech |
|-------------|------|
| Framework   | Next.js 14 (App Router) |
| Language    | TypeScript (strict) |
| Styling     | Tailwind CSS |
| Animation   | Framer Motion |
| 3D          | Three.js · React Three Fiber · @react-three/drei |
| Icons       | lucide-react |
| Email (opt) | Resend (via REST, no SDK required) |

## 3. Main features

- Short, elegant **loading screen** (skipped under reduced-motion).
- Sticky, scroll-aware **navigation** with active-section highlighting + accessible mobile menu.
- Asymmetric editorial **hero** with 3D core, profile portrait and floating metrics.
- **Recruiter snapshot**, **About**, bento **Projects** with accessible case-study modal + full case-study pages.
- **Skills** with honest proficiency labels (no fake percentages), animated **data-pipeline** visual.
- **Education** timeline, **Certifications** (job simulations clearly labelled), **GitHub** proof-of-work, **Currently learning** roadmap.
- **Contact** form with validation, loading/success/error/fallback states, honeypot spam protection and copy-email.
- Full **SEO**: metadata, canonical, Open Graph (dynamically generated OG image), Twitter card, `robots`, `sitemap`, web manifest, JSON-LD Person + WebSite schema.
- Custom cursor (desktop only), scroll-progress bar, magnetic buttons, custom **404** page.

## 4. Requirements

- **Node.js 18.17+** (Node 20+ recommended)
- npm (bundled with Node)

## 5. Local setup

```bash
# 1. install dependencies
npm install

# 2. (optional) create a local env file — the site runs fine without it
cp .env.example .env.local

# 3. start the dev server
npm run dev
```

Open **http://localhost:3000**.

## 6. Commands

```bash
npm run dev        # start the development server (http://localhost:3000)
npm run build      # production build
npm run start      # run the production build locally
npm run lint       # eslint
npm run typecheck  # TypeScript type-check (no emit)
```

## 7. Deployment (Vercel — recommended)

1. Push this folder to a GitHub repository.
2. Go to **https://vercel.com/new** and import the repo.
3. Framework preset: **Next.js** (auto-detected). Build command `next build`, output handled automatically.
4. (Optional) add environment variables from the table in §9.
5. Deploy. Add your custom domain under **Project → Settings → Domains** and follow the DNS instructions.

### Other hosts

- **Netlify** — use the official Next.js runtime (auto-detected). Build command `npm run build`.
- **Cloudflare Pages** — supported via the Next.js preset; the dynamically-generated OG image uses the Edge runtime, which Cloudflare supports.
- **Any Node host** — run `npm run build` then `npm run start` (serves on port 3000; override with `PORT`).

## 8. Environment variables

All optional — copy [`.env.example`](.env.example) to `.env.local` to use them.

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | Enables real contact-form email delivery via Resend. |
| `CONTACT_FROM_EMAIL` | Verified Resend "from" address. |
| `CONTACT_TO_EMAIL` | Where messages are delivered (defaults to Aakshat's email). |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 ID (`G-XXXX…`). Analytics is off unless set. |
| `NEXT_PUBLIC_SITE_URL` | Your production URL, for absolute SEO/OG links. |

> Secrets are **never** committed or exposed to the browser — only `NEXT_PUBLIC_*` values reach the client, by design.

## 9. Replace the profile photo

1. Save your photo as `public/images/aakshat-profile.webp`.
2. Recommended: WebP, portrait, ≥ 840×1050 px, clean background, face centred.
3. Done — it appears automatically in the hero and About sections. Until added, a clean **"AA"** monogram shows instead of a broken image.
4. To use a different path/name, edit `profileImage` in `data/portfolio.ts`. To adjust the crop, change the `objectPosition` prop on `<ProfilePortrait>` in the Hero/About sections.

(See `public/images/PLACE-PROFILE-PHOTO-HERE.txt`.)

## 10. Replace the resume

1. Save your CV as `public/resume/Aakshat-Agarwal-Resume.pdf`.
2. All "Download Resume" buttons point there automatically.
3. To change the name/path, edit `resumePath` in `data/portfolio.ts`.

(See `public/resume/PLACE-RESUME-HERE.txt`.)

## 11. Project screenshots (optional)

Projects show a clearly-labelled **conceptual preview** (CSS, not a fake screenshot). To use real images, drop them in `public/projects/` and render them for the matching slug in `components/ui/ProjectVisual.tsx`.

## 12. Editing content

Everything is in [`data/portfolio.ts`](data/portfolio.ts):

- `person` — name, role, contact, socials
- `hero`, `snapshot`, `about`
- `projects` — add/edit projects; set `links.github` / `links.demo` (empty string disables the button gracefully); `status: 'building'` shows a "Currently Building" card
- `skills` — categories + honest proficiency (`Strong` / `Working knowledge` / `Familiar` / `Currently learning`)
- `education`, `certifications`, `learningJourney`, `currentlyLearning`
- `github.featuredRepos` — set real repo URLs when available (empty = "coming soon", no fake stats)

Update the MCA end date from `2024 – Present` to e.g. `2024 – 2026` in `education` when the degree completes.

## 13. 3D performance configuration

Tunable in `components/3d/IntelligenceScene.tsx`:

- Particle count and node count scale down automatically on mobile.
- `dpr` is capped (1.5 on mobile, 2 on desktop) and `AdaptiveDpr` reduces it further under load.
- Rendering **pauses** when the browser tab is hidden.
- The scene is lazy-loaded (`next/dynamic`, `ssr:false`) and never blocks page content.
- Reduced-motion or missing WebGL → the CSS `SceneFallback` renders instead.

## 14. Contact-form configuration

- **Without** `RESEND_API_KEY` / `CONTACT_FROM_EMAIL`: the form validates and returns a graceful fallback; the UI offers a pre-filled `mailto:` link so no message is lost.
- **With** them set: messages are emailed to `CONTACT_TO_EMAIL` via Resend, with the sender's address as reply-to.
- A hidden honeypot field blocks basic spam bots.

## 15. Accessibility notes

- Semantic landmarks, correct heading order, skip-to-content link.
- Keyboard-navigable menu and modal (focus trap, Escape to close, focus restore).
- Visible focus rings, descriptive alt text, `aria` only where needed.
- Decorative 3D canvas is hidden from screen readers; full reduced-motion support.

## 16. Browser support

Modern evergreen browsers (Chrome, Edge, Firefox, Safari). WebGL is optional — the site degrades to a static visual where it's unavailable.

## 17. Troubleshooting

| Symptom | Fix |
|--------|-----|
| Portrait shows "AA" instead of a photo | Add `public/images/aakshat-profile.webp` (see §9). |
| Resume button 404s | Add `public/resume/Aakshat-Agarwal-Resume.pdf` (see §10). |
| Contact form says "delivery isn't configured" | Set `RESEND_API_KEY` + `CONTACT_FROM_EMAIL`, or just use the offered mailto link. |
| 3D scene not visible | Expected on reduced-motion / no-WebGL — the CSS fallback is intentional. |
| Install is slow on Windows | First install fetches three.js + Next; antivirus can slow file writes. Let it finish. |

## 18. Project structure

```text
app/
  layout.tsx            # fonts, SEO metadata, JSON-LD, cursor, analytics
  page.tsx              # single-page composition
  globals.css           # design tokens + utilities
  not-found.tsx         # custom 404
  robots.ts sitemap.ts manifest.ts opengraph-image.tsx
  api/contact/route.ts  # contact endpoint (+ fallback)
  projects/[slug]/page.tsx  # dynamic case-study pages
components/
  Analytics.tsx CustomCursor.tsx Loader.tsx ScrollProgress.tsx
  layout/               # Header, Footer
  3d/                   # IntelligenceCore (wrapper), IntelligenceScene, SceneFallback
  sections/             # Hero, RecruiterSnapshot, About, Projects, Skills,
                        # DataPipeline, Education, Certifications, GithubProof,
                        # CurrentlyLearning, Contact
  ui/                   # SectionHeading, MagneticButton, ResumeButton, Badge,
                        # MetricCard, SocialLinks, ProfilePortrait, ProjectVisual,
                        # ProjectModal, Reveal
data/portfolio.ts       # ← single source of truth for all content
hooks/useScrollSpy.ts
lib/                    # utils, icons, site config, analytics
types/index.ts          # typed content model
public/                 # images, resume, projects, favicon
```

---

Built with Next.js, Tailwind CSS, Framer Motion and React Three Fiber.
