import { motion } from 'framer-motion'
import Section, { SectionHeader } from './ui/Section'
import {
  Cpu, Globe, BookOpen, Zap, BarChart2, Plug,
} from 'lucide-react'

const features = [
  {
    icon: Cpu,
    title: 'NLP Híbrido + IA Generativa',
    description: 'Reglas deterministas primero: más rápido y preciso. Solo cuando ninguna regla aplica, activa IA con contexto RAG filtrado de tu base de datos.',
    accent: '#2563eb',
  },
  {
    icon: Globe,
    title: 'Voz: STT + TTS Nativo',
    description: 'Dictado por voz y lectura automática de respuestas usando las APIs nativas del navegador. Ningún audio sale del dispositivo, privacidad total.',
    accent: '#3b82f6',
  },
  {
    icon: BookOpen,
    title: 'Contexto Multi-turno',
    description: 'El chatbot sigue el contexto de la conversación. "¿y cuánto cuesta?" después de preguntar por un producto funciona perfectamente.',
    accent: '#1e40af',
  },
  {
    icon: Zap,
    title: 'Panel Admin SaaS Incluido',
    description: 'Cada negocio gestiona sus productos, servicios, promociones, pedidos y horarios desde un panel web moderno sin tocar la base de datos. Crea tu cuenta y empieza en minutos.',
    accent: '#2563eb',
  },
  {
    icon: BarChart2,
    title: 'Importación Masiva desde Excel',
    description: 'Carga tu catálogo completo con un solo archivo Excel. Vista previa con validación antes de confirmar. Detecta y sugiere categorías automáticamente.',
    accent: '#0ea5e9',
  },
  {
    icon: Plug,
    title: 'Tiempo Real vía WebSocket',
    description: 'Comunicación instantánea con Socket.io. Indicador de escritura animado, historial de mensajes persistido hasta por 6 horas y sesión aislada por dispositivo.',
    accent: '#1d4ed8',
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
          subheadline="Un sistema completo: chatbot inteligente en tiempo real + panel de administración SaaS para gestionar tu catálogo, stock y pedidos sin esfuerzo. Sin necesidad de descargar Apps, todo está a un click al navegador."
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
      whileHover={{ y: -6, scale: 1.01 }}
      className="group relative rounded-2xl p-6 bg-background/70 backdrop-blur-sm border border-border/80 shadow-lg cursor-default hover:shadow-2xl hover:border-accent transition-all duration-300 overflow-hidden"
      style={{ zIndex: 1 }}
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
                   border-2 border-border/80 group-hover:border-accent/30 transition-colors duration-300 shadow-sm"
        style={{ background: `${feature.accent}18` }}
      >
        <Icon
          className="w-5 h-5 transition-colors duration-300"
          style={{ color: feature.accent }}
        />
      </div>

      {/* Content */}
      <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-foreground transition-colors duration-200">
        {feature.title}
      </h3>
      <p className="text-sm text-foreground-muted leading-relaxed">
        {feature.description}
      </p>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-30 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${feature.accent}60, transparent)` }}
      />
    </motion.div>
  )
}
