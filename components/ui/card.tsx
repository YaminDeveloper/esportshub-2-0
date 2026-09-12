import { cn } from '@/lib/utils'

export function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'glass rounded-2xl text-card-foreground',
        className,
      )}
      {...props}
    />
  )
}
