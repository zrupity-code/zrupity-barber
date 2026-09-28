export const PORTFOLIO_URL = 'https://zrupity-developpement.vercel.app/'

export function DemoBadge() {
  return (
    <a
      href={PORTFOLIO_URL}
      target="_blank"
      rel="noopener noreferrer"
      title="Site fictif réalisé par Zrupity Développement pour démontrer son savoir-faire"
      className="fixed bottom-4 left-4 z-50 inline-flex items-center gap-2 rounded-full border border-copper/40 bg-ink/90 px-3.5 py-2 text-[11px] font-semibold tracking-wide text-bone/85 backdrop-blur transition-colors hover:border-copper hover:text-bone"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-copper shadow-[0_0_0_3px_rgba(182,136,79,0.25)]" />
      Site fictif · Démo Zrupity Développement
    </a>
  )
}
