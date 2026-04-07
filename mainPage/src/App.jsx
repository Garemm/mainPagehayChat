import { motion } from 'framer-motion'
import useCursorGlow from './hooks/useCursorGlow'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustBar from './components/TrustBar'
import Features from './components/Features'
import Demo from './components/Demo'
import UseCases from './components/UseCases'
import HowItWorks from './components/HowItWorks'
import Pricing from './components/Pricing'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
  const { x, y, visible } = useCursorGlow()

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Cursor glow */}
      <motion.div
        className="cursor-glow"
        style={{ left: x, top: y, opacity: visible ? 1 : 0 }}
      />

      <Navbar />

      <main>
        <Hero />
        <TrustBar />
        <Features />
        <Demo />
        <UseCases />
        <HowItWorks />
        <Pricing />
        <CTA />
      </main>

      <Footer />
    </div>
  )
}
