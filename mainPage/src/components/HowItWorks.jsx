import { motion } from 'framer-motion'
import Section, { SectionHeader } from './ui/Section'
import { UserPlus, Database, Rocket } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Registra tu negocio',
    description: 'Crea tu cuenta en el panel admin y completa el perfil de tu negocio: nombre, teléfono, correo y ubicación. Listo en menos de 5 minutos.',
    accent: '#0ea5e9',
  },
  {
    number: '02',
    icon: Database,
    title: 'Carga tu catálogo',
    description: 'Agrega productos, servicios, horarios y promociones desde el panel — uno a uno o mediante importación masiva desde Excel. Sin tocar código.',
    accent: '#06b6d4',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Comparte el chat',
    description: 'Comparte el enlace del chatbot con tus clientes o embédalo en tu sitio web. Empiezan a hacer preguntas de inmediato.',
    accent: '#0284c7',
  },
]

export default function HowItWorks() {
  return (
    <Section id="how-it-works" className="section-separator">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Proceso"
          headline="Listo para atender en minutos"
          subheadline="Sin configuraciones complejas ni conocimientos técnicos. Tu chatbot puede estar respondiendo clientes el mismo día que te registras."
        />

        {/* Steps grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Connecting line (desktop only) */}
          <div className="absolute hidden md:block top-[52px] left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px">
            <div className="w-full h-full bg-gradient-to-r from-accent/20 via-accent/60 to-accent/20" />
            {/* Moving dot */}
            <motion.div
              animate={{ x: ['0%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatType: 'reverse' }}
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent shadow-glow-sm"
            />
          </div>

          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </Section>
  )
}

function StepCard({ step, index }) {
  const Icon = step.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay: index * 0.15, ease: 'easeOut' }}
      className="relative flex flex-col items-center text-center md:items-start md:text-left"
    >
      {/* Icon circle */}
      <div className="relative mb-6 z-10">
        <div
          className="w-14 h-14 rounded-2xl border flex items-center justify-center"
          style={{
            background: `${step.accent}12`,
            borderColor: `${step.accent}30`,
            boxShadow: `0 0 20px ${step.accent}15`,
          }}
        >
          <Icon className="w-6 h-6" style={{ color: step.accent }} />
        </div>
        {/* Step number badge */}
        <div
          className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white border border-background"
          style={{ background: step.accent }}
        >
          {index + 1}
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <span
          className="text-xs font-mono font-bold tracking-widest opacity-40"
          style={{ color: step.accent }}
        >
          {step.number}
        </span>
        <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
        <p className="text-sm text-foreground-muted leading-relaxed max-w-xs mx-auto md:mx-0">
          {step.description}
        </p>
      </div>
    </motion.div>
  )
}
