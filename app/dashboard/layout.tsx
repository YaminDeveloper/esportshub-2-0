'use client'

import {
  LayoutDashboard,
  Users,
  Swords,
  Trophy,
  Bell,
  Settings,
} from 'lucide-react'
import { AppShell, type NavItem } from '@/components/app/app-shell'

const items: NavItem[] = [
  { href: '/dashboard', label: 'Organization', icon: LayoutDashboard },
  { href: '/dashboard/team', label: 'Rosters', icon: Users },
  { href: '/dashboard/matches', label: 'Matches', icon: Swords },
  { href: '/dashboard/tournaments', label: 'Tournaments', icon: Trophy },
  { href: '/dashboard/notifications', label: 'Notifications', icon: Bell },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppShell items={items} label="Organization Hub" user={{ handle: 'Nexus Esports', sub: 'Multi-game org' }}>
      {children}
    </AppShell>
  )
}
