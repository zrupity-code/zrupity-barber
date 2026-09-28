import type { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

interface ArrowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'ghost'
}

export function ArrowButton({ children, variant = 'solid', className, ...props }: ArrowButtonProps) {
  return (
    <button
      className={clsx(
        'group relative inline-flex items-center gap-3 overflow-hidden px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-300',
        variant === 'solid' && 'bg-bone text-ink hover:bg-copper',
        variant === 'outline' && 'border border-bone/30 text-bone hover:border-copper hover:text-copper',
        variant === 'ghost' && 'text-bone hover:text-copper',
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      <span className="relative inline-block h-3 w-3 shrink-0">
        <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out group-hover:-translate-y-3 group-hover:translate-x-3 group-hover:opacity-0">
          →
        </span>
        <span className="absolute inset-0 flex items-center justify-center -translate-x-3 translate-y-3 opacity-0 transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
          ↗
        </span>
      </span>
    </button>
  )
}
