'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

type Theme = 'light' | 'dark'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'

  const stored = localStorage.getItem('theme') as Theme | null
  if (stored === 'light' || stored === 'dark') return stored

  const prefersDark = window.matchMedia?.(
    '(prefers-color-scheme: dark)',
  )?.matches
  return prefersDark ? 'dark' : 'light'
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme())

  useEffect(() => {
    if (typeof document === 'undefined') return

    const root = document.documentElement

    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme)
    }
  }, [theme])

  function toggleTheme() {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Alternar modo claro/escuro"
      className="border-border bg-card text-foreground hover:bg-muted hover:text-foreground fixed bottom-4 left-4 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full border shadow-md transition-colors"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  )
}
