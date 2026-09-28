import highFade from '../assets/photos/high-fade.jpg'
import midFade from '../assets/photos/mid-fade.jpg'
import taper from '../assets/photos/taper.jpg'
import buzzCut from '../assets/photos/buzz-cut.jpg'
import cropFade from '../assets/photos/crop-fade.jpg'
import burstFade from '../assets/photos/burst-fade.jpg'
import design from '../assets/photos/design.jpg'
import skinFade from '../assets/photos/skin-fade.jpg'
import pompadour from '../assets/photos/pompadour.jpg'
import boucles from '../assets/photos/boucles.jpg'
import lowFade from '../assets/photos/angle-profil-2.jpg'
import type { GalleryItem } from '../types'

// Photos libres de droits (Unsplash), site de démonstration
export const gallery: GalleryItem[] = [
  { id: 'high-fade', title: 'Dégradé haut', category: 'Dégradé', image: highFade, orientation: 'portrait' },
  { id: 'mid-fade', title: 'Dégradé mi-hauteur', category: 'Dégradé', image: midFade, orientation: 'landscape' },
  { id: 'taper', title: 'Low taper', category: 'Taper', image: taper, orientation: 'portrait' },
  { id: 'buzz-cut', title: 'Coupe rase', category: 'Tondeuse', image: buzzCut, orientation: 'square', position: 'center 25%' },
  { id: 'skin-fade', title: 'Dégradé à blanc', category: 'Dégradé', image: skinFade, orientation: 'square' },
  { id: 'crop-fade', title: 'Coupe courte', category: 'Ciseaux & tondeuse', image: cropFade, orientation: 'landscape', position: 'center 22%' },
  { id: 'burst-fade', title: 'Dégradé arrondi', category: 'Dégradé', image: burstFade, orientation: 'portrait' },
  { id: 'low-fade', title: 'Dégradé bas', category: 'Dégradé', image: lowFade, orientation: 'portrait' },
  { id: 'design', title: 'Motifs rasés', category: 'Dessin au rasoir', image: design, orientation: 'square' },
  { id: 'pompadour', title: 'Banane', category: 'Classique', image: pompadour, orientation: 'square' },
  { id: 'boucles', title: 'Boucles + dégradé', category: 'Texture', image: boucles, orientation: 'landscape' },
]
