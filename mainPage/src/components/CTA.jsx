import { motion } from 'framer-motion'
import Button from './ui/Button'
import { ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section className="relative py-32 overflow-hidden section-separator">
      {/* Background glow layers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(124, 58, 237, 0.12) 0%, transparent 65%)',
          }}
        />
        <motion.div
          animate={{
            scale: [1.15, 1, 1.15],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(192, 132, 252, 0.08) 0%, transparent 65%)',
          }}
        />

        {/* Faint horizontal lines */}
        {[0.25, 0.5, 0.75].map((p) => (
          <div
            key={p}
            className="absolute left-0 right-0 h-px"
            style={{
              top: `${p * 100}%`,
              background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.1), transparent)',
            }}
          />
        ))}
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col items-center gap-8"
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-accent/10 border border-accent/20 text-accent">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Listo para atender en minutos
          </span>

          {/* Headline */}
          <div className="flex flex-col gap-3">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
              <span className="text-gradient-white">Dale voz a</span>
              <br />
              <span className="text-gradient-blue">tu negocio hoy</span>
            </h2>
            <p className="text-foreground-muted text-lg max-w-xl mx-auto leading-relaxed">
              Registra tu negocio, carga tu catálogo y empieza a atender clientes en tiempo real. Sin código, sin complicaciones.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-4">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base bg-accent text-white
                           border border-accent/30 shadow-glow-lg hover:shadow-glow-xl hover:bg-accent-glow
                           transition-all duration-200"
              >
                Registrar mi negocio
                <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>
            <Button variant="secondary" size="lg">
              Ver demo
            </Button>
          </div>

          {/* Trust footnote */}
          <p className="text-xs text-foreground-subtle">
            Rápido y confiable · Cancela cuando quieras
          </p>
        </motion.div>
      </div>
    </section>
  )
}
