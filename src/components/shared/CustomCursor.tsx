import { motion, useMotionValue } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useMediaQuery } from '../../hooks/useMediaQuery'

// Curseur personnalisé : un simple rond, sans texte, collé à la souris (aucun retard),
// qui grossit sur les éléments cliquables
export function CustomCursor() {
  const isFinePointer = useMediaQuery('(pointer: fine)')
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  useEffect(() => {
    if (!isFinePointer) return

    document.body.classList.add('cursor-active')

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      const target = e.target as HTMLElement
      const next = !!target.closest('a, button, [role="button"], [data-cursor]')
      setHovering((prev) => (prev === next ? prev : next)) // pas de rendu inutile à chaque mouvement
    }

    const handleLeave = () => setVisible(false)

    window.addEventListener('mousemove', handleMove)
    document.documentElement.addEventListener('mouseleave', handleLeave)

    return () => {
      document.body.classList.remove('cursor-active')
      window.removeEventListener('mousemove', handleMove)
      document.documentElement.removeEventListener('mouseleave', handleLeave)
    }
  }, [isFinePointer, x, y])

  if (!isFinePointer) return null

  return (
    <motion.div
      aria-hidden="true"
      // au-dessus de tout, y compris la visionneuse photo et le menu mobile
      className="pointer-events-none fixed left-0 top-0 z-[200] rounded-full mix-blend-difference"
      style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      animate={{
        width: hovering ? 36 : 14,
        height: hovering ? 36 : 14,
        opacity: visible ? 1 : 0,
        backgroundColor: '#f4f0e8',
      }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    />
  )
}
