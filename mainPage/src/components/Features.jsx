import { motion } from 'framer-motion'
import Section, { SectionHeader } from './ui/Section'
import {
  Cpu, Globe, BookOpen, Zap, BarChart2, Plug,
} from 'lucide-react'

const features = [
  {
    icon: Cpu,
    title: 'NLP Híbrido + IA Generativa',
    description: 'Reglas deterministas primero: más rápido y preciso. Solo cuando ninguna regla aplica, activa OpenAI con contexto RAG filtrado de tu base de datos.',
    accent: '#0ea5e9',
  },
  {
    icon: Globe,
    title: 'Voz: STT + TTS Nativo',
    description: 'Dictado por voz y lectura automática de respuestas usando las APIs nativas del navegador. Ningún audio sale del dispositivo — privacidad total.',
    accent: '#06b6d4',
  },
  {
    icon: BookOpen,
    title: 'Contexto Multi-turno con Redis',
    description: 'El chatbot recuerda la conversación completa. "¿y cuánto cuesta?" después de preguntar por un producto funciona perfectamente. Fallback en memoria si Redis no está disponible.',
    accent: '#0284c7',
  },
  {
    icon: Zap,
    title: 'Panel Admin SaaS Incluido',
    description: 'Cada negocio gestiona sus productos, servicios, promociones, pedidos y horarios desde un panel web moderno sin tocar la base de datos. Crea tu cuenta y empieza en minutos.',
    accent: '#0ea5e9',
  },
  {
    icon: BarChart2,
    title: 'Importación Masiva desde Excel',
    description: 'Carga tu catálogo completo con un solo archivo Excel. Vista previa con validación antes de confirmar. Detecta y sugiere categorías automáticamente.',
    accent: '#06b6d4',
  },
  {
    icon: Plug,
    title: 'Tiempo Real vía WebSocket',
    description: 'Comunicación instantánea con Socket.io. Indicador de escritura animado, historial de mensajes persistido en Redis y sesión aislada por dispositivo.',
    accent: '#0284c7',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

export default function Features() {
  return (
    <Section id="features" className="section-separator">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Plataforma"
          headline="Todo lo que tu negocio necesita"
          subheadline="Un sistema completo: chatbot inteligente en tiempo real + panel de administración SaaS para gestionar tu catálogo y pedidos sin esfuerzo."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </Section>
  )
}

function FeatureCard({ feature, index }) {
  const Icon = feature.icon

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={cardVariants}
      whileHover={{ y: -5, scale: 1.005 }}
      className="group relative rounded-2xl p-6 bg-surface border border-border cursor-default
                 hover:border-accent/30 transition-all duration-300 overflow-hidden"
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${feature.accent}08 0%, transparent 70%)`,
        }}
      />

      {/* Gradient border on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${feature.accent}20, transparent 60%)`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: '1px',
          borderRadius: 'inherit',
        }}
      />

      {/* Icon */}
      <div
        className="relative w-11 h-11 rounded-xl flex items-center justify-center mb-5
                   border border-border group-hover:border-accent/30 transition-colors duration-300"
        style={{ background: `${feature.accent}10` }}
      >
        <Icon
          className="w-5 h-5 transition-colors duration-300"
          style={{ color: feature.accent }}
        />
      </div>

      {/* Content */}
      <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-white transition-colors duration-200">
        {feature.title}
      </h3>
      <p className="text-sm text-foreground-muted leading-relaxed">
        {feature.description}
      </p>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${feature.accent}60, transparent)` }}
      />
    </motion.div>
  )
}
