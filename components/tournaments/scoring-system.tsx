"use client"

import { useState } from 'react'
import { Check, Crosshair, Flame, Gamepad2, Trophy } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const presets = [
  { id: 'pubg-mobile', name: 'PUBG Mobile (Global)', detail: 'Placement + elimination points', accent: 'text-primary' },
  { id: 'bgmi', name: 'BGMI', detail: 'Placement + finish points', accent: 'text-gold' },
  { id: 'free-fire', name: 'Free Fire', detail: 'Booyah + kill points', accent: 'text-live' },
  { id: 'pubg-kr', name: 'PUBG KR', detail: 'Global PUBG ruleset', accent: 'text-primary' },
]

const placements = [15, 12, 10, 8, 6, 4, 3, 2, 1, 1, 0, 0, 0, 0, 0, 0]

export function ScoringSystem({ game = 'pubg-mobile' }: { game?: string }) {
  const [selected, setSelected] = useState(game)
  const preset = presets.find((item) => item.id === selected) ?? presets[0]

  return (
    <section className="space-y-5">
      <div>
        <Badge variant="gold">Tournament rules</Badge>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight">Scoring system</h2>
        <p className="mt-1 text-muted-foreground">Choose a supported game preset to see the complete points breakdown.</p>
      </div>
      <div className="glass rounded-2xl p-4 sm:p-6">
        <div className="mb-5 flex items-center gap-3"><span className="grid size-11 place-items-center rounded-2xl bg-primary/15 text-primary"><Gamepad2 className="size-6" /></span><div><div className="text-sm font-semibold">Game preset</div><div className="text-xs text-muted-foreground">Official tournament scoring templates</div></div></div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">{presets.map((item) => <button key={item.id} type="button" onClick={() => setSelected(item.id)} className={cn('rounded-xl border p-3 text-left transition-all', selected === item.id ? 'border-primary/50 bg-primary/10 shadow-[0_0_24px_-12px] shadow-primary' : 'border-border/70 bg-background/20 hover:border-primary/30')}><div className="flex items-center justify-between gap-2"><span className={cn('font-semibold', selected === item.id && item.accent)}>{item.name}</span>{selected === item.id && <Check className="size-4 text-primary" />}</div><div className="mt-1 text-xs text-muted-foreground">{item.detail}</div></button>)}</div>
      </div>
      <div className="grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
        <div className="glass rounded-2xl p-5"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-live/10 text-live"><Flame className="size-5" /></span><div><h3 className="font-semibold">Elimination points</h3><p className="text-xs text-muted-foreground">Every confirmed elimination</p></div></div><div className="mt-6 flex items-end justify-between rounded-xl bg-secondary/45 p-4"><span className="text-sm text-muted-foreground">Kill points</span><span className="font-display text-4xl font-bold text-primary">1</span><span className="text-xs text-muted-foreground">per kill</span></div><p className="mt-3 text-xs leading-relaxed text-muted-foreground">Eliminations are added to the placement score after each published match result.</p></div>
        <div className="glass rounded-2xl p-5"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-gold/10 text-gold"><Trophy className="size-5" /></span><div><h3 className="font-semibold">Position points</h3><p className="text-xs text-muted-foreground">{preset.name} placement table</p></div></div><div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">{placements.map((points, index) => <div key={index} className={cn('flex items-center justify-between rounded-lg border px-3 py-2 text-sm', index < 6 ? 'border-primary/20 bg-primary/[0.06]' : 'border-border/60 bg-background/20')}><span className="text-muted-foreground">#{index + 1}</span><span className="font-display font-bold">{points}</span></div>)}</div></div>
      </div>
      <div className="glass rounded-2xl p-5"><div className="flex items-center gap-3"><Crosshair className="size-5 text-primary" /><h3 className="font-semibold">How the total is calculated</h3></div><div className="mt-4 grid gap-3 md:grid-cols-3"><div className="rounded-xl border border-border/60 bg-background/20 p-4"><div className="text-xs text-muted-foreground">Placement points</div><div className="mt-1 font-display text-2xl font-bold">15</div><div className="text-xs text-muted-foreground">for 1st place</div></div><div className="rounded-xl border border-border/60 bg-background/20 p-4"><div className="text-xs text-muted-foreground">Elimination points</div><div className="mt-1 font-display text-2xl font-bold">1 × kills</div><div className="text-xs text-muted-foreground">confirmed finishes</div></div><div className="rounded-xl border border-primary/30 bg-primary/10 p-4"><div className="text-xs text-muted-foreground">Match total</div><div className="mt-1 font-display text-2xl font-bold text-primary">Placement + kills</div><div className="text-xs text-muted-foreground">cumulative overall score</div></div></div></div>
    </section>
  )
}
