import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll'
import type { GalleryItem } from '../../types'

interface LightboxProps {
  items: GalleryItem[]
  index: number | null
  onChange: (index: number | null) => void
}

// Agrandissement plein écran d'une photo, avec navigation (flèches, clavier, glisser sur mobile)
export function Lightbox({ items, index, onChange }: LightboxProps) {
  const open = index !== null
  const item = open ? items[index] : null
  const touchX = useRef<number | null>(null)
  useLockBodyScroll(open)

  const go = (step: number) => {
    if (index === null) return
    onChange((index + step + items.length) % items.length)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onChange(null)
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${item.title}, agrandie`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[80] flex flex-col bg-ink/95 backdrop-blur-sm"
          onClick={() => onChange(null)}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return
            const dx = e.changedTouches[0].clientX - touchX.current
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
            touchX.current = null
          }}
        >
          <div className="container-edge flex items-center justify-between py-5 text-xs uppercase tracking-[0.25em] text-stone">
            <span>
              <span className="text-copper">{String(index! + 1).padStart(2, '0')}</span> / {String(items.length).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={() => onChange(null)}
              className="hover:text-copper"
              aria-label="Fermer"
            >
              Fermer ✕
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20">
            <AnimatePresence mode="wait">
              <motion.figure
                key={item.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex max-h-full flex-col items-center gap-4"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={item.image}
                  alt={`${item.title}, ${item.category}`}
                  className="max-h-[calc(100svh-11rem)] w-auto max-w-full object-contain"
                />
                <figcaption className="text-center">
                  <p className="text-xs uppercase tracking-[0.2em] text-copper">{item.category}</p>
                  <p className="font-sans text-xl font-extrabold uppercase tracking-tight text-bone">{item.title}</p>
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            {items.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Photo précédente"
                  onClick={(e) => {
                    e.stopPropagation()
                    go(-1)
                  }}
                  className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-bone/20 bg-ink/60 text-bone transition-colors hover:border-copper hover:text-copper sm:left-6"
                >
                  ←
                </button>
                <button
                  type="button"
                  aria-label="Photo suivante"
                  onClick={(e) => {
                    e.stopPropagation()
                    go(1)
                  }}
                  className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-bone/20 bg-ink/60 text-bone transition-colors hover:border-copper hover:text-copper sm:right-6"
                >
                  →
                </button>
              </>
            )}
          </div>
          <div className="h-6" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
