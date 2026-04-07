import { motion } from 'framer-motion'
import { Twitter, Github, Linkedin, MessageSquare } from 'lucide-react'

const footerLinks = {
  Producto: ['Características', 'Demo', 'Precios', 'Cómo funciona'],
  Empresa: ['Nosotros', 'Blog', 'Contacto'],
  Plataforma: ['Panel Admin', 'Importación Excel', 'API'],
  Legal: ['Privacidad', 'Términos de uso'],
}

const socialLinks = [
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Github, label: 'GitHub', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: MessageSquare, label: 'Discord', href: '#' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-6 gap-10">
          {/* Brand col */}
          <div className="col-span-2">
            <a href="#" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg border border-accent/40 bg-accent/10 flex items-center justify-center">
                <NexusIcon />
              </div>
              <span className="font-bold text-base text-foreground">
                ChatLocal<span className="text-accent">AI</span>
              </span>
            </a>
            <p className="text-sm text-foreground-muted leading-relaxed max-w-xs mb-6">
              Chatbot híbrido inteligente para negocios locales. NLP determinísta + IA generativa con contexto real de tu negocio.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-8 h-8 rounded-lg bg-surface-2 border border-border flex items-center justify-center text-foreground-muted hover:text-foreground hover:border-accent/30 hover:bg-surface-3 transition-all duration-200"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-widest mb-4">
                {category}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-foreground-muted hover:text-foreground transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-foreground-subtle">
            © {new Date().getFullYear()} ChatLocal AI. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-1 text-xs text-foreground-subtle">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

function NexusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="2" fill="#0ea5e9" />
      <path d="M8 2L8 5M8 11L8 14M2 8L5 8M11 8L14 8" stroke="#0ea5e9" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="2" r="1" fill="#38bdf8" opacity="0.6" />
      <circle cx="8" cy="14" r="1" fill="#38bdf8" opacity="0.6" />
      <circle cx="2" cy="8" r="1" fill="#38bdf8" opacity="0.6" />
      <circle cx="14" cy="8" r="1" fill="#38bdf8" opacity="0.6" />
    </svg>
  )
}
