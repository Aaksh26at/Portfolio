# Design — Aakshat Agarwal Portfolio

A locked design system for this app. Every route reads this file before emitting code. Extend it when the system needs to grow; do not invent local themes.

## Provenance

Studied-DNA direction approved after reviewing Joseph Santamaria’s scroll-driven 3D portfolio and contrasting it with more game-led portfolio experiences. The build borrows the persistent-world structure and chapter transitions, not the source’s artwork, copy, models, or visual identity.

## Genre

Atmospheric — luminous scientific space with technical clarity, a pearl canvas and one electric-cobalt signal.

## Macrostructure family

- Marketing / homepage: **Narrative Workflow** — one continuous 3D data world changes formation across the existing content chapters.
- App views: **Workbench** — functional light surfaces, compact controls and no independent decorative scenes.
- Content / case studies: **Long Document** — linear reading surface with the persistent data world held behind project evidence.

## Component voice

- Hero: **H1 Marquee** — the statement owns the first view; supporting copy and actions sit in the handoff below it.
- Navigation: **N9 Edge-aligned minimal** — AA wordmark hard-left, compact theme control and contact action hard-right, mobile disclosure only when required.
- Footer: **Ft2 Inline single line** — one rule, identity, three proof links and copyright.

## Theme

- `--color-paper`: `oklch(97.5% 0.012 255)`
- `--color-paper-2`: `oklch(95.5% 0.018 255)`
- `--color-paper-3`: `oklch(92% 0.025 255)`
- `--color-ink`: `oklch(20% 0.028 260)`
- `--color-ink-2`: `oklch(36% 0.026 260)`
- `--color-muted`: `oklch(49% 0.022 260)`
- `--color-rule`: `oklch(82% 0.032 255)`
- `--color-control-rule`: `oklch(52% 0.03 260)`
- `--color-accent`: `oklch(54% 0.24 260)`
- `--color-accent-ink`: `oklch(98% 0.01 255)`
- `--color-focus`: `oklch(48% 0.26 260)`

Accent use stays below roughly 3% of any viewport. The WebGL world uses cobalt points, cool graphite structure and pearl negative space. Gradient text, aurora blobs, glass blur and decorative floating orbs are prohibited.

### Dark mode

- `--color-paper`: `oklch(15% 0.022 260)`
- `--color-paper-2`: `oklch(18.5% 0.025 260)`
- `--color-paper-3`: `oklch(22% 0.028 260)`
- `--color-ink`: `oklch(94% 0.014 255)`
- `--color-ink-2`: `oklch(82% 0.022 255)`
- `--color-muted`: `oklch(70% 0.022 255)`
- `--color-rule`: `oklch(34% 0.035 260)`
- `--color-control-rule`: `oklch(63% 0.04 255)`
- `--color-accent`: `oklch(65% 0.21 260)`
- `--color-accent-ink`: `oklch(14% 0.025 260)`
- `--color-focus`: `oklch(76% 0.16 260)`

The toggle follows the operating-system preference until the visitor chooses a mode, then persists that choice locally. Dark mode keeps the same cobalt hue, lifts elevated surfaces through lightness, reduces body weight, and refreshes the WebGL material palette without rebuilding the scene.

## Typography

- Display: **Space Grotesk Variable**, weight 700, roman.
- Body: **IBM Plex Sans Variable**, weight 350–600.
- Outlier: **Syne Variable**, weight 700, used only for the AA wordmark.
- Display tracking: `-0.04em` to `-0.055em`.
- Type-scale anchor: `clamp(3rem, 6.4vw, 5.5rem)`; the short hero statement may reach `7rem` on wide screens.

## Spacing

4-point named scale in `tokens.css`. Pages use named tokens or fluid `clamp()` values; raw values are limited to WebGL geometry, SVG coordinates and content-driven breakpoints.

## Motion

- Easings: exponential `--ease-out`, accelerating `--ease-in`, symmetric `--ease-in-out`.
- Page reveal: one assembly of raw points into the hero data sculpture.
- Motion primitives: pointer response, IntersectionObserver-driven chapter transitions and one-time hero assembly. No panel tilt or universal content reveal.
- The persistent WebGL scene never auto-spins. It responds to direct pointer input and changes formation only when a real content chapter becomes active.
- Reduced motion: WebGL is replaced with a static structural fallback and all spatial transitions collapse to still states.

## Microinteractions stance

