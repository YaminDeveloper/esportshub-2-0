import { PlayersBrowser } from '@/components/players/players-browser'

export const metadata = { title: 'Players — EsportsHub 2.0' }

export default function PlayersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-primary uppercase">
          <span className="h-px w-6 bg-primary" />
          Competitors
        </div>
        <h1 className="font-display text-4xl font-bold tracking-tight">Players</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Discover the pros defining the meta. Browse stats, roles, and recent
          form across every title on the circuit.
        </p>
      </div>
      <PlayersBrowser />
    </div>
  )
}
