import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Section, { SectionHeader } from './ui/Section'
import { Check, Zap } from 'lucide-react'
import Button from './ui/Button'

const plans = [
  {
    name: 'Básico',
    tagline: 'Para empezar',
    monthlyPrice: 499,
    yearlyPrice: 4990,
    description: 'Todo lo necesario para que tu negocio empiece a atender clientes con el chatbot.',
    features: [
      '1 negocio registrado',
      'Chat web en tiempo real',
      'Motor NLP determinista',
      'Productos, servicios y horarios',
      'Contexto multi-turno básico',
      'Soporte por correo',
    ],
    cta: 'Empezar gratis',
    ctaVariant: 'secondary',
    highlighted: false,
  },
  {
    name: 'Pro',
    tagline: 'Más popular',
    monthlyPrice: 899,
    yearlyPrice: 8990,
    description: 'Potencia total: IA generativa, voz e importación masiva incluidos.',
    features: [
      'Todo lo del plan Básico',
      'Voz: dictado y lectura (STT + TTS)',
      'IA generativa con OpenAI (fallback RAG)',
      'Importación masiva desde Excel',
      'Contexto multi-turno completo (Redis)',
      'Historial de conversaciones',
      'Soporte prioritario',
    ],
    cta: 'Empezar gratis',
    ctaVariant: 'primary',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    tagline: 'Para cadenas y franquicias',
    monthlyPrice: null,
    yearlyPrice: null,
    description: 'Soluciones a medida para múltiples ubicaciones y alto volumen.',
    features: [
      'Negocios y ubicaciones ilimitadas',
      'Marca blanca (white-label)',
      'Entrenamiento de IA personalizado',
      'Integraciones a medida',
      'Infraestructura dedicada',
      'SLA garantizado',
      'Gerente de éxito dedicado',
    ],
    cta: 'Contactar ventas',
    ctaVariant: 'outline',
    highlighted: false,
  },
]

export default function Pricing() {
  const [yearly, setYearly] = useState(false)

  return (
    <Section id="pricing" className="section-separator">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Precios"
          headline="Precios simples, sin sorpresas"
          subheadline="Sin costos ocultos. Cancela cuando quieras. Prueba gratis y migra al plan que más le conviene a tu negocio."
        />

        {/* Toggle */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-4 glass rounded-xl p-1 border border-border/60">
            <button
              onClick={() => setYearly(false)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                !yearly ? 'bg-surface-3 text-foreground shadow-card' : 'text-foreground-muted hover:text-foreground'
              }`}
            >
              Mensual
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                yearly ? 'bg-surface-3 text-foreground shadow-card' : 'text-foreground-muted hover:text-foreground'
              }`}
            >
              Anual
              <span className="px-1.5 py-0.5 rounded-md bg-accent/15 text-accent text-[10px] font-bold border border-accent/20">
                -20%
              </span>
            </button>
          </div>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {plans.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} yearly={yearly} index={i} />
          ))}
        </div>

        <p className="text-center text-xs text-foreground-subtle mt-8">
          Todos los planes incluyen 14 días de prueba gratuita — sin tarjeta de crédito.
        </p>
      </div>
    </Section>
  )
}

function PlanCard({ plan, yearly, index }) {
  const price = yearly ? plan.yearlyPrice : plan.monthlyPrice

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={{ y: plan.highlighted ? -6 : -4 }}
      className={[
        'relative rounded-2xl p-7 border transition-all duration-300',
        plan.highlighted
          ? 'bg-surface border-accent/40 shadow-glow'
          : 'bg-surface border-border hover:border-border-subtle',
      ].join(' ')}
    >
      {/* Recommended badge */}
      {plan.highlighted && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent text-white text-xs font-bold shadow-glow">
            <Zap className="w-3 h-3 fill-current" />
            Recommended
          </span>
        </div>
      )}

      {/* Tinted background for highlighted */}
      {plan.highlighted && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
      )}

      <div className="relative">
        {/* Plan header */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-foreground-muted uppercase tracking-widest mb-1">
            {plan.tagline}
          </p>
          <h3 className="text-xl font-bold text-foreground mb-3">{plan.name}</h3>
          <p className="text-sm text-foreground-muted">{plan.description}</p>
        </div>

        {/* Price */}
        <div className="mb-7 pb-7 border-b border-border/60">
          <AnimatePresence mode="wait">
            <motion.div
              key={yearly ? 'yearly' : 'monthly'}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className="flex items-end gap-1.5"
            >
              {price !== null ? (
                <>
                  <span className="text-xs text-foreground-muted self-start mt-2">$</span>
                  <span className="text-4xl font-bold text-foreground">{price}</span>
                  <span className="text-foreground-muted text-sm mb-1">/mensual</span>
                </>
              ) : (
                <span className="text-3xl font-bold text-foreground">Custom</span>
              )}
            </motion.div>
          </AnimatePresence>
          {yearly && price !== null && (
            <p className="text-xs text-accent mt-1 font-medium">
              Billed annually — saves ${(getMonthlyPrice(plan.name) - price) * 12}/yr
            </p>
          )}
        </div>

        {/* CTA */}
        <Button
          variant={plan.ctaVariant}
          className={`w-full justify-center mb-7 ${plan.highlighted ? 'shadow-glow hover:shadow-glow-lg' : ''}`}
        >
          {plan.cta}
        </Button>

        {/* Features */}
        <ul className="flex flex-col gap-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm">
              <Check
                className="w-4 h-4 flex-shrink-0 mt-0.5"
                style={{ color: plan.highlighted ? '#0ea5e9' : '#8b949e' }}
              />
              <span className="text-foreground-muted">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

function getMonthlyPrice(name) {
  const map = { 'Básico': 29, Pro: 69, Enterprise: null }
  return map[name]
}
