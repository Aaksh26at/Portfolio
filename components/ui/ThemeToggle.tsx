'use client'

import { useEffect, useState } from 'react'
import { AlertTriangle, Check, LoaderCircle, Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'
import styles from './ThemeToggle.module.css'

type ThemeName = 'light' | 'dark'
export type ThemeToggleState =
  | 'default'
  | 'hover'
  | 'focus'
  | 'active'
  | 'disabled'
  | 'loading'
  | 'error'
  | 'success'

const STORAGE_KEY = 'aakshat-portfolio-theme'
const THEME_EVENT = 'portfolio-theme-change'

function systemTheme(): ThemeName {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function savedTheme(): ThemeName | null {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    return saved === 'light' || saved === 'dark' ? saved : null
  } catch {
    return null
  }
}

function applyTheme(theme: ThemeName, persist: boolean) {
  const root = document.documentElement
  root.dataset.theme = theme
  root.style.colorScheme = theme

  if (persist) {
    try {
      window.localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // The visual preference still applies when storage is unavailable.
    }
  }

  window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: { theme } }))
}

export function ThemeToggle({ previewState = 'default' }: { previewState?: ThemeToggleState }) {
  const [theme, setTheme] = useState<ThemeName>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const initial = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
    setTheme(initial)
    setMounted(true)
    applyTheme(initial, false)

    const preference = window.matchMedia('(prefers-color-scheme: dark)')
    const handlePreference = () => {
      if (savedTheme()) return
      const next = systemTheme()
      setTheme(next)
      applyTheme(next, false)
    }
    preference.addEventListener('change', handlePreference)
    return () => preference.removeEventListener('change', handlePreference)
  }, [])

  const visualState = mounted ? previewState : 'loading'
  const disabled = visualState === 'disabled' || visualState === 'loading'
  const nextTheme: ThemeName = theme === 'dark' ? 'light' : 'dark'
  const label = `Switch to ${nextTheme} mode`

  const handleClick = () => {
    if (disabled) return
    setTheme(nextTheme)
    applyTheme(nextTheme, true)
  }

  const Icon =
    visualState === 'loading'
      ? LoaderCircle
      : visualState === 'error'
        ? AlertTriangle
        : visualState === 'success'
          ? Check
          : theme === 'dark'
            ? Sun
            : Moon

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      aria-busy={visualState === 'loading'}
      aria-pressed={theme === 'dark'}
      aria-label={label}
      title={label}
      data-state={visualState}
      data-theme={theme}
      className={cn(
        styles.toggle,
        visualState === 'hover' && styles.isHover,
        visualState === 'focus' && styles.isFocus,
        visualState === 'active' && styles.isActive,
        visualState === 'disabled' && styles.isDisabled,
      )}
    >
      <Icon className={styles.icon} aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </button>
  )
}
