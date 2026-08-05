import type { ComponentType, ElementType, HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type PanelTone =
  | 'raised'
  | 'inset'
  | 'outline'
  | 'band'
  | 'signal'
  | 'data'
  | 'flush'

export type PanelPad = 'none' | 'sm' | 'md' | 'lg'

interface PanelProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  children?: ReactNode
  tone?: PanelTone
  pad?: PanelPad
  /** Overrides the tone's default shadow step. */
  elevation?: 0 | 1 | 2 | 3 | 4
  /** Adds the hover lift and focus-within border. */
  interactive?: boolean
  clip?: boolean
  as?: ElementType
}

const DEFAULT_ELEVATION: Record<PanelTone, 0 | 1 | 2 | 3 | 4> = {
  raised: 2,
  band: 3,
  inset: 0,
  outline: 0,
  signal: 0,
  data: 0,
  flush: 0,
}

/**
 * The one container primitive.
 *
 * Replaces `.observatory-panel`, which was the site's only card and
 * appeared roughly eighteen times across ten of eleven sections with
 * identical fill, border, radius and hover.
 *
 * `tone="band"` re-declares the colour tokens locally (see globals.css),
 * so its contents re-tone to ink automatically.
 */
export function Panel({
  children,
  tone = 'raised',
  pad = 'none',
  elevation,
  interactive = false,
  clip = false,
  as: Tag = 'div',
  className,
  ...rest
}: PanelProps) {
  // React 19's types resolve a bare `ElementType` tag to the intersection of
  // every intrinsic element, and void elements like <br> declare
  // `children?: undefined` — so `children` collapses to `never`. Narrowing to
  // the props Panel actually forwards keeps the permissive `as` API intact.
  const Component = Tag as ComponentType<HTMLAttributes<HTMLElement>>

  return (
    <Component
      className={cn('panel', className)}
      data-tone={tone}
      data-pad={pad === 'none' ? undefined : pad}
      data-elev={elevation ?? DEFAULT_ELEVATION[tone]}
      data-interactive={interactive || undefined}
      data-clip={clip || undefined}
      {...rest}
    >
      {children}
    </Component>
  )
}
