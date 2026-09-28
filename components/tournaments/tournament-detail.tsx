'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Calendar,
  MapPin,
  Users,
  Trophy,
  Building2,
  Share2,
  Bell,
  Clock,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { StatusBadge } from '@/components/esports/status-badge'
import { GameTag } from '@/components/esports/game-tag'
import { TeamLogo } from '@/components/esports/team-logo'
import { Bracket } from '@/components/esports/bracket'
import { PubgStageView } from '@/components/tournaments/pubg-stage-view'
import { ScoringSystem } from '@/components/tournaments/scoring-system'
import {
  formatMoney,
  formatCompact,
  teams,
  gameMap,
  type Tournament,
} from '@/lib/data'

const tabs = ['Overview', 'Bracket', 'Stages', 'Schedule', 'Teams', 'Scoring', 'Rules'] as const
type Tab = (typeof tabs)[number]

const prizeSplit = [
  { place: '1st', pct: 0.45 },
  { place: '2nd', pct: 0.22 },
  { place: '3rd', pct: 0.13 },
  { place: '4th', pct: 0.08 },
  { place: '5-6th', pct: 0.05 },
  { place: '7-8th', pct: 0.035 },
]

export function TournamentDetail({ t }: { t: Tournament }) {
  const [tab, setTab] = useState<Tab>('Overview')
  const participants = teams
    .filter((team) => team.game === t.game)
    .concat(teams.filter((team) => team.game !== t.game))
    .slice(0, t.teams > 16 ? 16 : t.teams)

  return (
    <div>
      {/* Header */}
      <div className="relative">
        <div className="relative h-64 overflow-hidden sm:h-80">
          <Image
            src={t.banner || '/placeholder.svg'}
            alt={t.name}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
          <div className="absolute inset-0 bg-grid opacity-30" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="relative -mt-28 pb-6">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={t.status} />
              <Badge variant="gold">TIER {t.tier}</Badge>
              <GameTag game={t.game} />
            </div>
            <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="max-w-3xl font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
                  {t.name}
                </h1>
                <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Building2 className="size-4" />
                    {t.organizer}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-4" />
                    {t.region}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-4" />
                    Last updated · 2 min ago
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="size-4" />
                    {new Date(t.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    {' – '}
                    {new Date(t.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="icon-lg" aria-label="Share">
                  <Share2 className="size-4" />
                </Button>
                <Button variant="outline" size="lg" className="h-9">
                  <Bell className="size-4" />
                  Follow
                </Button>
                {t.status === 'registration' ? (
                  <Button size="lg" className="h-9 glow-primary" render={<Link href="/register" />}>
                    Register Now
                  </Button>
                ) : t.status === 'live' ? (
                  <Button size="lg" className="h-9 glow-live bg-live text-live-foreground [a]:hover:bg-live/90" render={<Link href="/matches/nova-semifinal-1" />}>
                    Watch Live
                  </Button>
                ) : (
                  <Button size="lg" className="h-9" onClick={() => setTab('Bracket')}>
                    View Bracket
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="border-y border-border bg-surface/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-border px-4 sm:grid-cols-4 sm:px-6">
          {[
            { icon: Trophy, label: 'Prize Pool', value: formatMoney(t.prizePool, t.currency), accent: true },
            { icon: Users, label: 'Teams', value: `${t.teams} / ${t.maxTeams}` },
            { icon: Clock, label: 'Format', value: t.format },
            { icon: MapPin, label: 'Region', value: t.region },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3 px-3 py-5 sm:px-6">
              <span className={cn('grid size-9 place-items-center rounded-lg', s.accent ? 'bg-primary/15 text-primary' : 'bg-secondary text-muted-foreground')}>
                <s.icon className="size-4.5" />
              </span>
              <div>
                <div className={cn('font-display text-lg font-bold', s.accent && 'text-primary')}>
                  {s.value}
                </div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-16 z-30 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 sm:px-6 scrollbar-hide">
          {tabs.filter((tb) => tb !== 'Bracket' || t.game !== 'pubg-mobile').filter((tb) => tb !== 'Stages' || t.game === 'pubg-mobile').map((tb) => (
            <button
              key={tb}
              onClick={() => setTab(tb)}
              className={cn(
                'relative shrink-0 px-4 py-3.5 text-sm font-medium transition-colors',
                tab === tb ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {tb}
              {tab === tb && (
                <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        {tab === 'Scoring' ? (
          <ScoringSystem game={t.game} />
        ) : tab === 'Schedule' && t.game === 'pubg-mobile' ? (
          <section className="space-y-5">
            <div><Badge variant="gold">Tournament schedule</Badge><h2 className="mt-2 font-display text-3xl font-bold">PUBG Mobile Global Cup 2026</h2><p className="mt-1 text-muted-foreground">Stage-by-stage match dates, group lobbies, maps and qualification slots.</p></div>
            <div className="grid gap-4 md:grid-cols-2">{[
              { name: 'Stage 1 · Qualifiers', date: 'Nov 14–16, 2026', groups: 'Groups A–D · 24 teams each', matches: '5 matches per group', maps: 'Erangel · Miramar · Sanhok', qualify: 'Top 6 from each group' },
              { name: 'Stage 2 · Group Stage', date: 'Nov 18–19, 2026', groups: 'Groups A–D · 6 teams each', matches: '6 matches per group', maps: 'Erangel · Miramar · Sanhok', qualify: 'Top 5 from each group' },
              { name: 'Stage 3 · Survival', date: 'Nov 20, 2026', groups: '1 lobby · 20 teams', matches: '8 matches', maps: 'Erangel · Miramar · Sanhok', qualify: 'Top 8 to Grand Finals' },
              { name: 'Stage 4 · Grand Finals', date: 'Nov 21–22, 2026', groups: '1 lobby · 16 teams', matches: '12 matches', maps: 'Erangel · Miramar · Sanhok', qualify: 'Champion decided by total points' },
            ].map((item, index) => <article key={item.name} className="glass rounded-2xl p-5"><div className="flex items-start justify-between gap-3"><div><div className="text-xs font-bold uppercase tracking-wider text-primary">Stage {index + 1}</div><h3 className="mt-1 font-display text-xl font-bold">{item.name.split(' · ')[1]}</h3></div><Badge variant="outline">{item.date}</Badge></div><div className="mt-5 grid gap-3 text-sm sm:grid-cols-2"><div><div className="text-xs text-muted-foreground">Groups / lobby</div><div className="mt-1 font-medium">{item.groups}</div></div><div><div className="text-xs text-muted-foreground">Matches</div><div className="mt-1 font-medium">{item.matches}</div></div><div><div className="text-xs text-muted-foreground">Maps</div><div className="mt-1 font-medium">{item.maps}</div></div><div><div className="text-xs text-muted-foreground">Qualification</div><div className="mt-1 font-medium text-primary">{item.qualify}</div></div></div></article>)}</div>
          </section>
        ) : tab === 'Overview' && (
          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-8">
              <section>
                <h2 className="mb-3 font-display text-xl font-bold">About</h2>
                <p className="leading-relaxed text-muted-foreground text-pretty">
                  {t.description}
                </p>
              </section>

              <section>
                <h2 className="mb-3 font-display text-xl font-bold">Format</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { k: 'Structure', v: t.format },
                    { k: 'Teams', v: `${t.maxTeams} slots` },
                    { k: 'Match Type', v: t.game === 'pubg-mobile' ? 'Battle Royale · Points' : 'Best of 3 (Finals Bo5)' },
                    ...(t.game === 'pubg-mobile' ? [{ k: 'Maps', v: 'Erangel · Miramar · Sanhok' }] : []),
                    { k: 'Check-in', v: '60 minutes before start' },
                  ].map((row) => (
                    <div key={row.k} className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3">
                      <span className="text-sm text-muted-foreground">{row.k}</span>
                      <span className="text-sm font-semibold">{row.v}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="mb-3 font-display text-xl font-bold">Schedule</h2>
                <div className="overflow-hidden rounded-lg border border-border">
                  {(t.game === 'pubg-mobile' ? [
                    { stage: 'Stage 1 · Qualifiers', date: 'Nov 14 – 16', done: false },
                    { stage: 'Stage 2 · Group Stage', date: 'Nov 18 – 19', done: false },
                    { stage: 'Stage 3 · Survival', date: 'Nov 20', done: false },
                    { stage: 'Stage 4 · Grand Finals', date: 'Nov 21 – 22', done: false },
                  ] : [
                    { stage: 'Round of 16', date: 'Sep 1 – 4', done: true },
                    { stage: 'Quarter Finals', date: 'Sep 7 – 8', done: true },
                    { stage: 'Semi Finals', date: 'Sep 11', done: false },
                    { stage: 'Grand Final', date: 'Sep 14', done: false },
                  ]).map((row, i) => (
                    <div
                      key={row.stage}
                      className={cn(
                        'flex items-center justify-between px-4 py-3',
                        i % 2 === 0 ? 'bg-card' : 'bg-surface/40',
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className={cn('size-2 rounded-full', row.done ? 'bg-primary' : 'bg-muted-foreground/40')} />
                        <span className="text-sm font-medium">{row.stage}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{row.date}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <aside className="space-y-6">
              <div className="rounded-lg border border-border bg-card p-5">
                <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider">
                  Prize Distribution
                </h3>
                <div className="space-y-2.5">
                  {prizeSplit.map((p, i) => (
                    <div key={p.place} className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm">
                        <span className={cn('grid size-6 place-items-center rounded text-[10px] font-bold', i === 0 ? 'bg-gold/20 text-gold' : i === 1 ? 'bg-silver/20 text-silver' : i === 2 ? 'bg-bronze/20 text-bronze' : 'bg-secondary text-muted-foreground')}>
                          {p.place.replace('th', '').replace('st', '').replace('nd', '').replace('rd', '')}
                        </span>
                        {p.place}
                      </span>
                      <span className="font-display text-sm font-bold tabular-nums">
                        {formatMoney(Math.round(t.prizePool * p.pct))}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-border bg-card p-5">
                <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider">
                  Organizer
                </h3>
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-lg bg-primary/15 text-primary">
                    <Building2 className="size-5" />
                  </span>
                  <div>
                    <div className="font-semibold">{t.organizer}</div>
                    <div className="text-xs text-muted-foreground">
                      Verified Organizer
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}

        {tab === 'Stages' && t.game === 'pubg-mobile' && <PubgStageView />}

        {tab === 'Bracket' && t.game !== 'pubg-mobile' && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl font-bold">Playoff Bracket</h2>
                <p className="text-sm text-muted-foreground">
                  Single-elimination · Round of 16 to Grand Final
                </p>
              </div>
              <Button variant="outline" size="lg" className="h-9" render={<Link href={`/tournaments/${t.id}/bracket`} />}>
                Full screen
              </Button>
            </div>
            <Bracket />
          </div>
        )}

        {tab === 'Teams' && (
          <div>
            <h2 className="mb-6 font-display text-xl font-bold">
              Participating Teams
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                {participants.length} teams
              </span>
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {participants.map((team, i) => (
                <Link
                  key={team.id + i}
                  href={`/teams/${team.id}`}
                  className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:border-primary/40"
                >
                  <span className="w-6 text-center font-display text-sm font-bold text-muted-foreground">
                    {i + 1}
                  </span>
                  <TeamLogo tag={team.tag} game={team.game} size="md" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-semibold">{team.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {team.region} · {formatCompact(team.followers)} followers
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {tab === 'Rules' && (
          <div className="max-w-3xl space-y-6">
            <h2 className="font-display text-xl font-bold">Rules & Eligibility</h2>
            {[
              { h: 'Eligibility', b: `Open to verified ${gameMap[t.game].name} competitors in the ${t.region} region. All players must have a complete, verified competitor profile.` },
              { h: 'Conduct', b: 'Toxicity, cheating, and account sharing result in immediate disqualification. All matches are monitored by tournament admins.' },
              { h: 'Match Rules', b: 'Matches are best-of-three; the Grand Final is best-of-five. Teams must check in 60 minutes before their scheduled match time.' },
              { h: 'Disputes', b: 'All disputes must be reported to a tournament admin within 15 minutes of match completion, accompanied by supporting evidence.' },
            ].map((r) => (
              <div key={r.h} className="rounded-lg border border-border bg-card p-5">
                <h3 className="mb-2 font-display font-bold">{r.h}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{r.b}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
