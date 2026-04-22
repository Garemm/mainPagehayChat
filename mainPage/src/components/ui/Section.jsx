import { motion } from 'framer-motion'

const revealVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export default function Section({ children, id, className = '', tight = false }) {
  return (
    <section
      id={id}
      className={[
        'relative w-full border-t border-b border-border/60',
        tight ? 'py-16 md:py-20' : 'py-24 md:py-32',
        'backdrop-blur-sm bg-background/3',
        className,
      ].join(' ')}
    >
      {children}
    </section>
  )
}

export function SectionHeader({ eyebrow, headline, subheadline, center = true }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      variants={revealVariants}
      className={['mb-16', center ? 'text-center' : ''].join(' ')}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent mb-4">
          <span className="w-4 h-px bg-accent/60" />
          {eyebrow}
          <span className="w-4 h-px bg-accent/60" />
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-white leading-tight mb-4">
        {headline}
      </h2>
      {subheadline && (
        <p className="text-foreground-muted text-lg max-w-2xl mx-auto leading-relaxed">
          {subheadline}
        </p>
      )}
    </motion.div>
  )
}
