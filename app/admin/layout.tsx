'use client'

import {
  LayoutDashboard,
  Trophy,
  Users,
  Flag,
  Settings,
} from 'lucide-react'
import { AppShell, type NavItem } from '@/components/app/app-shell'

const items: NavItem[] = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/tournaments', label: 'Tournaments', icon: Trophy },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/reports', label: 'Reports', icon: Flag },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppShell items={items} label="Admin Console" user={{ handle: 'Admin', sub: 'Platform Operator' }}>
      {children}
    </AppShell>
  )
}
