import { Search, Ban, ShieldCheck, MoreHorizontal } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { PlayerAvatar } from '@/components/esports/player-avatar'
import { players, gameMap } from '@/lib/data'

export const metadata = { title: 'Manage Users — Admin' }

const extra = [
  { handle: 'FrostByte', name: 'Kai Lund', game: 'nova-strike', role: 'Player', status: 'Verified' },
  { handle: 'ArcLight', name: 'Mara Vidal', game: 'rift-legends', role: 'Player', status: 'Pending' },
  { handle: 'NullPointer', name: 'Sam Reyes', game: 'apex-arena', role: 'Organizer', status: 'Verified' },
  { handle: 'ZeroCool', name: 'Dana Cross', game: 'frontline', role: 'Player', status: 'Suspended' },
]

export default function AdminUsers() {
  const rows = [
    ...players.map((p) => ({ handle: p.handle, name: p.name, game: p.game, role: 'Player', status: 'Verified' })),
    ...extra,
  ]

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:py-10">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold tracking-tight">Users</h1>
        <p className="mt-1 text-sm text-muted-foreground">{rows.length} accounts · manage roles and moderation</p>
      </div>

      <div className="mb-5 flex items-center gap-2 rounded-md border border-border bg-card px-3">
        <Search className="size-4 text-muted-foreground" />
        <input
          placeholder="Search users..."
          className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-border bg-surface/40 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3 font-semibold">User</th>
                <th className="px-3 py-3 font-semibold">Game</th>
                <th className="px-3 py-3 font-semibold">Role</th>
                <th className="px-3 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((u, i) => (
                <tr key={u.handle + i} className="hover:bg-accent/40">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <PlayerAvatar handle={u.handle} size="sm" />
                      <div>
                        <div className="font-medium">{u.handle}</div>
                        <div className="text-xs text-muted-foreground">{u.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-muted-foreground">{gameMap[u.game as keyof typeof gameMap].name}</td>
                  <td className="px-3 py-3">
                    <Badge variant={u.role === 'Organizer' ? 'default' : 'secondary'}>{u.role}</Badge>
                  </td>
                  <td className="px-3 py-3">
                    <Badge variant={u.status === 'Verified' ? 'default' : u.status === 'Pending' ? 'gold' : 'live'}>
                      {u.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-1">
                      <button className="grid size-7 place-items-center rounded-md text-muted-foreground hover:bg-primary/15 hover:text-primary" aria-label="Verify">
                        <ShieldCheck className="size-3.5" />
                      </button>
                      <button className="grid size-7 place-items-center rounded-md text-muted-foreground hover:bg-live/15 hover:text-live" aria-label="Suspend">
                        <Ban className="size-3.5" />
                      </button>
                      <button className="grid size-7 place-items-center rounded-md text-muted-foreground hover:bg-secondary" aria-label="More">
                        <MoreHorizontal className="size-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
