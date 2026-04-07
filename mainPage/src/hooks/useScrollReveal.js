import { useEffect, useRef } from 'react'
import { useInView, useAnimation } from 'framer-motion'

export default function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null)
  const controls = useAnimation()
  const inView = useInView(ref, { once: true, amount: threshold })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [inView, controls])

  return { ref, controls }
}
