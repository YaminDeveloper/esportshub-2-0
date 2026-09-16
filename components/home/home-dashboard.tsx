'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CalendarDays, ChevronRight, Eye, Gamepad2, Play, Trophy, Users } from 'lucide-react'
import { tournaments, teams, players, games, gameMap, formatMoney } from '@/lib/data'
import { TeamLogo } from '@/components/esports/team-logo'
import { PlayerAvatar } from '@/components/esports/player-avatar'
import { StatusBadge } from '@/components/esports/status-badge'

const gameArt: Record<string, string> = {
  pubg: '/game-tiles.png',
  'mobile-legends': '/game-tiles.png',
  valorant: '/game-tiles.png',
  'free-fire': '/game-tiles.png',
  'call-of-duty': '/game-tiles.png',
  efootball: '/game-tiles.png',
}

const liveRows = [
  { game: 'PUBG MOBILE', teams: 'DRS  VS  VPE', meta: 'Miramar · Grand Finals', viewers: '24.5K', a: 'DRS', b: 'VPE' },
  { game: 'VALORANT', teams: 'TL  VS  FNC', meta: 'Ascent · Group Stage', viewers: '12.1K', a: 'TL', b: 'FNC' },
  { game: 'MOBILE LEGENDS', teams: 'RRQ  VS  ONIC', meta: 'Game 3 · Playoffs', viewers: '8.7K', a: 'RRQ', b: 'ONIC' },
]

