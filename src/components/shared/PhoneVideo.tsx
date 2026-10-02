const base = import.meta.env.BASE_URL

// Pub vidéo verticale du salon, présentée dans un téléphone dessiné en CSS
export function PhoneVideo({ className = '' }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-copper/20 blur-3xl" />
      <span className="absolute -left-[3px] top-20 h-7 w-[3px] rounded-l bg-neutral-700" />
      <span className="absolute -left-[3px] top-32 h-12 w-[3px] rounded-l bg-neutral-700" />
      <span className="absolute -right-[3px] top-28 h-16 w-[3px] rounded-r bg-neutral-700" />
      <div className="rounded-[2.5rem] border border-bone/15 bg-neutral-950 p-2 shadow-2xl shadow-black/70">
        <div className="relative overflow-hidden rounded-[2rem] bg-black">
          <video
            src={`${base}video/zrupity-barber-720.mp4`}
            poster={`${base}video/zrupity-barber-poster.jpg`}
            controls
            playsInline
            preload="none"
            className="block aspect-[9/16] w-full bg-black object-contain"
            aria-label="Pub vidéo Zrupity Barber"
          />
          <span className="pointer-events-none absolute left-1/2 top-2 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
        </div>
      </div>
    </div>
  )
}
