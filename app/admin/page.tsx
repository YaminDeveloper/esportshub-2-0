import Link from 'next/link'
import {
  Users,
  Trophy,
  DollarSign,
  Flag,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/esports/status-badge'
import { GameTag } from '@/components/esports/game-tag'
import { tournaments, gameMap, formatMoney } from '@/lib/data'

export const metadata = { title: 'Admin — EsportsHub 2.0' }

const stats = [
  { label: 'Total Users', value: '128,412', change: 12.4, up: true, icon: Users },
  { label: 'Active Tournaments', value: '128', change: 8.1, up: true, icon: Trophy },
  { label: 'Platform Revenue', value: '$2.41M', change: 3.2, up: true, icon: DollarSign },
  { label: 'Pending Reports', value: '14', change: 5.0, up: false, icon: Flag },
]

// Signups over the last 12 weeks (relative heights)
const chart = [40, 55, 48, 62, 70, 65, 80, 76, 90, 84, 95, 100]

const recentUsers = [
  { handle: 'FrostByte', game: 'nova-strike', joined: '2m ago', status: 'Verified' },
  { handle: 'ArcLight', game: 'rift-legends', joined: '18m ago', status: 'Pending' },
  { handle: 'NullPointer', game: 'apex-arena', joined: '1h ago', status: 'Verified' },
  { handle: 'ZeroCool', game: 'frontline', joined: '2h ago', status: 'Pending' },
  { handle: 'Havoc', game: 'nova-strike', joined: '3h ago', status: 'Verified' },
]

export default function AdminOverview() {
  const managed = tournaments.slice(0, 5)

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-10">
      <div className="mb-8">
        <div className="mb-1 flex items-center gap-2">
          <h1 className="font-display text-3xl font-bold tracking-tight">
            Admin Console
          </h1>
          <Badge variant="live">Operator</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Platform health, moderation, and event management at a glance.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg border border-border bg-card p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="grid size-9 place-items-center rounded-lg bg-primary/15 text-primary">
                <s.icon className="size-4.5" />
              </span>
              <span className={cn('flex items-center gap-0.5 text-xs font-medium', s.up ? 'text-primary' : 'text-live')}>
                {s.up ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
                {s.change}%
              </span>
            </div>
            <div className="font-display text-2xl font-bold">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Signups chart */}
        <section className="rounded-lg border border-border bg-card p-5">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="font-display font-bold">New Signups</h2>
              <p className="text-xs text-muted-foreground">Last 12 weeks</p>
            </div>
            <Badge variant="default">+18.2%</Badge>
          </div>
          <div className="flex h-44 items-end gap-1.5">
            {chart.map((h, i) => (
              <div key={i} className="group flex h-full flex-1 flex-col items-center justify-end">
                <div
                  className="w-full rounded-t bg-primary/30 transition-colors group-hover:bg-primary"
                  style={{ height: `${h}%` }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Recent users */}
        <section className="rounded-lg border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
            <h2 className="font-display font-bold">Recent Signups</h2>
            <Link href="/admin/users" className="text-xs text-primary hover:underline">
              Manage
            </Link>
          </div>
          <div className="divide-y divide-border">
            {recentUsers.map((u) => (
              <div key={u.handle} className="flex items-center justify-between px-5 py-3">
                <div>
                  <div className="text-sm font-medium">{u.handle}</div>
                  <div className="text-xs text-muted-foreground">
                    {gameMap[u.game as keyof typeof gameMap].name} · {u.joined}
                  </div>
                </div>
                <Badge variant={u.status === 'Verified' ? 'default' : 'gold'}>
                  {u.status}
                </Badge>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Tournament management */}
      <section className="mt-6 rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
          <h2 className="font-display font-bold">Tournament Management</h2>
          <Button size="sm" className="h-7" render={<Link href="/admin/tournaments" />}>
            View all
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-2.5 font-semibold">Tournament</th>
                <th className="px-3 py-2.5 font-semibold">Game</th>
                <th className="px-3 py-2.5 font-semibold">Status</th>
                <th className="px-3 py-2.5 font-semibold">Teams</th>
                <th className="px-3 py-2.5 text-right font-semibold">Prize</th>
                <th className="px-5 py-2.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {managed.map((t) => (
                <tr key={t.id} className="hover:bg-accent/50">
                  <td className="px-5 py-3 font-medium">{t.name}</td>
                  <td className="px-3 py-3"><GameTag game={t.game} /></td>
                  <td className="px-3 py-3"><StatusBadge status={t.status} /></td>
                  <td className="px-3 py-3 text-muted-foreground">{t.teams}/{t.maxTeams}</td>
                  <td className="px-3 py-3 text-right font-display font-bold tabular-nums text-primary">
                    {formatMoney(t.prizePool)}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button className="grid size-7 place-items-center rounded-md text-muted-foreground hover:bg-secondary" aria-label="Actions">
                      <MoreHorizontal className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
