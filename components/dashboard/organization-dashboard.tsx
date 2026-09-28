'use client'

import { useMemo, useState } from 'react'
import { Activity, ArrowUpRight, CalendarDays, ChevronDown, Crosshair, Gamepad2, Layers3, Plus, Swords, Trophy, Users, Zap } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TeamLogo } from '@/components/esports/team-logo'
import { cn } from '@/lib/utils'

type Game = { id: string; name: string; short: string; color: string }
type Mode = 'All modes' | 'Solo' | 'Duo' | 'Squad' | '1v1' | '5v5'

const games: Game[] = [
  { id: 'all', name: 'All games', short: 'ALL', color: 'bg-primary/15 text-primary' },
  { id: 'pubg', name: 'PUBG Mobile', short: 'PUBG', color: 'bg-gold/15 text-gold' },
  { id: 'bgmi', name: 'BGMI', short: 'BGMI', color: 'bg-live/15 text-live' },
  { id: 'free-fire', name: 'Free Fire', short: 'FF', color: 'bg-bronze/15 text-bronze' },
  { id: 'valorant', name: 'Valorant', short: 'VAL', color: 'bg-accent text-accent-foreground' },
]

const modes: Mode[] = ['All modes', 'Solo', 'Duo', 'Squad', '1v1', '5v5']
const events = [
  { game: 'PUBG Mobile', mode: 'Squad', title: 'Global Cup · Group A', state: 'Live', time: 'Match 4 / 6', teams: '24 teams', accent: 'text-gold' },
  { game: 'BGMI', mode: 'Duo', title: 'South Asia Duo Clash', state: 'Upcoming', time: 'Today · 20:30', teams: '32 duos', accent: 'text-live' },
  { game: 'Free Fire', mode: 'Squad', title: 'Booyah League Qualifier', state: 'Registration', time: 'Closes Oct 04', teams: '48 squads', accent: 'text-bronze' },
  { game: 'Valorant', mode: '5v5', title: 'Nightfall Series', state: 'Upcoming', time: 'Oct 08 · 18:00', teams: '16 teams', accent: 'text-primary' },
]
const roster = [
  { name: 'Razor', tag: 'RAZ', games: 'PUBG · BGMI', role: 'IGL', status: 'Online' },
  { name: 'Nova', tag: 'NVA', games: 'PUBG · Free Fire', role: 'Fragger', status: 'In match' },
  { name: 'Kairo', tag: 'KAI', games: 'Valorant · BGMI', role: 'Duelist', status: 'Online' },
  { name: 'Miko', tag: 'MKO', games: 'PUBG · Free Fire', role: 'Support', status: 'Offline' },
]

