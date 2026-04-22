import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Section, { SectionHeader } from './ui/Section'

const conversation = [
  {
    id: 1,
    from: 'user',
    text: '¿Qué bebidas sin azúcar tienen disponibles?',
    delay: 600,
  },
  {
    id: 2,
    from: 'ai',
    text: 'Encontré un producto relacionado con lo que buscas: Agua Mineral 600ml a $20.00. ¿Es lo que necesitas? 😊',
    delay: 1800,
  },
  {
    id: 3,
    from: 'user',
    text: '¿Y cuánto cuesta el refresco?',
    delay: 3200,
  },
  {
    id: 4,
    from: 'ai',
    text: '😊 Refresco en Lata tiene un precio de $28.00. Sus características son: marca: Coca-Cola y tamaño: 355ml.',
    delay: 4800,
  },
  {
    id: 5,
    from: 'user',
    text: 'Perfecto, a que hora cierran el lunes?',
    delay: 6200,
  },
  {
    id: 6,
    from: 'ai',
    text: '😊 El Lunes abrimos de 8:00 am a 10:00 pm. ¿Hay algo más en lo que te pueda ayudar?',
    delay: 7800,
  },
    {
    id: 7,
    from: 'user',
    text: 'quiero hacer un pedido',
    delay: 9200,
  },
]

const initialOrderFlow = {
  actionVisible: false,
  clicked: false,
  formVisible: false,
  submitted: false,
  status: 'pending',
}

