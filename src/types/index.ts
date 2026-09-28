export interface Service {
  id: string
  number: string
  name: string
  tagline: string
  priceLabel: string
  duration: string
  image: string
}

export type GalleryOrientation = 'portrait' | 'landscape' | 'square'

export interface GalleryItem {
  id: string
  title: string
  category: string
  image: string
  orientation: GalleryOrientation
  /** cadrage de l'image (object-position), ex. 'center 15%' pour garder les cheveux */
  position?: string
}

export interface DayHours {
  day: string
  label: string
  hours: string
  closed?: boolean
}

export interface Barber {
  id: string
  name: string
  specialty: string
  initials: string
}

export interface NavLink {
  number: string
  label: string
  href: string
}