export function OrganizationDashboard() {
  const [game, setGame] = useState('all')
  const [mode, setMode] = useState<Mode>('All modes')
  const [view, setView] = useState<'overview' | 'versus'>('overview')
  const filteredEvents = useMemo(() => events.filter((event) => (game === 'all' || event.game.toLowerCase().includes(game.replace('-', ' '))) && (mode === 'All modes' || event.mode === mode)), [game, mode])

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-10">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div><div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary"><span className="size-1.5 rounded-full bg-primary" /> Organization control center</div><h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Nexus Esports</h1><p className="mt-1 text-sm text-muted-foreground">Manage every roster, game, mode and match from one competitive workspace.</p></div>
        <Button className="glow-primary"><Plus className="size-4" /> Create competition</Button>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-2 rounded-2xl border border-border bg-card/60 p-2">
        <button type="button" onClick={() => setView('overview')} className={cn('rounded-xl px-4 py-2 text-sm font-semibold', view === 'overview' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground')}>Overview</button>
        <button type="button" onClick={() => setView('versus')} className={cn('rounded-xl px-4 py-2 text-sm font-semibold', view === 'versus' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground')}><Swords className="mr-2 inline size-4" />Versus battles</button>
        <span className="mx-1 hidden h-6 w-px bg-border sm:block" />
        <div className="flex min-w-0 flex-1 gap-1 overflow-x-auto scrollbar-hide">{games.map((item) => <button key={item.id} type="button" onClick={() => setGame(item.id)} className={cn('shrink-0 rounded-xl px-3 py-2 text-xs font-semibold', game === item.id ? item.color : 'text-muted-foreground hover:bg-secondary')}><span className="mr-1.5 font-display">{item.short}</span>{item.name}</button>)}</div>
        <div className="flex items-center gap-1 rounded-xl bg-secondary/50 p-1">{modes.map((item) => <button key={item} type="button" onClick={() => setMode(item)} className={cn('hidden rounded-lg px-2 py-1.5 text-[11px] font-semibold sm:block', mode === item ? 'bg-background text-foreground shadow' : 'text-muted-foreground')}>{item}</button>)}<select aria-label="Game mode" value={mode} onChange={(event) => setMode(event.target.value as Mode)} className="rounded-lg bg-background px-2 py-1.5 text-xs sm:hidden">{modes.map((item) => <option key={item}>{item}</option>)}</select></div>
      </div>

      {view === 'versus' ? <VersusView /> : <>
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[
          { label: 'Active competitions', value: '08', delta: '+3 this month', icon: Trophy }, { label: 'Total rosters', value: '12', delta: 'Across 4 games', icon: Users }, { label: 'Matches this week', value: '34', delta: '9 live now', icon: Swords }, { label: 'Org rating', value: '2,184', delta: '+8.4% trend', icon: Zap },
        ].map((stat) => <div key={stat.label} className="glass glass-hover rounded-2xl p-4"><div className="flex items-center justify-between"><span className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary"><stat.icon className="size-4" /></span><ArrowUpRight className="size-4 text-primary" /></div><div className="mt-4 font-display text-2xl font-bold">{stat.value}</div><div className="text-xs text-muted-foreground">{stat.label}</div><div className="mt-2 text-[11px] text-primary">{stat.delta}</div></div>)}</div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_.8fr]">
          <section className="glass rounded-2xl p-5"><div className="mb-4 flex items-center justify-between"><div><h2 className="flex items-center gap-2 font-display font-bold"><Activity className="size-4 text-primary" /> Competition pipeline</h2><p className="mt-1 text-xs text-muted-foreground">{filteredEvents.length} competitions match your filters</p></div><Button variant="ghost" size="sm">View all <ChevronDown className="size-3" /></Button></div><div className="space-y-3">{filteredEvents.length ? filteredEvents.map((event) => <div key={event.title} className="flex flex-wrap items-center gap-3 rounded-xl border border-border/70 bg-background/25 p-3"><span className={cn('grid size-10 place-items-center rounded-xl font-display text-[10px] font-bold', event.accent.replace('text-', 'bg-').replace('gold', 'gold/15'))}>{event.game.slice(0, 2).toUpperCase()}</span><div className="min-w-[160px] flex-1"><div className="text-xs text-muted-foreground">{event.game} · {event.mode}</div><div className="font-semibold">{event.title}</div></div><div className="text-right"><Badge variant={event.state === 'Live' ? 'live' : 'outline'}>{event.state}</Badge><div className="mt-1 text-[11px] text-muted-foreground">{event.time} · {event.teams}</div></div></div>) : <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">No competitions match this game and mode.</div>}</div></section>
          <section className="glass rounded-2xl p-5"><div className="mb-4 flex items-center justify-between"><div><h2 className="flex items-center gap-2 font-display font-bold"><Users className="size-4 text-primary" /> Multi-game roster</h2><p className="mt-1 text-xs text-muted-foreground">Player availability across modes</p></div><Button variant="outline" size="sm">Manage</Button></div><div className="space-y-3">{roster.map((player) => <div key={player.tag} className="flex items-center gap-3"><TeamLogo tag={player.tag} game="nova-strike" size="sm" /><div className="min-w-0 flex-1"><div className="text-sm font-semibold">{player.name}</div><div className="truncate text-[11px] text-muted-foreground">{player.games} · {player.role}</div></div><span className={cn('size-2 rounded-full', player.status === 'In match' ? 'bg-live' : player.status === 'Online' ? 'bg-primary' : 'bg-muted-foreground/40')} title={player.status} /></div>)}</div></section>
        </div>
      </>}
    </div>
  )
}

function VersusView() {
  return <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]"><section className="glass rounded-2xl p-5"><div className="mb-5 flex items-center justify-between"><div><h2 className="font-display text-xl font-bold">Versus battle builder</h2><p className="mt-1 text-sm text-muted-foreground">Run solo, duo, squad and team-v-team formats for every supported game.</p></div><Badge variant="gold">Mock mode</Badge></div><div className="grid gap-3 sm:grid-cols-2">{['Solo duel', 'Duo clash', 'Squad battle', '5v5 series'].map((format, index) => <button key={format} type="button" className="rounded-2xl border border-border bg-background/25 p-4 text-left transition hover:border-primary/50 hover:bg-primary/5"><div className="mb-4 flex items-center justify-between"><span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">{index === 0 ? <Crosshair className="size-5" /> : index === 1 ? <Users className="size-5" /> : <Swords className="size-5" />}</span><ArrowUpRight className="size-4 text-muted-foreground" /></div><div className="font-semibold">{format}</div><div className="mt-1 text-xs text-muted-foreground">{index === 0 ? '1 player vs 1 player' : index === 1 ? '2 players vs 2 players' : index === 2 ? '4 players vs 4 players' : '5 players vs 5 players'}</div></button>)}</div></section><section className="glass rounded-2xl p-5"><h2 className="font-display font-bold">Mode coverage</h2><div className="mt-4 space-y-3">{[['PUBG Mobile', 'Solo · Duo · Squad'], ['BGMI', 'Solo · Duo · Squad'], ['Free Fire', 'Solo · Duo · Squad'], ['Valorant', '1v1 · 5v5']].map(([name, value]) => <div key={name} className="flex items-center justify-between rounded-xl border border-border/70 p-3"><span className="text-sm font-medium">{name}</span><span className="text-xs text-primary">{value}</span></div>)}</div></section></div>
}
