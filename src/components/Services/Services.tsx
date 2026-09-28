import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { services } from '../../data/services'
import { SectionHeading } from '../shared/SectionHeading'

const ease = [0.22, 1, 0.36, 1] as const

export function Services() {
  const [hovered, setHovered] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const activeService = services.find((s) => s.id === (hovered ?? selected)) ?? services[0]

  return (
    <section id="services" className="relative py-28 sm:py-36">
      <div className="container-edge">
        <SectionHeading title="Ce qu'on sait faire." className="mb-16" />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <ul className="lg:col-span-7" onMouseLeave={() => setHovered(null)}>
            {services.map((service) => {
              const open = selected === service.id
              return (
                <li key={service.id} className="border-b border-bone/10 first:border-t">
                  <button
                    type="button"
                    // clic : sélectionne sur ordinateur, ouvre / referme la photo sur mobile
                    onClick={() => setSelected(open ? null : service.id)}
                    onMouseEnter={() => setHovered(service.id)}
                    onFocus={() => setHovered(service.id)}
                    onBlur={() => setHovered(null)}
                    aria-expanded={open}
                    aria-controls={`service-photo-${service.id}`}
                    className="group flex w-full items-center justify-between gap-4 py-5 text-left transition-colors sm:py-7"
                  >
                    <span className="flex items-baseline gap-4 sm:gap-6">
                      <span className="font-serif text-base italic text-copper sm:text-lg">{service.number}</span>
                      <span
                        className={`font-sans font-extrabold uppercase tracking-tight transition-all duration-300 text-xl group-hover:translate-x-2 group-hover:text-copper sm:text-2xl lg:text-3xl ${
                          open || activeService.id === service.id ? 'lg:text-copper' : ''
                        } ${open ? 'translate-x-2 text-copper' : ''}`}
                      >
                        {service.name}
                      </span>
                    </span>
                    <span className="flex shrink-0 items-center gap-4">
                      <span className="flex flex-col items-end gap-1 text-right">
                        <span className="text-sm font-semibold uppercase tracking-wide text-bone sm:text-base">
                          {service.priceLabel}
                        </span>
                        <span className="text-xs uppercase tracking-[0.2em] text-stone-dark">{service.duration}</span>
                      </span>
                      <span
                        aria-hidden="true"
                        className={`text-lg text-copper transition-transform duration-300 lg:hidden ${open ? 'rotate-45' : ''}`}
                      >
                        +
                      </span>
                    </span>
                  </button>

                  {/* mobile : la photo s'ouvre sous la prestation */}
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        id={`service-photo-${service.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease }}
                        className="overflow-hidden lg:hidden"
                      >
                        <div className="relative mb-6 aspect-[4/5] w-full overflow-hidden bg-ink-soft">
                          <img
                            src={service.image}
                            alt={service.name}
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-5">
                            <p className="font-serif italic text-bone/90">{service.tagline}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>

          {/* ordinateur : panneau photo à droite */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-32 aspect-[4/5] w-full overflow-hidden bg-ink-soft">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.06 }}
                  transition={{ duration: 0.5, ease }}
                  className="h-full w-full"
                >
                  <img
                    src={activeService.image}
                    alt={activeService.name}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-6">
                <p className="font-serif italic text-bone/90">{activeService.tagline}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
