'use client'

import { useState, type ComponentType } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/site/logo'
import { PlayerAvatar } from '@/components/esports/player-avatar'

export type NavItem = {
  href: string
  label: string
  icon: ComponentType<{ className?: string }>
}

export function AppShell({
  items,
  label,
  user,
  children,
}: {
  items: NavItem[]
  label: string
  user: { handle: string; sub: string }
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const nav = (
    <nav className="flex flex-col gap-1">
      {items.map((it) => {
        const active = pathname === it.href
        return (
          <Link
            key={it.href}
            href={it.href}
            onClick={() => setOpen(false)}
            className={cn(
              'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
              active
                ? 'bg-primary/15 text-primary'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
            )}
          >
            <it.icon className="size-4.5" />
            {it.label}
          </Link>
        )
      })}
    </nav>
  )

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[16rem_1fr]">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen flex-col border-r border-border bg-sidebar lg:flex">
        <div className="flex h-16 items-center border-b border-border px-5">
          <Logo />
        </div>
        <div className="px-3 py-2">
          <span className="px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {label}
          </span>
        </div>
        <div className="flex-1 overflow-y-auto px-3">{nav}</div>
        <div className="border-t border-border p-3">
          <div className="flex items-center gap-3 rounded-md bg-secondary/50 p-2">
            <PlayerAvatar handle={user.handle} size="sm" />
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold">{user.handle}</div>
              <div className="truncate text-xs text-muted-foreground">{user.sub}</div>
            </div>
          </div>
          <Link
            href="/"
            className="mt-2 flex items-center gap-2 rounded-md px-3 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            Back to site
          </Link>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="border-b border-border bg-sidebar lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <Logo />
          <button
          onClick={() => setOpen((v) => !v)}
          className="grid size-9 place-items-center rounded-md text-muted-foreground hover:bg-secondary"
          aria-label="Menu"
        >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto px-4 pb-3 [scrollbar-width:none]">
          {[...items.slice(0, 4), ...items.filter((it) => it.label === 'Gaming Shop')].map((it) => <Link key={it.href} href={it.href} className={cn('shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold', pathname === it.href ? 'border-primary/40 bg-primary/10 text-primary' : 'border-border text-muted-foreground')}>{it.label}</Link>)}
        </div>
      </div>
      {open && (
        <div className="border-b border-border bg-sidebar px-3 py-3 lg:hidden">
          {nav}
          <Link href="/" className="mt-2 flex items-center gap-2 rounded-md px-3 py-2 text-xs text-muted-foreground">
            <ArrowLeft className="size-3.5" />
            Back to site
          </Link>
        </div>
      )}

      <main className="min-w-0">{children}</main>
    </div>
  )
}
