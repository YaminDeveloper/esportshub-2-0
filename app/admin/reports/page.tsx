import { AlertTriangle, Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export const metadata = { title: 'Reports — Admin' }

const reports = [
  { id: 'rp1', subject: 'ZeroCool', reason: 'Toxicity in match chat', severity: 'High', reporter: 'Havoc', when: '12m ago' },
  { id: 'rp2', subject: 'Team Riptide', reason: 'Suspected roster eligibility violation', severity: 'Medium', reporter: 'Arena Circuit', when: '1h ago' },
  { id: 'rp3', subject: 'ArcLight', reason: 'Account sharing report', severity: 'High', reporter: 'System', when: '3h ago' },
  { id: 'rp4', subject: 'Nova Challengers Cup', reason: 'Disputed match result', severity: 'Low', reporter: 'Stormbreak', when: '5h ago' },
  { id: 'rp5', subject: 'NullPointer', reason: 'Inappropriate profile content', severity: 'Medium', reporter: 'System', when: '1d ago' },
]

const severityStyle: Record<string, string> = {
  High: 'live',
  Medium: 'gold',
  Low: 'secondary',
}

export default function AdminReports() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:py-10">
      <div className="mb-6 flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-lg bg-live/15 text-live">
          <AlertTriangle className="size-5" />
        </span>
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Moderation Queue</h1>
          <p className="text-sm text-muted-foreground">{reports.length} reports awaiting review</p>
        </div>
      </div>

      <div className="space-y-3">
        {reports.map((r) => (
          <div key={r.id} className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-center">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-display font-bold">{r.subject}</span>
                <Badge variant={severityStyle[r.severity] as 'live' | 'gold' | 'secondary'}>{r.severity}</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{r.reason}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Reported by {r.reporter} · {r.when}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-8">
                <Check className="size-3.5" />
                Resolve
              </Button>
              <Button variant="destructive" size="sm" className="h-8">
                <X className="size-3.5" />
                Dismiss
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