- Silent success when the result is visible; copy-to-clipboard changes its label in place.
- Focus rings appear instantly and meet the 3:1 boundary contrast requirement.
- Hover changes one signal—surface, border or colour—and always has a keyboard/tap equivalent.
- Touch targets are at least 44 × 44 CSS pixels.
- The theme toggle is a 44 × 44 native button with a literal sun/moon state, instant focus ring, quiet press feedback and no celebratory confirmation.

## CTA voice

- Primary: near-black or cobalt outline, compact radius, specific action copy.
- Secondary: quiet paper surface with a visible rule.
- Clickable labels never wrap.

## Per-page allowances

- The homepage uses one Tier-D persistent R3F scene: under 100 draw calls, client-lazy, deterministic geometry, no external model payload and a static fallback.
- Project pages share the same world but keep project-specific SVG data plates in the foreground.
- Content and error pages may hold the scene at one formation and reduce motion to zero.

## What pages MUST share

- AA wordmark, N9 navigation with persisted theme control and Ft2 footer.
- Pearl / graphite / cobalt palette and Space Grotesk / IBM Plex pairing.
- CTA voice, focus treatment, project data-plate grammar and the persistent world layer.

## What pages MAY differ on

- Homepage chapters choose among dataset, constellation, project-cluster, pipeline, growth and AA-convergence formations.
- Case-study diagrams remain domain-specific: diagnostic clusters, risk gauge, retention curve or similarity matrix.

## Exports

### tokens.css

```css
:root {
  --color-paper: oklch(97.5% 0.012 255);
  --color-paper-2: oklch(95.5% 0.018 255);
  --color-paper-3: oklch(92% 0.025 255);
  --color-ink: oklch(20% 0.028 260);
  --color-ink-2: oklch(36% 0.026 260);
  --color-muted: oklch(49% 0.022 260);
  --color-rule: oklch(82% 0.032 255);
  --color-control-rule: oklch(52% 0.03 260);
  --color-accent: oklch(54% 0.24 260);
  --color-accent-ink: oklch(98% 0.01 255);
  --color-focus: oklch(48% 0.26 260);
  --font-display: "Space Grotesk Variable", ui-sans-serif, sans-serif;
  --font-body: "IBM Plex Sans Variable", ui-sans-serif, sans-serif;
  --font-outlier: "Syne Variable", ui-sans-serif, sans-serif;
  --space-xs: 0.5rem; --space-sm: 0.75rem; --space-md: 1rem;
  --space-lg: 1.5rem; --space-xl: 2.5rem; --space-2xl: 4rem;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --dur-short: 220ms; --dur-long: 420ms;
  --radius-card: 0.85rem; --radius-pill: 999px; --radius-input: 0.65rem;
  --world-point-size: 0.038; --world-line-opacity: 0.16;
}

:root[data-theme='dark'] {
  --color-paper: oklch(15% 0.022 260);
  --color-paper-2: oklch(18.5% 0.025 260);
  --color-paper-3: oklch(22% 0.028 260);
  --color-ink: oklch(94% 0.014 255);
  --color-ink-2: oklch(82% 0.022 255);
  --color-muted: oklch(70% 0.022 255);
  --color-rule: oklch(34% 0.035 260);
  --color-control-rule: oklch(63% 0.04 255);
  --color-accent: oklch(65% 0.21 260);
  --color-accent-ink: oklch(14% 0.025 260);
  --color-focus: oklch(76% 0.16 260);
  --world-line-opacity: 0.22;
}
```

### Tailwind v4 `@theme`

```css
@theme {
  --color-paper: oklch(97.5% 0.012 255);
  --color-paper-2: oklch(95.5% 0.018 255);
  --color-paper-3: oklch(92% 0.025 255);
  --color-ink: oklch(20% 0.028 260);
  --color-ink-2: oklch(36% 0.026 260);
  --color-muted: oklch(49% 0.022 260);
  --color-rule: oklch(82% 0.032 255);
  --color-control-rule: oklch(52% 0.03 260);
  --color-accent: oklch(54% 0.24 260);
  --color-focus: oklch(48% 0.26 260);
  --font-display: "Space Grotesk Variable", ui-sans-serif, sans-serif;
  --font-body: "IBM Plex Sans Variable", ui-sans-serif, sans-serif;
  --font-outlier: "Syne Variable", ui-sans-serif, sans-serif;
  --spacing-sm: 0.75rem; --spacing-md: 1rem; --spacing-lg: 1.5rem;
  --spacing-xl: 2.5rem; --spacing-2xl: 4rem;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --radius-card: 0.85rem;
}

:root[data-theme='dark'] {
  --color-paper: oklch(15% 0.022 260);
  --color-paper-2: oklch(18.5% 0.025 260);
  --color-paper-3: oklch(22% 0.028 260);
  --color-ink: oklch(94% 0.014 255);
  --color-ink-2: oklch(82% 0.022 255);
  --color-muted: oklch(70% 0.022 255);
  --color-rule: oklch(34% 0.035 260);
  --color-control-rule: oklch(63% 0.04 255);
  --color-accent: oklch(65% 0.21 260);
  --color-focus: oklch(76% 0.16 260);
}
```

