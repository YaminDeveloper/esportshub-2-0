import Link from 'next/link'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/esports/status-badge'
import { GameTag } from '@/components/esports/game-tag'
import { tournaments, formatMoney } from '@/lib/data'

export const metadata = { title: 'Manage Tournaments — Admin' }

export default function AdminTournaments() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Tournaments</h1>
          <p className="mt-1 text-sm text-muted-foreground">{tournaments.length} events on the platform</p>
        </div>
        <Button className="h-9 glow-primary">
          <Plus className="size-4" />
          Create Tournament
        </Button>
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-border bg-surface/40 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3 font-semibold">Tournament</th>
                <th className="px-3 py-3 font-semibold">Game</th>
                <th className="px-3 py-3 font-semibold">Status</th>
                <th className="px-3 py-3 font-semibold">Region</th>
                <th className="px-3 py-3 font-semibold">Teams</th>
                <th className="px-3 py-3 text-right font-semibold">Prize</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {tournaments.map((t) => (
                <tr key={t.id} className="hover:bg-accent/40">
                  <td className="px-5 py-3">
                    <Link href={`/tournaments/${t.id}`} className="font-medium hover:text-primary">
                      {t.name}
                    </Link>
                  </td>
                  <td className="px-3 py-3"><GameTag game={t.game} /></td>
                  <td className="px-3 py-3"><StatusBadge status={t.status} /></td>
                  <td className="px-3 py-3 text-muted-foreground">{t.region}</td>
                  <td className="px-3 py-3 text-muted-foreground">{t.teams}/{t.maxTeams}</td>
                  <td className="px-3 py-3 text-right font-display font-bold tabular-nums text-primary">{formatMoney(t.prizePool)}</td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-1">
                      <button className="grid size-7 place-items-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground" aria-label="Edit">
                        <Pencil className="size-3.5" />
                      </button>
                      <button className="grid size-7 place-items-center rounded-md text-muted-foreground hover:bg-live/15 hover:text-live" aria-label="Delete">
                        <Trash2 className="size-3.5" />
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
