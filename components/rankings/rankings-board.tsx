'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowUp, ArrowDown, Minus, Crown, Medal } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TeamLogo } from '@/components/esports/team-logo'
import { PlayerAvatar } from '@/components/esports/player-avatar'
import { GameTag } from '@/components/esports/game-tag'
import {
  teamRankings,
  playerRankings,
  games,
  gameMap,
  type GameId,
} from '@/lib/data'

const regions = ['All', 'NA', 'EU', 'APAC', 'Global', 'International']

function Change({ rank, prev }: { rank: number; prev: number }) {
  const diff = prev - rank
  if (diff === 0)
    return (
      <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
        <Minus className="size-3" />
      </span>
    )
  const up = diff > 0
  return (
    <span className={cn('flex items-center gap-0.5 text-xs font-medium', up ? 'text-primary' : 'text-live')}>
      {up ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />}
      {Math.abs(diff)}
    </span>
  )
}

const podium = [
  { ring: 'border-gold/50', bg: 'bg-gold/10', text: 'text-gold', icon: Crown },
  { ring: 'border-silver/50', bg: 'bg-silver/10', text: 'text-silver', icon: Medal },
  { ring: 'border-bronze/50', bg: 'bg-bronze/10', text: 'text-bronze', icon: Medal },
]

