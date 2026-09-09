'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Trophy, Users, User, X } from 'lucide-react'
import { tournaments, teams, players, gameMap } from '@/lib/data'
import { TeamLogo } from '@/components/esports/team-logo'
import { PlayerAvatar } from '@/components/esports/player-avatar'

type Result =
  | { kind: 'tournament'; id: string; label: string; sub: string }
  | { kind: 'team'; id: string; label: string; sub: string; tag: string; game: string }
  | { kind: 'player'; id: string; label: string; sub: string; handle: string }

export function SearchDialog({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [query, setQuery] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (!open) setQuery('')
  }, [open])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const results = useMemo<Result[]>(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    const out: Result[] = []
    tournaments.forEach((t) => {
      if (t.name.toLowerCase().includes(q) || gameMap[t.game].name.toLowerCase().includes(q))
        out.push({ kind: 'tournament', id: t.id, label: t.name, sub: gameMap[t.game].name })
    })
    teams.forEach((t) => {
      if (t.name.toLowerCase().includes(q) || t.tag.toLowerCase().includes(q))
        out.push({ kind: 'team', id: t.id, label: t.name, sub: `${t.region} · ${gameMap[t.game].name}`, tag: t.tag, game: t.game })
    })
    players.forEach((p) => {
      if (p.handle.toLowerCase().includes(q) || p.name.toLowerCase().includes(q))
        out.push({ kind: 'player', id: p.id, label: p.handle, sub: `${p.name} · ${p.role}`, handle: p.handle })
    })
    return out.slice(0, 12)
  }, [query])

  function go(href: string) {
    onClose()
    router.push(href)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-100 flex items-start justify-center p-4 pt-[10vh]">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-xl border border-border bg-popover shadow-2xl">
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tournaments, teams, players..."
            className="h-14 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            onClick={onClose}
            className="grid size-6 place-items-center rounded text-muted-foreground hover:bg-muted"
            aria-label="Close search"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="max-h-[52vh] overflow-y-auto p-2">
          {!query.trim() && (
            <p className="px-3 py-8 text-center text-sm text-muted-foreground">
              Start typing to search across the platform.
            </p>
          )}
          {query.trim() && results.length === 0 && (
            <p className="px-3 py-8 text-center text-sm text-muted-foreground">
              No results for &ldquo;{query}&rdquo;.
            </p>
          )}
          {results.map((r) => (
            <button
              key={`${r.kind}-${r.id}`}
              onClick={() =>
                go(
                  r.kind === 'tournament'
                    ? `/tournaments/${r.id}`
                    : r.kind === 'team'
                      ? `/teams/${r.id}`
                      : `/players/${r.id}`,
                )
              }
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-accent"
            >
              {r.kind === 'tournament' && (
                <span className="grid size-9 place-items-center rounded-md bg-primary/15 text-primary">
                  <Trophy className="size-4" />
                </span>
              )}
              {r.kind === 'team' && (
                <TeamLogo tag={r.tag} game={r.game as never} size="sm" />
              )}
              {r.kind === 'player' && <PlayerAvatar handle={r.handle} size="sm" />}
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium">{r.label}</span>
                <span className="block truncate text-xs text-muted-foreground">
                  {r.sub}
                </span>
              </span>
              <span className="rounded border border-border px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                {r.kind}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
