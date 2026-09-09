import { cn } from '@/lib/utils'
import { TeamLogo } from '@/components/esports/team-logo'
import { StatusBadge } from '@/components/esports/status-badge'
import { teamMap } from '@/lib/data'

export const metadata = { title: 'My Matches — EsportsHub 2.0' }

const team = teamMap['vortex']

const upcoming = [
  { opp: 'CRW', event: 'Nova Masters · Quarter Finals', when: 'Today · 18:00', live: true },
  { opp: 'PH9', event: 'Global Invitational · Group A', when: 'Sep 11 · 20:00' },
  { opp: 'SOL', event: 'Practice Scrim', when: 'Sep 12 · 15:00' },
]

const past = [
  { opp: 'STB', event: 'Nova Masters · Ro16', score: '2 - 0', result: 'W' },
  { opp: 'OBS', event: 'Challengers Cup · Final', score: '2 - 1', result: 'W' },
  { opp: 'PH9', event: 'Global Invitational', score: '1 - 2', result: 'L' },
  { opp: 'SOL', event: 'Nova Masters · Ro16', score: '3 - 1', result: 'W' },
  { opp: 'RIP', event: 'Exhibition', score: '2 - 0', result: 'W' },
]

export default function MatchesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:py-10">
      <h1 className="mb-6 font-display text-3xl font-bold tracking-tight">Matches</h1>

      <h2 className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">
        Upcoming
      </h2>
      <div className="mb-8 overflow-hidden rounded-lg border border-border">
        {upcoming.map((m, i) => (
          <div key={i} className={cn('flex items-center gap-3 px-4 py-4', i % 2 ? 'bg-surface/40' : 'bg-card')}>
            <TeamLogo tag={team.tag} game={team.game} size="sm" />
            <span className="text-sm font-semibold">{team.tag}</span>
            <span className="text-xs text-muted-foreground">vs</span>
            <TeamLogo tag={m.opp} size="sm" />
            <span className="text-sm font-semibold">{m.opp}</span>
            <div className="ml-auto text-right">
              <div className="flex items-center justify-end gap-2 text-sm">
                {m.live && <StatusBadge status="live" />}
                <span className={m.live ? 'font-medium text-live' : 'text-muted-foreground'}>{m.when}</span>
              </div>
              <div className="text-xs text-muted-foreground">{m.event}</div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">
        Match History
      </h2>
      <div className="overflow-hidden rounded-lg border border-border">
        {past.map((m, i) => (
          <div key={i} className={cn('flex items-center gap-3 px-4 py-4', i % 2 ? 'bg-surface/40' : 'bg-card')}>
            <span className={cn('grid size-7 place-items-center rounded font-display text-xs font-bold', m.result === 'W' ? 'bg-primary/15 text-primary' : 'bg-live/15 text-live')}>
              {m.result}
            </span>
            <span className="text-sm font-semibold">{team.tag}</span>
            <span className="font-display text-sm font-bold tabular-nums">{m.score}</span>
            <span className="text-sm text-muted-foreground">{m.opp}</span>
            <span className="ml-auto text-xs text-muted-foreground">{m.event}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
