import Link from 'next/link'
import { TrendingUp, Users } from 'lucide-react'
import { formatCompact, formatMoney, type Team } from '@/lib/data'
import { TeamLogo } from './team-logo'
import { GameTag } from './game-tag'

export function TeamCard({ team }: { team: Team }) {
  return (
    <Link
      href={`/teams/${team.id}`}
      className="group relative flex flex-col gap-4 overflow-hidden rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-[0_0_30px_-14px_oklch(0.8_0.145_197_/_0.5)]"
    >
      <div className="flex items-center gap-3">
        <TeamLogo tag={team.tag} game={team.game} size="lg" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-display text-lg font-bold tracking-tight group-hover:text-primary">
              {team.name}
            </h3>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-muted-foreground">
              #{team.rank} {team.region}
            </span>
            <GameTag game={team.game} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 divide-x divide-border rounded-md border border-border bg-secondary/30 text-center">
        <div className="px-2 py-2.5">
          <div className="font-display text-base font-bold text-foreground">
            {team.rating}
          </div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Rating
          </div>
        </div>
        <div className="px-2 py-2.5">
          <div className="font-display text-base font-bold text-primary">
            {team.winRate}%
          </div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Win Rate
          </div>
        </div>
        <div className="px-2 py-2.5">
          <div className="font-display text-base font-bold text-foreground">
            {formatMoney(team.earnings)}
          </div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Earnings
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Users className="size-3.5" />
          {formatCompact(team.followers)} followers
        </span>
        <span className="flex items-center gap-1 text-primary">
          <TrendingUp className="size-3.5" />
          {team.wins}W - {team.losses}L
        </span>
      </div>
    </Link>
  )
}
