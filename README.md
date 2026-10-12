# Aakshat Agarwal — Portfolio

A production-ready personal portfolio for **Aakshat Agarwal** — Data Analyst, AI/ML enthusiast and Python developer based in Jaipur, India.

Warm editorial design on a bone reading surface, one persistent WebGL data world behind the page, light and dark modes, and a locked design system that every component is built from.

---

## 1. Project overview

- Single-page experience (`/`) with smooth in-page navigation, plus dynamic project **case-study pages** (`/projects/[slug]`).
- All content lives in **one typed file**: [`data/portfolio.ts`](data/portfolio.ts). Edit it to update text — no component changes needed.
- The design system is locked in [`design.md`](design.md), with [`tokens.css`](tokens.css) as the authoritative source of values.
- Works **without WebGL** (static fallback), **without JavaScript** for core content, and respects **reduced-motion**.
- The contact form works **with or without** an email service (graceful `mailto:` fallback).

## 2. Technology stack

| Area        | Tech |
|-------------|------|
| Framework   | Next.js 14 (App Router) |
| Language    | TypeScript (strict) |
| Styling     | Tailwind CSS + `tokens.css` custom properties |
| Animation   | Framer Motion |
| 3D          | Three.js · React Three Fiber · @react-three/drei |
| Type        | Fraunces Variable · IBM Plex Sans Variable · IBM Plex Mono |
| Icons       | lucide-react |
| Email (opt) | Resend (via REST, no SDK required) |

## 3. Main features

- **Persistent data world** — one WebGL scene behind the whole page that changes formation as you move between content chapters. It never auto-spins; it responds to pointer input only.
- **Light / dark mode** — a 44 × 44 toggle in the header that follows the OS preference until you choose, then persists locally. The theme is applied by an inline boot script before first paint, so there is no flash.
- Edge-aligned **navigation** with active-section highlighting, scroll-progress rule and an accessible mobile drawer.
- **Hero** statement, **recruiter snapshot**, **About**, **Projects** with accessible case-study modal + full case-study pages.
- **Skills** with honest proficiency labels (no fake percentages), animated **data-pipeline** visual.
- **Education** timeline, **Certifications** (job simulations clearly labelled), **GitHub** proof-of-work, **Currently learning** roadmap.
- **Contact** form with validation, loading/success/error/fallback states, honeypot spam protection and copy-email.
- Full **SEO**: metadata, canonical, Open Graph (dynamically generated OG image), Twitter card, `robots`, `sitemap`, web manifest, JSON-LD Person + WebSite schema.

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
4. (Optional) add environment variables from the table in §8.
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
| `NEXT_PUBLIC_SITE_URL` | Optional local development URL for absolute SEO/OG links. Production uses the canonical `https://www.aakshat.in` URL in `lib/site.ts`. |

> Secrets are **never** committed or exposed to the browser — only `NEXT_PUBLIC_*` values reach the client, by design.

## 9. The design system

[`design.md`](design.md) is the contract; read it before adding anything visual. The short version:

- **Colour carries meaning.** Amber (`--color-signal`) is for actions, marks and emphasis. Cobalt (`--color-data`) is for evidence only — charts, plates, metrics, the WebGL world. They are not interchangeable, and combined accent use stays under ~3% of any viewport.
- **The band** (`--color-band-*`) is mode-invariant: it stays dark in dark mode so the page rhythm survives the theme toggle.
- **One surface system.** Every `<section>` carries exactly one `.section*` class and one `.surface--*` class, and never hand-rolls block padding.
- **Primitives are the vocabulary** — `Panel`, `SectionHeading`, `Badge`, `Stat`, `MagneticButton`, `Reveal`. A section that needs a container, chip, heading, measurement or entrance uses one of these rather than a local copy.
- **Values live in `tokens.css`**, exposed to Tailwind through [`tailwind.config.ts`](tailwind.config.ts) as `base · ink · signal · data · band · rule` with `<alpha-value>` support.

## 10. Résumé

There is no résumé PDF in the repo, by design. The résumé buttons (`components/ui/ResumeButton.tsx`) open a pre-addressed `mailto:` so a request arrives as a real conversation. To switch to a hosted file instead, point `ResumeButton` at a `href` of your choosing.

## 11. Project visuals