export function RankingsBoard() {
  const [tab, setTab] = useState<'teams' | 'players'>('teams')
  const [game, setGame] = useState<GameId | 'all'>('all')
  const [region, setRegion] = useState('All')

  const teamRows = useMemo(() => {
    return teamRankings
      .filter((r) => (game === 'all' || r.game === game) && (region === 'All' || r.region === region))
      .map((r, i) => ({ ...r, rank: i + 1 }))
  }, [game, region])

  const playerRows = useMemo(() => {
    return playerRankings
      .filter((r) => game === 'all' || r.game === game)
      .map((r, i) => ({ ...r, rank: i + 1 }))
  }, [game])

  const top3 = tab === 'teams' ? teamRows.slice(0, 3) : playerRows.slice(0, 3)

  return (
    <div>
      {/* Tabs + filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex overflow-hidden rounded-lg border border-border">
          {(['teams', 'players'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                'px-5 py-2 text-sm font-semibold capitalize transition-colors',
                tab === t ? 'bg-primary text-primary-foreground' : 'bg-card text-muted-foreground hover:text-foreground',
              )}
            >
              {t}
            </button>
          ))}
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
          {tab === 'teams' && (
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="h-9 rounded-md border border-border bg-background px-2.5 text-sm outline-none focus:border-primary"
            >
              {regions.map((r) => (
                <option key={r} value={r}>{r === 'All' ? 'All regions' : r}</option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Podium */}
      {top3.length === 3 && (
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {top3.map((r, i) => {
            const style = podium[i]
            const href = tab === 'teams' ? `/teams/${r.id}` : `/players/${r.id}`
            return (
              <Link
                key={r.id}
                href={href}
                className={cn(
                  'relative overflow-hidden rounded-xl border bg-card p-5 transition-transform hover:-translate-y-1',
                  style.ring,
                  i === 0 && 'sm:-translate-y-2',
                )}
              >
                <div className={cn('absolute inset-0 opacity-40', style.bg)} />
                <div className="relative flex items-center gap-4">
                  <div className={cn('flex flex-col items-center', style.text)}>
                    <style.icon className="size-6" />
                    <span className="font-display text-2xl font-bold">{r.rank}</span>
                  </div>
                  {tab === 'teams' ? (
                    <TeamLogo tag={(r as (typeof teamRows)[number]).tag} game={r.game} size="lg" />
                  ) : (
                    <PlayerAvatar handle={(r as (typeof playerRows)[number]).handle} size="lg" />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-display text-lg font-bold">
                      {tab === 'teams' ? (r as (typeof teamRows)[number]).name : (r as (typeof playerRows)[number]).handle}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {tab === 'teams'
                        ? `${(r as (typeof teamRows)[number]).points.toLocaleString()} pts`
                        : `${(r as (typeof playerRows)[number]).team} · ${gameMap[r.game].short}`}
                    </div>
                    <div className={cn('mt-1 font-display text-sm font-bold', style.text)}>
                      {r.rating} rating
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-border">
        {tab === 'teams' ? (
          <>
            <div className="grid grid-cols-[3rem_1fr_5rem_5rem_4rem] gap-3 border-b border-border bg-surface/40 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground sm:grid-cols-[3rem_1fr_6rem_5rem_5rem_4rem]">
              <span>#</span>
              <span>Team</span>
              <span className="hidden text-right sm:block">Points</span>
              <span className="text-right">Rating</span>
              <span className="text-right">Win %</span>
              <span className="text-right">+/-</span>
            </div>
            {teamRows.map((r) => (
              <Link
                key={r.id}
                href={`/teams/${r.id}`}
                className={cn(
                  'grid grid-cols-[3rem_1fr_5rem_5rem_4rem] items-center gap-3 px-4 py-3 transition-colors hover:bg-accent sm:grid-cols-[3rem_1fr_6rem_5rem_5rem_4rem]',
                  r.rank <= 3 && 'bg-primary/[0.03]',
                )}
              >
                <span className={cn('font-display text-sm font-bold', r.rank === 1 ? 'text-gold' : r.rank === 2 ? 'text-silver' : r.rank === 3 ? 'text-bronze' : 'text-muted-foreground')}>
                  {r.rank}
                </span>
                <span className="flex min-w-0 items-center gap-3">
                  <TeamLogo tag={r.tag} game={r.game} size="sm" />
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold">{r.name}</span>
                    <span className="block truncate text-xs text-muted-foreground">{r.region} · {gameMap[r.game].name}</span>
                  </span>
                </span>
                <span className="hidden text-right font-display text-sm font-bold tabular-nums sm:block">{r.points.toLocaleString()}</span>
                <span className="text-right font-display text-sm font-bold tabular-nums text-primary">{r.rating}</span>
                <span className="text-right text-sm tabular-nums">{r.winRate}%</span>
                <span className="flex justify-end"><Change rank={r.rank} prev={r.prev} /></span>
              </Link>
            ))}
          </>
        ) : (
          <>
            <div className="grid grid-cols-[3rem_1fr_4rem_4rem_4rem] gap-3 border-b border-border bg-surface/40 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground sm:grid-cols-[3rem_1fr_5rem_5rem_5rem_4rem]">
              <span>#</span>
              <span>Player</span>
              <span className="hidden text-right sm:block">K/D</span>
              <span className="text-right">Rating</span>
              <span className="text-right">Win %</span>
              <span className="text-right">+/-</span>
            </div>
            {playerRows.map((r) => (
              <Link
                key={r.id}
                href={`/players/${r.id}`}
                className={cn(
                  'grid grid-cols-[3rem_1fr_4rem_4rem_4rem] items-center gap-3 px-4 py-3 transition-colors hover:bg-accent sm:grid-cols-[3rem_1fr_5rem_5rem_5rem_4rem]',
                  r.rank <= 3 && 'bg-primary/[0.03]',
                )}
              >
                <span className={cn('font-display text-sm font-bold', r.rank === 1 ? 'text-gold' : r.rank === 2 ? 'text-silver' : r.rank === 3 ? 'text-bronze' : 'text-muted-foreground')}>
                  {r.rank}
                </span>
                <span className="flex min-w-0 items-center gap-3">
                  <PlayerAvatar handle={r.handle} size="sm" />
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold">{r.handle}</span>
                    <span className="block truncate text-xs text-muted-foreground">{r.team} · {r.role}</span>
                  </span>
                </span>
                <span className="hidden text-right font-display text-sm tabular-nums sm:block">{r.kd}</span>
                <span className="text-right font-display text-sm font-bold tabular-nums text-primary">{r.rating}</span>
                <span className="text-right text-sm tabular-nums">{r.winRate}%</span>
                <span className="flex justify-end"><Change rank={r.rank} prev={r.prev} /></span>
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  )
}
