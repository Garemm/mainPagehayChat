import Navbar from './components/Navbar'
import { useEffect } from 'react'
import Hero from './components/Hero'
import TrustBar from './components/TrustBar'
import Features from './components/Features'
import Demo from './components/Demo'
import ControlCenter from './components/ControlCenter'
import UseCases from './components/UseCases'
import HowItWorks from './components/HowItWorks'
import Pricing from './components/Pricing'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
  useEffect(() => {
    // Remove any hash in the URL on initial load so page appears at top
    if (typeof window !== 'undefined' && window.location && window.location.hash) {
      const { pathname, search } = window.location
      window.history.replaceState(null, '', pathname + search)
    }
  }, [])
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <main>
        <Hero />
        <TrustBar />
        <Features />
        <Demo />
        <ControlCenter />
        <UseCases />
        <HowItWorks />
        <Pricing />
        <CTA />
      </main>

      <Footer />
    </div>
  )
}
