import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn('flex items-center gap-2', className)}>
      <span className="grid size-8 place-items-center rounded-md bg-primary font-display text-lg font-bold text-primary-foreground glow-primary">
        E
      </span>
      <span className="font-display text-lg font-bold tracking-tight">
        Esports<span className="text-primary">Hub</span>
        <span className="ml-1 rounded bg-secondary px-1 text-[10px] align-middle text-muted-foreground">
          2.0
        </span>
      </span>
    </Link>
  )
}
