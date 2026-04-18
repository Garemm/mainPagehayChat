import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, BarChart3, Clock3, PackageCheck, ShoppingCart } from 'lucide-react'
import Section, { SectionHeader } from './ui/Section'
import Button from './ui/Button'

const views = ['dashboard', 'orders']

const topProducts = [
  { name: 'Pizza pepperoni', count: 38 },
  { name: 'Hamburguesa doble', count: 31 },
  { name: 'Papas grandes', count: 24 },
  { name: 'Refresco sin azucar', count: 18 },
]

const hourlyTraffic = [
  { hour: '10h', count: 2 },
  { hour: '12h', count: 6 },
  { hour: '14h', count: 12 },
  { hour: '16h', count: 8 },
  { hour: '18h', count: 17 },
  { hour: '20h', count: 22 },
  { hour: '22h', count: 11 },
]

const orders = [
  {
    id: 184,
    customer: 'Daniela M.',
    pickup: '19:40',
    detail: '2 pizzas familiares + refresco sin azucar',
    status: 'pending',
  },
  {
    id: 182,
    customer: 'Luis R.',
    pickup: '19:15',
    detail: '1 hamburguesa doble + papas',
    status: 'accepted',
  },
  {
    id: 179,
    customer: 'Carmen S.',
    pickup: '18:50',
    detail: '4 bebidas frias para recoger',
    status: 'ready',
  },
]

const capabilityCards = [
  {
    icon: ShoppingCart,
    title: 'Pedidos activados desde el panel',
    text: 'Acepta o pausa pedidos sin tocar el chat. El estado se refleja al instante en la experiencia del cliente.',
  },
  {
    icon: BarChart3,
    title: 'Productos que más preguntan',
    text: 'El panel resume qué productos disparan más consultas para ajustar catálogo, promociones y stock.',
  },
  {
    icon: Clock3,
    title: 'Horas con más preguntas',
    text: 'Detecta los picos de tráfico para preparar personal, horarios y mensajes automáticos.',
  },
]

