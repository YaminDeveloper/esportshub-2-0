'use client'

import { useState } from 'react'
import { CheckCircle2, ChevronRight, Clock3, Crosshair, Layers3, LockKeyhole, Trophy, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TeamLogo } from '@/components/esports/team-logo'

const stages = [
  { id: 'qualifiers', label: 'Stage 1 · Qualifiers', meta: '4 groups · 96 teams', detail: 'Top 6 from each group advance' },
  { id: 'group-stage', label: 'Stage 2 · Group Stage', meta: '4 groups · 24 teams', detail: 'Top 5 from each group advance' },
  { id: 'survival', label: 'Stage 3 · Survival', meta: '1 lobby · 20 teams', detail: 'Top 8 qualify for finals' },
  { id: 'grand-finals', label: 'Stage 4 · Grand Finals', meta: '1 lobby · 16 teams', detail: '12-match cumulative points final' },
] as const

const groupNames = ['Group A', 'Group B', 'Group C', 'Group D']
const teams = ['Nova Reign', 'Vortex Prime', 'DRS Gaming', 'Raven Unit', 'Krypton 7', 'Titan Esports', 'FalconX', 'Orbit Crew', 'Apex Wolves', 'Zenith', 'NightRaid', 'Pulse 9']
const scores = [142, 131, 119, 111, 104, 98, 91, 84, 79, 73, 66, 58]
const teamMeta: Record<string, { flag: string; country: string }> = {
  'Nova Reign': { flag: '🇧🇩', country: 'Bangladesh' },
  'Vortex Prime': { flag: '🇮🇳', country: 'India' },
  'DRS Gaming': { flag: '🇳🇵', country: 'Nepal' },
  'Raven Unit': { flag: '🇵🇰', country: 'Pakistan' },
  'Krypton 7': { flag: '🇹🇭', country: 'Thailand' },
  'Titan Esports': { flag: '🇮🇩', country: 'Indonesia' },
  'FalconX': { flag: '🇲🇾', country: 'Malaysia' },
  'Orbit Crew': { flag: '🇻🇳', country: 'Vietnam' },
  'Apex Wolves': { flag: '🇵🇭', country: 'Philippines' },
  Zenith: { flag: '🇸🇬', country: 'Singapore' },
  NightRaid: { flag: '🇱🇰', country: 'Sri Lanka' },
  'Pulse 9': { flag: '🇦🇪', country: 'UAE' },
}

function TeamName({ name }: { name: string }) {
  const meta = teamMeta[name] ?? { flag: '🌐', country: 'International' }
  return <span className="inline-flex min-w-0 items-center gap-2" title={`${name} · ${meta.country}`}><TeamLogo tag={name.slice(0, 2).toUpperCase()} game="pubg-mobile" size="sm" /><span className="text-base" aria-label={meta.country}>{meta.flag}</span><span className="truncate font-semibold">{name}</span></span>
}

