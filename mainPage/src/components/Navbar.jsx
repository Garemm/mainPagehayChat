import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from './ui/Button'

const navLinks = [
  { label: 'Características', href: '#features' },
  { label: 'Demo', href: '#demo' },
  { label: 'Control', href: '#control-center' },
  { label: 'Funcionamiento', href: '#how-it-works' },
  { label: 'Precios', href: '#pricing' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    // initialize theme from localStorage; default to light (do not auto-switch to system dark)
    try {
      const saved = localStorage.getItem('theme')
      if (saved) {
        setTheme(saved)
        document.documentElement.classList.toggle('dark', saved === 'dark')
      } else {
        setTheme('light')
        document.documentElement.classList.remove('dark')
      }
    } catch (e) {}
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    try { localStorage.setItem('theme', next) } catch (e) {}
    document.documentElement.classList.toggle('dark', next === 'dark')
  }

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={[
        'fixed top-0 left-0 right-0 z-50',
        'transition-all duration-300',
        scrolled
          ? 'glass border-b border-border/60 shadow-card'
          : 'bg-transparent border-b border-transparent',
      ].join(' ')}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center group">
            <img
              src="/hayChat.jpeg"
              alt="hayChat Business"
              title="hayChat Business"
              className="h-14 sm:h-16 object-contain rounded-md"
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-foreground-muted hover:text-foreground rounded-lg hover:bg-surface-2 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + theme toggle */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-pressed={theme === 'dark'}
              aria-label="Alternar tema claro/oscuro"
              title={`Tema: ${theme === 'dark' ? 'Oscuro' : 'Claro'}`}
              className="relative w-14 h-8 rounded-full transition-colors focus:outline-none"
            >
              <span className={`absolute inset-0 rounded-full transition-colors ${theme === 'dark' ? 'bg-indigo-600' : 'bg-surface-2'}`} />

              <span className={`absolute left-2 top-1.5 transition-opacity z-10 pointer-events-none text-yellow-400 ${theme === 'dark' ? 'opacity-40' : 'opacity-100'}`} aria-hidden>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="drop-shadow-md">
                  <g fill="currentColor">
                    <circle cx="12" cy="12" r="4.2" />
                  </g>
                  <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
                    <line x1="12" y1="1.5" x2="12" y2="4.5" />
                    <line x1="12" y1="19.5" x2="12" y2="22.5" />
                    <line x1="1.5" y1="12" x2="4.5" y2="12" />
                    <line x1="19.5" y1="12" x2="22.5" y2="12" />
                    <line x1="4.2" y1="4.2" x2="6.2" y2="6.2" />
                    <line x1="17.8" y1="17.8" x2="19.8" y2="19.8" />
                    <line x1="4.2" y1="19.8" x2="6.2" y2="17.8" />
                    <line x1="17.8" y1="6.2" x2="19.8" y2="4.2" />
                  </g>
                </svg>
              </span>

              <span className={`absolute right-2 top-1.5 transition-opacity z-10 pointer-events-none ${theme === 'dark' ? 'opacity-100' : 'opacity-40'} text-yellow-600`} aria-hidden>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor"/></svg>
              </span>

              <span
                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transform transition-transform z-20 ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}`}
              />
            </button>

            <a
              href="/panelAdministrador/" target="_blank" rel="noopener noreferrer"
              className="text-sm font-medium text-foreground-muted hover:text-foreground transition-colors duration-200"
            >
              Inicia sesión
            </a>
            <Button variant="primary" size="sm" href="/chat/1" target="_blank" rel="noopener noreferrer">
              Prueba chat genérico
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-foreground-muted hover:text-foreground hover:bg-surface-2 transition-all"
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[7.5px]' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[7.5px]' : ''}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="md:hidden glass border-t border-border/60 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-foreground-muted hover:text-foreground rounded-lg hover:bg-surface-2 transition-all"
                >
                  {link.label}
                </a>
              ))}
              {/* mobile theme toggle */}
              <div className="mt-2 px-4">
                <div className="w-full flex items-center justify-center gap-2 px-3 py-2">
                  <button
                    onClick={() => { toggleTheme(); setMobileOpen(false) }}
                    aria-pressed={theme === 'dark'}
                    className="relative w-14 h-8 rounded-full transition-colors focus:outline-none"
                  >
                    <span className={`absolute inset-0 rounded-full transition-colors ${theme === 'dark' ? 'bg-indigo-600' : 'bg-surface-2'}`} />
                    <span className={`absolute left-2 top-1.5 transition-opacity text-yellow-400 ${theme === 'dark' ? 'opacity-40' : 'opacity-100'}`} aria-hidden>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="drop-shadow-md">
                        <g fill="currentColor">
                          <circle cx="12" cy="12" r="4.2" />
                        </g>
                        <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
                          <line x1="12" y1="1.5" x2="12" y2="4.5" />
                          <line x1="12" y1="19.5" x2="12" y2="22.5" />
                          <line x1="1.5" y1="12" x2="4.5" y2="12" />
                          <line x1="19.5" y1="12" x2="22.5" y2="12" />
                          <line x1="4.2" y1="4.2" x2="6.2" y2="6.2" />
                          <line x1="17.8" y1="17.8" x2="19.8" y2="19.8" />
                          <line x1="4.2" y1="19.8" x2="6.2" y2="17.8" />
                          <line x1="17.8" y1="6.2" x2="19.8" y2="4.2" />
                        </g>
                      </svg>
                    </span>
                    <span className={`absolute right-2 top-1.5 transition-opacity ${theme === 'dark' ? 'opacity-100' : 'opacity-40'} text-yellow-600`} aria-hidden>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor"/></svg>
                    </span>
                    <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transform transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}`} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

function NexusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="2" fill="#2563eb" />
      <path d="M8 2L8 5M8 11L8 14M2 8L5 8M11 8L14 8" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="2" r="1" fill="#60a5fa" opacity="0.7" />
      <circle cx="8" cy="14" r="1" fill="#60a5fa" opacity="0.7" />
      <circle cx="2" cy="8" r="1" fill="#60a5fa" opacity="0.7" />
      <circle cx="14" cy="8" r="1" fill="#60a5fa" opacity="0.7" />
    </svg>
  )
}
