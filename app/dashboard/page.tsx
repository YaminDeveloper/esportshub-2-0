import Link from 'next/link'
import {
  Trophy,
  Target,
  Percent,
  DollarSign,
  ChevronRight,
  Swords,
  TrendingUp,
  Calendar,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TeamLogo } from '@/components/esports/team-logo'
import { StatusBadge } from '@/components/esports/status-badge'
import {
  playerMap,
  teamMap,
  notifications,
  formatMoney,
  formatCompact,
} from '@/lib/data'

export const metadata = { title: 'Dashboard — EsportsHub 2.0' }

export default function DashboardPage() {
  const p = playerMap['razor']
  const team = teamMap[p.team]

  const stats = [
    { label: 'World Rank', value: `#${p.rank}`, icon: Trophy, accent: true },
    { label: 'Rating', value: p.rating, icon: Target },
    { label: 'Win Rate', value: `${p.winRate}%`, icon: Percent },
    { label: 'Earnings', value: formatMoney(p.earnings), icon: DollarSign },
  ]

  const upcoming = [
    { opp: 'CRW', event: 'Nova Masters · QF', when: 'Today, 18:00', live: true },
    { opp: 'PH9', event: 'Global Invitational', when: 'Sep 11, 20:00', live: false },
    { opp: 'SOL', event: 'Scrim block', when: 'Sep 12, 15:00', live: false },
  ]

  const results = [
    { opp: 'STB', result: 'W', score: '2-0' },
    { opp: 'OBS', result: 'W', score: '2-1' },
    { opp: 'PH9', result: 'L', score: '1-2' },
    { opp: 'SOL', result: 'W', score: '3-1' },
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-10">
      {/* Welcome */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">
            Welcome back, {p.handle}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            You have 1 match today and 3 new notifications.
          </p>
        </div>
        <Button className="h-9 glow-primary" render={<Link href="/tournaments" />}>
          Register for Event
          <ChevronRight className="size-4" />
        </Button>
      </div>

      {/* Quick stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg border border-border bg-card p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className={cn('grid size-8 place-items-center rounded-lg', s.accent ? 'bg-primary/15 text-primary' : 'bg-secondary text-muted-foreground')}>
                <s.icon className="size-4" />
              </span>
              <TrendingUp className="size-4 text-primary" />
            </div>
            <div className={cn('font-display text-2xl font-bold', s.accent && 'text-primary')}>
              {s.value}
            </div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-6">
          {/* Upcoming matches */}
          <section className="rounded-lg border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
              <h2 className="flex items-center gap-2 font-display font-bold">
                <Swords className="size-4 text-primary" />
                Upcoming Matches
              </h2>
              <Link href="/dashboard/matches" className="text-xs text-primary hover:underline">
                View all
              </Link>
            </div>
            <div className="divide-y divide-border">
              {upcoming.map((m, i) => (
                <div key={i} className="flex items-center gap-4 px-5 py-3.5">
                  <TeamLogo tag={team.tag} game={team.game} size="sm" />
                  <span className="text-sm font-semibold">{team.tag}</span>
                  <span className="text-xs text-muted-foreground">vs</span>
                  <TeamLogo tag={m.opp} size="sm" />
                  <span className="text-sm font-semibold">{m.opp}</span>
                  <div className="ml-auto text-right">
                    <div className="flex items-center justify-end gap-2 text-sm">
                      {m.live && <StatusBadge status="live" />}
                      <span className={m.live ? 'font-medium text-live' : 'text-muted-foreground'}>
                        {m.when}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">{m.event}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recent results */}
          <section className="rounded-lg border border-border bg-card">
            <div className="border-b border-border px-5 py-3.5">
              <h2 className="font-display font-bold">Recent Results</h2>
            </div>
            <div className="grid grid-cols-2 gap-3 p-5 sm:grid-cols-4">
              {results.map((r, i) => (
                <div key={i} className="rounded-lg border border-border bg-surface/40 p-3 text-center">
                  <div className={cn('mx-auto mb-2 grid size-8 place-items-center rounded font-display text-sm font-bold', r.result === 'W' ? 'bg-primary/15 text-primary' : 'bg-live/15 text-live')}>
                    {r.result}
                  </div>
                  <div className="text-sm font-semibold">vs {r.opp}</div>
                  <div className="text-xs text-muted-foreground">{r.score}</div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          {/* Team card */}
          <section className="rounded-lg border border-border bg-card p-5">
            <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-wider">
              My Team
            </h2>
            <Link href={`/teams/${team.id}`} className="flex items-center gap-3">
              <TeamLogo tag={team.tag} game={team.game} size="lg" />
              <div>
                <div className="font-display font-bold">{team.name}</div>
                <div className="text-xs text-muted-foreground">
                  Rank #{team.rank} · {formatCompact(team.followers)} followers
                </div>
              </div>
            </Link>
            <div className="mt-4 grid grid-cols-3 divide-x divide-border rounded-md border border-border bg-surface/40 text-center">
              <div className="py-2.5">
                <div className="font-display font-bold text-primary">{team.winRate}%</div>
                <div className="text-[10px] uppercase text-muted-foreground">Win</div>
              </div>
              <div className="py-2.5">
                <div className="font-display font-bold">{team.wins}</div>
                <div className="text-[10px] uppercase text-muted-foreground">Wins</div>
              </div>
              <div className="py-2.5">
                <div className="font-display font-bold">{team.rating}</div>
                <div className="text-[10px] uppercase text-muted-foreground">Rating</div>
              </div>
            </div>
          </section>

          {/* Next tournament */}
          <section className="rounded-lg border border-border bg-card p-5">
            <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-wider">
              Next Tournament
            </h2>
            <Link href="/tournaments/nova-masters-2026" className="block rounded-lg border border-border bg-surface/40 p-3 transition-colors hover:border-primary/40">
              <Badge variant="live" className="mb-2">Live now</Badge>
              <div className="font-semibold">Nova Masters: Ignite</div>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="size-3" />
                Quarter Finals · Today 18:00
              </div>
            </Link>
          </section>

          {/* Notifications */}
          <section className="rounded-lg border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
              <h2 className="font-display text-sm font-bold uppercase tracking-wider">Activity</h2>
              <Link href="/dashboard/notifications" className="text-xs text-primary hover:underline">All</Link>
            </div>
            <div className="divide-y divide-border">
              {notifications.slice(0, 3).map((n) => (
                <div key={n.id} className="px-5 py-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{n.title}</p>
                    <span className="text-[10px] text-muted-foreground">{n.time}</span>
                  </div>
                  <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{n.body}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
