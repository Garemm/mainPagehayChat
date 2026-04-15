import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Section, { SectionHeader } from './ui/Section'

const conversation = [
  {
    id: 1,
    from: 'user',
    text: '¿Qué pizzas tienen disponibles?',
    delay: 600,
  },
  {
    id: 2,
    from: 'ai',
    text: '¡Hola! 🍕 Tenemos 6 tipos de pizza: Margarita ($180), Pepperoni ($210), Hawaiana ($200), 4 Quesos ($220), Vegetariana ($195) y Especial de la casa ($240). ¿Te gustaría saber más sobre alguna?',
    delay: 1800,
  },
  {
    id: 3,
    from: 'user',
    text: '¿Y cuánto cuesta la especial de la casa?',
    delay: 3200,
  },
  {
    id: 4,
    from: 'ai',
    text: 'La Pizza Especial de la casa cuesta $240. Lleva pepperoni, champiñones, pimiento, cebolla morada y extra queso. ¡Es nuestra más popular! 😍',
    delay: 4800,
  },
  {
    id: 5,
    from: 'user',
    text: '¿A qué hora cierran hoy sábado?',
    delay: 6200,
  },
  {
    id: 6,
    from: 'ai',
    text: 'Los sábados cerramos a las 23:00 hs. ¡Tienes tiempo! Si quieres hacer tu pedido o más información, estoy aquí 😉',
    delay: 7800,
  },
]

export default function Demo() {
  const [visibleMessages, setVisibleMessages] = useState([])
  const [typing, setTyping] = useState(false)
  const [started, setStarted] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    if (!started) return

    let timeouts = []
    setVisibleMessages([])
    setTyping(false)

    conversation.forEach((msg, i) => {
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

    return () => timeouts.forEach(clearTimeout)
  }, [started])

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [visibleMessages, typing])

  const handleRestart = () => {
    setStarted(false)
    setVisibleMessages([])
    setTyping(false)
    setTimeout(() => setStarted(true), 100)
  }

  return (
    <Section id="demo" className="section-separator">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Demo en vivo"
          headline="Míralo en acción"
          subheadline="Una conversación real con el chatbot: preguntas sobre productos, precios y horarios respondidas instantáneamente desde la base de datos."
        />

        {/* Demo window */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative"
        >
          {/* Bg glow */}
          <div className="absolute -inset-6 rounded-3xl bg-accent/5 blur-2xl pointer-events-none" />

          {/* Window chrome */}
          <div className="relative glass rounded-2xl border border-border/80 shadow-glow overflow-hidden">
            {/* Titlebar */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/60 bg-surface/60">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-3 text-xs text-foreground-subtle font-mono">hayChat Business AI · vista previa</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-foreground-muted">Modo híbrido activo</span>
              </div>
            </div>

            {/* Messages area */}
            <div className="h-[420px] overflow-y-auto px-5 py-5 flex flex-col gap-4 scroll-smooth"
              style={{ scrollbarWidth: 'thin', scrollbarColor: '#21262d transparent' }}
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
                      See how NexusAI handles real conversations with AI + human collaboration
                    </p>
                    <button
                      onClick={() => setStarted(true)}
                      className="px-5 py-2.5 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-accent-glow shadow-glow transition-all duration-200 hover:shadow-glow-lg"
                    >
                      ▶ Start Demo
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
                    <div className="glass-light rounded-2xl rounded-bl-sm px-4 py-3 border border-border/40">
                      <div className="flex items-center gap-1.5">
                        <span className="typing-dot" />
                        <span className="typing-dot" />
                        <span className="typing-dot" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={bottomRef} />
            </div>

            {/* Input area */}
            <div className="px-5 py-4 border-t border-border/60 bg-surface/40">
              <div className="flex items-center gap-3 bg-surface-3 rounded-xl px-4 py-3 border border-border/40 opacity-50 cursor-not-allowed">
                <span className="flex-1 text-sm text-foreground-subtle">Type a message...</span>
                <span className="text-xs text-foreground-subtle font-mono">Demo mode</span>
              </div>
            </div>
          </div>
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
              Replay
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
        <div className="w-7 h-7 rounded-full bg-surface-3 border border-border flex-shrink-0 flex items-center justify-center text-white text-[10px] font-semibold">
          U
        </div>
      )}
      <div
        className={[
          'max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
          isUser
            ? 'bg-accent text-white rounded-br-sm shadow-glow-sm'
            : 'glass-light text-foreground rounded-bl-sm border border-border/40',
        ].join(' ')}
      >
        {message.text}
      </div>
    </motion.div>
  )
}
