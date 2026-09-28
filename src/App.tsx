import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { CustomCursor } from './components/shared/CustomCursor'
import { Preloader } from './components/shared/Preloader'
import { Navbar } from './components/Navbar/Navbar'
import { Hero } from './components/Hero/Hero'
import { About } from './components/About/About'
import { Services } from './components/Services/Services'
import { Gallery } from './components/Gallery/Gallery'
import { Booking } from './components/Booking/Booking'
import { DemoBadge } from './components/shared/DemoBadge'
import { Social } from './components/Social/Social'
import { Contact } from './components/Contact/Contact'
import { Footer } from './components/Footer/Footer'

function App() {
  const [loading, setLoading] = useState(true)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), prefersReducedMotion ? 0 : 1300)
    return () => clearTimeout(t)
  }, [prefersReducedMotion])

  return (
    <>
      <CustomCursor />
      <div className="grain" />

      <AnimatePresence mode="wait">
        {loading ? (
          <Preloader key="preloader" />
        ) : (
          <motion.div key="site" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Navbar />
            <main>
              <Hero />
              <About />
              <Services />
              <Gallery />
              <Social />
              <Booking />
              <Contact />
            </main>
            <Footer />
            <DemoBadge />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default App
