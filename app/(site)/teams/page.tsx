import { TeamsBrowser } from '@/components/teams/teams-browser'

export const metadata = { title: 'Teams — EsportsHub 2.0' }

export default function TeamsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-primary uppercase">
          <span className="h-px w-6 bg-primary" />
          Organizations
        </div>
        <h1 className="font-display text-4xl font-bold tracking-tight">Teams</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Explore the rosters, ratings, and results of the world&apos;s top
          competitive esports organizations.
        </p>
      </div>
      <TeamsBrowser />
    </div>
  )
}