export function HomeDashboard() {
  const featured = tournaments.find((t) => t.status === 'live') ?? tournaments[0]
  const upcoming = tournaments.filter((t) => t.status === 'upcoming' || t.status === 'registration').slice(0, 3)
  const topPlayers = players.slice(0, 5)

  return (
    <div className="space-y-4 p-3 sm:p-5 lg:p-7">
      <section className="relative min-h-[420px] overflow-hidden rounded-3xl border border-primary/25 bg-[#0b1028] shadow-[0_25px_90px_-35px_oklch(0.72_0.17_300_/_70%)]">
        <Image src="/esports-globe.png" alt="Holographic esports globe" fill priority className="object-cover object-center opacity-80" sizes="(max-width: 1024px) 100vw, 75vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080b19] via-[#080b19]/65 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080b19] via-transparent to-transparent" />
        <div className="relative flex min-h-[420px] flex-col justify-end p-6 sm:p-10 lg:max-w-xl lg:justify-center">
          <p className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.35em] text-primary">EsportsHub 2.0</p>
          <h1 className="max-w-lg font-display text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em] sm:text-7xl">One Global<br /><span className="text-gradient">Community</span></h1>
          <p className="mt-5 max-w-md text-sm leading-6 text-slate-300">Join millions of gamers, teams and organizers in the next era of esports.</p>
          <div className="mt-6 flex flex-wrap gap-3"><Link href="/register" className="flex min-h-11 items-center rounded-xl bg-gradient-to-r from-fuchsia-500 to-primary px-5 text-sm font-semibold text-white shadow-[0_0_30px_-8px_oklch(0.82_0.16_195)]">Join Now <ArrowRight className="ml-2 size-4" /></Link><Link href="/tournaments" className="flex min-h-11 items-center rounded-xl border border-white/20 bg-white/5 px-5 text-sm font-semibold backdrop-blur-xl"><Play className="mr-2 size-4" /> Watch Intro</Link></div>
          <div className="mt-8 grid max-w-md grid-cols-4 gap-3 border-t border-white/15 pt-4"><Stat value="250K+" label="Players" /><Stat value="12K+" label="Tournaments" /><Stat value="150+" label="Countries" /><Stat value="1M+" label="Community Members" /></div>
        </div>
        <div className="absolute right-5 top-5 hidden w-52 rounded-2xl border border-primary/35 bg-[#081127]/65 p-4 backdrop-blur-xl xl:block"><p className="font-display text-sm font-bold uppercase">7 Regions. One Community.</p>{['NA  North America','SA  South America','EU  Europe','MENA  Middle East','AFRICA  Africa','ASIA  Asia','SEA  Southeast Asia'].map((r) => <p key={r} className="mt-3 text-[10px] text-muted-foreground"><span className="mr-2 text-primary">◆</span>{r}</p>)}</div>
      </section>

      <section className="scrollbar-hide flex gap-3 overflow-x-auto pb-1">
        {games.slice(0, 6).map((game, index) => <Link key={game.id} href={`/tournaments?game=${game.id}`} className="glass glass-hover relative min-w-[154px] overflow-hidden rounded-2xl p-3 sm:min-w-[180px]"><Image src={gameArt[game.id] || '/game-tiles.png'} alt="" width={180} height={90} className="absolute inset-0 size-full object-cover opacity-35" style={{ objectPosition: `${index * 17}% center` }} /><div className="relative flex min-h-16 flex-col justify-end"><Gamepad2 className="mb-2 size-5 text-primary" /><p className="font-display text-sm font-bold">{game.name}</p><p className="text-[10px] text-muted-foreground">Tournaments</p></div></Link>)}<Link href="/tournaments" className="glass glass-hover flex min-w-[154px] items-center justify-center rounded-2xl text-sm font-semibold text-primary sm:min-w-[180px]">More Games <ChevronRight className="ml-1 size-4" /></Link>
      </section>

      <div className="grid gap-4 xl:grid-cols-[1.05fr_1.15fr_0.85fr]">
        <GlassSection title="Live Matches" action="View All" href="/tournaments"><div className="space-y-2">{liveRows.map((row) => <Link href="/matches/nova-semifinal-1" key={row.teams} className="glass-hover flex items-center gap-3 rounded-xl border border-white/8 bg-white/[.03] p-2.5"><div className="grid size-12 place-items-center rounded-lg bg-gradient-to-br from-slate-700 to-slate-950 text-[9px] font-bold text-primary">{row.a}</div><div className="min-w-0 flex-1"><p className="text-[9px] uppercase tracking-wider text-muted-foreground">{row.game}</p><p className="truncate font-display font-bold">{row.teams}</p><p className="text-[10px] text-muted-foreground">{row.meta}</p></div><div className="text-right"><StatusBadge status="live" /><p className="mt-2 flex items-center gap-1 text-[10px] text-muted-foreground"><Eye className="size-3 text-live" />{row.viewers}</p></div></Link>)}</div></GlassSection>
        <GlassSection title="Upcoming Tournaments" action="View All" href="/tournaments"><div className="space-y-2">{upcoming.map((t) => <Link href={`/tournaments/${t.id}`} key={t.id} className="glass-hover flex items-center gap-3 rounded-xl border border-white/8 bg-white/[.03] p-2.5"><Image src={t.banner || '/placeholder.svg'} alt="" width={72} height={56} className="h-14 w-16 rounded-lg object-cover" /><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{t.name}</p><p className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground"><CalendarDays className="size-3" />{t.startDate} · {t.region}</p></div><div className="text-right"><p className="font-display text-sm font-bold text-gold">{formatMoney(t.prizePool)}</p><span className="mt-2 inline-flex rounded-lg border border-primary/30 px-2 py-1 text-[10px] text-primary">Register <ArrowRight className="ml-1 size-3" /></span></div></Link>)}</div></GlassSection>
        <GlassSection title="Global Leaderboard"><div className="mb-3 flex rounded-lg bg-white/5 p-1 text-xs"><span className="flex-1 rounded-md bg-accent/70 px-2 py-2 text-center text-white">Players</span><span className="flex-1 px-2 py-2 text-center text-muted-foreground">Teams</span><span className="flex-1 px-2 py-2 text-center text-muted-foreground">Countries</span></div>{topPlayers.map((p, i) => <Link href={`/players/${p.id}`} key={p.id} className="flex items-center gap-2 border-b border-white/8 py-2 last:border-0"><span className={`w-5 text-center text-xs font-bold ${i === 0 ? 'text-gold' : 'text-muted-foreground'}`}>#{i + 1}</span><PlayerAvatar handle={p.handle} size="sm" /><span className="min-w-0 flex-1 truncate text-xs font-semibold">{p.handle}</span><span className="text-[10px] text-muted-foreground">{(12500 - i * 680).toLocaleString()} pts</span></Link>)}</GlassSection>
      </div>

      <section className="relative overflow-hidden rounded-3xl border border-primary/25"><Image src="/community-arena.png" alt="Esports arena community event" width={1400} height={350} className="h-40 w-full object-cover sm:h-52" /><div className="absolute inset-0 bg-gradient-to-r from-background via-background/35 to-transparent" /><div className="absolute inset-y-0 left-5 flex flex-col justify-center sm:left-10"><p className="font-display text-2xl font-black uppercase sm:text-4xl">EsportsHub</p><p className="text-xs uppercase tracking-[0.3em] text-primary">More than a game</p></div><Link href="/recruitment" className="absolute bottom-4 right-4 grid size-10 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg"><Play className="size-4 fill-current" /></Link></section>
    </div>
  )
}

function Stat({ value, label }: { value: string; label: string }) { return <div><p className="font-display text-lg font-bold sm:text-xl">{value}</p><p className="text-[9px] text-muted-foreground">{label}</p></div> }
function GlassSection({ title, action, href, children }: { title: string; action?: string; href?: string; children: React.ReactNode }) { return <section className="glass rounded-2xl p-3 sm:p-4"><div className="mb-3 flex items-center justify-between"><h2 className="font-display text-lg font-bold">{title}</h2>{action && href ? <Link href={href} className="flex items-center text-[10px] text-primary">{action}<ArrowRight className="ml-1 size-3" /></Link> : <button className="rounded-lg border border-white/10 px-2 py-1 text-[10px] text-muted-foreground">This Season⌄</button>}</div>{children}</section> }
