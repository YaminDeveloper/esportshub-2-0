import { cn } from '@/lib/utils'
import { statusMeta, type TournamentStatus } from '@/lib/data'

export function StatusBadge({
  status,
  className,
}: {
  status: TournamentStatus
  className?: string
}) {
  const meta = statusMeta[status]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-semibold tracking-wide',
        meta.className,
        className,
      )}
    >
      {status === 'live' && (
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-live opacity-75" />
          <span className="relative inline-flex size-1.5 rounded-full bg-live" />
        </span>
      )}
      {meta.label}
    </span>
  )
}
