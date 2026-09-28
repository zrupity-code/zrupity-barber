import { motion } from 'framer-motion'
import { SealLogo } from './SealLogo'

export function Preloader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-ink"
      exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.65, 0, 0.35, 1] } }}
    >
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <SealLogo className="h-24 w-24 text-copper sm:h-28 sm:w-28" />
      </motion.div>
      <motion.div
        className="h-px w-24 origin-left bg-stone-dark"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
      />
    </motion.div>
  )
}
