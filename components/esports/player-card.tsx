import Link from 'next/link'
import { cn } from '@/lib/utils'
import { type Player } from '@/lib/data'
import { PlayerAvatar } from './player-avatar'
import { GameTag } from './game-tag'

export function PlayerCard({ player }: { player: Player }) {
  return (
    <Link
      href={`/players/${player.id}`}
      className="group flex flex-col gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-[0_0_30px_-14px_oklch(0.8_0.145_197_/_0.5)]"
    >
      <div className="flex items-center gap-3">
        <PlayerAvatar handle={player.handle} size="lg" />
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-display text-lg font-bold tracking-tight group-hover:text-primary">
            {player.handle}
          </h3>
          <p className="truncate text-xs text-muted-foreground">
            {player.name} · {player.teamTag}
          </p>
          <p className="mt-1 text-[11px] font-medium text-primary">{player.role}</p>
        </div>
        <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground">
          {player.country}
        </span>
      </div>

      <div className="flex items-center justify-between rounded-md border border-border bg-secondary/30 px-3 py-2">
        <div className="text-center">
          <div className="font-display text-sm font-bold">{player.rating}</div>
          <div className="text-[10px] uppercase text-muted-foreground">Rating</div>
        </div>
        <div className="text-center">
          <div className="font-display text-sm font-bold">{player.kd}</div>
          <div className="text-[10px] uppercase text-muted-foreground">K/D</div>
        </div>
        <div className="text-center">
          <div className="font-display text-sm font-bold text-primary">
            {player.winRate}%
          </div>
          <div className="text-[10px] uppercase text-muted-foreground">Win</div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="flex gap-0.5">
            {player.recentForm.map((r, i) => (
              <span
                key={i}
                className={cn(
                  'size-2 rounded-[2px]',
                  r === 'W' ? 'bg-primary' : 'bg-live/70',
                )}
              />
            ))}
          </div>
          <div className="text-[10px] uppercase text-muted-foreground">Form</div>
        </div>
      </div>

      <GameTag game={player.game} className="self-start" />
    </Link>
  )
}
