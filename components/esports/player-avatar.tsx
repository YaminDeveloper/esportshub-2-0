import { cn } from '@/lib/utils'

const sizeMap = {
  sm: 'size-8 text-xs',
  md: 'size-11 text-sm',
  lg: 'size-16 text-lg',
  xl: 'size-28 text-3xl',
}

const palette = [
  'oklch(0.8 0.145 197)',
  'oklch(0.7 0.16 300)',
  'oklch(0.82 0.15 85)',
  'oklch(0.64 0.24 12)',
  'oklch(0.6 0.13 160)',
]

export function PlayerAvatar({
  handle,
  size = 'md',
  className,
}: {
  handle: string
  size?: keyof typeof sizeMap
  className?: string
}) {
  const initials = handle.slice(0, 2).toUpperCase()
  const accent = palette[handle.charCodeAt(0) % palette.length]
  return (
    <div
      className={cn(
        'grid shrink-0 place-items-center rounded-full border border-white/10 font-display font-semibold text-white',
        sizeMap[size],
        className,
      )}
      style={{
        background: `linear-gradient(150deg, ${accent} -20%, oklch(0.22 0.02 264) 70%)`,
      }}
      aria-hidden
    >
      {initials}
    </div>
  )
}
