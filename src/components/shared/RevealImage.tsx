import { motion } from 'framer-motion'
import clsx from 'clsx'

interface RevealImageProps {
  src: string
  alt: string
  wrapperClassName?: string
  className?: string
  grayscale?: boolean
}

const wrapperVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const imageVariants = {
  hidden: { scale: 1.15 },
  visible: {
    scale: 1,
    transition: { duration: 1.2, ease: [0.65, 0, 0.35, 1] as const },
  },
}

export function RevealImage({ wrapperClassName, className, grayscale = false, alt, src }: RevealImageProps) {
  return (
    <motion.div
      className={clsx('relative overflow-hidden', wrapperClassName)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={wrapperVariants}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        className={clsx(
          'h-full w-full object-cover',
          grayscale && 'grayscale transition-[filter] duration-700 ease-out group-hover:grayscale-0',
          className,
        )}
        variants={imageVariants}
      />
    </motion.div>
  )
}
