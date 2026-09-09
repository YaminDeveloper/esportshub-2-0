import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  Trophy,
  Users,
  Calendar,
  TrendingUp,
  Bell,
  Share2,
  Crown,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TeamLogo } from '@/components/esports/team-logo'
import { PlayerAvatar } from '@/components/esports/player-avatar'
import { GameTag } from '@/components/esports/game-tag'
import {
  teams,
  teamMap,
  rosters,
  players,
  gameMap,
  formatMoney,
  formatCompact,
} from '@/lib/data'

export function generateStaticParams() {
  return teams.map((t) => ({ id: t.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const t = teamMap[id]
  return { title: t ? `${t.name} — EsportsHub 2.0` : 'Team' }
}

const fallbackRoster = [
  { handle: 'Slot1', name: 'Player One', role: 'Duelist', country: 'US', rating: '1.15' },
  { handle: 'Slot2', name: 'Player Two', role: 'Controller', country: 'US', rating: '1.08' },
  { handle: 'Slot3', name: 'Player Three', role: 'Initiator', country: 'US', rating: '1.12', captain: true },
  { handle: 'Slot4', name: 'Player Four', role: 'Sentinel', country: 'US', rating: '1.04' },
  { handle: 'Slot5', name: 'Player Five', role: 'Flex', country: 'US', rating: '1.10' },
]

export default async function TeamProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const team = teamMap[id]
  if (!team) notFound()

  const roster = rosters[id] ?? fallbackRoster
  const recentMatches = [
    { opp: 'CRW', result: 'W', score: '2 - 1', event: 'Nova Masters', when: '2d' },
    { opp: 'SOL', result: 'W', score: '3 - 1', event: 'Nova Masters', when: '5d' },
    { opp: 'PH9', result: 'L', score: '1 - 2', event: 'Global Invitational', when: '1w' },
    { opp: 'STB', result: 'W', score: '2 - 0', event: 'Nova Masters', when: '1w' },
    { opp: 'OBS', result: 'W', score: '2 - 1', event: 'Challengers Cup', when: '2w' },
  ]

  return (
    <div>
      {/* Header */}
      <div className="relative overflow-hidden border-b border-border">
        <div
          className="absolute inset-0 opacity-25"
          style={{ background: `radial-gradient(80% 120% at 15% 0%, ${gameMap[team.game].accent} 0%, transparent 55%)` }}
        />
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <TeamLogo tag={team.tag} game={team.game} size="xl" />
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge variant="default">World Rank #{team.rank}</Badge>
                  <GameTag game={team.game} />
                  <Badge variant="secondary">{team.region}</Badge>
                </div>
                <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
                  {team.name}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  {team.tag} · Founded {team.founded} · {formatCompact(team.followers)} followers
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon-lg" aria-label="Share">
                <Share2 className="size-4" />
              </Button>
              <Button size="lg" className="h-9 glow-primary">
                <Bell className="size-4" />
                Follow Team
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="border-b border-border bg-surface/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-border px-4 sm:grid-cols-5 sm:px-6">
          {[
            { label: 'Rating', value: team.rating, icon: TrendingUp, accent: true },
            { label: 'Win Rate', value: `${team.winRate}%`, icon: Trophy },
            { label: 'Record', value: `${team.wins}-${team.losses}`, icon: Users },
            { label: 'Earnings', value: formatMoney(team.earnings), icon: Trophy },
            { label: 'Founded', value: team.founded, icon: Calendar },
          ].map((s) => (
            <div key={s.label} className="px-3 py-5 sm:px-5">
              <div className={`font-display text-xl font-bold ${s.accent ? 'text-primary' : ''}`}>
                {s.value}
              </div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-10">
          {/* About */}
          <section>
            <h2 className="mb-3 font-display text-xl font-bold">About</h2>
            <p className="leading-relaxed text-muted-foreground text-pretty">{team.bio}</p>
          </section>

          {/* Roster */}
          <section>
            <h2 className="mb-4 font-display text-xl font-bold">Active Roster</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {roster.map((p) => {
                const linked = players.find((pl) => pl.handle === p.handle)
                const inner = (
                  <div className="group flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:border-primary/40">
                    <PlayerAvatar handle={p.handle} size="lg" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="truncate font-display font-bold group-hover:text-primary">
                          {p.handle}
                        </span>
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
                )
                return linked ? (
                  <Link key={p.handle} href={`/players/${linked.id}`}>{inner}</Link>
                ) : (
                  <div key={p.handle}>{inner}</div>
                )
              })}
            </div>
          </section>

          {/* Recent matches */}
          <section>
            <h2 className="mb-4 font-display text-xl font-bold">Recent Matches</h2>
            <div className="overflow-hidden rounded-lg border border-border">
              {recentMatches.map((m, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-4 px-4 py-3 ${i % 2 ? 'bg-surface/40' : 'bg-card'}`}
                >
                  <span className={`grid size-7 shrink-0 place-items-center rounded font-display text-xs font-bold ${m.result === 'W' ? 'bg-primary/15 text-primary' : 'bg-live/15 text-live'}`}>
                    {m.result}
                  </span>
                  <div className="flex flex-1 items-center gap-2 text-sm">
                    <span className="font-semibold">{team.tag}</span>
                    <span className="font-display font-bold tabular-nums">{m.score}</span>
                    <span className="text-muted-foreground">{m.opp}</span>
                  </div>
                  <span className="hidden text-xs text-muted-foreground sm:block">{m.event}</span>
                  <span className="text-xs text-muted-foreground">{m.when}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="rounded-lg border border-border bg-card p-5">
            <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider">
              Achievements
            </h3>
            <div className="space-y-3">
              {team.achievements.map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className={`grid size-8 shrink-0 place-items-center rounded-lg ${a.placement === '1st' ? 'bg-gold/15 text-gold' : a.placement === '2nd' ? 'bg-silver/15 text-silver' : 'bg-bronze/15 text-bronze'}`}>
                    <Trophy className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-medium leading-tight">{a.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {a.placement} · {a.year}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-5">
            <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider">
              Active Tournaments
            </h3>
            <Link
              href="/tournaments/nova-masters-2026"
              className="flex items-center justify-between rounded-lg border border-border bg-surface/40 px-3 py-2.5 transition-colors hover:border-primary/40"
            >
              <div>
                <div className="text-sm font-medium">Nova Masters: Ignite</div>
                <div className="text-xs text-live">Live · Quarter Finals</div>
              </div>
              <ChevronRight className="size-4 text-muted-foreground" />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