export default function ControlCenter() {
  const [activeView, setActiveView] = useState('dashboard')

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveView((current) => (current === 'dashboard' ? 'orders' : 'dashboard'))
    }, 4800)

    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <Section id="control-center" className="section-separator overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Operación conectada"
          headline="Lo que el cliente pregunta termina convertido en decisiones"
 subheadline={
    <span>
      El catálogo del panel alimenta el chat, y el chat genera los pedidos y las gráficas del panel. Sin duplicar datos y sin perder contexto.
      <br />
      ¡El cliente accede fácilmente al chat por link o QR!
    </span>
  }        />

        <div className="grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-8 lg:gap-10 items-start">
          <div className="flex flex-col gap-5">
            <div className="glass rounded-3xl border border-border/70 p-6 md:p-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-xs font-semibold text-accent mb-5">
                <PackageCheck className="w-3.5 h-3.5" />
                Chat, pedidos y analítica en el mismo flujo
              </div>

              <div className="space-y-4">
                {capabilityCards.map((item, index) => {
                  const Icon = item.icon

                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
                      className="rounded-2xl border border-border/60 bg-surface/70 p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl border border-accent/20 bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4.5 h-4.5 text-accent" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-foreground mb-1.5">{item.title}</h3>
                          <p className="text-sm leading-relaxed text-foreground-muted">{item.text}</p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              <div className="grid grid-cols-2 gap-3 mt-5">
                <CompactMetric value="Top 10" label="productos más consultados" />
                <CompactMetric value="24 h" label="distribución por hora" />
                <CompactMetric value="Hoy" label="pedidos del día" />
                <CompactMetric value="10 s" label="actualización del panel" />
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="primary" href="http://localhost:5174/" target="_blank" rel="noopener noreferrer">
                  Ver panel admin
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button variant="secondary" href="#demo">
                  Volver al chat en vivo
                </Button>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[32px] bg-accent/8 blur-3xl pointer-events-none" />

            <div className="relative glass rounded-[28px] border border-border/70 overflow-hidden shadow-glow">
              <div className="flex items-center justify-between px-5 py-4 border-b border-border/60 bg-surface/50">
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex flex-col gap-1">
                    <span className="w-3 h-3 rounded-full bg-red-500/70" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                    <span className="w-3 h-3 rounded-full bg-green-500/70" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Panel operativo</p>
                    <p className="text-xs text-foreground-subtle">mismo negocio, misma base de conocimiento</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-border/60 bg-background/40 p-1">
                  {views.map((view) => (
                    <button
                      key={view}
                      type="button"
                      onClick={() => setActiveView(view)}
                      className={[
                        'px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200',
                        activeView === view
                          ? 'bg-accent text-white shadow-glow-sm'
                          : 'text-foreground-subtle hover:text-foreground',
                      ].join(' ')}
                    >
                      {view === 'dashboard' ? 'Dashboard' : 'Pedidos'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-[74px_1fr] min-h-[560px]">
                <aside className="border-r border-border/60 bg-surface/35 p-3 flex flex-col gap-2">
                  {['Resumen', 'Productos', 'Pedidos', 'Horarios'].map((label, index) => (
                    <div
                      key={label}
                      className={[
                        'rounded-2xl px-2 py-3 text-center text-[11px] font-medium border transition-colors duration-200',
                        (activeView === 'dashboard' && index === 0) || (activeView === 'orders' && index === 2)
                          ? 'bg-accent/12 border-accent/30 text-accent'
                          : 'border-transparent text-foreground-subtle',
                      ].join(' ')}
                    >
                      {label}
                    </div>
                  ))}
                </aside>

                <div className="p-4 md:p-5 bg-gradient-to-b from-surface/35 to-transparent">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeView}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.28, ease: 'easeOut' }}
                    >
                      {activeView === 'dashboard' ? <DashboardPreview /> : <OrdersPreview />}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

function CompactMetric({ value, label }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-background/30 px-4 py-3">
      <p className="text-lg font-bold text-gradient-blue">{value}</p>
      <p className="text-xs text-foreground-subtle leading-relaxed">{label}</p>
    </div>
  )
}

function DashboardPreview() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        <StatTile label="Productos" value="128" delta="+12 consultas hoy" tone="indigo" />
        <StatTile label="Servicios" value="16" delta="siempre sincronizados" tone="cyan" />
        <StatTile label="Promociones" value="8" delta="2 activas ahora" tone="amber" />
        <StatTile label="Pedidos" value="14" delta="5 pendientes" tone="emerald" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-4">
        <div className="rounded-3xl border border-border/60 bg-background/35 p-4">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Productos más preguntados</h3>
              <p className="text-xs text-foreground-subtle">Top del chat en tiempo real</p>
            </div>
            <span className="text-[11px] rounded-full border border-accent/20 bg-accent/8 px-2.5 py-1 text-accent">Top 10</span>
          </div>

          <div className="space-y-3">
            {topProducts.map((product) => (
              <ProductBar key={product.name} product={product} />
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-border/60 bg-background/35 p-4">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Horarios con más preguntas</h3>
              <p className="text-xs text-foreground-subtle">Distribución por hora</p>
            </div>
            <span className="text-[11px] text-foreground-subtle">0-23h</span>
          </div>

          <TrafficChart data={hourlyTraffic} />

          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <PeakChip label="Pico" value="20h" />
            <PeakChip label="Segundo" value="18h" />
            <PeakChip label="Inicio" value="12h" />
          </div>
        </div>
      </div>
    </div>
  )
}

function OrdersPreview() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 rounded-3xl border border-border/60 bg-background/35 p-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Pedidos de hoy</h3>
          <p className="text-xs text-foreground-subtle">Gestiona nuevos pedidos sin salir del panel</p>
        </div>

        <div className="inline-flex items-center gap-3 rounded-full border border-emerald-400/20 bg-emerald-400/8 px-3 py-2 self-start lg:self-auto">
          <span className="text-xs font-semibold text-emerald-300">Aceptando pedidos</span>
          <div className="w-11 h-6 rounded-full bg-emerald-500/25 border border-emerald-400/20 p-0.5 flex items-center justify-end">
            <motion.span
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              className="w-4.5 h-4.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.45)]"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.04fr_0.96fr] gap-4">
        <div className="space-y-3">
          {orders.map((order, index) => (
            <OrderCard key={order.id} order={order} index={index} />
          ))}
        </div>

        <div className="rounded-3xl border border-border/60 bg-background/35 p-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Lectura rápida del día</h3>
              <p className="text-xs text-foreground-subtle">Lo que el panel resume del chat</p>
            </div>
            <span className="text-[11px] rounded-full border border-border/60 px-2.5 py-1 text-foreground-subtle">Auto refresh</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <PeakChip label="Pendientes" value="1" />
            <PeakChip label="Aceptados" value="9" />
            <PeakChip label="Listos" value="4" />
          </div>

          <div className="rounded-2xl border border-border/60 bg-surface/45 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-accent mb-3">Más consultados</p>
            <div className="space-y-2.5">
              {topProducts.slice(0, 3).map((product) => (
                <div key={product.name} className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-foreground-muted">{product.name}</span>
                  <span className="text-foreground font-semibold">{product.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-surface/45 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-accent mb-3">Horas pico</p>
            <div className="flex flex-wrap gap-2">
              {['18h', '20h', '22h'].map((hour) => (
                <span
                  key={hour}
                  className="px-3 py-1.5 rounded-full border border-accent/20 bg-accent/10 text-xs font-semibold text-accent"
                >
                  {hour}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatTile({ label, value, delta, tone }) {
  const tones = {
    indigo: 'from-blue-500/14 to-blue-500/4 border-blue-300/40 text-blue-700',
    cyan: 'from-sky-500/14 to-sky-500/4 border-sky-300/40 text-sky-700',
    amber: 'from-amber-400/16 to-amber-400/5 border-amber-300/40 text-amber-700',
    emerald: 'from-emerald-400/16 to-emerald-400/5 border-emerald-300/40 text-emerald-700',
  }

  return (
    <div className={[
      'rounded-2xl border bg-gradient-to-br p-4',
      tones[tone],
    ].join(' ')}>
      <p className="text-[11px] uppercase tracking-[0.2em] text-foreground-subtle mb-2">{label}</p>
      <p className="text-2xl font-bold text-foreground mb-1">{value}</p>
      <p className="text-xs text-foreground-subtle">{delta}</p>
    </div>
  )
}

function ProductBar({ product }) {
  const width = `${(product.count / topProducts[0].count) * 100}%`

  return (
    <div>
      <div className="flex items-center justify-between gap-3 text-sm mb-1.5">
        <span className="text-foreground-muted">{product.name}</span>
        <span className="text-foreground font-semibold">{product.count}</span>
      </div>
      <div className="h-2.5 rounded-full bg-surface-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
        />
      </div>
    </div>
  )
}

function PeakChip({ label, value }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-surface/45 px-3 py-2.5">
      <p className="text-[10px] uppercase tracking-[0.16em] text-foreground-subtle mb-1">{label}</p>
      <p className="text-sm font-semibold text-foreground">{value}</p>
    </div>
  )
}

function OrderCard({ order, index }) {
  const statusMap = {
    pending: 'border-amber-300/20 bg-amber-400/10 text-amber-200',
    accepted: 'border-emerald-300/20 bg-emerald-400/10 text-emerald-200',
    ready: 'border-blue-300/30 bg-blue-500/10 text-blue-700',
  }

  const statusLabel = {
    pending: 'Pendiente',
    accepted: 'Aceptado',
    ready: 'Listo',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.35, delay: index * 0.08, ease: 'easeOut' }}
      className="rounded-3xl border border-border/60 bg-background/35 p-4"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <p className="text-sm font-semibold text-foreground">Pedido #{order.id}</p>
          <p className="text-xs text-foreground-subtle">{order.customer} · recoge {order.pickup}</p>
        </div>
        <motion.span
          animate={order.status === 'pending' ? { scale: [1, 1.05, 1] } : { scale: 1 }}
          transition={order.status === 'pending' ? { duration: 1.6, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.2 }}
          className={[
            'px-3 py-1.5 rounded-full border text-[11px] font-semibold',
            statusMap[order.status],
          ].join(' ')}
        >
          {statusLabel[order.status]}
        </motion.span>
      </div>

      <p className="text-sm leading-relaxed text-foreground-muted mb-3">{order.detail}</p>

      <div className="flex items-center justify-between gap-3 text-xs text-foreground-subtle">
        <span>viene desde el chat</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-accent" />
          actualizado ahora
        </span>
      </div>
    </motion.div>
  )
}

function TrafficChart({ data }) {
  const maxValue = Math.max(...data.map((item) => item.count), 1)
  const width = 320
  const height = 150
  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * width
    const y = height - (item.count / maxValue) * 100 - 12
    return `${x},${y}`
  }).join(' ')

  const areaPoints = [`0,${height}`, ...points.split(' '), `${width},${height}`].join(' ')

  return (
    <div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[170px] overflow-visible">
        <defs>
          <linearGradient id="traffic-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0, 1, 2].map((row) => (
          <line
            key={row}
            x1="0"
            x2={width}
            y1={28 + row * 34}
            y2={28 + row * 34}
            stroke="rgba(148, 163, 184, 0.14)"
            strokeWidth="1"
          />
        ))}

        <motion.polygon
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          points={areaPoints}
          fill="url(#traffic-fill)"
        />

        <motion.polyline
          initial={{ pathLength: 0, opacity: 0.4 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          points={points}
          fill="none"
          stroke="#2563eb"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {data.map((item, index) => {
          const x = (index / (data.length - 1)) * width
          const y = height - (item.count / maxValue) * 100 - 12

          return (
            <g key={item.hour}>
              <circle cx={x} cy={y} r="4.5" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
              <text
                x={x}
                y={height - 2}
                textAnchor="middle"
                fill="#94a3b8"
                fontSize="11"
              >
                {item.hour}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}