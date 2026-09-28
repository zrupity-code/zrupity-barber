import { useState } from 'react'
import { gallery } from '../../data/gallery'
import { Lightbox } from '../shared/Lightbox'
import { FadeIn } from '../shared/FadeIn'

const feed = gallery.slice(0, 6)

export function Social() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="relative py-28 sm:py-36">
      <div className="container-edge">
        <FadeIn className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-stone">Nos réalisations</p>
            <h2 className="mt-3 font-sans text-3xl font-extrabold uppercase tracking-tight text-bone sm:text-5xl">
              Zrupity Barber
            </h2>
          </div>
          <a
            href="#rdv"
            className="group inline-flex items-center gap-3 border border-bone/30 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-bone transition-colors hover:border-copper hover:text-copper"
          >
            Prendre rendez-vous
            <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
          </a>
        </FadeIn>

        <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:grid-cols-6">
          {feed.map((item, i) => (
            <FadeIn key={item.id} delay={i * 0.05}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`Agrandir : ${item.title}`}
                className="group relative block aspect-square w-full cursor-zoom-in overflow-hidden bg-ink-soft"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  style={{ objectPosition: item.position }}
                  className="h-full w-full object-cover grayscale transition-[filter,transform] duration-700 ease-out group-hover:scale-110 group-hover:grayscale-0"
                />
              </button>
            </FadeIn>
          ))}
        </div>
      </div>

      <Lightbox items={feed} index={open} onChange={setOpen} />
    </section>
  )
}
