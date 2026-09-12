import Link from 'next/link'
import Image from 'next/image'
import { Users, Calendar, Eye, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatMoney, formatCompact, gameMap, type Tournament } from '@/lib/data'
import { StatusBadge } from './status-badge'
import { GameTag } from './game-tag'

export function TournamentCard({ t }: { t: Tournament }) {
  return (
    <Link
      href={`/tournaments/${t.id}`}
      className="glass glass-hover group relative flex flex-col overflow-hidden rounded-2xl"
    >
      <div className="sheen relative aspect-[16/9] overflow-hidden">
        <Image
          src={t.banner || '/placeholder.svg'}
          alt={t.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <StatusBadge status={t.status} />
          <span className="rounded-md border border-white/15 bg-black/50 px-1.5 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
            TIER {t.tier}
          </span>
        </div>
        {t.viewers && (
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-md border border-white/15 bg-black/50 px-1.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
            <Eye className="size-3" />
            {formatCompact(t.viewers)}
          </div>
        )}
        <div className="absolute bottom-3 left-3">
          <GameTag game={t.game} />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="line-clamp-1 font-display text-lg font-bold tracking-tight group-hover:text-primary">
          {t.name}
        </h3>

        <div className="flex items-center justify-between rounded-md border border-border bg-secondary/40 px-3 py-2">
          <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
            Prize Pool
          </span>
          <span className="font-display text-lg font-bold text-primary">
            {formatMoney(t.prizePool, t.currency)}
          </span>
        </div>

        <div className="mt-auto grid grid-cols-3 gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Users className="size-3.5 shrink-0" />
            {t.teams}/{t.maxTeams}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="size-3.5 shrink-0" />
            {t.region}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="size-3.5 shrink-0" />
            {new Date(t.startDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </span>
        </div>
      </div>
    </Link>
  )
}
