/** Join class names, skipping falsy values. Tiny alternative to clsx. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}

/** Map a proficiency label to a fill fraction for meter visuals (0–1). */
export function proficiencyToLevel(level: string): number {
  switch (level) {
    case 'Strong':
      return 1
    case 'Working knowledge':
      return 0.72
    case 'Familiar':
      return 0.48
    case 'Currently learning':
      return 0.3
    default:
      return 0.5
  }
}

/** Basic email shape check for the contact form. */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}
