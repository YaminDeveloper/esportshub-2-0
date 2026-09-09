import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { TournamentCard } from '@/components/esports/tournament-card'
import { tournaments } from '@/lib/data'

export const metadata = { title: 'My Tournaments — EsportsHub 2.0' }

export default function DashboardTournamentsPage() {
  const registered = tournaments.filter((t) =>
    ['nova-masters-2026', 'frontline-clash', 'nova-challengers'].includes(t.id),
  )

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">My Tournaments</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Events you and your team are registered for.
          </p>
        </div>
        <Button className="h-9 glow-primary" render={<Link href="/tournaments" />}>
          Browse events
        </Button>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {registered.map((t) => (
          <TournamentCard key={t.id} t={t} />
        ))}
      </div>
    </div>
  )
}