export default function Demo() {
  const [visibleMessages, setVisibleMessages] = useState([])
  const [typing, setTyping] = useState(false)
  const [started, setStarted] = useState(false)
  const [orderFlow, setOrderFlow] = useState(initialOrderFlow)
  const bottomRef = useRef(null)
  const messagesRef = useRef(null)
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true)

  useEffect(() => {
    if (!started) return

    let timeouts = []
    setVisibleMessages([])
    setTyping(false)
    setOrderFlow(initialOrderFlow)

    conversation.forEach((msg) => {
      // Show typing before AI messages
      if (msg.from === 'ai') {
        const showTyping = setTimeout(() => setTyping(true), msg.delay - 800)
        timeouts.push(showTyping)
      }
      const t = setTimeout(() => {
        setTyping(false)
        setVisibleMessages((prev) => [...prev, msg])
      }, msg.delay)
      timeouts.push(t)
    })

    // Realistic order flow in chat:
    // 1) user clicks "Hacer pedido"
    // 2) order form appears inline
    // 3) submit shows receipt with pending
    // 4) admin updates status: accepted -> ready
    timeouts.push(setTimeout(() => {
      setOrderFlow({
        actionVisible: true,
        clicked: false,
        formVisible: false,
        submitted: false,
        status: 'pending',
      })
    }, 9800))

    timeouts.push(setTimeout(() => {
      setOrderFlow((prev) => ({ ...prev, clicked: true, formVisible: true }))
    }, 10900))

    timeouts.push(setTimeout(() => {
      setOrderFlow((prev) => ({ ...prev, submitted: true, formVisible: false, status: 'pending' }))
    }, 12100))

    timeouts.push(setTimeout(() => {
      setOrderFlow((prev) => ({ ...prev, status: 'accepted' }))
    }, 14900))

    timeouts.push(setTimeout(() => {
      setOrderFlow((prev) => ({ ...prev, status: 'ready' }))
    }, 17700))

    return () => timeouts.forEach(clearTimeout)
  }, [started])

  useEffect(() => {
    // Only auto-scroll the internal messages container when autoScrollEnabled is true.
    const el = messagesRef.current
    if (!el) return

    if (autoScrollEnabled) {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
    }
  }, [visibleMessages, typing, orderFlow, autoScrollEnabled])

  const handleRestart = () => {
    setStarted(false)
    setVisibleMessages([])
    setTyping(false)
    setTimeout(() => setStarted(true), 100)
  }

  return (
    <Section id="demo" className="section-separator">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Demo en vivo"
          headline="Míralo en acción"
          subheadline="Comparación en tiempo real: chat del cliente y panel de administración recibiendo el mismo pedido con estados sincronizados."
        />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-5"
        >
          <div className="absolute -inset-4 rounded-3xl bg-accent/5 blur-2xl pointer-events-none" />

          {/* Chat side */}
          <div className="relative chat-shell rounded-2xl border-2 border-border/90 shadow-glow overflow-hidden">
            {/* Titlebar */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/60 bg-white/80">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-3 text-xs text-foreground-subtle font-mono">miNegocio · hayChat Business </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-foreground-muted">En línea</span>
              </div>
            </div>

            {/* Messages area */}
            <div
              ref={messagesRef}
              onScroll={() => {
                const el = messagesRef.current
                if (!el) return
                const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 40
                setAutoScrollEnabled(nearBottom)
              }}
              className="h-[420px] overflow-y-auto px-5 py-5 flex flex-col gap-4 scroll-smooth"
              style={{ scrollbarWidth: 'thin', scrollbarColor: '#cdbfe9 transparent' }}
            >
              <AnimatePresence mode="popLayout">
                {!started && (
                  <motion.div
                    key="start-prompt"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24">
                        <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <p className="text-foreground-muted text-sm text-center max-w-xs">
                      Mira cómo responde preguntas reales sobre catálogo, pedidos y horarios sin salir del mismo flujo.
                    </p>
                    <button
                      onClick={() => setStarted(true)}
                      className="px-5 py-2.5 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-accent-glow shadow-glow transition-all duration-200 hover:shadow-glow-lg"
                    >
                      ▶ Iniciar demo
                    </button>
                  </motion.div>
                )}

                {started && visibleMessages.map((msg) => (
                  <DemoMessage key={msg.id} message={msg} />
                ))}

                {typing && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="flex items-end gap-2"
                  >
                    <AgentAvatar />
                    <div className="chat-bubble-ai rounded-2xl rounded-bl-sm px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <span className="typing-dot" />
                        <span className="typing-dot" />
                        <span className="typing-dot" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {orderFlow.actionVisible && (
                  <motion.div
                    key="order-flow"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="chat-panel rounded-2xl p-4 border border-border/70"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <p className="text-sm font-semibold text-foreground">Tu pedido</p>
                      </div>
                      <span className="text-[11px] px-2 py-1 rounded-full border border-accent/20 bg-accent/10 text-accent font-semibold">#{2481}</span>
                    </div>

                    <button
                      type="button"
                      className={[
                        'w-full text-left px-3.5 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-300',
                        orderFlow.clicked
                          ? 'chat-bubble-user border-transparent'
                          : 'bg-surface text-foreground border-border hover:border-accent/40',
                      ].join(' ')}
                    >
                      {orderFlow.clicked ? '✓ Click en "Hacer pedido"' : '🛒 Hacer pedido'}
                    </button>

                    {!orderFlow.submitted && orderFlow.formVisible && <OrderFormPreview />}

                    {orderFlow.submitted && orderFlow.status !== 'ready' && (
                      <OrderReceiptPreview status={orderFlow.status} />
                    )}

                    {orderFlow.submitted && orderFlow.status === 'ready' && <OrderReadyPreview />}
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={bottomRef} />
            </div>

            {/* Input area */}
            <div className="px-5 py-4 border-t border-border/60 bg-white/72">
              <div className="flex items-center gap-3 chat-panel rounded-xl px-4 py-3 opacity-70 cursor-not-allowed">
                <span className="flex-1 text-sm text-foreground-subtle">Escribe un mensaje...</span>
                <span className="text-xs text-foreground-subtle font-mono">Modo demo</span>
              </div>
            </div>
          </div>

          {/* Admin panel side */}
          <AdminOrdersSync status={orderFlow.status} submitted={orderFlow.submitted} clicked={orderFlow.clicked} />
        </motion.div>

        {/* Controls */}
        {started && visibleMessages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center mt-6"
          >
            <button
              onClick={handleRestart}
              className="px-4 py-2 rounded-lg text-sm text-foreground-muted hover:text-foreground border border-border hover:border-border-subtle transition-all duration-200 flex items-center gap-2"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                <path d="M1 4v6h6M23 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Repetir demo
            </button>
          </motion.div>
        )}
      </div>
    </Section>
  )
}

function AgentAvatar() {
  return (
    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent to-accent-2 flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold">
      N
    </div>
  )
}

function DemoMessage({ message }) {
  const isUser = message.from === 'user'
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {!isUser && <AgentAvatar />}
      {isUser && (
        <div className="w-7 h-7 rounded-full bg-surface-3 border border-border flex-shrink-0 flex items-center justify-center text-foreground text-[10px] font-semibold">
          U
        </div>
      )}
      <div
        className={[
          'max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
          isUser
            ? 'chat-bubble-user rounded-br-sm font-medium'
            : 'chat-bubble-ai rounded-bl-sm',
        ].join(' ')}
      >
        {message.text}
      </div>
    </motion.div>
  )
}

function OrderFormPreview() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-3 rounded-xl border border-border bg-white p-3.5">
      <p className="text-xs font-semibold text-foreground mb-2">Formulario de pedido (inline)</p>
      <div className="space-y-2.5">
        <PreviewField label="Nombre" value="Jonathan García" />
        <PreviewField label="Teléfono" value="5544332211" />
        <PreviewField label="Detalle" value="2 Refrescos en Lata + 1 Agua Mineral" />
      </div>
      <button className="mt-3 w-full px-3 py-2 rounded-lg text-xs font-semibold border border-accent/25 bg-accent/10 text-accent">
        Enviar pedido
      </button>
    </motion.div>
  )
}

