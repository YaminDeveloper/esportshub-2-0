import Link from 'next/link'
import { Trophy, Users, Swords, DollarSign, ArrowRight } from 'lucide-react'
import { Hero } from '@/components/home/hero'
import { SectionHeading } from '@/components/esports/section-heading'
import { TournamentCard } from '@/components/esports/tournament-card'
import { TeamCard } from '@/components/esports/team-card'
import { PlayerCard } from '@/components/esports/player-card'
import { GameTag } from '@/components/esports/game-tag'
import { Button } from '@/components/ui/button'
import {
  tournaments,
  teams,
  players,
  games,
  formatMoney,
} from '@/lib/data'

const stats = [
  { icon: Trophy, label: 'Active Tournaments', value: '128' },
  { icon: Users, label: 'Registered Teams', value: '4,290' },
  { icon: Swords, label: 'Matches Played', value: '38.4K' },
  { icon: DollarSign, label: 'Prizes Awarded', value: '$14.2M' },
]

export default function HomePage() {
  const liveAndUpcoming = tournaments
    .filter((t) => t.status === 'live' || t.status === 'upcoming' || t.status === 'registration')
    .slice(0, 6)
  const topTeams = teams.slice(0, 4)
  const topPlayers = players.slice(0, 4)

  return (
    <>
      <Hero />

      {/* Stats */}
      <section className="border-b border-border bg-surface/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-border px-4 sm:px-6 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-3 px-2 py-6 sm:px-6">
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                <s.icon className="size-5" />
              </span>
              <div>
                <div className="font-display text-2xl font-bold tracking-tight">
                  {s.value}
                </div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Games strip */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Featured Titles
          </span>
          <div className="flex flex-wrap gap-2">
            {games.map((g) => (
              <Link key={g.id} href={`/tournaments?game=${g.id}`}>
                <GameTag game={g.id} showGenre className="hover:border-primary/40" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tournaments */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <SectionHeading
          eyebrow="Happening Now"
          title="Live & Upcoming Tournaments"
          action="All tournaments"
          actionHref="/tournaments"
          className="mb-8"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {liveAndUpcoming.map((t) => (
            <TournamentCard key={t.id} t={t} />
          ))}
        </div>
      </section>

      {/* Teams */}
      <section className="border-y border-border bg-surface/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <SectionHeading
            eyebrow="World Class"
            title="Top Ranked Teams"
            action="View rankings"
            actionHref="/rankings"
            className="mb-8"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {topTeams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        </div>
      </section>

      {/* Players */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="Star Power"
          title="Featured Players"
          action="All players"
          actionHref="/players"
          className="mb-8"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {topPlayers.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 sm:p-12">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="absolute -right-16 -top-16 size-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
                Ready to make your mark?
              </h2>
              <p className="mt-3 text-muted-foreground text-pretty">
                Create your competitor profile, join a team, register for
                tournaments, and start climbing the global leaderboards today.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Button size="lg" className="h-11 px-5 glow-primary" render={<Link href="/register" />}>
                Create Account
                <ArrowRight className="size-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-11 px-5"
                render={<Link href="/recruitment" />}
              >
                Find a Team
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
