import { RevealText } from './RevealText'

interface SectionHeadingProps {
  title: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({ title, align = 'left', className = '' }: SectionHeadingProps) {
  return (
    <div className={`${align === 'center' ? 'text-center items-center' : 'items-start'} flex flex-col gap-4 ${className}`}>
      <RevealText
        as="h2"
        text={title}
        className="font-sans font-extrabold uppercase leading-[0.92] text-[clamp(2.2rem,6vw,4.5rem)] tracking-tight text-bone"
      />
    </div>
  )
}
