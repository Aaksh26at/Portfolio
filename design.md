# Design — Aakshat Agarwal Portfolio

A locked design system for this app. Every route reads this file before emitting code. Extend it when the system needs to grow; do not invent local themes.

`tokens.css` is the single source of truth for values. This document explains the intent behind them; where the two disagree, `tokens.css` wins and this file is the bug.

## Provenance

Structural direction studied from Joseph Santamaria's scroll-driven 3D portfolio: the persistent-world layer and chapter transitions. None of the source's artwork, copy, models, palette or visual identity is borrowed — the warm editorial treatment is this project's own.

## Genre

Editorial-atmospheric — a warm bone reading surface, one persistent data world behind it, and technical clarity in the foreground.

## Macrostructure family

- Marketing / homepage: **Narrative Workflow** — one continuous 3D data world changes formation across the content chapters.
- App views: **Workbench** — functional light surfaces, compact controls and no independent decorative scenes.
- Content / case studies: **Long Document** — one calm reading column; only the evidence plate takes a tinted surface.

## Component voice

- Hero: **H1 Marquee** — the statement owns the first view; supporting copy and actions sit in the handoff below it.
- Navigation: **N9 Edge-aligned minimal** — AA wordmark hard-left, compact theme control hard-right, mobile disclosure only when required.
- Footer: **Ft2 Inline single line** — one rule, identity, tracked proof links and copyright, continuing the band that Contact opens.

## Colour

Two families carry meaning, and they are not interchangeable.

- **Signal · amber** — CTAs, marks, emphasis, chapter numbers. `--color-signal` is a *fill* colour held at the lightest value that still clears 3:1 on paper; it is never small body text. Use `--color-signal-strong` for text.
- **Data · cobalt** — evidence only: charts, project plates, metrics, the WebGL world. If it represents a measurement, it is cobalt.

Amber fills always carry ink labels, never paper: amber at L66 is ~2.4:1 against white but ~5.3:1 against warm ink. Combined accent use stays below roughly 3% of any viewport. Gradient text, aurora blobs, glass blur and decorative floating orbs are prohibited.

Chroma values sit on the sRGB gamut boundary for their lightness — raising them gets clipped, not saturated.

### The band

`--color-band-*` is a mode-invariant ink surface: it stays dark in dark mode too, so the page rhythm survives the theme toggle. It is not "dark mode" and must never be aliased to the paper scale.

### Dark mode

The toggle follows the operating-system preference until the visitor chooses a mode, then persists that choice locally. Dark mode keeps both hues, lifts elevated surfaces through lightness, reduces body weight to 350, lifts the band one step so it still separates from the page, and refreshes the WebGL material palette without rebuilding the scene.

## Typography

- Display: **Fraunces Variable**, weight 700, `opsz 144`.
- Body: **IBM Plex Sans Variable**, weight 350–600 (`--font-body-weight`, 380 light / 350 dark).
- Mono: **IBM Plex Mono** 400/600 — measurements, chapter indices, tabular figures. Always paired with `.tnum`.
- Outlier: the AA wordmark is a *cut* of the display face at maximum optical size with optical sizing disabled, not a third family.
- Display tracking: `--track-display` (-0.028em) and `--track-display-tight` (-0.038em). Do not hand-roll tracking values.
- Type-scale anchor: `--text-display`; the short hero statement uses `--text-marquee`.

## Surfaces and rhythm

One system. Every `<section>` carries exactly one `.section*` class and one `.surface--*` class, and never hand-rolls its own block padding.

- `.surface--paper` transparent · `--inset` paper-3 · `--wash-signal` amber tint · `--wash-data` cobalt tint · `--outline` ink rules · `--band` mode-invariant ink.
- Filled surfaces get the full `--rhythm`; transparent paper sections get `--rhythm-half`, because their whitespace already reads as separation.
- Tinted and inked surfaces re-declare the colour tokens locally, so every descendant re-tones for free. Never hand-write a dark variant of a component that sits on the band.

