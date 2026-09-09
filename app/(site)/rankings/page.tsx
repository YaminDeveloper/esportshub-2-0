import { RankingsBoard } from '@/components/rankings/rankings-board'

export const metadata = { title: 'Rankings — EsportsHub 2.0' }

export default function RankingsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-primary uppercase">
          <span className="h-px w-6 bg-primary" />
          Global Leaderboards
        </div>
        <h1 className="font-display text-4xl font-bold tracking-tight">Rankings</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          The definitive competitive rankings, updated after every match. Track
          the world&apos;s best teams and players across all titles and regions.
        </p>
      </div>
      <RankingsBoard />
    </div>
  )
}
