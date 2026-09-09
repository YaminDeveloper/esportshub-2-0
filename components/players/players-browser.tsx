'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PlayerCard } from '@/components/esports/player-card'
import { players, games, type GameId } from '@/lib/data'

const regions = ['All', 'NA', 'EU', 'APAC']
const regionByCountry: Record<string, string> = {
  US: 'NA', CA: 'NA', BR: 'NA',
  CZ: 'EU', DE: 'EU', GB: 'EU', IE: 'EU', SE: 'EU', NO: 'EU', FI: 'EU',
  JP: 'APAC', KR: 'APAC',
}

export function PlayersBrowser() {
  const [query, setQuery] = useState('')
  const [game, setGame] = useState<GameId | 'all'>('all')
  const [region, setRegion] = useState('All')

  const filtered = useMemo(() => {
    return players
      .filter((p) => {
        if (game !== 'all' && p.game !== game) return false
        if (region !== 'All' && regionByCountry[p.country] !== region) return false
        if (query && !p.handle.toLowerCase().includes(query.toLowerCase()) && !p.name.toLowerCase().includes(query.toLowerCase())) return false
        return true
      })
      .sort((a, b) => b.followers - a.followers)
  }, [query, game, region])

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 rounded-lg border border-border bg-card p-3 lg:flex-row lg:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-md border border-border bg-background px-3">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search players..."
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

      <div className="mb-4 text-sm text-muted-foreground">{filtered.length} players</div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border py-20 text-center text-muted-foreground">
          No players found.
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      )}
    </div>
  )
}
