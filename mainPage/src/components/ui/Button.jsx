import { forwardRef } from 'react'
import { motion } from 'framer-motion'

const variants = {
  primary: [
    'relative inline-flex items-center justify-center gap-2',
    'px-6 py-3 rounded-xl font-semibold text-sm',
    'bg-accent text-white',
    'shadow-glow hover:shadow-glow-lg',
    'hover:bg-accent-glow',
    'transition-all duration-200 ease-out',
    'border border-accent/30',
    'active:scale-95',
  ].join(' '),
  secondary: [
    'relative inline-flex items-center justify-center gap-2',
    'px-6 py-3 rounded-xl font-semibold text-sm',
    'bg-transparent text-foreground',
    'border border-border hover:border-accent/50',
    'hover:bg-surface-2',
    'transition-all duration-200 ease-out',
    'active:scale-95',
  ].join(' '),
  ghost: [
    'inline-flex items-center justify-center gap-2',
    'px-4 py-2 rounded-lg font-medium text-sm',
    'text-foreground-muted hover:text-foreground',
    'hover:bg-surface-2',
    'transition-all duration-200 ease-out',
  ].join(' '),
  outline: [
    'relative inline-flex items-center justify-center gap-2',
    'px-6 py-3 rounded-xl font-semibold text-sm',
    'text-accent border border-accent/40',
    'hover:border-accent hover:bg-accent/5 hover:shadow-glow-sm',
    'transition-all duration-200 ease-out',
    'active:scale-95',
  ].join(' '),
}

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
  xl: 'px-10 py-5 text-lg',
}

const Button = forwardRef(
  ({ children, variant = 'primary', size, className = '', as: Tag = 'button', href, ...props }, ref) => {
    const base = variants[variant]
    const sizeClass = size ? sizes[size] : ''

    const Component = href ? 'a' : Tag

    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="inline-flex"
      >
        <Component
          ref={ref}
          href={href}
          className={`${base} ${sizeClass} ${className}`}
          {...props}
        >
          {children}
        </Component>
      </motion.div>
    )
  }
)

Button.displayName = 'Button'
export default Button
