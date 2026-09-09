'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Search,
  Bell,
  Menu,
  X,
  Trophy,
  Users,
  User,
  BarChart3,
  Handshake,
  LayoutDashboard,
  Shield,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Logo } from './logo'
import { SearchDialog } from './search-dialog'
import { PlayerAvatar } from '@/components/esports/player-avatar'
import { notifications } from '@/lib/data'

const links = [
  { href: '/tournaments', label: 'Tournaments', icon: Trophy },
  { href: '/teams', label: 'Teams', icon: Users },
  { href: '/players', label: 'Players', icon: User },
  { href: '/rankings', label: 'Rankings', icon: BarChart3 },
  { href: '/recruitment', label: 'Recruitment', icon: Handshake },
]

export function Navbar() {
  const pathname = usePathname()
  const [search, setSearch] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const unread = notifications.filter((n) => n.unread).length

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
          <Logo />

          <nav className="ml-4 hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive(l.href)
                    ? 'bg-secondary text-foreground'
                    : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground',
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1.5">
            <button
              onClick={() => setSearch(true)}
              className="flex h-9 items-center gap-2 rounded-md border border-border bg-secondary/50 px-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Search"
            >
              <Search className="size-4" />
              <span className="hidden xl:inline">Search...</span>
              <kbd className="hidden rounded border border-border bg-background px-1 text-[10px] xl:inline">
                /
              </kbd>
            </button>

            <div className="relative">
              <button
                onClick={() => setNotifOpen((v) => !v)}
                className="relative grid size-9 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-label="Notifications"
              >
                <Bell className="size-4.5" />
                {unread > 0 && (
                  <span className="absolute right-1.5 top-1.5 grid size-4 place-items-center rounded-full bg-live text-[9px] font-bold text-live-foreground">
                    {unread}
                  </span>
                )}
              </button>
              {notifOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setNotifOpen(false)}
                    aria-hidden
                  />
                  <div className="absolute right-0 top-11 z-50 w-80 overflow-hidden rounded-lg border border-border bg-popover shadow-2xl">
                    <div className="flex items-center justify-between border-b border-border px-4 py-3">
                      <span className="font-display text-sm font-bold">
                        Notifications
                      </span>
                      <span className="rounded bg-live/15 px-1.5 py-0.5 text-[10px] font-semibold text-live">
                        {unread} new
                      </span>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.slice(0, 5).map((n) => (
                        <div
                          key={n.id}
                          className={cn(
                            'border-b border-border px-4 py-3 last:border-0',
                            n.unread && 'bg-primary/5',
                          )}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-medium">{n.title}</p>
                            <span className="shrink-0 text-[10px] text-muted-foreground">
                              {n.time}
                            </span>
                          </div>
                          <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                            {n.body}
                          </p>
                        </div>
                      ))}
                    </div>
                    <Link
                      href="/dashboard/notifications"
                      onClick={() => setNotifOpen(false)}
                      className="block border-t border-border px-4 py-2.5 text-center text-sm font-medium text-primary hover:bg-accent"
                    >
                      View all notifications
                    </Link>
                  </div>
                </>
              )}
            </div>

            <Link
              href="/dashboard"
              className="hidden items-center gap-2 rounded-md border border-border bg-secondary/50 py-1 pl-1 pr-3 transition-colors hover:border-primary/40 sm:flex"
            >
              <PlayerAvatar handle="Razor" size="sm" />
              <span className="text-sm font-medium">Razor</span>
            </Link>

            <button
              onClick={() => setMobile((v) => !v)}
              className="grid size-9 place-items-center rounded-md text-muted-foreground hover:bg-secondary lg:hidden"
              aria-label="Menu"
            >
              {mobile ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {mobile && (
          <div className="border-t border-border bg-background lg:hidden">
            <nav className="mx-auto grid max-w-7xl gap-1 px-4 py-3">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobile(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium',
                    isActive(l.href)
                      ? 'bg-secondary text-foreground'
                      : 'text-muted-foreground',
                  )}
                >
                  <l.icon className="size-4" />
                  {l.label}
                </Link>
              ))}
              <div className="my-1 h-px bg-border" />
              <Link
                href="/dashboard"
                onClick={() => setMobile(false)}
                className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground"
              >
                <LayoutDashboard className="size-4" />
                Dashboard
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobile(false)}
                className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground"
              >
                <Shield className="size-4" />
                Admin
              </Link>
              <Link
                href="/login"
                onClick={() => setMobile(false)}
                className="mt-1 flex items-center justify-center gap-2 rounded-md bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                Sign In
              </Link>
            </nav>
          </div>
        )}
      </header>

      <SearchDialog open={search} onClose={() => setSearch(false)} />
    </>
  )
}
