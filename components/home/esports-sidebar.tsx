'use client'

import Link from 'next/link'
import {
  BarChart3,
  CircleHelp,
  Crown,
  Gamepad2,
  Home,
  Radio,
  Newspaper,
  ShoppingCart,
  Swords,
  Trophy,
  Users,
  Play,
} from 'lucide-react'
import { Logo } from '@/components/site/logo'

const items = [
  { label: 'Dashboard', href: '/', icon: Home },
  { label: 'Tournaments', href: '/tournaments', icon: Trophy },
  { label: 'Teams', href: '/teams', icon: Users },
  { label: 'Community', href: '/recruitment', icon: Users },
  { label: 'Leaderboard', href: '/rankings', icon: BarChart3 },
  { label: 'News & Media', href: '/notifications', icon: Newspaper },
  { label: 'Game Hub', href: '/players', icon: Gamepad2 },
  { label: 'Shop', href: '/recruitment', icon: ShoppingCart },
  { label: 'Support', href: '/settings', icon: CircleHelp },
]

export function EsportsSidebar() {
  return (
    <>
    <aside className="hidden w-[210px] shrink-0 flex-col border-r border-border/60 bg-background/35 px-4 py-5 backdrop-blur-2xl lg:flex">
      <div className="mb-7 px-2"><Logo /></div>
      <nav className="space-y-1.5" aria-label="Main navigation">
        {items.map(({ label, href, icon: Icon }, index) => (
          <Link
            key={label}
            href={href}
            className={`group flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm transition-all ${index === 0 ? 'border border-primary/70 bg-primary/16 text-white shadow-[0_0_28px_-8px_oklch(0.82_0.16_195_/_80%)]' : 'text-muted-foreground hover:bg-white/7 hover:text-foreground'}`}
          >
            <Icon className={`size-[18px] ${index === 0 ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
      <div className="mt-auto space-y-6 pt-8">
        <div className="glass rounded-2xl p-4">
          <Crown className="mb-3 size-7 text-gold" />
          <p className="font-display text-lg font-bold leading-tight">Upgrade to<br />Pro Membership</p>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">Unlock exclusive features, early access and more.</p>
          <Link href="/register" className="mt-4 flex min-h-10 items-center justify-center rounded-xl bg-gradient-to-r from-fuchsia-500 to-primary text-sm font-semibold text-white shadow-[0_0_22px_-8px_oklch(0.82_0.16_195)]">Go Premium <Swords className="ml-2 size-4" /></Link>
        </div>
        <div className="px-2 text-xs text-muted-foreground">
          <p className="font-display text-2xl font-bold italic leading-none text-primary/80">GAMERS<br />BUILD A<br />BIGGER<br />TOMORROW</p>
          <div className="mt-5 flex gap-3 text-primary"><Play className="size-4" /><Radio className="size-4" /></div>
          <p className="mt-5">© 2026 EsportsHub<br />All rights reserved.</p>
        </div>
      </div>
    </aside>
    <nav className="fixed inset-x-3 bottom-3 z-50 flex items-center justify-around rounded-2xl border border-white/15 bg-[#10132b]/85 p-2 shadow-2xl backdrop-blur-2xl lg:hidden" aria-label="Mobile navigation">
      {items.slice(0, 5).map(({ label, href, icon: Icon }, index) => <Link key={label} href={href} className={`grid min-h-11 min-w-12 place-items-center rounded-xl ${index === 0 ? 'bg-primary/20 text-primary' : 'text-muted-foreground'}`} aria-label={label}><Icon className="size-5" /></Link>)}
    </nav>
    </>
  )
}
