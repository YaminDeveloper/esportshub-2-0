'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Bell, ChevronRight, Clock3, Eye, Radio, Swords, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TeamLogo } from '@/components/esports/team-logo'

const rounds = [
  { label: 'Round 1', a: 3, b: 1, winner: 'Vortex' },
  { label: 'Round 2', a: 2, b: 3, winner: 'Crimson Wolves' },
  { label: 'Round 3', a: 3, b: 2, winner: 'Vortex' },
]

export function LiveMatchView() {
  const [scores, setScores] = useState({ a: 2, b: 1 })
  const [following, setFollowing] = useState(false)

  return (
    <main className="min-h-screen bg-background">
      <div className="border-b border-border bg-card/50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/tournaments/nova-masters-2026" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" /> Back to tournament
          </Link>
          <div className="flex items-center gap-2 text-xs text-muted-foreground"><Eye className="size-4" /> 12,842 watching</div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2"><Badge className="bg-primary/15 text-primary">LIVE NOW</Badge><span className="text-sm text-muted-foreground">Nova Masters 2026 · Semifinal 1</span></div>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-5xl">Vortex <span className="text-muted-foreground">vs</span> Crimson Wolves</h1>
          </div>
          <Button variant={following ? 'default' : 'outline'} onClick={() => setFollowing((value) => !value)}><Bell className="size-4" /> {following ? 'Following' : 'Follow match'}</Button>
        </div>

        <section className="mt-8 overflow-hidden rounded-xl border border-primary/30 bg-card shadow-2xl shadow-primary/5">
          <div className="grid items-center gap-6 p-6 sm:grid-cols-[1fr_auto_1fr] sm:p-10">
            <div className="flex items-center gap-4 sm:flex-col sm:justify-center"><TeamLogo name="Vortex" size="lg" /><div className="text-left sm:text-center"><p className="font-display text-xl font-bold">Vortex</p><p className="text-xs uppercase tracking-wider text-primary">#1 seed · 2 maps</p></div></div>
            <div className="text-center"><div className="font-display text-6xl font-bold tracking-tight"><span className="text-primary">{scores.a}</span><span className="mx-3 text-muted-foreground">:</span>{scores.b}</div><div className="mt-2 flex items-center justify-center gap-2 text-xs text-muted-foreground"><Radio className="size-3 text-primary" /> Map 3 · Haven</div></div>
            <div className="flex flex-row-reverse items-center gap-4 sm:flex-col"><TeamLogo name="Crimson Wolves" size="lg" /><div className="text-right sm:text-center"><p className="font-display text-xl font-bold">Crimson Wolves</p><p className="text-xs uppercase tracking-wider text-muted-foreground">#4 seed · 1 map</p></div></div>
          </div>
          <div className="grid grid-cols-3 divide-x divide-border border-t border-border bg-background/40 text-center text-xs"><div className="p-3"><p className="text-muted-foreground">Series</p><p className="mt-1 font-semibold">Best of 5</p></div><div className="p-3"><p className="text-muted-foreground">Elapsed</p><p className="mt-1 font-semibold">42:18</p></div><div className="p-3"><p className="text-muted-foreground">Prize pool</p><p className="mt-1 font-semibold">$150,000</p></div></div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <section className="rounded-xl border border-border bg-card p-5"><div className="flex items-center justify-between"><h2 className="font-display text-lg font-bold">Map history</h2><span className="text-xs text-muted-foreground">First to 3 maps</span></div><div className="mt-4 space-y-3">{rounds.map((round) => <div key={round.label} className="flex items-center justify-between rounded-lg border border-border bg-background/40 px-4 py-3"><div className="flex items-center gap-3"><span className="w-16 text-xs text-muted-foreground">{round.label}</span><span className="font-medium">Haven</span></div><div className="flex items-center gap-5 font-display font-bold"><span className={round.winner === 'Vortex' ? 'text-primary' : ''}>{round.a}</span><span className="text-muted-foreground">:</span><span className={round.winner === 'Crimson Wolves' ? 'text-primary' : ''}>{round.b}</span><ChevronRight className="size-4 text-muted-foreground" /></div></div>)}</div></section>
          <section className="rounded-xl border border-border bg-card p-5"><h2 className="font-display text-lg font-bold">Match controls</h2><p className="mt-1 text-sm text-muted-foreground">Demo organizer controls for the live feed.</p><div className="mt-5 grid grid-cols-2 gap-3"><Button variant="outline" onClick={() => setScores((value) => ({ ...value, a: value.a + 1 }))}>Vortex +1</Button><Button variant="outline" onClick={() => setScores((value) => ({ ...value, b: value.b + 1 }))}>Wolves +1</Button></div><Button className="mt-3 w-full" onClick={() => setScores({ a: 0, b: 0 })}><Swords className="size-4" /> Reset map</Button></section>
        </div>

        <section className="mt-6 rounded-xl border border-border bg-card p-5"><div className="flex items-center gap-2"><Trophy className="size-4 text-primary" /><h2 className="font-display text-lg font-bold">Series timeline</h2><Clock3 className="ml-auto size-4 text-muted-foreground" /></div><div className="mt-5 flex flex-wrap gap-3 text-sm"><span className="rounded-md bg-primary/10 px-3 py-2 text-primary">Vortex won Map 1</span><span className="rounded-md bg-muted px-3 py-2 text-muted-foreground">Crimson Wolves won Map 2</span><span className="rounded-md bg-primary/10 px-3 py-2 text-primary">Vortex won Map 3</span><span className="rounded-md border border-primary/40 px-3 py-2 text-primary">Map 4 upcoming</span></div></section>
      </div>
    </main>
  )
}
