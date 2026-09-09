'use client'

import { useMemo, useState } from 'react'
import { MapPin, Clock, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { GameTag } from '@/components/esports/game-tag'
import { TeamLogo } from '@/components/esports/team-logo'
import { PlayerAvatar } from '@/components/esports/player-avatar'
import { recruitments, games, type GameId, type Recruitment } from '@/lib/data'

const regions = ['All', 'NA', 'EU', 'APAC']
const roles = ['All', 'Duelist', 'IGL', 'Jungle', 'Support', 'Flex']

function Card({ r }: { r: Recruitment }) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-[0_0_30px_-14px_oklch(0.8_0.145_197_/_0.5)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {r.type === 'team' ? (
            <TeamLogo tag={r.by.slice(0, 3).toUpperCase()} game={r.game} size="lg" />
          ) : (
            <PlayerAvatar handle={r.by} size="lg" />
          )}
          <div>
            <div className="text-xs text-muted-foreground">{r.by}</div>
            <Badge variant={r.type === 'team' ? 'default' : 'gold'} className="mt-1">
              {r.type === 'team' ? 'Recruiting' : 'Free Agent'}
            </Badge>
          </div>
        </div>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="size-3" />
          {r.posted}
        </span>
      </div>

      <h3 className="font-display text-lg font-bold leading-tight text-balance">
        {r.title}
      </h3>
      <p className="line-clamp-2 text-sm text-muted-foreground">{r.description}</p>

      <div className="flex flex-wrap gap-2">
        <GameTag game={r.game} />
        <Badge variant="secondary"><MapPin className="size-3" />{r.region}</Badge>
        <Badge variant="secondary">{r.role}</Badge>
        <Badge variant="outline">{r.rank}</Badge>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {r.tags.map((t) => (
          <span key={t} className="rounded bg-secondary px-2 py-0.5 text-[11px] text-muted-foreground">
            {t}
          </span>
        ))}
      </div>

      <Button variant="outline" className="mt-1 h-9 w-full">
        {r.type === 'team' ? 'Apply to Team' : 'Contact Player'}
      </Button>
    </div>
  )
}

export function RecruitmentBoard() {
  const [tab, setTab] = useState<'team' | 'player'>('team')
  const [game, setGame] = useState<GameId | 'all'>('all')
  const [region, setRegion] = useState('All')
  const [role, setRole] = useState('All')

  const filtered = useMemo(() => {
    return recruitments.filter((r) => {
      if (r.type !== tab) return false
      if (game !== 'all' && r.game !== game) return false
      if (region !== 'All' && r.region !== region) return false
      if (role !== 'All' && r.role !== role) return false
      return true
    })
  }, [tab, game, region, role])

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex overflow-hidden rounded-lg border border-border">
          <button
            onClick={() => setTab('team')}
            className={cn('px-4 py-2 text-sm font-semibold transition-colors', tab === 'team' ? 'bg-primary text-primary-foreground' : 'bg-card text-muted-foreground hover:text-foreground')}
          >
            Teams Recruiting
          </button>
          <button
            onClick={() => setTab('player')}
            className={cn('px-4 py-2 text-sm font-semibold transition-colors', tab === 'player' ? 'bg-primary text-primary-foreground' : 'bg-card text-muted-foreground hover:text-foreground')}
          >
            Free Agents
          </button>
        </div>
        <Button className="h-9 glow-primary">
          <Plus className="size-4" />
          Post a Listing
        </Button>
      </div>

      <div className="mb-6 flex flex-wrap gap-2 rounded-lg border border-border bg-card p-3">
        <select value={game} onChange={(e) => setGame(e.target.value as GameId | 'all')} className="h-9 rounded-md border border-border bg-background px-2.5 text-sm outline-none focus:border-primary">
          <option value="all">All games</option>
          {games.map((g) => (<option key={g.id} value={g.id}>{g.name}</option>))}
        </select>
        <select value={region} onChange={(e) => setRegion(e.target.value)} className="h-9 rounded-md border border-border bg-background px-2.5 text-sm outline-none focus:border-primary">
          {regions.map((r) => (<option key={r} value={r}>{r === 'All' ? 'All regions' : r}</option>))}
        </select>
        <select value={role} onChange={(e) => setRole(e.target.value)} className="h-9 rounded-md border border-border bg-background px-2.5 text-sm outline-none focus:border-primary">
          {roles.map((r) => (<option key={r} value={r}>{r === 'All' ? 'All roles' : r}</option>))}
        </select>
      </div>

      <div className="mb-4 text-sm text-muted-foreground">{filtered.length} listings</div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border py-20 text-center text-muted-foreground">
          No listings match your filters.
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (<Card key={r.id} r={r} />))}
        </div>
      )}
    </div>
  )
}
