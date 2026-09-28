import coupeTondeuse from '../assets/photos/coupe-tondeuse.jpg'
import skinFade from '../assets/photos/skin-fade.jpg'
import enfant from '../assets/photos/enfant.jpg'
import coupeBarbe from '../assets/photos/coupe-barbe.jpg'
import barbe from '../assets/photos/barbe.jpg'
import design from '../assets/photos/design.jpg'
import coupeCiseaux from '../assets/photos/coupe-ciseaux.jpg'
import soinVisage from '../assets/photos/soin-visage.jpg'
import boucles from '../assets/photos/boucles.jpg'
import coiffage from '../assets/photos/coiffage.jpg'
import type { Service } from '../types'

// Carte fictive (site de démonstration)
export const services: Service[] = [
  {
    id: 'coupe-signature',
    number: '01',
    name: 'Coupe Signature',
    tagline: 'Diagnostic, coupe et coiffage : la base de la maison.',
    priceLabel: '19€',
    duration: '30 min',
    image: coupeTondeuse,
  },
  {
    id: 'skin-fade',
    number: '02',
    name: 'Dégradé à blanc',
    tagline: 'Du blanc au long, une transition sans aucune marche.',
    priceLabel: '23€',
    duration: '45 min',
    image: skinFade,
  },
  {
    id: 'junior',
    number: '03',
    name: 'Junior (-12 ans)',
    tagline: 'Patience, douceur et une coupe dont il sera fier.',
    priceLabel: '13€',
    duration: '25 min',
    image: enfant,
  },
  {
    id: 'coupe-barbe',
    number: '04',
    name: 'Coupe + Barbe',
    tagline: 'Le combo complet, serviette chaude incluse.',
    priceLabel: '31€',
    duration: '1h',
    image: coupeBarbe,
  },
  {
    id: 'barbe',
    number: '05',
    name: 'Barbe & Rasoir',
    tagline: 'Taille, contours au rasoir droit et soin à l’huile.',
    priceLabel: '16€',
    duration: '30 min',
    image: barbe,
  },
  {
    id: 'hair-design',
    number: '06',
    name: 'Motifs rasés',
    tagline: 'Traits, motifs et contours dessinés à la lame.',
    priceLabel: '+7€',
    duration: '15 min',
    image: design,
  },
  {
    id: 'coupe-ciseaux',
    number: '07',
    name: 'Coupe aux Ciseaux',
    tagline: 'Pour les longueurs qui demandent de la finesse.',
    priceLabel: '26€',
    duration: '45 min',
    image: coupeCiseaux,
  },
  {
    id: 'soin-visage',
    number: '08',
    name: 'Soin du Visage',
    tagline: 'Gommage, masque et serviette chaude : la finition oubliée.',
    priceLabel: '24€',
    duration: '30 min',
    image: soinVisage,
  },
  {
    id: 'boucles',
    number: '09',
    name: 'Boucles & Texture',
    tagline: 'Définition et volume qui tiennent, sans alourdir.',
    priceLabel: '45€',
    duration: '1h30',
    image: boucles,
  },
  {
    id: 'coiffage',
    number: '10',
    name: 'Shampoing & Coiffage',
    tagline: 'Massage crânien, produits pro et mise en forme.',
    priceLabel: '9€',
    duration: '20 min',
    image: coiffage,
  },
]
