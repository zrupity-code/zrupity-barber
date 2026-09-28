import salon from '../../assets/photos/salon.jpg'
import outils from '../../assets/photos/outils.jpg'
import { FadeIn } from '../shared/FadeIn'
import { RevealImage } from '../shared/RevealImage'
import { SectionHeading } from '../shared/SectionHeading'

export function About() {
  return (
    <section id="salon" className="relative py-28 sm:py-36">
      <div className="container-edge grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="relative lg:col-span-6 lg:col-start-1">
          <RevealImage
            src={salon}
            alt="Barbier en plein coiffage dans le salon"
            wrapperClassName="aspect-[4/5] w-full"
          />
          <FadeIn
            delay={0.3}
            className="absolute -bottom-8 -right-4 hidden w-48 border border-bone/10 bg-ink p-4 sm:-right-10 sm:block sm:w-56"
          >
            <RevealImage
              src={outils}
              alt="Tondeuse de finition en action"
              wrapperClassName="aspect-square w-full"
            />
          </FadeIn>
        </div>

        <div className="flex flex-col justify-center gap-10 lg:col-span-5 lg:col-start-8">
          <SectionHeading title="Pas besoin d'en faire trop." />

          <div className="flex flex-col gap-6 text-base leading-relaxed text-stone sm:text-lg">
            <FadeIn>
              <p>
                Une bonne coupe change tout. Pas besoin d'un discours, pas besoin d'un décor.
                Juste une lame précise, un œil qui sait où s'arrêter, et le temps qu'il faut.
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p>
                Chez Zrupity Barber, la précision, la créativité et le conseil ne sont pas des
                arguments marketing : ce sont les seules choses qui comptent pendant les
                minutes que tu passes dans notre fauteuil. Et pour ne jamais attendre, tu réserves ton créneau en ligne.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.2} className="grid grid-cols-2 gap-6 border-t border-bone/10 pt-8">
            <div>
              <p className="font-serif text-4xl italic text-copper">10</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-stone-dark">
                Services proposés
              </p>
            </div>
            <div>
              <p className="font-serif text-4xl italic text-copper">24/7</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-stone-dark">
                Réservation en ligne
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