## Spacing

4-point named scale in `tokens.css`. Pages use named tokens or fluid `clamp()` values; raw values are limited to WebGL geometry, SVG coordinates and content-driven breakpoints.

## Primitives

These are the vocabulary. A section that needs a container, a chip, a heading, a measurement or an entrance uses one of these — it does not hand-roll a local copy.

- **Panel** — the one container. Tone axis: `raised · inset · outline · band · signal · data · flush`, plus `pad`, `elevation`, `interactive`, `clip`.
- **SectionHeading** — the one heading vocabulary. `scale · align · mark · eyebrow · index · measure · reveal`.
- **Badge** — chips, on a `tone × variant` matrix. `dot="live"` is the status form.
- **Stat** — a measurement over its label; mono and tabular by default.
- **MagneticButton** — the action primitive. `primary · signal · ghost · soft` × `sm · md · lg`. Pointer-follow writes `--mx/--my` as custom properties so the transform stays in CSS.
- **Reveal** — the scroll entrance. `fade-rise · stagger · rule-draw · mask-wipe · lift · none`.

## Motion

- Easings: exponential `--ease-out`, accelerating `--ease-in`, symmetric `--ease-in-out`.
- Page reveal: one assembly of raw points into the hero data sculpture.
- Sections are assigned distinct Reveal variants so the page never reads as one animation repeated eleven times.
- The persistent WebGL scene never auto-spins. It responds to direct pointer input and changes formation only when a real content chapter becomes active.
- Reduced motion is checked **in JS** via `useReducedMotion`, not left to the CSS media block: framer-motion drives inline styles and WAAPI, which `@media (prefers-reduced-motion)` cannot reach. WebGL is replaced with a static structural fallback and all spatial transitions collapse to still states.

## Microinteractions stance

- Silent success when the result is visible; copy-to-clipboard changes its label in place.
- Focus rings appear instantly and meet the 3:1 boundary contrast requirement.
- Hover changes one signal—surface, border or colour—and always has a keyboard/tap equivalent.
- Touch targets are at least 44 × 44 CSS pixels.
- The theme toggle is a 44 × 44 native button with a literal sun/moon state, instant focus ring, quiet press feedback and no celebratory confirmation.

## CTA voice

- Primary: ink fill that inverts to amber on hover, compact radius, specific action copy.
- Secondary: quiet paper surface with a visible rule.
- Clickable labels never wrap.

## Per-page allowances

- The homepage uses one Tier-D persistent R3F scene: under 100 draw calls, client-lazy, deterministic geometry, no external model payload and a static fallback.
- Project pages share the same world but keep project-specific SVG data plates in the foreground.
- Content and error pages may hold the scene at one formation and reduce motion to zero.

## What pages MUST share

- AA wordmark, N9 navigation with persisted theme control and Ft2 footer.
- The signal/data colour split, the Fraunces / IBM Plex pairing, and the surface-and-rhythm system.
- CTA voice, focus treatment, the primitives above, and the persistent world layer.

## What pages MAY differ on

- Homepage chapters choose among dataset, constellation, project-cluster, pipeline, growth and AA-convergence formations.
- Case-study diagrams remain domain-specific: diagnostic clusters, risk gauge, retention curve or similarity matrix.

## Exports

`tokens.css` holds the authoritative declarations for both modes — light under `:root`, dark under `:root[data-theme='dark']` — including the colour scales, the band, type, spacing, motion, shape, the elevation ladder, section rhythm and the WebGL sRGB triplets.

Tailwind reads the `*-lch` triplets through `tailwind.config.ts`, which exposes `base · ink · signal · data · band · rule` with `<alpha-value>` support. Arbitrary values read the ready `var(--color-*)` forms. Both are remapped by the tinted and inked surfaces, so a component written once works on every surface.
