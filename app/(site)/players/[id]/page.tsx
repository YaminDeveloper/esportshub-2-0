import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  Trophy,
  Bell,
  Share2,
  Video,
  Clock,
  Target,
  Crosshair,
  Percent,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PlayerAvatar } from '@/components/esports/player-avatar'
import { TeamLogo } from '@/components/esports/team-logo'
import { GameTag } from '@/components/esports/game-tag'
import {
  players,
  playerMap,
  teamMap,
  gameMap,
  formatMoney,
  formatCompact,
} from '@/lib/data'
import { cn } from '@/lib/utils'

export function generateStaticParams() {
  return players.map((p) => ({ id: p.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const p = playerMap[id]
  return { title: p ? `${p.handle} — EsportsHub 2.0` : 'Player' }
}

export default async function PlayerProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const p = playerMap[id]
  if (!p) notFound()
  const team = teamMap[p.team]

  const stats = [
    { label: 'Rating', value: p.rating, icon: Target, accent: true },
    { label: 'K/D', value: p.kd, icon: Crosshair },
    { label: 'Win Rate', value: `${p.winRate}%`, icon: Percent },
    { label: 'Hours', value: formatCompact(p.hoursPlayed), icon: Clock },
  ]

  const recent = [
    { opp: 'CRW', result: 'W', kills: 24, deaths: 14, event: 'Nova Masters' },
    { opp: 'SOL', result: 'W', kills: 31, deaths: 18, event: 'Nova Masters' },
    { opp: 'PH9', result: 'L', kills: 19, deaths: 21, event: 'Invitational' },
    { opp: 'STB', result: 'W', kills: 27, deaths: 11, event: 'Nova Masters' },
    { opp: 'OBS', result: 'W', kills: 22, deaths: 16, event: 'Challengers' },
  ]

  return (
    <div>
      <div className="relative overflow-hidden border-b border-border">
        <div
          className="absolute inset-0 opacity-25"
          style={{ background: `radial-gradient(75% 120% at 12% 0%, ${gameMap[p.game].accent} 0%, transparent 55%)` }}
        />
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <PlayerAvatar handle={p.handle} size="xl" />
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge variant="default">Rank #{p.rank}</Badge>
                  <GameTag game={p.game} />
                  <Badge variant="secondary">{p.country}</Badge>
                </div>
                <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
                  {p.handle}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  {p.name} · {p.role} · Age {p.age}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {team && (
                    <Link
                      href={`/teams/${team.id}`}
                      className="flex items-center gap-2 rounded-md border border-border bg-card px-2.5 py-1 text-sm transition-colors hover:border-primary/40"
                    >
                      <TeamLogo tag={team.tag} game={team.game} size="sm" className="size-5 rounded" />
                      {team.name}
                    </Link>
                  )}
                  <span className="rounded-md border border-border bg-card px-2.5 py-1 text-sm text-muted-foreground">
                    {formatCompact(p.followers)} followers
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon-lg" aria-label="Share">
                <Share2 className="size-4" />
              </Button>
              <Button size="lg" className="h-9 glow-primary">
                <Bell className="size-4" />
                Follow
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="border-b border-border bg-surface/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-border px-4 sm:grid-cols-4 sm:px-6">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-3 px-3 py-5 sm:px-6">
              <span className={cn('grid size-9 place-items-center rounded-lg', s.accent ? 'bg-primary/15 text-primary' : 'bg-secondary text-muted-foreground')}>
                <s.icon className="size-4.5" />
              </span>
              <div>
                <div className={cn('font-display text-xl font-bold', s.accent && 'text-primary')}>
                  {s.value}
                </div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-10">
          <section>
            <h2 className="mb-3 font-display text-xl font-bold">Biography</h2>
            <p className="leading-relaxed text-muted-foreground text-pretty">{p.bio}</p>
          </section>

          <section>
            <div className="mb-4 flex items-center gap-3">
              <h2 className="font-display text-xl font-bold">Recent Form</h2>
              <div className="flex gap-1">
                {p.recentForm.map((r, i) => (
                  <span
                    key={i}
                    className={cn(
                      'grid size-6 place-items-center rounded font-display text-[11px] font-bold',
                      r === 'W' ? 'bg-primary/15 text-primary' : 'bg-live/15 text-live',
                    )}
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>
            <div className="overflow-hidden rounded-lg border border-border">
              <div className="grid grid-cols-[auto_1fr_auto_auto] gap-4 border-b border-border bg-surface/40 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                <span>Result</span>
                <span>Opponent</span>
                <span className="text-right">K/D</span>
                <span className="hidden text-right sm:block">Event</span>
              </div>
              {recent.map((m, i) => (
                <div key={i} className={cn('grid grid-cols-[auto_1fr_auto_auto] items-center gap-4 px-4 py-3', i % 2 ? 'bg-surface/40' : 'bg-card')}>
                  <span className={cn('grid size-7 place-items-center rounded font-display text-xs font-bold', m.result === 'W' ? 'bg-primary/15 text-primary' : 'bg-live/15 text-live')}>
                    {m.result}
                  </span>
                  <span className="text-sm font-medium">vs {m.opp}</span>
                  <span className="text-right font-display text-sm tabular-nums">
                    {m.kills}/{m.deaths}
                  </span>
                  <span className="hidden text-right text-xs text-muted-foreground sm:block">{m.event}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="rounded-lg border border-border bg-card p-5">
            <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider">Career</h3>
            <div className="space-y-3 text-sm">
              <Row label="Total Earnings" value={formatMoney(p.earnings)} accent />
              <Row label="Role" value={p.role} />
              <Row label="Country" value={p.country} />
              <Row label="Hours Played" value={formatCompact(p.hoursPlayed)} />
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-5">
            <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider">Socials</h3>
            <div className="space-y-2">
              <a href="#" className="flex items-center justify-between rounded-md border border-border bg-surface/40 px-3 py-2.5 text-sm transition-colors hover:border-primary/40">
                <span className="flex items-center gap-2"><Video className="size-4 text-primary" /> twitch.tv/{p.socials.twitch}</span>
                <ChevronRight className="size-4 text-muted-foreground" />
              </a>
              <a href="#" className="flex items-center justify-between rounded-md border border-border bg-surface/40 px-3 py-2.5 text-sm transition-colors hover:border-primary/40">
                <span className="flex items-center gap-2"><span className="font-display text-sm font-bold text-primary">X</span> @{p.socials.x}</span>
                <ChevronRight className="size-4 text-muted-foreground" />
              </a>
            </div>
          </div>

          {team && (
            <div className="rounded-lg border border-border bg-card p-5">
              <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider">Current Team</h3>
              <Link href={`/teams/${team.id}`} className="flex items-center gap-3">
                <TeamLogo tag={team.tag} game={team.game} size="lg" />
                <div>
                  <div className="font-display font-bold">{team.name}</div>
                  <div className="text-xs text-muted-foreground">World Rank #{team.rank}</div>
                </div>
              </Link>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}

function Row({ label, value, accent }: { label: string; value: string | number; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={cn('font-semibold', accent && 'font-display text-primary')}>{value}</span>
    </div>
  )
}
