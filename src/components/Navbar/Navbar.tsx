import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { navLinks } from '../../data/nav'
import { MobileMenu } from './MobileMenu'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
          scrolled ? 'bg-ink/85 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="container-edge flex items-center justify-between py-5">
          <a href="#top" className="font-sans text-lg font-extrabold uppercase tracking-tight text-bone">
            Zrupity Barber
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-stone transition-colors hover:text-bone"
              >
                <span className="text-copper">{link.number}</span>
                <span className="relative">
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-copper transition-all duration-300 group-hover:w-full" />
                </span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#rdv"
              className="hidden border border-bone/30 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-bone transition-colors hover:border-copper hover:text-copper sm:inline-block"
            >
              Prendre rendez-vous
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Ouvrir le menu"
              className="flex flex-col gap-1.5 lg:hidden"
            >
              <span className="block h-px w-7 bg-bone" />
              <span className="block h-px w-7 bg-bone" />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
