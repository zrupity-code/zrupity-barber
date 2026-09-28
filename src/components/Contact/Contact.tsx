import { hours } from '../../data/hours'
import { FadeIn } from '../shared/FadeIn'
import { RevealText } from '../shared/RevealText'
import { DIRECTIONS_URL } from '../../lib/location'
import { ShopMap } from './ShopMap'

export function Contact() {
  return (
    <section id="contact" className="relative bg-ink-soft/95 py-28 sm:py-36">
      <div className="container-edge">
        <RevealText
          as="h2"
          text="Un créneau réservé. On vous attend."
          className="mb-16 block font-sans font-extrabold uppercase leading-[0.9] text-[clamp(2.2rem,7vw,5.5rem)] tracking-tight text-bone"
        />

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="flex flex-col gap-10 lg:col-span-5">
            <FadeIn className="flex flex-col gap-2">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-dark">Adresse</p>
              <p className="text-xl text-bone">18 rue des Ciseaux</p>
              <p className="text-xl text-bone">75011 Paris</p>
            </FadeIn>

            <FadeIn delay={0.1} className="flex flex-col gap-2">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-dark">Contact</p>
              <a href="tel:+33100000000" className="text-xl text-bone transition-colors hover:text-copper">
                01 00 00 00 00
              </a>
            </FadeIn>

            <FadeIn delay={0.2} className="flex flex-col gap-2">
              <p className="mb-1 text-xs uppercase tracking-[0.2em] text-stone-dark">Horaires</p>
              <ul className="flex flex-col gap-1.5">
                {hours.map((h) => (
                  <li key={h.day} className="flex items-center justify-between gap-8 text-sm text-stone sm:text-base">
                    <span className="uppercase tracking-[0.15em]">{h.label}</span>
                    <span className={h.closed ? 'text-stone-dark' : 'text-bone'}>{h.hours}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn delay={0.3} className="flex flex-wrap items-center gap-6 pt-2">
              <a
                href="#rdv"
                className="bg-bone px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-copper"
              >
                Prendre rendez-vous
              </a>
              <a href="tel:+33100000000" className="text-xs uppercase tracking-[0.2em] text-stone hover:text-copper">
                Appeler
              </a>
            </FadeIn>
          </div>

          <FadeIn delay={0.15} className="lg:col-span-7">
            <div className="relative isolate aspect-[4/3] w-full overflow-hidden border border-bone/10 bg-ink sm:aspect-[16/10]">
              <ShopMap />
              <div className="pointer-events-none absolute left-4 top-4 z-[500] border border-bone/10 bg-ink/85 px-4 py-3 backdrop-blur">
                <p className="font-sans text-sm font-extrabold uppercase tracking-tight text-bone">Zrupity Barber</p>
                <p className="text-[11px] uppercase tracking-[0.2em] text-stone">18 rue des Ciseaux, 75011 Paris</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-copper">Adresse fictive · démo</p>
              </div>
              <a
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 z-[500] bg-bone px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-copper"
              >
                Itinéraire ↗
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
