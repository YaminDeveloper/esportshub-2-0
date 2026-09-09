import { Suspense } from 'react'
import { TournamentsBrowser } from '@/components/tournaments/tournaments-browser'

export const metadata = {
  title: 'Tournaments — EsportsHub 2.0',
}

export default function TournamentsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-primary uppercase">
          <span className="h-px w-6 bg-primary" />
          Discover
        </div>
        <h1 className="font-display text-4xl font-bold tracking-tight">
          Tournaments
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Browse live, upcoming, and open-registration events across every title.
          Filter by game, region, and status to find your next competition.
        </p>
      </div>

      <Suspense fallback={<div className="py-20 text-center text-muted-foreground">Loading tournaments...</div>}>
        <TournamentsBrowser />
      </Suspense>
    </div>
  )
}
