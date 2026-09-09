import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { tournaments } from '@/lib/data'
import { Bracket } from '@/components/esports/bracket'
import { StatusBadge } from '@/components/esports/status-badge'
import { GameTag } from '@/components/esports/game-tag'

export function generateStaticParams() {
  return tournaments.map((t) => ({ id: t.id }))
}

export default async function BracketPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const t = tournaments.find((x) => x.id === id)
  if (!t) notFound()

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Link
        href={`/tournaments/${t.id}`}
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="size-4" />
        Back to {t.name}
      </Link>

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <StatusBadge status={t.status} />
            <GameTag game={t.game} />
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight">
            {t.name} · Bracket
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Single-elimination · {t.teams} teams · Best of 3
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
        <Bracket />
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        Scroll horizontally to view all rounds · Winners advance to the right
      </p>
    </div>
  )
}
