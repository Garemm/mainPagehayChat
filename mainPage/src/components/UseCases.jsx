import { motion } from 'framer-motion'
import Section, { SectionHeader } from './ui/Section'
import { TrendingUp, Layers, Headphones, Users } from 'lucide-react'

const useCases = [
  {
    icon: TrendingUp,
    title: 'Restaurantes y Cafeterías',
    description: 'El chatbot responde al instante sobre el menú, precios, ingredientes, horarios y promociones del día, gestionados desde el panel admin.',
    tags: ['Menú', 'Horarios', 'Promociones'],
    accent: '#2563eb',
  },
  {
    icon: Layers,
    title: 'Ferreterías y Tiendas',
    description: 'Consultas de stock, precios por unidad o rollo, disponibilidad de materiales y catálogo completo disponible las 24 hs sin necesidad de llamar.',
    tags: ['Catálogo', 'Precios', 'Stock'],
    accent: '#3b82f6',
  },
  {
    icon: Headphones,
    title: 'Talleres y Servicios',
    description: 'Informa sobre tipos de servicio, costos y datos de contacto. Ideal para talleres mecánicos, eléctricos o de limpieza.',
    tags: ['Servicios', 'Cotización', 'Contacto'],
    accent: '#1e40af',
  },
  {
    icon: Users,
    title: 'Cualquier Negocio Local',
    description: 'Si tiene un catálogo, horarios o servicios que comunicar, hayChat Business puede atender a tus clientes en segundos, sin necesidad de programar nada.',
    tags: ['Ubicación', 'Catálogo', 'Contacto'],
    accent: '#2563eb',
  },
]

export default function UseCases() {
  return (
    <Section id="use-cases" className="section-separator">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Casos de uso"
          headline="Para todo tipo de negocio local"
          subheadline="Da igual el rubro: si tienes productos, servicios u horarios que comunicar, el chatbot los convierte en respuestas instantáneas para tus clientes."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {useCases.map((uc, i) => (
            <UseCaseCard key={uc.title} useCase={uc} index={i} />
          ))}
        </div>
      </div>
    </Section>
  )
}

function UseCaseCard({ useCase, index }) {
  const Icon = useCase.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className="group relative rounded-2xl p-7 bg-surface border border-border
                 hover:border-accent/25 transition-all duration-300 overflow-hidden"
    >
      {/* Background tint on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at 100% 100%, ${useCase.accent}06 0%, transparent 60%)` }}
      />

      <div className="relative flex flex-col gap-4">
        {/* Icon + title row */}
        <div className="flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center border border-border group-hover:border-opacity-50 transition-all duration-300 flex-shrink-0"
            style={{ background: `${useCase.accent}12`, borderColor: `${useCase.accent}30` }}
          >
            <Icon className="w-5 h-5" style={{ color: useCase.accent }} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">{useCase.title}</h3>
            <p className="text-sm text-foreground-muted leading-relaxed">{useCase.description}</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-1">
          {useCase.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-surface-2 text-foreground-muted border border-border/60"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Arrow link */}
        <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ color: useCase.accent }}>
          <span>Explore use case</span>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </motion.div>
  )
}
