import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function SectionHeading({
  eyebrow,
  title,
  action,
  actionHref,
  className,
}: {
  eyebrow?: string
  title: string
  action?: string
  actionHref?: string
  className?: string
}) {
  return (
    <div className={cn('flex items-end justify-between gap-4', className)}>
      <div>
        {eyebrow && (
          <div className="mb-2 flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-primary uppercase">
            <span className="h-px w-6 bg-primary" />
            {eyebrow}
          </div>
        )}
        <h2 className="text-2xl font-bold tracking-tight text-balance sm:text-3xl">
          {title}
        </h2>
      </div>
      {action && actionHref && (
        <Link
          href={actionHref}
          className="group hidden shrink-0 items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary sm:flex"
        >
          {action}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  )
}
