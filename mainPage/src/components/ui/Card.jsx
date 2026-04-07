import { motion } from 'framer-motion'

export default function Card({ children, className = '', hover = true, glow = false, glass = false }) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.005 } : {}}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={[
        'rounded-2xl p-6',
        glass ? 'glass' : 'bg-surface border border-border',
        hover ? 'cursor-default' : '',
        glow ? 'hover:shadow-glow hover:border-accent/30' : 'hover:border-border-subtle',
        'transition-all duration-300',
        className,
      ].join(' ')}
    >
      {children}
    </motion.div>
  )
}