Projects show hand-drawn **SVG data plates** — one per project slug in [`components/ui/ProjectVisual.tsx`](components/ui/ProjectVisual.tsx), drawn from the project's own domain (diagnostic clusters, a risk gauge, a retention curve, a similarity matrix). They are conceptual diagrams, not screenshots, and they re-tone automatically with the theme because they draw in `var(--color-*)`.

Adding a project means adding a case to that file alongside its entry in `data/portfolio.ts`.

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

The scene lives in [`components/3d/PersistentDataWorld.tsx`](components/3d/PersistentDataWorld.tsx) and is mounted once, in the root layout, via `components/motion/ScrollDepth.tsx`:

- Loaded with `next/dynamic` (`ssr: false`) behind a static fallback, so it never blocks page content.
- `dpr` is capped at `[1, 1.5]`, antialiasing is off and the geometry is deterministic — under 100 draw calls, no external model payload.
- Formation is driven by `data-world="0…5"` attributes on the sections; an IntersectionObserver sets the stage as each chapter becomes active.
- Pointer parallax is gated behind `(hover: hover) and (pointer: fine)`, and narrow viewports collapse the horizontal offset in `useFrame`.
- Missing WebGL **or** `prefers-reduced-motion: reduce` → the canvas is never created and the CSS fallback renders instead.
- The material palette refreshes on the `portfolio-theme-change` event without rebuilding the scene.

## 14. Contact-form configuration

- **Without** `RESEND_API_KEY` / `CONTACT_FROM_EMAIL`: the form validates and returns a graceful fallback; the UI offers a pre-filled `mailto:` link so no message is lost.
- **With** them set: messages are emailed to `CONTACT_TO_EMAIL` via Resend, with the sender's address as reply-to.
- A hidden honeypot field blocks basic spam bots.

## 15. Accessibility notes

- Semantic landmarks, correct heading order, skip-to-content link.
- Keyboard-navigable menu and modal (focus trap, Escape to close, focus restore).
- Visible focus rings that meet the 3:1 boundary requirement; descriptive alt text; `aria` only where needed.
- Touch targets are at least 44 × 44 CSS pixels.
- Decorative 3D canvas is `aria-hidden`. Reduced motion is honoured **in JS** as well as CSS, because Framer Motion drives inline styles and WAAPI that a media query cannot reach.

## 16. Browser support

Modern evergreen browsers (Chrome, Edge, Firefox, Safari). WebGL is optional — the site degrades to a static visual where it's unavailable.

## 17. Troubleshooting

| Symptom | Fix |
|--------|-----|
| Contact form says "delivery isn't configured" | Set `RESEND_API_KEY` + `CONTACT_FROM_EMAIL`, or just use the offered mailto link. |
| 3D scene not visible | Expected on reduced-motion / no-WebGL — the CSS fallback is intentional. |
| Colours look wrong after an edit | A component is probably hard-coding a value instead of reading a token. `tokens.css` wins; see §9. |
| Install is slow on Windows | First install fetches three.js + Next; antivirus can slow file writes. Let it finish. |

## 18. Project structure

```text
app/
  layout.tsx            # fonts, theme boot script, SEO metadata, JSON-LD, world, analytics
  page.tsx              # single-page composition
  globals.css           # design tokens + utilities
  not-found.tsx         # custom 404
  robots.ts sitemap.ts manifest.ts opengraph-image.tsx
  api/contact/route.ts  # contact endpoint (+ fallback)
  projects/[slug]/page.tsx  # dynamic case-study pages
components/
  Analytics.tsx
  layout/               # Header, Footer
  motion/ScrollDepth.tsx    # mounts the persistent world
  3d/PersistentDataWorld.tsx
  sections/             # Hero, RecruiterSnapshot, About, Projects, Skills,
                        # DataPipeline, Education, Certifications, GithubProof,
                        # CurrentlyLearning, Contact
  ui/                   # Panel, SectionHeading, Badge, Stat, MagneticButton,
                        # Reveal, ThemeToggle, ResumeButton, SocialLinks,
                        # ProjectVisual, ProjectModal, IntelligenceMap
data/portfolio.ts       # ← single source of truth for all content
design.md               # ← the locked design system
tokens.css              # ← authoritative values for both modes
hooks/                  # useScrollSpy, usePointerOffset
lib/                    # utils, icons, site config, analytics
types/index.ts          # typed content model
public/                 # favicon
```

---

Built with Next.js, Tailwind CSS, Framer Motion and React Three Fiber.
