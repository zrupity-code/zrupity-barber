import logo from '../../assets/logo-zrupity-barber.png'

interface SealLogoProps {
  className?: string
  title?: string
}

// Sceau officiel Zrupity Barber (PNG détouré, couleur cuivre du site)
export function SealLogo({ className, title = 'Zrupity Barber' }: SealLogoProps) {
  return <img src={logo} alt={title} draggable={false} className={`aspect-square object-contain ${className ?? ''}`} />
}
