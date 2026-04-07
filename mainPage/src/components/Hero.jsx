import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Button from './ui/Button'
import { ArrowRight, Play } from 'lucide-react'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 60])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background radial glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/5 blur-[120px] animate-glow-pulse" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-accent-2/4 blur-[100px]" />
        {/* Grid bg */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(14,165,233,0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(14,165,233,0.5) 1px, transparent 1px)`,
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-4rem)] py-20">
          {/* Left: Copy */}
          <motion.div
            style={{ y, opacity }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-accent/10 border border-accent/20 text-accent">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                En desarrollo activo · NLP + IA Híbrida
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
            >
              <span className="text-gradient-white">Chatbot Inteligente</span>
              <br />
              <span className="text-gradient-white">para tu</span>
              <br />
              <span className="text-gradient-blue">Negocio Local</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="text-foreground-muted text-lg leading-relaxed mb-10 max-w-lg"
            >
              Responde preguntas sobre tus productos, horarios, servicios y promociones en tiempo real las 24 horas del día.
              Motor NLP propio + IA generativa como respaldo — siempre preciso, siempre disponible.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-12">
              <Button variant="primary" size="lg">
                Registrar mi negocio
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="secondary" size="lg">
                <Play className="w-4 h-4 fill-current" />
                Ver demo
              </Button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 text-sm text-foreground-muted"
            >
              <div className="flex -space-x-2">
                {['R', 'T', 'P', 'F', 'B'].map((initial, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2 border-background bg-gradient-to-br flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ background: `hsl(${200 + i * 15}, 70%, 40%)` }}
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <span>
                Restaurantes, ferreterías, papelerías y más
              </span>
            </motion.div>
          </motion.div>

          {/* Right: Chat mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative flex justify-center lg:justify-end"
          >
            <ChatMockup />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ChatMockup() {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      className="relative w-full max-w-md"
    >
      {/* Glow behind card */}
      <div className="absolute -inset-4 rounded-3xl bg-accent/8 blur-2xl pointer-events-none" />

      {/* Main card */}
      <div className="relative glass rounded-2xl border border-border/80 shadow-glow overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/60">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent-2 flex items-center justify-center text-white text-xs font-bold">
                C
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-background" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">ChatLocal AI</p>
              <p className="text-xs text-accent">En línea · Modo híbrido</p>
            </div>
          </div>
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <span className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
        </div>

        {/* Messages */}
        <div className="px-5 py-5 flex flex-col gap-4 min-h-[320px]">
          <ChatBubble
            from="user"
            text="¿A qué hora abren los domingos?"
            delay={0.5}
          />
          <ChatBubble
            from="ai"
            text="¡Hola! 😊 Los domingos abrimos de 12:00 a 22:00 hs. Si quieres venir entre semana, abrimos de lunes a sábado de 09:00 a 21:00."
            delay={0.9}
          />
          <ChatBubble
            from="user"
            text="¿Tienen pizzas familiares?"
            delay={1.5}
          />
          <ChatBubble
            from="ai"
            text="¡Sí! Contamos con 6 tipos de pizza familiar: Margarita ($180), Pepperoni ($210), Hawaiana ($200), 4 Quesos ($220), Vegetariana ($195) y Especial de la casa ($240). ¿Te interesa alguna?"
            delay={2.0}
          />

          {/* Typing indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.0 }}
            className="flex items-end gap-2"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent to-accent-2 flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold">
              C
            </div>
            <div className="glass-light rounded-2xl rounded-bl-sm px-4 py-3 border border-border/40">
              <div className="flex items-center gap-1.5">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Input */}
        <div className="px-5 py-4 border-t border-border/60">
          <div className="flex items-center gap-3 bg-surface-3 rounded-xl px-4 py-3 border border-border/40">
            <input
              readOnly
              type="text"
              placeholder="Ask anything..."
              className="flex-1 bg-transparent text-sm text-foreground-muted placeholder-foreground-subtle outline-none"
            />
            <button className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center flex-shrink-0 shadow-glow-sm hover:shadow-glow transition-shadow">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7L13 7M8 2L13 7L8 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Floating status badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.4 }}
        className="absolute -bottom-4 -left-4 glass rounded-xl px-3 py-2 border border-border/60 shadow-card"
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-medium text-foreground-muted">AI handling 94% of queries</span>
        </div>
      </motion.div>

      {/* Floating metric badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.4 }}
        className="absolute -top-3 -right-3 glass rounded-xl px-3 py-2 border border-accent/20 shadow-glow-sm"
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-foreground">⚡ <span className="text-accent font-bold">3.2s</span> avg response</span>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ChatBubble({ from, text, delay }) {
  const isUser = from === 'user'
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: 'easeOut' }}
      className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent to-accent-2 flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold">
          N
        </div>
      )}
      <div
        className={[
          'max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
          isUser
            ? 'bg-accent text-white rounded-br-sm shadow-glow-sm'
            : 'glass-light text-foreground rounded-bl-sm border border-border/40',
        ].join(' ')}
      >
        {text}
      </div>
    </motion.div>
  )
}
