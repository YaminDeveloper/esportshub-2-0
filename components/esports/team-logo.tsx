import { cn } from '@/lib/utils'
import { gameMap, type GameId } from '@/lib/data'

const sizeMap = {
  sm: 'size-8 text-[10px] rounded-md',
  md: 'size-11 text-xs rounded-lg',
  lg: 'size-16 text-base rounded-xl',
  xl: 'size-24 text-2xl rounded-2xl',
}

export function TeamLogo({
  tag,
  game,
  size = 'md',
  className,
}: {
  tag: string
  game?: GameId
  size?: keyof typeof sizeMap
  className?: string
}) {
  const accent = game ? gameMap[game].accent : 'oklch(0.8 0.145 197)'
  return (
    <div
      className={cn(
        'relative grid shrink-0 place-items-center overflow-hidden border border-white/10 font-display font-bold tracking-wider',
        sizeMap[size],
        className,
      )}
      style={{
        background: `radial-gradient(120% 120% at 30% 20%, ${accent} 0%, oklch(0.2 0.02 264) 62%)`,
        color: 'oklch(0.15 0.02 264)',
      }}
      aria-hidden
    >
      <span className="relative text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
        {tag}
      </span>
    </div>
  )
}
