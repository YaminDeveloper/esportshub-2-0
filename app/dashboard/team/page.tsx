import Link from 'next/link'
import { Crown, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TeamLogo } from '@/components/esports/team-logo'
import { PlayerAvatar } from '@/components/esports/player-avatar'
import { GameTag } from '@/components/esports/game-tag'
import { teamMap, rosters, formatMoney, formatCompact } from '@/lib/data'

export const metadata = { title: 'My Team — EsportsHub 2.0' }

export default function DashboardTeamPage() {
  const team = teamMap['vortex']
  const roster = rosters['vortex']

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-bold tracking-tight">My Team</h1>
        <Button variant="outline" className="h-9" render={<Link href={`/teams/${team.id}`} />}>
          <ExternalLink className="size-4" />
          Public profile
        </Button>
      </div>

      <div className="mb-6 flex flex-col items-start gap-4 rounded-lg border border-border bg-card p-5 sm:flex-row sm:items-center">
        <TeamLogo tag={team.tag} game={team.game} size="xl" />
        <div className="flex-1">
          <h2 className="font-display text-2xl font-bold">{team.name}</h2>
          <p className="text-sm text-muted-foreground">{team.tag} · Rank #{team.rank} · {formatCompact(team.followers)} followers</p>
          <div className="mt-2"><GameTag game={team.game} /></div>
        </div>
        <div className="grid grid-cols-3 divide-x divide-border rounded-md border border-border bg-surface/40 text-center">
          <div className="px-4 py-2.5">
            <div className="font-display font-bold text-primary">{team.winRate}%</div>
            <div className="text-[10px] uppercase text-muted-foreground">Win</div>
          </div>
          <div className="px-4 py-2.5">
            <div className="font-display font-bold">{team.rating}</div>
            <div className="text-[10px] uppercase text-muted-foreground">Rating</div>
          </div>
          <div className="px-4 py-2.5">
            <div className="font-display font-bold">{formatMoney(team.earnings)}</div>
            <div className="text-[10px] uppercase text-muted-foreground">Earnings</div>
          </div>
        </div>
      </div>

      <h2 className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">Roster</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {roster.map((p) => (
          <div key={p.handle} className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
            <PlayerAvatar handle={p.handle} size="lg" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="truncate font-display font-bold">{p.handle}</span>
                {p.captain && <Crown className="size-3.5 text-gold" />}
              </div>
              <div className="truncate text-xs text-muted-foreground">{p.name}</div>
              <div className="mt-0.5 text-[11px] font-medium text-primary">{p.role}</div>
            </div>
            <div className="text-right">
              <div className="font-display text-sm font-bold">{p.rating}</div>
              <div className="text-[10px] uppercase text-muted-foreground">{p.country}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
