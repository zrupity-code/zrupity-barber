import { AnimatePresence, motion } from 'framer-motion'
import clsx from 'clsx'
import { useMemo, useState, type FormEvent } from 'react'
import { barbers } from '../../data/barbers'
import { dayKey, fmtTime, isTaken, rangeFor, SLOT_STEP, toMinutes } from '../../lib/schedule'
import { services } from '../../data/services'
import { SectionHeading } from '../shared/SectionHeading'

const STEPS = ['Prestation', 'Barbier', 'Date & heure', 'Coordonnées'] as const
const DAYS_AHEAD = 14
const ease = [0.22, 1, 0.36, 1] as const

export function Booking() {
  const [step, setStep] = useState(0)
  const [serviceId, setServiceId] = useState<string | null>(null)
  const [barberId, setBarberId] = useState<string | null>(null)
  const [date, setDate] = useState<string | null>(null)
  const [time, setTime] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', phone: '', email: '', note: '' })
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [confirmed, setConfirmed] = useState(false)

  const service = services.find((s) => s.id === serviceId)
  const barber = barbers.find((b) => b.id === barberId)

  const days = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return Array.from({ length: DAYS_AHEAD }, (_, i) => {
      const d = new Date(today)
      d.setDate(today.getDate() + i)
      return { date: d, key: dayKey(d), range: rangeFor(d) }
    })
  }, [])

  const slots = useMemo(() => {
    const day = days.find((d) => d.key === date)
    if (!day?.range || !service) return []
    const [open, close] = day.range
    const length = toMinutes(service.duration)
    const now = new Date()
    const isToday = dayKey(now) === day.key
    const nowMin = now.getHours() * 60 + now.getMinutes()
    const list: { label: string; taken: boolean }[] = []
    for (let t = open; t + length <= close; t += SLOT_STEP) {
      if (isToday && t <= nowMin + 30) continue
      const label = fmtTime(t)
      list.push({ label, taken: isTaken(`${day.key}-${label}-${barberId}`) })
    }
    return list
  }, [date, days, service, barberId])

  const dateLabel = (key: string | null, long = false) => {
    if (!key) return '–'
    const d = days.find((x) => x.key === key)?.date
    return d
      ? d.toLocaleDateString('fr-FR', long ? { weekday: 'long', day: 'numeric', month: 'long' } : { weekday: 'short', day: 'numeric' })
      : '–'
  }

  const reset = () => {
    setStep(0)
    setServiceId(null)
    setBarberId(null)
    setDate(null)
    setTime(null)
    setForm({ name: '', phone: '', email: '', note: '' })
    setErrors({})
    setConfirmed(false)
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const next = {
      name: form.name.trim().length < 2,
      phone: !/^[\d\s+().-]{8,}$/.test(form.phone.trim()),
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()),
    }
    setErrors(next)
    if (!Object.values(next).some(Boolean)) setConfirmed(true)
  }

  const canOpen = (i: number) =>
    i === 0 || (i === 1 && !!serviceId) || (i === 2 && !!serviceId && !!barberId) || (i === 3 && !!time)

  const inputClass = (field: string) =>
    clsx(
      'w-full border bg-ink px-4 py-3.5 text-bone placeholder:text-stone-dark transition-colors focus:border-copper focus:outline-none',
      errors[field] ? 'border-red-400/70' : 'border-bone/15',
    )

  return (
    <section id="rdv" className="relative scroll-mt-20 py-28 sm:py-36">
      <div className="container-edge">
        <SectionHeading title="Réservez votre fauteuil." className="mb-6" />
        <p className="mb-14 max-w-xl text-base text-stone sm:text-lg">
          Choisissez votre prestation, votre barbier et votre créneau : c'est réglé en moins d'une minute, sans appel.
        </p>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* ---------- Parcours de réservation ---------- */}
          <div className="border border-bone/10 bg-ink-soft/80 lg:col-span-8">
            {!confirmed && (
              <ol className="grid grid-cols-4 border-b border-bone/10">
                {STEPS.map((label, i) => (
                  <li key={label}>
                    <button
                      type="button"
                      disabled={!canOpen(i)}
                      onClick={() => setStep(i)}
                      aria-current={step === i ? 'step' : undefined}
                      className={clsx(
                        'relative flex w-full flex-col items-start gap-1 px-3 py-4 text-left transition-colors sm:px-5',
                        step === i ? 'text-bone' : 'text-stone-dark',
                        canOpen(i) && step !== i && 'hover:text-stone',
                        !canOpen(i) && 'cursor-not-allowed',
                      )}
                    >
                      <span className={clsx('font-serif text-base italic', step >= i ? 'text-copper' : '')}>0{i + 1}</span>
                      <span className="hidden text-[11px] uppercase tracking-[0.2em] sm:block">{label}</span>
                      <span
                        className={clsx(
                          'absolute inset-x-0 bottom-0 h-px origin-left bg-copper transition-transform duration-500',
                          step >= i ? 'scale-x-100' : 'scale-x-0',
                        )}
                      />
                    </button>
                  </li>
                ))}
              </ol>
            )}

            <div className="p-5 sm:p-8">
              <AnimatePresence mode="wait">
                {confirmed ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease }}
                    className="flex flex-col items-start gap-6 py-6"
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-full border border-copper text-2xl text-copper">✓</span>
                    <h3 className="font-sans text-3xl font-extrabold uppercase tracking-tight text-bone sm:text-4xl">
                      C'est noté, {form.name.trim().split(' ')[0]} !
                    </h3>
                    <p className="max-w-lg text-stone">
                      {service?.name} avec {barber?.id === 'any' ? 'le premier barbier disponible' : barber?.name},{' '}
                      {dateLabel(date, true)} à {time}. Un rappel vous serait envoyé par SMS la veille.
                    </p>
                    <p className="border-l-2 border-copper pl-4 text-sm text-stone-dark">
                      Site de démonstration : aucune réservation réelle n'a été enregistrée.
                    </p>
                    <button
                      type="button"
                      onClick={reset}
                      className="border border-bone/30 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-bone transition-colors hover:border-copper hover:text-copper"
                    >
                      Nouvelle réservation
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.35, ease }}
                  >
                    {step === 0 && (
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {services.map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            aria-pressed={serviceId === s.id}
                            onClick={() => {
                              setServiceId(s.id)
                              setTime(null)
                              setStep(1)
                            }}
                            className={clsx(
                              'group flex items-center justify-between gap-4 border px-4 py-4 text-left transition-colors',
                              serviceId === s.id ? 'border-copper bg-copper/10' : 'border-bone/10 hover:border-bone/30',
                            )}
                          >
                            <span>
                              <span className="block font-sans font-bold uppercase tracking-tight text-bone">{s.name}</span>
                              <span className="text-xs uppercase tracking-[0.2em] text-stone-dark">{s.duration}</span>
                            </span>
                            <span className="font-serif text-2xl italic text-copper">{s.priceLabel}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {step === 1 && (
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {barbers.map((b) => (
                          <button
                            key={b.id}
                            type="button"
                            aria-pressed={barberId === b.id}
                            onClick={() => {
                              setBarberId(b.id)
                              setTime(null)
                              setStep(2)
                            }}
                            className={clsx(
                              'flex items-center gap-4 border px-4 py-5 text-left transition-colors',
                              barberId === b.id ? 'border-copper bg-copper/10' : 'border-bone/10 hover:border-bone/30',
                            )}
                          >
                            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-copper/60 font-serif text-2xl italic text-copper">
                              {b.initials}
                            </span>
                            <span>
                              <span className="block font-sans text-lg font-extrabold uppercase tracking-tight text-bone">{b.name}</span>
                              <span className="text-sm text-stone">{b.specialty}</span>
                            </span>
                          </button>
                        ))}
                      </div>
                    )}

                    {step === 2 && (
                      <div className="flex flex-col gap-8">
                        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
                          {days.map((d) => {
                            const closed = !d.range
                            return (
                              <button
                                key={d.key}
                                type="button"
                                disabled={closed}
                                aria-pressed={date === d.key}
                                onClick={() => {
                                  setDate(d.key)
                                  setTime(null)
                                }}
                                className={clsx(
                                  'flex w-16 shrink-0 flex-col items-center gap-1 border py-3 transition-colors',
                                  closed && 'cursor-not-allowed border-bone/5 text-stone-dark/50 line-through',
                                  !closed && date === d.key && 'border-copper bg-copper text-ink',
                                  !closed && date !== d.key && 'border-bone/10 text-bone hover:border-bone/30',
                                )}
                              >
                                <span className="text-[10px] uppercase tracking-[0.2em]">
                                  {d.date.toLocaleDateString('fr-FR', { weekday: 'short' }).replace('.', '')}
                                </span>
                                <span className="font-sans text-xl font-extrabold">{d.date.getDate()}</span>
                              </button>
                            )
                          })}
                        </div>

                        {date ? (
                          slots.length ? (
                            <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                              {slots.map((s) => (
                                <button
                                  key={s.label}
                                  type="button"
                                  disabled={s.taken}
                                  aria-pressed={time === s.label}
                                  onClick={() => {
                                    setTime(s.label)
                                    setStep(3)
                                  }}
                                  className={clsx(
                                    'border py-3 text-sm font-semibold tracking-wide transition-colors',
                                    s.taken && 'cursor-not-allowed border-bone/5 text-stone-dark/40 line-through',
                                    !s.taken && time === s.label && 'border-copper bg-copper text-ink',
                                    !s.taken && time !== s.label && 'border-bone/10 text-bone hover:border-copper hover:text-copper',
                                  )}
                                >
                                  {s.label}
                                </button>
                              ))}
                            </div>
                          ) : (
                            <p className="text-stone">Plus aucun créneau ce jour-là. Essayez une autre date.</p>
                          )
                        ) : (
                          <p className="text-stone">Choisissez un jour pour voir les créneaux disponibles.</p>
                        )}
                      </div>
                    )}

                    {step === 3 && (
                      <form onSubmit={submit} noValidate className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <label className="flex flex-col gap-2 sm:col-span-2">
                          <span className="text-xs uppercase tracking-[0.2em] text-stone">Nom complet *</span>
                          <input
                            className={inputClass('name')}
                            autoComplete="name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                          />
                        </label>
                        <label className="flex flex-col gap-2">
                          <span className="text-xs uppercase tracking-[0.2em] text-stone">Téléphone *</span>
                          <input
                            className={inputClass('phone')}
                            type="tel"
                            autoComplete="tel"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          />
                        </label>
                        <label className="flex flex-col gap-2">
                          <span className="text-xs uppercase tracking-[0.2em] text-stone">E-mail *</span>
                          <input
                            className={inputClass('email')}
                            type="email"
                            autoComplete="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                          />
                        </label>
                        <label className="flex flex-col gap-2 sm:col-span-2">
                          <span className="text-xs uppercase tracking-[0.2em] text-stone">Précision (facultatif)</span>
                          <textarea
                            rows={3}
                            className={inputClass('note')}
                            placeholder="Ex. : dégradé bas, garder la longueur sur le dessus…"
                            value={form.note}
                            onChange={(e) => setForm({ ...form, note: e.target.value })}
                          />
                        </label>
                        {Object.values(errors).some(Boolean) && (
                          <p className="text-sm text-red-300 sm:col-span-2">Merci de vérifier les champs obligatoires.</p>
                        )}
                        <button
                          type="submit"
                          className="bg-bone px-7 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-ink transition-colors hover:bg-copper sm:col-span-2"
                        >
                          Confirmer le rendez-vous
                        </button>
                      </form>
                    )}

                    {step > 0 && (
                      <button
                        type="button"
                        onClick={() => setStep(step - 1)}
                        className="mt-8 text-xs uppercase tracking-[0.2em] text-stone transition-colors hover:text-copper"
                      >
                        ← Retour
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ---------- Récapitulatif ---------- */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 flex flex-col gap-6 border border-bone/10 p-6 sm:p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-stone">Votre rendez-vous</p>
              <dl className="flex flex-col gap-4 text-sm">
                {[
                  ['Prestation', service?.name],
                  ['Barbier', barber?.name],
                  ['Date', date ? dateLabel(date, true) : undefined],
                  ['Heure', time],
                  ['Durée', service?.duration],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-baseline justify-between gap-4 border-b border-bone/10 pb-3">
                    <dt className="uppercase tracking-[0.15em] text-stone-dark">{label}</dt>
                    <dd className={clsx('text-right first-letter:uppercase', value ? 'text-bone' : 'text-stone-dark')}>{value ?? '–'}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex items-baseline justify-between">
                <span className="text-xs uppercase tracking-[0.2em] text-stone">Total</span>
                <span className="font-serif text-4xl italic text-copper">{service?.priceLabel ?? '–'}</span>
              </div>
              <p className="text-xs leading-relaxed text-stone-dark">
                Paiement sur place. Annulation gratuite jusqu'à 2 h avant le rendez-vous.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
