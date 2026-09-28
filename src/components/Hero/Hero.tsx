import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import angleTroisQuarts from '../../assets/photos/angle-trois-quarts.jpg'
import angleProfil from '../../assets/photos/angle-profil.jpg'
import angleDos from '../../assets/photos/angle-dos.jpg'
import angleProfil2 from '../../assets/photos/angle-profil-2.jpg'
import { nextFreeSlot, shopStatus } from '../../lib/schedule'
import { SealLogo } from '../shared/SealLogo'

const lineVariants = {
  hidden: { y: '110%' },
  visible: (i: number) => ({
    y: '0%',
    transition: { duration: 0.9, delay: 0.5 + i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

// Les 4 faces du prisme : la coupe vue sous tous les angles
const faces = [
  { src: angleTroisQuarts, view: '3/4 face', cut: 'Dégradé mi-hauteur texturé' },
  { src: angleProfil, view: 'Profil', cut: 'Low taper' },
  { src: angleDos, view: 'Dos', cut: 'Taper nuque' },
  { src: angleProfil2, view: 'Profil', cut: 'Dégradé bas' },
]

const styles = ['Dégradé haut', 'Dégradé bas', 'Dégradé mi-hauteur', 'Taper', 'Coupe rase', 'Dégradé à blanc', 'Coupe courte frangée', 'Dégradé arrondi', 'Motifs rasés', 'Barbe']

const RING = 2 * Math.PI * 22
const IDLE_SPEED = 8 // degrés par seconde quand personne ne touche au prisme
const IDLE_DELAY = 2500

export function Hero() {
  const reduce = useReducedMotion()

  // ---------- rotation du prisme : molette / glisser dans la zone, rotation lente au repos ----------
  const zoneRef = useRef<HTMLDivElement>(null)
  const angle = useMotionValue(0)
  const smooth = useSpring(angle, { stiffness: 90, damping: 22, mass: 0.6 })
  const lastInteraction = useRef(0)
  const drag = useRef<{ x: number; start: number } | null>(null)
  const [degrees, setDegrees] = useState(0)
  const [face, setFace] = useState(0)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const zone = zoneRef.current
    if (!zone) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault() // dans la zone, la molette fait tourner au lieu de défiler
      lastInteraction.current = performance.now()
      angle.set(angle.get() - e.deltaY * 0.35)
    }
    zone.addEventListener('wheel', onWheel, { passive: false })
    return () => zone.removeEventListener('wheel', onWheel)
  }, [angle])

  useAnimationFrame((_, delta) => {
    if (reduce || drag.current) return
    if (performance.now() - lastInteraction.current < IDLE_DELAY) return
    angle.set(angle.get() - (IDLE_SPEED * delta) / 1000)
  })

  useMotionValueEvent(smooth, 'change', (v) => {
    const d = (((-v % 360) + 360) % 360)
    setDegrees(Math.round(d))
    setFace(Math.round(d / 90) % 4)
  })

  const onPointerDown = (e: ReactPointerEvent) => {
    drag.current = { x: e.clientX, start: angle.get() }
    lastInteraction.current = performance.now()
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: ReactPointerEvent) => {
    if (!drag.current) return
    lastInteraction.current = performance.now()
    angle.set(drag.current.start + (e.clientX - drag.current.x) * 0.6)
  }
  const onPointerUp = () => {
    drag.current = null
  }

  const ringOffset = useTransform(smooth, (v) => RING - ((((-v % 360) + 360) % 360) / 360) * RING)

  // ---------- infos en direct ----------
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(t)
  }, [])
  const status = useMemo(() => shopStatus(now), [now])
  const slot = useMemo(() => nextFreeSlot(now), [now])

  return (
    <section id="top" className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-ink text-bone">
      <div className="relative z-10 grid flex-1 grid-cols-1 lg:grid-cols-12">
        {/* ---------- colonne gauche : texte, défilement normal ---------- */}
        <div className="container-edge flex flex-col justify-between gap-10 pt-28 pb-10 lg:col-span-7 lg:pr-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="flex flex-wrap items-center gap-4 text-[11px] uppercase tracking-[0.3em] text-stone"
          >
            <span>Barbershop · Paris 11e</span>
            <span className="flex items-center gap-2 rounded-full border border-bone/15 px-3 py-1.5 normal-case tracking-normal">
              <span className={`h-2 w-2 rounded-full ${status.open ? 'animate-pulse bg-emerald-400' : 'bg-stone-dark'}`} />
              <span className="text-xs text-bone/85">{status.label}</span>
            </span>
          </motion.div>

          <div>
            <h1 className="font-sans font-extrabold uppercase leading-[0.82] text-[clamp(3.2rem,12vw,9.5rem)] tracking-tight">
              <span className="block overflow-hidden">
                <motion.span custom={0} variants={lineVariants} initial={reduce ? undefined : 'hidden'} animate="visible" className="block">
                  Zrupity
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  custom={1}
                  variants={lineVariants}
                  initial={reduce ? undefined : 'hidden'}
                  animate="visible"
                  className="block normal-case font-serif italic font-normal text-copper"
                >
                  Barber
                </motion.span>
              </span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-col gap-8"
            >
              <p className="max-w-md font-serif text-2xl italic text-bone/90 sm:text-3xl">
                Le dégradé parfait, sous tous les angles.
              </p>

              <div className="flex flex-wrap items-stretch gap-4">
                <a
                  href="#rdv"
                  className="group inline-flex items-center gap-3 bg-bone px-7 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-ink transition-colors hover:bg-copper"
                >
                  Prendre rendez-vous
                  <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                </a>
                {slot && (
                  <a
                    href="#rdv"
                    className="group flex items-center gap-3 border border-copper/40 bg-copper/5 px-5 py-3 transition-colors hover:border-copper"
                  >
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-copper opacity-60" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-copper" />
                    </span>
                    <span className="flex flex-col leading-tight">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-stone">Prochain créneau libre</span>
                      <span className="text-sm font-semibold text-bone first-letter:uppercase">{slot}</span>
                    </span>
                  </a>
                )}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.7 }}
            className="flex flex-wrap items-center gap-8"
          >
            <SealLogo className={`h-16 w-16 text-copper ${reduce ? '' : 'animate-[spin_18s_linear_infinite]'}`} />
            <dl className="flex gap-8">
              {[
                ['4,9★', 'Note moyenne'],
                ['12 ans', "D'expérience"],
                ['30 min', 'Coupe signature'],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="font-serif text-2xl italic text-copper">{value}</dt>
                  <dd className="text-[10px] uppercase tracking-[0.2em] text-stone-dark">{label}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>

        {/* ---------- colonne droite : zone 360°, la molette fait tourner le prisme ---------- */}
        <div
          ref={zoneRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
          className="relative flex min-h-[520px] touch-pan-y select-none flex-col items-center justify-center overflow-hidden border-t border-dashed border-copper/40 bg-ink-soft/40 lg:col-span-5 lg:min-h-0 lg:border-l lg:border-t-0"
          style={{ perspective: '1600px' }}
        >
          {/* étiquette de la zone, centrée en haut */}
          <div className="relative z-20 mb-12 flex justify-center">
            <span
              className={`flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors ${
                active ? 'border-copper bg-copper text-ink' : 'border-copper/50 bg-ink/80 text-copper backdrop-blur-sm'
              }`}
            >
              <span aria-hidden="true" className="text-sm">↻</span> Zone 360°
            </span>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 transition-opacity duration-500"
            style={{
              opacity: active ? 1 : 0.6,
              background: 'radial-gradient(closest-side at 50% 50%, rgba(182,136,79,0.28), transparent 75%)',
            }}
          />

          {/* prisme */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[3/4] cursor-grab active:cursor-grabbing [--w:min(58vw,280px)] lg:[--w:min(24vw,340px)]"
            style={{ width: 'var(--w)', transformStyle: 'preserve-3d', rotateY: reduce ? 0 : smooth }}
          >
            {faces.map((f, i) => (
              <figure
                key={f.src}
                className="absolute inset-0 overflow-hidden border border-bone/15 bg-ink-soft shadow-2xl [backface-visibility:hidden]"
                style={{ transform: `rotateY(${i * 90}deg) translateZ(calc(var(--w) / 2))` }}
              >
                <img
                  src={f.src}
                  alt={`${f.cut}, vue ${f.view.toLowerCase()}`}
                  draggable={false}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/85 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
                  <span>
                    <span className="block text-[10px] uppercase tracking-[0.25em] text-copper">{f.view}</span>
                    <span className="font-sans text-sm font-extrabold uppercase tracking-tight text-bone">{f.cut}</span>
                  </span>
                  <span className="font-serif text-lg italic text-bone/70">0{i + 1}</span>
                </figcaption>
              </figure>
            ))}
          </motion.div>

          {/* indicateur d'angle */}
          <div className="relative mt-16 flex items-center gap-4 text-[11px] uppercase tracking-[0.25em] text-stone">
            <span className="relative flex h-14 w-14 items-center justify-center">
              <svg viewBox="0 0 50 50" className="absolute inset-0 -rotate-90" aria-hidden="true">
                <circle cx="25" cy="25" r="22" fill="none" stroke="rgba(244,240,232,0.15)" strokeWidth="1.5" />
                <motion.circle
                  cx="25"
                  cy="25"
                  r="22"
                  fill="none"
                  stroke="var(--color-copper)"
                  strokeWidth="1.5"
                  strokeDasharray={RING}
                  style={{ strokeDashoffset: ringOffset }}
                />
              </svg>
              <span className="font-serif text-sm normal-case italic tracking-normal text-bone">{degrees}°</span>
            </span>
            <div>
              <p className="text-bone">
                {faces[face].view} · <span className="text-copper">{faces[face].cut}</span>
              </p>
              <p className="mt-1 normal-case tracking-normal text-xs text-stone-dark">
                <span className="hidden lg:inline">Molette ici pour tourner à l'infini · ou glissez</span>
                <span className="lg:hidden">⟷ Glissez à gauche ou à droite pour tourner</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* bandeau défilant des styles */}
      <div className="relative z-10 overflow-hidden border-y border-bone/10 bg-ink py-4">
        <div className={`flex w-max gap-10 ${reduce ? '' : 'animate-[marquee_38s_linear_infinite]'}`}>
          {[...styles, ...styles].map((s, i) => (
            <span key={i} className="flex items-center gap-10 font-sans text-sm font-extrabold uppercase tracking-[0.2em] text-bone/70">
              {s}
              <span className="text-copper">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
