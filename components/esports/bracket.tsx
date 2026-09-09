import { cn } from '@/lib/utils'
import { bracketMatches, bracketRounds, type Match, type BracketTeam } from '@/lib/data'
import { TeamLogo } from './team-logo'

function TeamRow({
  team,
  score,
  isWinner,
  isLoser,
}: {
  team: BracketTeam
  score: number | null
  isWinner: boolean
  isLoser: boolean
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 px-2.5 py-2 transition-colors',
        isWinner && 'bg-primary/10',
        isLoser && 'opacity-55',
      )}
    >
      {team ? (
        <>
          <span className="w-4 text-center text-[10px] font-semibold text-muted-foreground">
            {team.seed}
          </span>
          <TeamLogo tag={team.tag} size="sm" className="size-6 rounded" />
          <span
            className={cn(
              'flex-1 truncate text-sm font-medium',
              isWinner && 'text-primary',
            )}
          >
            {team.tag}
          </span>
          <span
            className={cn(
              'font-display text-sm font-bold tabular-nums',
              isWinner ? 'text-primary' : 'text-muted-foreground',
            )}
          >
            {score ?? '-'}
          </span>
        </>
      ) : (
        <>
          <span className="w-4" />
          <span className="grid size-6 place-items-center rounded bg-secondary text-[10px] text-muted-foreground">
            ?
          </span>
          <span className="flex-1 text-sm italic text-muted-foreground">TBD</span>
          <span className="font-display text-sm font-bold text-muted-foreground">
            -
          </span>
        </>
      )}
    </div>
  )
}

function MatchCard({ m }: { m: Match }) {
  return (
    <div
      className={cn(
        'w-52 overflow-hidden rounded-lg border bg-card',
        m.status === 'live'
          ? 'border-live/50 glow-live'
          : 'border-border',
      )}
    >
      <div className="flex items-center justify-between border-b border-border px-2.5 py-1">
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          {m.id.startsWith('gf') ? 'Grand Final' : `Match`}
        </span>
        {m.status === 'live' ? (
          <span className="flex items-center gap-1 text-[10px] font-bold text-live">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-live opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-live" />
            </span>
            LIVE
          </span>
        ) : (
          <span className="text-[10px] font-medium text-muted-foreground">
            {m.time}
          </span>
        )}
      </div>
      <div className="divide-y divide-border">
        <TeamRow
          team={m.a}
          score={m.scoreA}
          isWinner={m.winner === 'a'}
          isLoser={m.winner === 'b'}
        />
        <TeamRow
          team={m.b}
          score={m.scoreB}
          isWinner={m.winner === 'b'}
          isLoser={m.winner === 'a'}
        />
      </div>
    </div>
  )
}

export function Bracket() {
  const rounds = bracketRounds.map((_, i) =>
    bracketMatches.filter((m) => m.round === i),
  )

  return (
    <div className="overflow-x-auto pb-4 scrollbar-hide">
      <div className="flex min-w-max gap-8">
        {rounds.map((matches, roundIdx) => (
          <div
            key={roundIdx}
            className="flex flex-col justify-around gap-6"
            style={{ minWidth: '13rem' }}
          >
            <div className="sticky top-0 mb-1 text-center">
              <span className="inline-block rounded-md border border-border bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                {bracketRounds[roundIdx]}
              </span>
            </div>
            <div className="flex flex-1 flex-col justify-around gap-6">
              {matches.map((m) => (
                <MatchCard key={m.id} m={m} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