function PreviewField({ label, value }) {
  return (
    <div>
      <p className="text-[11px] text-foreground-subtle mb-1">{label}</p>
      <div className="px-2.5 py-2 rounded-lg border border-border bg-surface text-xs text-foreground">{value}</div>
    </div>
  )
}

function OrderReceiptPreview({ status }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-3 rounded-xl border border-border bg-white p-3.5">
      <div className="flex items-center justify-between gap-3 mb-2">
        <p className="text-xs font-semibold text-foreground">Tu pedido #2481</p>
        <OrderStatusBadge status={status} />
      </div>
      <p className="text-[11px] text-foreground-subtle mb-2">Estado recibido por socket: pedido_confirmado / pedido_actualizado</p>
      <div className="text-xs text-foreground-muted space-y-1">
        <p>Cliente: Jonathan García</p>
        <p>Teléfono: 5544332211</p>
        <p>Detalle: 2 Refrescos + 1 Agua</p>
      </div>
    </motion.div>
  )
}

function OrderReadyPreview() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-3 rounded-xl border border-blue-200 bg-blue-50 p-3.5">
      <p className="text-sm font-semibold text-blue-800">🎉 Tu pedido ya está listo para recoger</p>
    </motion.div>
  )
}

function OrderStatusBadge({ status }) {
  const statusMap = {
    pending: {
      label: 'Pendiente',
      className: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    accepted: {
      label: 'Aceptado',
      className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    ready: {
      label: 'Listo',
      className: 'bg-blue-50 text-blue-700 border-blue-200',
    },
  }

  const current = statusMap[status] ?? statusMap.pending

  return (
    <span className={`px-2.5 py-1 rounded-full border text-[11px] font-semibold ${current.className}`}>
      {current.label}
    </span>
  )
}

function AdminOrdersSync({ status, submitted, clicked }) {
  const chips = [
    { label: 'Pendiente', active: submitted && status === 'pending', className: 'bg-amber-50 text-amber-700 border-amber-200' },
    { label: 'Aceptado', active: submitted && status === 'accepted', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { label: 'Listo', active: submitted && status === 'ready', className: 'bg-blue-50 text-blue-700 border-blue-200' },
  ]

  return (
    <div className="relative chat-shell rounded-2xl border border-border/80 shadow-glow overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/60 bg-white/80">
        <div>
          <p className="text-sm font-semibold text-foreground">Panel admin · Pedidos</p>
          <p className="text-xs text-foreground-subtle">Sincronización en tiempo real</p>
        </div>
        <span className="text-[11px] px-2 py-1 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 font-semibold">Acepto pedidos</span>
      </div>

      <div className="p-4 bg-white/70 min-h-[420px]">
        <div className="grid grid-cols-3 gap-2 mb-4">
          {chips.map((chip) => (
            <div
              key={chip.label}
              className={[
                'px-2.5 py-2 rounded-lg border text-center text-[11px] font-semibold transition-all duration-250',
                chip.active ? chip.className : 'bg-surface text-foreground-subtle border-border',
              ].join(' ')}
            >
              {chip.label}
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-white p-3.5">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <p className="text-sm font-semibold text-foreground">Pedido #2481</p>
              <p className="text-xs text-foreground-subtle">Jonathan García · 5544332211</p>
            </div>
            {submitted ? <OrderStatusBadge status={status} /> : <span className="text-[11px] px-2 py-1 rounded-full border border-border text-foreground-subtle">Esperando envío</span>}
          </div>

          <p className="text-xs text-foreground-muted mb-3">2 Refrescos en Lata + 1 Agua Mineral</p>

          <div className="space-y-2">
            <AdminFlowRow done={clicked} text="Click en Hacer pedido detectado" />
            <AdminFlowRow done={submitted} text="Pedido recibido en la lista de hoy" />
            <AdminFlowRow done={submitted && status === 'accepted'} text="Administrador lo acepta" />
            <AdminFlowRow done={submitted && status === 'ready'} text="Administrador marca pedido listo" />
          </div>
        </div>
      </div>
    </div>
  )
}

function AdminFlowRow({ done, text }) {
  return (
    <div className="flex items-center gap-2">
      <span className={[
        'w-3.5 h-3.5 rounded-full border flex items-center justify-center text-[9px] font-bold',
        done ? 'bg-accent border-accent text-white' : 'bg-white border-border text-foreground-subtle',
      ].join(' ')}>{done ? '✓' : ''}</span>
      <span className="text-[11px] text-foreground-muted">{text}</span>
    </div>
  )
}
