import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Play, Radio } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { tournaments, formatCompact, gameMap } from '@/lib/data'

export function Hero() {
  const live = tournaments.filter((t) => t.status === 'live')
  const featured = live[0]

  return (
    <section className="liquid-mesh relative isolate overflow-hidden border-b border-border/70">
      <Image
        src="/hero-arena.png"
        alt=""
        fill
        priority
        className="object-cover opacity-30 mix-blend-screen"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/50" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="orb absolute -left-24 top-24 -z-10 size-72 bg-primary/20 blur-3xl" />
      <div className="orb absolute right-0 top-10 -z-10 size-96 bg-accent/25 blur-3xl [animation-delay:1.5s]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,oklch(0.105_0.025_272_/_35%)_75%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-live/30 bg-live/10 px-3 py-1 text-xs font-semibold text-live">
            <Radio className="size-3.5 animate-pulse-live" />
            {live.length} tournaments live right now
          </div>

          <h1 className="font-display text-5xl font-bold leading-[0.98] tracking-[-0.04em] text-balance sm:text-6xl lg:text-8xl">
            Compete. Rank.
            <br />
            <span className="text-gradient">Dominate the arena.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted-foreground text-pretty">
            The complete esports ecosystem for players, teams, and organizers.
            Discover tournaments, follow live brackets, climb the global rankings,
            and build your competitive career.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" className="h-11 px-5 text-sm glow-primary" render={<Link href="/tournaments" />}>
              Explore Tournaments
              <ArrowRight className="size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-11 px-5 text-sm"
              render={<Link href="/register" />}
            >
              <Play className="size-4" />
              Join as a Player
            </Button>
          </div>
        </div>

        {featured && (
          <Link
            href={`/tournaments/${featured.id}`}
            className="glass glass-hover group mt-14 flex max-w-md items-center gap-4 rounded-2xl p-3"
          >
            <div className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-lg">
              <Image
                src={featured.banner || '/placeholder.svg'}
                alt={featured.name}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center gap-2 text-xs font-semibold text-live">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-live opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-live" />
                </span>
                LIVE · {formatCompact(featured.viewers ?? 0)} watching
              </div>
              <p className="truncate font-display font-bold group-hover:text-primary">
                {featured.name}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {gameMap[featured.game].name} · Watch now
              </p>
            </div>
            <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-live" />
          </Link>
        )}
      </div>
    </section>
  )
}
