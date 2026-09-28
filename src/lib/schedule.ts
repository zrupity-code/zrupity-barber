import { hours } from '../data/hours'
import type { DayHours } from '../types'

export const DAY_KEYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
export const SLOT_STEP = 30

// "30 min" -> 30, "1h30" -> 90, "2h" -> 120
export function toMinutes(duration: string) {
  const h = duration.match(/(\d+)\s*h\s*(\d+)?/)
  if (h) return Number(h[1]) * 60 + Number(h[2] ?? 0)
  return Number(duration.match(/\d+/)?.[0] ?? 30)
}

// "09:00 – 19:00" -> [540, 1140]
export function openingRange(day: DayHours | undefined): [number, number] | null {
  if (!day || day.closed) return null
  const m = day.hours.match(/(\d{2}):(\d{2})\D+(\d{2}):(\d{2})/)
  if (!m) return null
  return [Number(m[1]) * 60 + Number(m[2]), Number(m[3]) * 60 + Number(m[4])]
}

export const rangeFor = (d: Date) => openingRange(hours.find((h) => h.day === DAY_KEYS[d.getDay()]))

export const fmtTime = (min: number) =>
  `${String(Math.floor(min / 60)).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`

export const dayKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

// Créneaux déjà « pris », déterministes pour que la démo reste crédible et stable
export function isTaken(seed: string) {
  let h = 0
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return h % 100 < 32
}

// Statut en direct : ouvert (et heure de fermeture) ou prochaine ouverture
export function shopStatus(now = new Date()) {
  const range = rangeFor(now)
  const min = now.getHours() * 60 + now.getMinutes()
  if (range && min >= range[0] && min < range[1]) return { open: true, label: `Ouvert · ferme à ${fmtTime(range[1])}` }
  for (let i = 0; i < 8; i++) {
    const d = new Date(now)
    d.setDate(now.getDate() + i)
    const r = rangeFor(d)
    if (r && (i > 0 || min < r[0])) {
      const when = i === 0 ? "aujourd'hui" : i === 1 ? 'demain' : d.toLocaleDateString('fr-FR', { weekday: 'long' })
      return { open: false, label: `Fermé · ouvre ${when} à ${fmtTime(r[0])}` }
    }
  }
  return { open: false, label: 'Fermé' }
}

// Prochain créneau libre de 30 min, à partir de maintenant
export function nextFreeSlot(now = new Date()) {
  for (let i = 0; i < 14; i++) {
    const d = new Date(now)
    d.setDate(now.getDate() + i)
    const r = rangeFor(d)
    if (!r) continue
    const start = i === 0 ? Math.max(r[0], Math.ceil((now.getHours() * 60 + now.getMinutes() + 30) / SLOT_STEP) * SLOT_STEP) : r[0]
    for (let t = start; t + SLOT_STEP <= r[1]; t += SLOT_STEP) {
      if (!isTaken(`${dayKey(d)}-${fmtTime(t)}-any`)) {
        const when = i === 0 ? "Aujourd'hui" : i === 1 ? 'Demain' : d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric' })
        return `${when} · ${fmtTime(t)}`
      }
    }
  }
  return null
}
