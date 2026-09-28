import { motion } from 'framer-motion'
import { useState } from 'react'
import { gallery } from '../../data/gallery'
import type { GalleryOrientation } from '../../types'
import { Lightbox } from '../shared/Lightbox'
import { SectionHeading } from '../shared/SectionHeading'

const spanByOrientation: Record<GalleryOrientation, string> = {
  portrait: 'row-span-2',
  landscape: 'col-span-2',
  square: '',
}

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="galerie" className="relative py-28 sm:py-36">
      <div className="container-edge">
        <SectionHeading title="Le résultat, pas le concept." className="mb-16" />

        <div className="grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:gap-4 lg:grid-cols-4 lg:auto-rows-[220px]">
          {gallery.map((item, i) => (
            <motion.figure
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden bg-ink-soft ${spanByOrientation[item.orientation]}`}
            >
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`Agrandir : ${item.title}`}
                className="absolute inset-0 z-10 cursor-zoom-in"
              />
              <img
                src={item.image}
                alt={`${item.title}, ${item.category}`}
                loading="lazy"
                style={{ objectPosition: item.position }}
                className="h-full w-full object-cover grayscale transition-[filter,transform] duration-700 ease-out group-hover:scale-110 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/0 to-ink/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-3 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-xs uppercase tracking-[0.2em] text-copper">{item.category}</p>
                <p className="font-sans text-lg font-extrabold uppercase tracking-tight text-bone">{item.title}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>

      <Lightbox items={gallery} index={open} onChange={setOpen} />
    </section>
  )
}
