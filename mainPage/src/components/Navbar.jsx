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

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

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
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 rounded-lg bg-accent opacity-20 group-hover:opacity-40 transition-opacity duration-200 blur-sm" />
              <div className="relative w-8 h-8 rounded-lg border border-accent/40 bg-accent/10 flex items-center justify-center">
                <NexusIcon />
              </div>
            </div>
            <span className="font-bold text-base text-foreground tracking-tight">
              hayChat<span className="text-accent"> Businesss</span>
            </span>
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

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="http://localhost:4000/panelAdministrador" target="_blank" rel="noopener noreferrer"
              className="text-sm font-medium text-foreground-muted hover:text-foreground transition-colors duration-200"
            >
              Inicia sesión
            </a>
            <Button variant="primary" size="sm" href="http://localhost:3000/chat/1" target="_blank" rel="noopener noreferrer">
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
              <div className="pt-3 mt-2 border-t border-border flex flex-col gap-2">
                <Button variant="secondary" className="w-full justify-center">Sign in</Button>
                <Button variant="primary" className="w-full justify-center">Start Building</Button>
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
