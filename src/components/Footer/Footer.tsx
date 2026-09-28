import { PORTFOLIO_URL } from '../shared/DemoBadge'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="relative border-t border-bone/10 pt-14 pb-24">
      <div className="container-edge flex flex-col gap-12">
        <div className="flex flex-col items-start justify-between gap-10 sm:flex-row sm:items-end">
          <div>
            <p className="font-sans text-2xl font-extrabold uppercase tracking-tight text-bone">Zrupity Barber</p>
            <p className="mt-2 font-serif italic text-stone">
              Sur rendez-vous.
              <br />
              Toujours net.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-xs uppercase tracking-[0.2em] text-stone">
            <a href="#contact" className="hover:text-copper">
              Contact
            </a>
            <a href="#" className="hover:text-copper">
              Mentions légales
            </a>
            <a href="#" className="hover:text-copper">
              Politique de confidentialité
            </a>
          </nav>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-bone/10 pt-6 text-[11px] uppercase tracking-[0.2em] text-stone-dark sm:flex-row sm:items-center">
          <p>&copy; {year} Zrupity Barber · 18 rue des Ciseaux, 75011 Paris</p>
          <p className="normal-case tracking-normal text-xs text-stone">
            <span className="font-semibold text-copper">Site fictif</span> servant de démonstration, réalisé par{' '}
            <a href={PORTFOLIO_URL} target="_blank" rel="noopener noreferrer" className="text-bone underline underline-offset-4 hover:text-copper">
              Zrupity Développement
            </a>
            . Salon, équipe, adresse et coordonnées sont imaginaires.
          </p>
        </div>
      </div>
    </footer>
  )
}
