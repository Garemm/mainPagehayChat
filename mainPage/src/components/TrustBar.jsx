import { motion } from 'framer-motion'

const logos = [
  { name: 'Stripe', path: 'M 4 12 C 4 8 7 6 12 6 C 17 6 20 8 20 12 C 20 16 17 18 12 18 C 7 18 4 16 4 12' },
  { name: 'Vercel', path: 'M 12 4 L 20 18 L 4 18 Z' },
  { name: 'Linear', path: 'M 4 4 L 20 4 M 4 12 L 16 12 M 4 20 L 12 20' },
  { name: 'Notion', path: 'M 6 4 L 6 20 M 6 4 L 14 20 M 18 4 L 18 20' },
  { name: 'HubSpot', path: 'M 16 8 C 16 10 14 12 12 12 C 10 12 8 10 8 8 C 8 6 10 4 12 4 C 14 4 16 6 16 8 Z M 12 12 L 12 20' },
  { name: 'Slack', path: 'M 8 6 C 8 4.9 8.9 4 10 4 C 11.1 4 12 4.9 12 6 L 12 10 L 8 10 Z M 8 10 C 6.9 10 6 10.9 6 12 C 6 13.1 6.9 14 8 14 L 10 14 L 10 10 Z' },
]

const LogoText = ({ name }) => (
  <span className="text-foreground-subtle font-semibold text-sm tracking-wide select-none">
    {name}
  </span>
)

export default function TrustBar() {
  return (
    <section className="relative py-12 section-separator">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-8"
        >
          <p className="text-foreground-subtle text-xs font-semibold uppercase tracking-widest">
            Diseñado para todo tipo de negocio local
          </p>

          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
            {[
              'Restaurantes', 'Ferreterías', 'Papelerías', 'Talleres',
              'Tiendas de ropa', 'Farmacias', 'Cafeterías', 'Servicios',
            ].map((name, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="opacity-30 hover:opacity-60 transition-opacity duration-300"
              >
                <span className="text-foreground font-bold text-base tracking-tight">{name}</span>
              </motion.div>
            ))}
          </div>

          {/* Stats strip */}
          <div className="w-full mt-4 pt-8 border-t border-border/40 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '0.5s', label: 'Tiempo de respuesta promedio' },
              { value: '2 modos', label: 'Escribiendo mensajes o grabando audio' },
              { value: '100%', label: 'Privacidad de voz, sin audio externo' },
              { value: '24/7', label: 'Disponibilidad del chatbot' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                className="text-center"
              >
                <p className="text-2xl md:text-3xl font-bold text-gradient-blue mb-1">{stat.value}</p>
                <p className="text-xs text-foreground-subtle">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
