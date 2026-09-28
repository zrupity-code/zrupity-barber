import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useRef } from 'react'
import { SHOP_POSITION } from '../../lib/location'

const markerIcon = L.divIcon({
  className: '',
  iconSize: [44, 44],
  iconAnchor: [22, 22],
  html: `
    <span class="shop-marker">
      <span class="shop-marker__pulse"></span>
      <span class="shop-marker__dot">✂</span>
    </span>`,
})

// Carte interactive : molette = zoom (sans Ctrl) quand la souris est dessus,
// pincement à deux doigts sur mobile (un seul doigt fait défiler la page).
export function ShopMap() {
  const el = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!el.current) return
    const touch = window.matchMedia('(pointer: coarse)').matches
    const map = L.map(el.current, {
      center: SHOP_POSITION,
      zoom: 16,
      minZoom: 3, // on peut dézoomer jusqu'à voir l'Europe
      maxZoom: 19,
      // zoom progressif : demi-niveaux, chaque cran de molette compte
      zoomSnap: 0.25,
      zoomDelta: 0.5,
      wheelPxPerZoomLevel: 90,
      wheelDebounceTime: 15,
      zoomControl: false,
      scrollWheelZoom: true,
      touchZoom: true,
      dragging: !touch,
      tapHold: false,
    })

    // tuiles OpenStreetMap (gratuites, sans clé), assombries en CSS pour coller au site
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map)
    L.control.zoom({ position: 'bottomleft', zoomInTitle: 'Zoomer', zoomOutTitle: 'Dézoomer' }).addTo(map)

    L.marker(SHOP_POSITION, { icon: markerIcon, title: 'Zrupity Barber' })
      .addTo(map)
      .bindPopup(
        '<strong>Zrupity Barber</strong><br/>18 rue des Ciseaux, 75011 Paris<br/><em>Adresse fictive · site de démonstration</em>',
      )

    // recalcule la taille quand le bloc apparaît (animation d'entrée) ou change de largeur
    const ro = new ResizeObserver(() => map.invalidateSize())
    ro.observe(el.current)

    return () => {
      ro.disconnect()
      map.remove()
    }
  }, [])

  return (
    <div className="group relative h-full w-full">
      <div ref={el} className="shop-map h-full w-full" role="region" aria-label="Carte : emplacement de Zrupity Barber" />
      <p className="pointer-events-none absolute left-1/2 top-4 z-[500] -translate-x-1/2 bg-ink/85 px-3 py-1.5 text-[11px] text-bone/85 opacity-0 transition-opacity duration-300 group-hover:opacity-100 max-sm:hidden">
        Molette pour zoomer · glisser pour se déplacer
      </p>
      <p className="pointer-events-none absolute left-1/2 top-4 z-[500] -translate-x-1/2 bg-ink/85 px-3 py-1.5 text-[11px] text-bone/85 sm:hidden">
        Pincez à deux doigts pour zoomer
      </p>
    </div>
  )
}
