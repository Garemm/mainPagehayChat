import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function useCursorGlow() {
  const [visible, setVisible] = useState(false)
  const x = useSpring(0, { stiffness: 500, damping: 50 })
  const y = useSpring(0, { stiffness: 500, damping: 50 })

  useEffect(() => {
    const handleMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) setVisible(true)
    }
    const handleLeave = () => setVisible(false)

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseleave', handleLeave)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseleave', handleLeave)
    }
  }, [visible, x, y])

  return { x, y, visible }
}
