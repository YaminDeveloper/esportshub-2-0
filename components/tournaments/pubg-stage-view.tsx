'use client'

import { useState } from 'react'
import { CheckCircle2, ChevronRight, Crosshair, Layers3, Trophy, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const stages = [
  { id: 'qualifiers', label: 'Stage 1 · Qualifiers', meta: '4 groups · 96 teams', detail: 'Top 6 from each group advance' },
  { id: 'group-stage', label: 'Stage 2 · Group Stage', meta: '4 groups · 24 teams', detail: 'Top 5 from each group advance' },
  { id: 'survival', label: 'Stage 3 · Survival', meta: '1 lobby · 20 teams', detail: 'Top 8 qualify for finals' },
  { id: 'grand-finals', label: 'Stage 4 · Grand Finals', meta: '1 lobby · 16 teams', detail: '12-match cumulative points final' },
] as const

const groupNames = ['Group A', 'Group B', 'Group C', 'Group D']
const teams = ['Nova Reign', 'Vortex Prime', 'DRS Gaming', 'Raven Unit', 'Krypton 7', 'Titan Esports', 'FalconX', 'Orbit Crew', 'Apex Wolves', 'Zenith', 'NightRaid', 'Pulse 9']
const scores = [142, 131, 119, 111, 104, 98, 91, 84, 79, 73, 66, 58]

export function PubgStageView({ compact = false }: { compact?: boolean }) {
  const [stage, setStage] = useState<(typeof stages)[number]['id']>('qualifiers')
  const activeStage = stages.find((item) => item.id === stage) ?? stages[0]
  const cutoff = stage === 'qualifiers' ? 6 : stage === 'group-stage' ? 5 : stage === 'survival' ? 8 : 16

  return (
    <div className={cn('space-y-6', compact && 'space-y-4')}>
      <div className="grid gap-2 md:grid-cols-4">
        {stages.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setStage(item.id)}
            className={cn('glass rounded-2xl p-4 text-left transition-all hover:-translate-y-0.5', stage === item.id && 'border-primary/60 bg-primary/10 shadow-[0_0_30px_-14px_oklch(0.82_0.16_195_/_0.9)]')}
          >
            <div className="mb-3 flex items-center justify-between">
              <span className={cn('grid size-8 place-items-center rounded-xl text-xs font-bold', stage === item.id ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground')}>{index + 1}</span>
              {index < stages.length - 1 && <ChevronRight className="hidden size-4 text-muted-foreground md:block" />}
            </div>
            <div className="font-display text-sm font-bold">{item.label}</div>
            <div className="mt-1 text-xs text-muted-foreground">{item.meta}</div>
          </button>
        ))}
      </div>

      <div className="glass rounded-2xl p-4 sm:p-6">
        <div className="flex flex-col gap-4 border-b border-border/60 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2"><Badge variant="outline"><Layers3 className="mr-1 size-3" /> Multi-stage format</Badge><Badge variant="gold">PUBG MOBILE</Badge></div>
            <h2 className="font-display text-2xl font-bold tracking-tight">{activeStage.label}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{activeStage.detail} · 4–5 matches per lobby</p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl bg-secondary/70 px-3 py-2"><div className="font-display text-lg font-bold text-primary">{activeStage.meta.split('·')[0].trim().split(' ')[0]}</div><div className="text-[10px] text-muted-foreground">Lobbies</div></div>
            <div className="rounded-xl bg-secondary/70 px-3 py-2"><div className="font-display text-lg font-bold">{stage === 'grand-finals' ? 12 : 5}</div><div className="text-[10px] text-muted-foreground">Matches</div></div>
            <div className="rounded-xl bg-secondary/70 px-3 py-2"><div className="font-display text-lg font-bold text-gold">Top {cutoff}</div><div className="text-[10px] text-muted-foreground">Qualify</div></div>
          </div>
        </div>

        {stage === 'grand-finals' ? (
          <div className="mt-5 grid gap-4 lg:grid-cols-[1.15fr_.85fr]">
            <div className="rounded-2xl border border-primary/25 bg-primary/5 p-5"><Trophy className="mb-4 size-7 text-gold" /><h3 className="font-display text-xl font-bold">Global Championship Lobby</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Six Erangel, three Miramar and three Sanhok matches. Every placement and elimination counts toward the final cumulative leaderboard.</p><Button className="mt-5" size="sm">View finals schedule</Button></div>
            <div className="rounded-2xl border border-border/70 p-5"><div className="mb-3 flex items-center gap-2 text-sm font-semibold"><Crosshair className="size-4 text-primary" /> Scoring system</div><div className="space-y-2 text-sm text-muted-foreground"><div className="flex justify-between"><span>Placement points</span><span className="font-semibold text-foreground">1st = 10 pts</span></div><div className="flex justify-between"><span>Elimination points</span><span className="font-semibold text-foreground">1 kill = 1 pt</span></div><div className="flex justify-between"><span>Tie-breaker</span><span className="font-semibold text-foreground">Best placement</span></div></div></div>
          </div>
        ) : (
          <div className="mt-5 overflow-x-auto rounded-2xl border border-border/70"><table className="w-full min-w-[680px] text-left text-sm"><thead className="bg-secondary/60 text-xs uppercase tracking-wider text-muted-foreground"><tr><th className="px-4 py-3">Rank</th><th className="px-4 py-3">Team</th><th className="px-4 py-3">Matches</th><th className="px-4 py-3">Placement</th><th className="px-4 py-3">Elims</th><th className="px-4 py-3">Total</th><th className="px-4 py-3">Status</th></tr></thead><tbody>{teams.map((team, index) => { const qualified = index < cutoff; return <tr key={team} className={cn('border-t border-border/50', qualified && 'bg-primary/[0.035]')}><td className="px-4 py-3 font-display font-bold">#{index + 1}</td><td className="px-4 py-3"><div className="flex items-center gap-3"><span className="grid size-8 place-items-center rounded-lg bg-secondary text-xs font-bold">{team.slice(0, 2)}</span><span className="font-semibold">{team}</span></div></td><td className="px-4 py-3 text-muted-foreground">{stage === 'qualifiers' ? 5 : 6}</td><td className="px-4 py-3 text-muted-foreground">{Math.round(scores[index] * .55)}</td><td className="px-4 py-3 text-muted-foreground">{Math.round(scores[index] * .45)}</td><td className="px-4 py-3 font-display font-bold text-primary">{scores[index]}</td><td className="px-4 py-3">{qualified ? <Badge className="border-primary/30 bg-primary/10 text-primary"><CheckCircle2 className="mr-1 size-3" /> Qualified</Badge> : <span className="text-xs text-muted-foreground">In contention</span>}</td></tr> })}</tbody></table></div>
        )}
      </div>

      {!compact && <div className="flex items-center gap-2 text-xs text-muted-foreground"><Users className="size-4" /> Each lobby hosts 22–25 squads. Qualified teams are reseeded into the next stage.</div>}
    </div>
  )
}
