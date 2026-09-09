'use client'

import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, SlidersHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TournamentCard } from '@/components/esports/tournament-card'
import {
  tournaments,
  games,
  type GameId,
  type TournamentStatus,
} from '@/lib/data'

const statusFilters: { id: TournamentStatus | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'live', label: 'Live' },
  { id: 'registration', label: 'Registration' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'completed', label: 'Completed' },
]

const regions = ['All', 'Global', 'International', 'NA', 'EU', 'APAC']
const sorts = [
  { id: 'prize', label: 'Prize pool' },
  { id: 'teams', label: 'Team count' },
  { id: 'date', label: 'Start date' },
]

export function TournamentsBrowser() {
  const params = useSearchParams()
  const initialGame = (params.get('game') as GameId) ?? 'all'

  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<TournamentStatus | 'all'>('all')
  const [game, setGame] = useState<GameId | 'all'>(
    games.some((g) => g.id === initialGame) ? initialGame : 'all',
  )
  const [region, setRegion] = useState('All')
  const [sort, setSort] = useState('prize')

  const filtered = useMemo(() => {
    const out = tournaments.filter((t) => {
      if (status !== 'all' && t.status !== status) return false
      if (game !== 'all' && t.game !== game) return false
      if (region !== 'All' && t.region !== region) return false
      if (query && !t.name.toLowerCase().includes(query.toLowerCase())) return false
      return true
    })
    out.sort((a, b) => {
      if (sort === 'prize') return b.prizePool - a.prizePool
      if (sort === 'teams') return b.teams - a.teams
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    })
    return out
  }, [query, status, game, region, sort])

  return (
    <div>
      {/* Status tabs */}
      <div className="mb-5 flex flex-wrap gap-2">
        {statusFilters.map((s) => (
          <button
            key={s.id}
            onClick={() => setStatus(s.id)}
            className={cn(
              'rounded-md border px-3.5 py-1.5 text-sm font-medium transition-colors',
              status === s.id
                ? 'border-primary bg-primary/15 text-primary'
                : 'border-border bg-card text-muted-foreground hover:text-foreground',
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Filter bar */}
      <div className="mb-8 flex flex-col gap-3 rounded-lg border border-border bg-card p-3 lg:flex-row lg:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-md border border-border bg-background px-3">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tournaments..."
            className="h-9 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <SlidersHorizontal className="size-4 shrink-0 text-muted-foreground" />
          <FilterSelect
            value={game}
            onChange={(v) => setGame(v as GameId | 'all')}
            options={[{ value: 'all', label: 'All games' }, ...games.map((g) => ({ value: g.id, label: g.name }))]}
          />
          <FilterSelect
            value={region}
            onChange={setRegion}
            options={regions.map((r) => ({ value: r, label: r === 'All' ? 'All regions' : r }))}
          />
          <FilterSelect
            value={sort}
            onChange={setSort}
            options={sorts.map((s) => ({ value: s.id, label: s.label }))}
          />
        </div>
      </div>

      <div className="mb-4 text-sm text-muted-foreground">
        {filtered.length} tournament{filtered.length !== 1 && 's'}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border py-20 text-center text-muted-foreground">
          No tournaments match your filters.
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => (
            <TournamentCard key={t.id} t={t} />
          ))}
        </div>
      )}
    </div>
  )
}

function FilterSelect({
  value,
  onChange,
  options,
}: {
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-9 rounded-md border border-border bg-background px-2.5 text-sm outline-none focus:border-primary"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value} className="bg-popover">
          {o.label}
        </option>
      ))}
    </select>
  )
}
