import { Crosshair, Flame, Gamepad2, Trophy } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { TeamLogo } from '@/components/esports/team-logo'

const placements = [15, 12, 10, 8, 6, 4, 3, 2, 1, 1, 0, 0, 0, 0, 0, 0]

export function ScoringSystem({ game = 'pubg-mobile' }: { game?: string }) {
  const isPubg = game === 'pubg-mobile'
  return (
    <section className="space-y-5">
      <div>
        <Badge variant="gold">Official tournament rules</Badge>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight">PUBG Mobile (Global) scoring</h2>
        <p className="mt-1 text-muted-foreground">Organizer-configured scoring system for this tournament. Public viewers can review the rules but cannot edit them.</p>
      </div>
      <div className="glass flex items-center gap-4 rounded-2xl border-primary/30 p-4 sm:p-5"><TeamLogo tag="PUBG" game="pubg-mobile" size="lg" /><div><div className="flex flex-wrap items-center gap-2"><h3 className="font-semibold">PUBG Mobile (Global)</h3><Badge className="border-primary/30 bg-primary/10 text-primary">Organizer configured</Badge></div><p className="mt-1 text-xs text-muted-foreground">Placement + elimination points · applied to every published match result</p></div></div>
      <div className="grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
        <div className="glass rounded-2xl p-5"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-live/10 text-live"><Flame className="size-5" /></span><div><h3 className="font-semibold">Elimination points</h3><p className="text-xs text-muted-foreground">Every confirmed elimination</p></div></div><div className="mt-6 flex items-end justify-between rounded-xl bg-secondary/45 p-4"><span className="text-sm text-muted-foreground">Kill points</span><span className="font-display text-4xl font-bold text-primary">1</span><span className="text-xs text-muted-foreground">per kill</span></div><p className="mt-3 text-xs leading-relaxed text-muted-foreground">Eliminations are added to the placement score after each published match result.</p></div>
        <div className="glass rounded-2xl p-5"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-gold/10 text-gold"><Trophy className="size-5" /></span><div><h3 className="font-semibold">Position points</h3><p className="text-xs text-muted-foreground">Official PUBG Global placement table · #1–#60 supported by organizer configuration</p></div></div><div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6">{placements.map((points, index) => <div key={index} className="flex items-center justify-between rounded-lg border border-border/60 bg-background/20 px-3 py-2 text-sm"><span className="text-muted-foreground">#{index + 1}</span><span className="font-display font-bold">{points}</span></div>)}</div><p className="mt-4 text-xs text-muted-foreground">Showing the configured positions for this tournament. Additional positions up to #60 are preserved in the organizer settings.</p></div>
      </div>
      <div className="glass rounded-2xl p-5"><div className="flex items-center gap-3"><Crosshair className="size-5 text-primary" /><h3 className="font-semibold">How the total is calculated</h3></div><div className="mt-4 grid gap-3 md:grid-cols-3"><div className="rounded-xl border border-border/60 bg-background/20 p-4"><div className="text-xs text-muted-foreground">Placement points</div><div className="mt-1 font-display text-2xl font-bold">15</div><div className="text-xs text-muted-foreground">for 1st place</div></div><div className="rounded-xl border border-border/60 bg-background/20 p-4"><div className="text-xs text-muted-foreground">Elimination points</div><div className="mt-1 font-display text-2xl font-bold">1 × kills</div><div className="text-xs text-muted-foreground">confirmed finishes</div></div><div className="rounded-xl border border-primary/30 bg-primary/10 p-4"><div className="text-xs text-muted-foreground">Match total</div><div className="mt-1 font-display text-2xl font-bold text-primary">Placement + kills</div><div className="text-xs text-muted-foreground">cumulative overall score</div></div></div></div>
      {!isPubg && <div className="rounded-xl border border-gold/30 bg-gold/5 p-4 text-sm text-gold">This tournament is currently using the PUBG Mobile Global scoring preset.</div>}
    </section>
  )
}