### DTCG `tokens.json`

```json
{
  "$schema": "https://design-tokens.github.io/community-group/format/",
  "color": {
    "paper": { "$value": "oklch(97.5% 0.012 255)", "$type": "color" },
    "paper-2": { "$value": "oklch(95.5% 0.018 255)", "$type": "color" },
    "paper-3": { "$value": "oklch(92% 0.025 255)", "$type": "color" },
    "ink": { "$value": "oklch(20% 0.028 260)", "$type": "color" },
    "ink-2": { "$value": "oklch(36% 0.026 260)", "$type": "color" },
    "control-rule": { "$value": "oklch(52% 0.03 260)", "$type": "color" },
    "accent": { "$value": "oklch(54% 0.24 260)", "$type": "color" },
    "focus": { "$value": "oklch(48% 0.26 260)", "$type": "color" }
  },
  "color-dark": {
    "paper": { "$value": "oklch(15% 0.022 260)", "$type": "color" },
    "paper-2": { "$value": "oklch(18.5% 0.025 260)", "$type": "color" },
    "paper-3": { "$value": "oklch(22% 0.028 260)", "$type": "color" },
    "ink": { "$value": "oklch(94% 0.014 255)", "$type": "color" },
    "ink-2": { "$value": "oklch(82% 0.022 255)", "$type": "color" },
    "control-rule": { "$value": "oklch(63% 0.04 255)", "$type": "color" },
    "accent": { "$value": "oklch(65% 0.21 260)", "$type": "color" },
    "focus": { "$value": "oklch(76% 0.16 260)", "$type": "color" }
  },
  "font": {
    "display": { "$value": "Space Grotesk Variable, ui-sans-serif, sans-serif", "$type": "fontFamily" },
    "body": { "$value": "IBM Plex Sans Variable, ui-sans-serif, sans-serif", "$type": "fontFamily" },
    "outlier": { "$value": "Syne Variable, ui-sans-serif, sans-serif", "$type": "fontFamily" }
  },
  "space": {
    "md": { "$value": "1rem", "$type": "dimension" },
    "xl": { "$value": "2.5rem", "$type": "dimension" }
  },
  "duration": {
    "short": { "$value": "220ms", "$type": "duration" },
    "long": { "$value": "420ms", "$type": "duration" }
  },
  "radius": {
    "card": { "$value": "0.85rem", "$type": "dimension" },
    "input": { "$value": "0.65rem", "$type": "dimension" }
  }
}
```

### shadcn/ui CSS variables

```css
:root {
  --background: 97.5% 0.012 255;
  --foreground: 20% 0.028 260;
  --card: 95.5% 0.018 255;
  --card-foreground: 20% 0.028 260;
  --popover: 95.5% 0.018 255;
  --popover-foreground: 20% 0.028 260;
  --primary: 54% 0.24 260;
  --primary-foreground: 98% 0.01 255;
  --secondary: 92% 0.025 255;
  --secondary-foreground: 20% 0.028 260;
  --muted: 82% 0.032 255;
  --muted-foreground: 49% 0.022 260;
  --accent: 54% 0.24 260;
  --accent-foreground: 98% 0.01 255;
  --border: 82% 0.032 255;
  --input: 82% 0.032 255;
  --ring: 48% 0.26 260;
  --radius: 0.85rem;
}

.dark,
:root[data-theme='dark'] {
  --background: 15% 0.022 260;
  --foreground: 94% 0.014 255;
  --card: 18.5% 0.025 260;
  --card-foreground: 94% 0.014 255;
  --popover: 18.5% 0.025 260;
  --popover-foreground: 94% 0.014 255;
  --primary: 65% 0.21 260;
  --primary-foreground: 14% 0.025 260;
  --secondary: 22% 0.028 260;
  --secondary-foreground: 94% 0.014 255;
  --muted: 34% 0.035 260;
  --muted-foreground: 70% 0.022 255;
  --accent: 65% 0.21 260;
  --accent-foreground: 14% 0.025 260;
  --border: 34% 0.035 260;
  --input: 34% 0.035 260;
  --ring: 76% 0.16 260;
}
```
