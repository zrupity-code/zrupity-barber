import { motion } from 'framer-motion'
import type { ElementType } from 'react'

interface RevealTextProps {
  text: string
  as?: ElementType
  className?: string
  delay?: number
  stagger?: number
  split?: 'word' | 'char'
}

const wordVariants = {
  hidden: { y: '110%' },
  visible: {
    y: '0%',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function RevealText({
  text,
  as: Tag = 'span',
  className = '',
  delay = 0,
  stagger = 0.045,
  split = 'word',
}: RevealTextProps) {
  const pieces = split === 'char' ? Array.from(text) : text.split(' ')

  return (
    <Tag className={className}>
      <motion.span
        className="inline"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        transition={{ delayChildren: delay, staggerChildren: stagger }}
      >
        {pieces.map((piece, i) => (
          <span
            key={`${piece}-${i}`}
            className="inline-block overflow-hidden align-top"
            style={split === 'word' ? { marginRight: '0.28em' } : undefined}
          >
            <motion.span className="inline-block" variants={wordVariants}>
              {piece}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}
