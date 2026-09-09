'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TeamCard } from '@/components/esports/team-card'
import { teams, games, type GameId } from '@/lib/data'

const regions = ['All', 'NA', 'EU', 'APAC', 'Global']

export function TeamsBrowser() {
  const [query, setQuery] = useState('')
  const [game, setGame] = useState<GameId | 'all'>('all')
  const [region, setRegion] = useState('All')

  const filtered = useMemo(() => {
    return teams
      .filter((t) => {
        if (game !== 'all' && t.game !== game) return false
        if (region !== 'All' && t.region !== region) return false
        if (query && !t.name.toLowerCase().includes(query.toLowerCase()) && !t.tag.toLowerCase().includes(query.toLowerCase())) return false
        return true
      })
      .sort((a, b) => b.rating - a.rating)
  }, [query, game, region])

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 rounded-lg border border-border bg-card p-3 lg:flex-row lg:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-md border border-border bg-background px-3">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search teams..."
            className="h-9 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            value={game}
            onChange={(e) => setGame(e.target.value as GameId | 'all')}
            className="h-9 rounded-md border border-border bg-background px-2.5 text-sm outline-none focus:border-primary"
          >
            <option value="all">All games</option>
            {games.map((g) => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>
          <div className="flex overflow-hidden rounded-md border border-border">
            {regions.map((r) => (
              <button
                key={r}
                onClick={() => setRegion(r)}
                className={cn(
                  'px-3 py-1.5 text-sm font-medium transition-colors',
                  region === r ? 'bg-primary/15 text-primary' : 'bg-background text-muted-foreground hover:text-foreground',
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-4 text-sm text-muted-foreground">{filtered.length} teams</div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border py-20 text-center text-muted-foreground">
          No teams found.
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      )}
    </div>
  )
}
