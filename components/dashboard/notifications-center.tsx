'use client'

import { useMemo, useState } from 'react'
import { Swords, Trophy, Users, Settings as Cog, Heart, Check, CheckCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { notifications as seed, type AppNotification, type NotificationType } from '@/lib/data'

const typeMeta: Record<NotificationType, { icon: typeof Swords; className: string }> = {
  match: { icon: Swords, className: 'bg-live/15 text-live' },
  tournament: { icon: Trophy, className: 'bg-primary/15 text-primary' },
  team: { icon: Users, className: 'bg-gold/15 text-gold' },
  system: { icon: Cog, className: 'bg-secondary text-muted-foreground' },
  social: { icon: Heart, className: 'bg-chart-4/15 text-chart-4' },
}

const filters: { id: NotificationType | 'all' | 'unread'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'unread', label: 'Unread' },
  { id: 'match', label: 'Matches' },
  { id: 'tournament', label: 'Tournaments' },
  { id: 'team', label: 'Team' },
  { id: 'social', label: 'Social' },
]

export function NotificationsCenter() {
  const [list, setList] = useState<AppNotification[]>(seed)
  const [filter, setFilter] = useState<(typeof filters)[number]['id']>('all')

  const filtered = useMemo(() => {
    if (filter === 'all') return list
    if (filter === 'unread') return list.filter((n) => n.unread)
    return list.filter((n) => n.type === filter)
  }, [list, filter])

  const unread = list.filter((n) => n.unread).length

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                'rounded-md border px-3 py-1.5 text-sm font-medium transition-colors',
                filter === f.id
                  ? 'border-primary bg-primary/15 text-primary'
                  : 'border-border bg-card text-muted-foreground hover:text-foreground',
              )}
            >
              {f.label}
              {f.id === 'unread' && unread > 0 && (
                <span className="ml-1.5 rounded bg-live/20 px-1 text-[10px] text-live">{unread}</span>
              )}
            </button>
          ))}
        </div>
        <Button
          variant="outline"
          className="h-9"
          onClick={() => setList((l) => l.map((n) => ({ ...n, unread: false })))}
        >
          <CheckCheck className="size-4" />
          Mark all read
        </Button>
      </div>

      <div className="overflow-hidden rounded-lg border border-border">
        {filtered.length === 0 ? (
          <div className="py-20 text-center text-muted-foreground">
            You&apos;re all caught up.
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filtered.map((n) => {
              const meta = typeMeta[n.type]
              return (
                <div
                  key={n.id}
                  className={cn(
                    'flex items-start gap-4 px-5 py-4 transition-colors',
                    n.unread ? 'bg-primary/[0.04]' : 'bg-card',
                  )}
                >
                  <span className={cn('mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg', meta.className)}>
                    <meta.icon className="size-4.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold">{n.title}</p>
                      {n.unread && <span className="size-1.5 rounded-full bg-live" />}
                    </div>
                    <p className="mt-0.5 text-sm text-muted-foreground">{n.body}</p>
                    <span className="mt-1 block text-xs text-muted-foreground">{n.time} ago</span>
                  </div>
                  {n.unread && (
                    <button
                      onClick={() => setList((l) => l.map((x) => (x.id === n.id ? { ...x, unread: false } : x)))}
                      className="grid size-7 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                      aria-label="Mark as read"
                    >
                      <Check className="size-4" />
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
