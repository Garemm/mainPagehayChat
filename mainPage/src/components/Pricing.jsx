import { motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Section, { SectionHeader } from './ui/Section'
import { Check, Zap, ChevronLeft, ChevronRight } from 'lucide-react'
import Button from './ui/Button'

const plans = [
  {
    name: 'Emprendedor',
    tagline: 'Para empezar con catálogo activo 24/7',
    monthlyPrice: 199,
    status: 'Disponible',
    description: 'Ideal para emprendedores que quieren automatizar atención y mantener su catálogo siempre disponible.',
    features: [
      'Panel SaaS de administración de empresa',
      'Chatbot híbrido con procesamiento de lenguaje natural (NLP)',
      'Gestión de hasta 20 productos',
      'Atención automatizada a clientes 24/7',
    ],
    cta: 'Elegir plan',
    ctaVariant: 'secondary',
    highlighted: false,
  },
  {
    name: 'Lite',
    tagline: 'Para negocios que inician su presencia digital',
    monthlyPrice: 399,
    status: 'Disponible',
    description: 'Un salto de capacidad para negocios en crecimiento que ya requieren operación de pedidos sincronizada.',
    features: [
      'Todo en Emprendedor',
      'Gestión de hasta 500 productos',
      'Sistema de pedidos sincronizado (Chat ↔ Panel administrador)',
      'Atención automatizada a clientes 24/7',
      'Atención por correo electrónico',
    ],
    cta: 'Elegir plan',
    ctaVariant: 'secondary',
    highlighted: false,
  },
  {
    name: 'Empresarial',
    tagline: 'Más popular',
    monthlyPrice: 499,
    status: 'Disponible',
    description: 'Para negocios que quieren escalar ventas con analítica y una web personalizada enfocada en conversión.',
    features: [
      'Todo en Lite',
      'Gráficas y análisis del comportamiento de clientes',
      'Gestión de hasta 2,500 productos',
      'Sistema de pedidos sincronizado (Chat ↔ Panel administrador)',
      'Mejor experiencia de usuario enfocada en conversión',
      'Soporte prioritario por correo electrónico',
      'Próximamente: Página web personalizada con catálogo digital',
    ],
    cta: 'Elegir plan',
    ctaVariant: 'primary',
    highlighted: true,
  },
  {
    name: 'Premium',
    tagline: 'Solución completa para escalar',
    monthlyPrice: 799,
    status: 'En desarrollo',
    description: 'Plan para empresas que buscan mayor rendimiento, más volumen y automatización avanzada.',
    features: [
      'Todo en Empresarial',
      'Chatbot avanzado con inteligencia artificial',
      'Gestión de hasta 15,000 productos',
      'Página web integrada con chatbot en tiempo real',
      'Experiencia optimizada para ventas automatizadas',
      'Mayor capacidad y rendimiento',
    ],
    cta: 'Próximamente',
    ctaVariant: 'secondary',
    highlighted: false,
    disabled: true,
  },
  {
    name: 'Custom',
    tagline: 'Para necesidades específicas',
    monthlyPrice: null,
    status: 'Futuro',
    description: 'Diseñado para empresas que requieren integraciones o funcionalidades a medida.',
    features: [
      'Integración de APIs',
      'Desarrollo de funcionalidades a medida',
      'Escalabilidad personalizada',
      'Soporte dedicado',
    ],
    cta: 'Hablar con ventas',
    ctaVariant: 'outline',
    highlighted: false,
  },
]

export default function Pricing() {
  const carouselRef = useRef(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  useEffect(() => {
    const el = carouselRef.current
    if (!el) return
    const onScroll = () => {
      setCanPrev(el.scrollLeft > 10)
      setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 10)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  function scrollByDir(dir = 1) {
    const el = carouselRef.current
    if (!el) return
    const card = el.querySelector('.snap-start')
    const cardWidth = card ? card.clientWidth + parseInt(getComputedStyle(card).marginRight || '16') : 360
    el.scrollBy({ left: dir * cardWidth, behavior: 'smooth' })
  }

  function CarouselControls() {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={() => scrollByDir(-1)}
          disabled={!canPrev}
          className={`p-2 rounded-lg bg-surface border border-border/60 ${canPrev ? 'hover:bg-surface-2' : 'opacity-40 cursor-not-allowed'}`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => scrollByDir(1)}
          disabled={!canNext}
          className={`p-2 rounded-lg bg-surface border border-border/60 ${canNext ? 'hover:bg-surface-2' : 'opacity-40 cursor-not-allowed'}`}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    )
  }

  return (
    <Section id="pricing" className="section-separator">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Precios"
          headline="Planes mensuales para cada etapa de negocio"
          subheadline="Precios claros y estructura escalable para lanzar ahora. Puedes empezar en minutos y crecer por capacidad."
        />

        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass border border-accent/20 text-sm text-foreground-muted">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Precios en MXN / mes
          </div>
        </div>

        {/* Plans carousel */}
        <div className="relative">
          <div className="hidden md:flex justify-end mb-4">
            <CarouselControls />
          </div>
          <div
              ref={carouselRef}
              className="carousel-container overflow-x-auto scroll-smooth snap-x snap-mandatory flex items-start gap-5 py-2 px-4 md:px-1"
              style={{ WebkitOverflowScrolling: 'touch', scrollPadding: '1rem', touchAction: 'pan-x' }}
              id="plans-carousel"
            >
              {plans.map((plan, i) => (
                <div
                  key={plan.name}
                  className="snap-center md:snap-start flex-shrink-0 w-[min(92vw,320px)] md:w-[360px] lg:w-[420px] h-full"
                >
                  <PlanCard plan={plan} index={i} />
                </div>
              ))}
            </div>
        </div>

        <p className="text-center text-xs text-foreground-subtle mt-8">
          Los planes Premium y Custom están en roadmap y se habilitarán por etapas.
        </p>
      </div>
    </Section>
  )
}

function PlanCard({ plan, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={{ y: plan.highlighted ? -8 : -6 }}
      className={[
        'relative rounded-2xl p-6 border-2 transition-all duration-300 h-full transform-gpu',
        plan.highlighted
          ? 'bg-surface border-accent/60 shadow-glow-lg -translate-y-1.5'
          : 'bg-surface border-border/90 hover:shadow-md',
      ].join(' ')}
    >
      {/* Recommended badge */}
      {plan.highlighted && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent text-white text-xs font-bold shadow-glow">
            <Zap className="w-3 h-3 fill-current" />
            Recomendado
          </span>
        </div>
      )}

      {plan.highlighted && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
      )}

      <div className="relative">
        {/* Plan header */}
        <div className="mb-6">
          <span
            className={[
              'inline-flex items-center text-[11px] rounded-full px-2.5 py-1 mb-3 border',
              plan.status === 'Disponible'
                ? 'bg-green-500/10 text-green-300 border-green-500/20'
                : 'bg-amber-500/10 text-amber-300 border-amber-500/20',
            ].join(' ')}
          >
            {plan.status}
          </span>
          <p className="text-xs font-semibold text-foreground-muted uppercase tracking-widest mb-1">
            {plan.tagline}
          </p>
          <h3 className="text-xl font-bold text-foreground mb-3">{plan.name}</h3>
          <p className="text-sm text-foreground-muted">{plan.description}</p>
        </div>

        {/* Price */}
        <div className="mb-7 pb-7 border-b border-border/60">
          <div className="flex items-end gap-1.5">
            {plan.monthlyPrice !== null ? (
              <>
                <span className="text-xs text-foreground-muted self-start mt-2">$</span>
                <span className="text-4xl font-bold text-foreground">{plan.monthlyPrice}</span>
                <span className="text-foreground-muted text-sm mb-1">MXN / mes</span>
              </>
            ) : (
              <span className="text-2xl font-bold text-foreground">Precio personalizado</span>
            )}
          </div>
        </div>

        {/* CTA */}
        <Button
          variant={plan.ctaVariant}
          className={`w-full justify-center mb-7 ${plan.highlighted ? 'shadow-glow hover:shadow-glow-lg' : ''}`}
          disabled={plan.disabled}
        >
          {plan.cta}
        </Button>

        {/* Features */}
        <ul className="flex flex-col gap-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm">
              <Check
                className="w-4 h-4 flex-shrink-0 mt-0.5"
                style={{ color: plan.highlighted ? '#2563eb' : '#8d87a3' }}
              />
              <span className="text-foreground-muted">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}