export function PubgStageView({ compact = false }: { compact?: boolean }) {
  const [stage, setStage] = useState<(typeof stages)[number]['id']>('qualifiers')
  const [group, setGroup] = useState('Group A')
  const [selectedMatch, setSelectedMatch] = useState('Match 1')
  const [bracketView, setBracketView] = useState<'stage' | 'group' | 'match'>('stage')
  const [showAllTeams, setShowAllTeams] = useState(false)
  const activeStage = stages.find((item) => item.id === stage) ?? stages[0]
  const published = group !== 'Group D'
  const groupMatches = [
    { map: 'Erangel', match: 'Match 1', date: 'Nov 14 · 18:00', results: [['Nova Reign', 10, 6], ['Vortex Prime', 6, 4], ['DRS Gaming', 4, 3], ['Raven Unit', 2, 2], ['Krypton 7', 1, 2], ['Titan Esports', 0, 1]] },
    { map: 'Miramar', match: 'Match 2', date: 'Nov 14 · 18:45', results: [['DRS Gaming', 10, 8], ['Nova Reign', 6, 5], ['Krypton 7', 4, 4], ['Vortex Prime', 2, 2], ['Raven Unit', 1, 2], ['Titan Esports', 0, 1]] },
    { map: 'Sanhok', match: 'Match 3', date: 'Nov 14 · 19:30', results: [['Vortex Prime', 10, 7], ['Raven Unit', 6, 5], ['Nova Reign', 4, 4], ['DRS Gaming', 2, 3], ['Titan Esports', 1, 2], ['Krypton 7', 0, 1]] },
    { map: 'Erangel', match: 'Match 4', date: 'Nov 14 · 20:15', results: [['Nova Reign', 10, 8], ['Krypton 7', 6, 4], ['Vortex Prime', 4, 3], ['Raven Unit', 2, 2], ['DRS Gaming', 1, 2], ['Titan Esports', 0, 1]] },
    { map: 'Miramar', match: 'Match 5', date: 'Nov 14 · 21:00', results: [['Raven Unit', 10, 7], ['DRS Gaming', 6, 5], ['Nova Reign', 4, 3], ['Vortex Prime', 2, 2], ['Krypton 7', 1, 2], ['Titan Esports', 0, 1]] },
  ]
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
            <div className="mb-2 flex flex-wrap items-center gap-2"><Badge variant="outline"><Layers3 className="mr-1 size-3" /> Multi-stage format</Badge><Badge variant="gold">PUBG MOBILE</Badge><Badge className="border-primary/30 bg-primary/10 text-primary"><span className="mr-1.5 size-1.5 animate-pulse rounded-full bg-primary" />Latest update · 2 min ago</Badge></div>
            <h2 className="font-display text-2xl font-bold tracking-tight">{activeStage.label}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{activeStage.detail} · 4–5 matches per lobby</p><p className="mt-2 flex items-center gap-1.5 text-xs text-primary/80"><span className="size-1.5 animate-pulse rounded-full bg-primary" />Match results synced 2 min ago · updates appear after admin publish</p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl bg-secondary/70 px-3 py-2"><div className="font-display text-lg font-bold text-primary">{activeStage.meta.split('·')[0].trim().split(' ')[0]}</div><div className="text-[10px] text-muted-foreground">Lobbies</div></div>
            <div className="rounded-xl bg-secondary/70 px-3 py-2"><div className="font-display text-lg font-bold">{stage === 'grand-finals' ? 12 : 5}</div><div className="text-[10px] text-muted-foreground">Matches</div></div>
            <div className="rounded-xl bg-secondary/70 px-3 py-2"><div className="font-display text-lg font-bold text-gold">Top {cutoff}</div><div className="text-[10px] text-muted-foreground">Qualify</div></div>
          </div>
        </div>

        {stage !== 'grand-finals' && (
          <div className="mt-5 flex flex-wrap gap-2">
            {groupNames.map((name) => <button key={name} type="button" onClick={() => setGroup(name)} className={cn('rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors', group === name ? 'border-primary/50 bg-primary/15 text-primary' : 'border-border/70 text-muted-foreground hover:text-foreground')}>{name}</button>)}
          </div>
        )}

        {stage !== 'grand-finals' && <div className="mt-5 rounded-2xl border border-gold/25 bg-gold/[0.035] p-4"><div className="mb-3 flex items-center justify-between"><div><div className="flex items-center gap-2 text-sm font-semibold"><Trophy className="size-4 text-gold" /> {activeStage.label} · all groups qualification</div><p className="mt-1 text-xs text-muted-foreground">Top {cutoff} from each group advance to the next stage</p></div><Badge variant="gold">Next stage pool</Badge></div><div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">{groupNames.map((name, groupIndex) => <button key={name} type="button" onClick={() => setGroup(name)} className="rounded-xl border border-border/60 bg-background/25 p-3 text-left transition-colors hover:border-primary/40"><div className="flex items-center justify-between text-xs font-semibold"><span>{name}</span><span className="text-primary">Top {cutoff}</span></div><div className="mt-2 flex flex-wrap gap-1.5">{teams.map((team, index) => <span key={team} className="inline-flex items-center gap-1.5 rounded-md bg-secondary/70 px-2 py-1 text-[10px] text-muted-foreground"><span>{index + 1}.</span><TeamName name={index === 0 ? ['Nova Reign', 'DRS Gaming', 'Vortex Prime', 'Raven Unit'][groupIndex] : team} />{index < cutoff ? <span className="ml-1 rounded-full bg-primary/15 px-1.5 py-0.5 text-[9px] font-bold text-primary">QUALIFIED</span> : <span className="ml-1 rounded-full bg-secondary px-1.5 py-0.5 text-[9px]">WAITING</span>}</span>)}</div></button>)}</div></div>}

        {stage === 'grand-finals' ? (
          <div className="mt-5 grid gap-4 lg:grid-cols-[1.15fr_.85fr]">
            <div className="rounded-2xl border border-primary/25 bg-primary/5 p-5"><Trophy className="mb-4 size-7 text-gold" /><h3 className="font-display text-xl font-bold">Global Championship Lobby</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Six Erangel, three Miramar and three Sanhok matches. Every placement and elimination counts toward the final cumulative leaderboard.</p><Button className="mt-5" size="sm">View finals schedule</Button></div>
            <div className="rounded-2xl border border-border/70 p-5"><div className="mb-3 flex items-center gap-2 text-sm font-semibold"><Crosshair className="size-4 text-primary" /> Scoring system</div><div className="space-y-2 text-sm text-muted-foreground"><div className="flex justify-between"><span>Placement points</span><span className="font-semibold text-foreground">1st = 10 pts</span></div><div className="flex justify-between"><span>Elimination points</span><span className="font-semibold text-foreground">1 kill = 1 pt</span></div><div className="flex justify-between"><span>Tie-breaker</span><span className="font-semibold text-foreground">Best placement</span></div></div></div>
          </div>
        ) : (
          <div className="mt-5 space-y-5">
            {!published ? (
              <div className="flex items-start gap-3 rounded-2xl border border-gold/30 bg-gold/5 p-4 text-sm">
                <LockKeyhole className="mt-0.5 size-5 shrink-0 text-gold" />
                <div><div className="font-semibold">Results are waiting to be published</div><p className="mt-1 text-muted-foreground">The tournament admin has not verified {group} results yet. Match scores and overall standings will appear here once published.</p></div>
              </div>
            ) : (
              <>
                <div className="flex flex-wrap gap-2 rounded-2xl border border-border/60 bg-secondary/25 p-2">
                  {groupMatches.map((match) => <button key={match.match} type="button" onClick={() => setSelectedMatch(match.match)} className={cn('rounded-xl px-3 py-2 text-xs font-semibold transition-colors', selectedMatch === match.match ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-secondary hover:text-foreground')}>{match.match}<span className="ml-1.5 opacity-70">{match.map}</span></button>)}
                </div>
                <div className="flex items-center justify-between"><div className="text-xs text-muted-foreground">{showAllTeams ? `Showing all ${teams.length} teams in ${group} overall` : 'Showing qualified highlights'}</div><button type="button" onClick={() => setShowAllTeams((value) => !value)} className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/20">{showAllTeams ? 'Show less' : 'View all teams'}</button></div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                  {groupMatches.map((match) => <button type="button" onClick={() => setSelectedMatch(match.match)} key={match.match} className="rounded-2xl border border-border/70 bg-secondary/35 p-3"><div className="flex items-center justify-between"><Badge variant="outline">{match.match}</Badge><span className="text-[10px] text-muted-foreground">{match.map}</span></div><div className="mt-3 space-y-2">{match.results.slice(0, showAllTeams ? 6 : 3).map(([team, placement, elims], index) => <div key={team} className="flex items-center justify-between text-xs"><span className="flex items-center gap-2"><span className="font-display text-muted-foreground">{index + 1}</span><TeamName name={String(team)} /></span><span className="text-muted-foreground">{Number(placement) + Number(elims)} pts</span></div>)}</div><div className="mt-3 flex items-center gap-1 text-[10px] text-muted-foreground"><Clock3 className="size-3" /> {match.date}</div></button>)}
                </div>
                <div className="rounded-2xl border border-primary/25 bg-primary/[0.035] p-4"><div className="mb-3 flex items-center justify-between"><div><div className="flex items-center gap-2 text-sm font-semibold"><Crosshair className="size-4 text-primary" /> {selectedMatch} overall result</div><p className="mt-1 text-xs text-muted-foreground">Only this match&apos;s placement and elimination scores</p></div><Badge variant="outline">{group}</Badge></div><div className="grid gap-2 sm:grid-cols-4">{(groupMatches.find((match) => match.match === selectedMatch)?.results ?? []).map(([team, placement, elims], index) => <div key={team} className="rounded-xl border border-border/60 bg-background/30 p-3"><div className="text-xs text-muted-foreground">#{index + 1}</div><div className="mt-1 text-sm font-semibold">{team}</div><div className="mt-2 text-xs text-muted-foreground">Placement {placement} · Elims {elims}</div><div className="mt-1 font-display font-bold text-primary">{Number(placement) + Number(elims)} pts</div></div>)}</div></div><div className="rounded-2xl border border-primary/25 bg-primary/[0.035] p-4"><div className="mb-3 flex items-center justify-between"><div><div className="flex items-center gap-2 text-sm font-semibold"><Trophy className="size-4 text-gold" /> {group} overall result</div><p className="mt-1 text-xs text-muted-foreground">Cumulative placement + elimination points after {groupMatches.length} published matches</p></div><Badge className="border-primary/30 bg-primary/10 text-primary"><CheckCircle2 className="mr-1 size-3" /> Published</Badge></div><div className="overflow-x-auto"><table className="w-full min-w-[520px] text-left text-sm"><thead className="text-[10px] uppercase tracking-wider text-muted-foreground"><tr><th className="px-3 py-2">Rank</th><th className="px-3 py-2">Team</th><th className="px-3 py-2">Matches</th><th className="px-3 py-2">Placement</th><th className="px-3 py-2">Elims</th><th className="px-3 py-2">Total</th><th className="px-3 py-2">Status</th></tr></thead><tbody>{teams.slice(0, teams.length).map((team, index) => <tr key={team} className="border-t border-border/50"><td className="px-3 py-2 font-display font-bold">#{index + 1}</td><td className="px-3 py-2"><TeamName name={team} /></td><td className="px-3 py-2 text-muted-foreground">{groupMatches.length}</td><td className="px-3 py-2 text-muted-foreground">{Math.max(10, 42 - index * 4)}</td><td className="px-3 py-2 text-muted-foreground">{Math.max(4, 26 - index * 2)}</td><td className="px-3 py-2 font-display font-bold text-primary">{scores[index]}</td><td className="px-3 py-2">{index < cutoff ? <Badge className="border-primary/30 bg-primary/10 text-primary"><CheckCircle2 className="mr-1 size-3" /> Qualified</Badge> : index < cutoff + 3 ? <Badge variant="gold">In contention</Badge> : <Badge variant="outline">Not qualified</Badge>}</td></tr>)}</tbody></table></div></div>
              </>
            )}
          </div>
        )}
        <div className="mt-5 rounded-2xl border border-border/70 bg-secondary/20 p-4"><div className="flex flex-wrap items-center justify-between gap-3"><div><div className="flex items-center gap-2 text-sm font-semibold"><Layers3 className="size-4 text-primary" /> Qualification bracket</div><p className="mt-1 text-xs text-muted-foreground">Switch between stage, group and individual match brackets</p></div><div className="flex gap-1 rounded-xl bg-background/40 p-1">{(['stage', 'group', 'match'] as const).map((view) => <button key={view} type="button" onClick={() => setBracketView(view)} className={cn('rounded-lg px-3 py-1.5 text-[11px] font-semibold capitalize', bracketView === view ? 'bg-primary text-primary-foreground' : 'text-muted-foreground')}>{view}</button>)}</div></div><div className="mt-4 rounded-2xl border border-primary/20 bg-background/20 p-4"><div className="mb-3 flex items-center justify-between"><div><div className="flex items-center gap-2 text-sm font-semibold"><Users className="size-4 text-primary" /> {group} team qualification bracket</div><p className="mt-1 text-xs text-muted-foreground">All {teams.length} teams · Top {cutoff} advance to the next stage</p></div><Badge variant="outline">Lobby bracket</Badge></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{teams.slice(0, teams.length).map((team, index) => <div key={team} className={cn('relative rounded-xl border bg-background/70 p-3 shadow-lg', index < cutoff ? 'border-primary/35' : 'border-border/60')}><div className="flex items-center justify-between"><span className="text-xs font-bold text-muted-foreground">#{index + 1}</span>{index < cutoff ? <Badge className="border-primary/30 bg-primary/10 text-[10px] text-primary"><CheckCircle2 className="mr-1 size-3" /> Qualified</Badge> : <Badge variant="outline" className="text-[10px]">Not qualified</Badge>}</div><div className="mt-2"><TeamName name={team} /></div><div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground"><span>{scores[index]} pts</span><span>{index < cutoff ? '→ Next stage' : 'Eliminated'}</span></div>{index < 5 && <span className="pointer-events-none absolute -right-3 top-1/2 hidden h-px w-3 bg-primary/30 lg:block" />}</div>)}</div></div><div className="relative mt-4 flex flex-wrap items-center gap-2 text-xs before:absolute before:left-4 before:right-4 before:top-1/2 before:-z-0 before:hidden before:h-px before:bg-primary/25 md:before:block">{bracketView === 'stage' && stages.map((item, index) => <div key={item.id} className={cn('relative z-10 flex items-center gap-2 rounded-xl border bg-background/90 px-3 py-2 shadow-lg', item.id === stage ? 'border-primary/50 bg-primary/10 text-primary' : 'border-border/60 text-muted-foreground')}><span className="font-bold">{index + 1}</span>{item.label.split(' · ')[1]}{index < stages.length - 1 && <ChevronRight className="size-3" />}</div>)}{bracketView === 'group' && groupNames.map((name) => <button key={name} type="button" onClick={() => setGroup(name)} className={cn('relative z-10 rounded-xl border bg-background/90 px-3 py-2 shadow-lg', group === name ? 'border-primary/50 bg-primary/10 text-primary' : 'border-border/60 text-muted-foreground')}>{name} → Top {cutoff}</button>)}{bracketView === 'match' && groupMatches.map((match) => <button key={match.match} type="button" onClick={() => setSelectedMatch(match.match)} className={cn('relative z-10 rounded-xl border bg-background/90 px-3 py-2 shadow-lg', selectedMatch === match.match ? 'border-primary/50 bg-primary/10 text-primary' : 'border-border/60 text-muted-foreground')}>{match.match} → Overall</button>)}</div></div>

        <div className="mt-5 rounded-2xl border border-border/70 bg-secondary/20 p-4"><div className="flex items-center justify-between"><div><div className="flex items-center gap-2 text-sm font-semibold"><Trophy className="size-4 text-gold" /> Prize distribution schedule</div><p className="mt-1 text-xs text-muted-foreground">$250,000 PUBG Mobile Global Cup · paid after final verification</p></div><Badge variant="gold">Guaranteed pool</Badge></div><div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">{[['Champion', '$100,000'], ['Runner-up', '$55,000'], ['3rd Place', '$35,000'], ['4th–8th', '$12,000 each']].map(([place, amount]) => <div key={place} className="rounded-xl border border-border/60 bg-background/25 p-3"><div className="text-xs text-muted-foreground">{place}</div><div className="mt-1 font-display text-lg font-bold text-gold">{amount}</div><div className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground"><Clock3 className="size-3" /> After results lock</div></div>)}</div></div>
      </div>

      {!compact && <div className="flex items-center gap-2 text-xs text-muted-foreground"><Users className="size-4" /> Each lobby hosts 22–25 squads. Qualified teams are reseeded into the next stage.</div>}
    </div>
  )
}
