import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { navLinks } from '../../data/nav'
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

const panelVariants = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  visible: {
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 0.6, ease: [0.65, 0, 0.35, 1] as const },
  },
  exit: {
    clipPath: 'inset(0 0 100% 0)',
    transition: { duration: 0.45, ease: [0.65, 0, 0.35, 1] as const },
  },
}

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.25 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  useLockBodyScroll(open)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation"
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex flex-col bg-ink text-bone"
        >
          <div className="container-edge flex items-center justify-between py-6">
            <span className="font-sans text-lg font-extrabold uppercase tracking-tight">Zrupity Barber</span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer le menu"
              className="text-xs uppercase tracking-[0.25em] text-stone hover:text-copper"
            >
              Fermer ✕
            </button>
          </div>

          <motion.nav
            variants={listVariants}
            initial="hidden"
            animate="visible"
            className="container-edge flex flex-1 flex-col justify-center gap-2"
          >
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                variants={itemVariants}
                href={link.href}
                onClick={onClose}
                className="group flex items-baseline gap-4 border-b border-bone/10 py-4 text-4xl font-extrabold uppercase tracking-tight sm:text-5xl"
              >
                <span className="font-serif text-base italic text-copper">{link.number}</span>
                <span className="transition-transform duration-300 group-hover:translate-x-2">{link.label}</span>
              </motion.a>
            ))}
          </motion.nav>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="container-edge flex flex-col gap-6 py-8"
          >
            <a
              href="#rdv"
              onClick={onClose}
              className="w-full bg-bone py-4 text-center text-xs font-semibold uppercase tracking-[0.25em] text-ink"
            >
              Prendre rendez-vous
            </a>
            <p className="text-center text-[11px] uppercase tracking-[0.25em] text-stone-dark">
              18 rue des Ciseaux, 75011 Paris
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
