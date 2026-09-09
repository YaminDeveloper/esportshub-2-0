import { cn } from '@/lib/utils'
import { gameMap, type GameId } from '@/lib/data'

export function GameTag({
  game,
  className,
  showGenre = false,
}: {
  game: GameId
  className?: string
  showGenre?: boolean
}) {
  const g = gameMap[game]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary/60 px-2 py-0.5 text-xs font-medium',
        className,
      )}
    >
      <span
        className="size-2 rounded-[2px]"
        style={{ background: g.accent }}
        aria-hidden
      />
      {g.name}
      {showGenre && <span className="text-muted-foreground">· {g.genre}</span>}
    </span>
  )
}
