import Link from 'next/link'
import { Logo } from './logo'

const groups = [
  {
    title: 'Compete',
    links: [
      { label: 'Tournaments', href: '/tournaments' },
      { label: 'Rankings', href: '/rankings' },
      { label: 'Recruitment', href: '/recruitment' },
      { label: 'Register', href: '/register' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Teams', href: '/teams' },
      { label: 'Players', href: '/players' },
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Notifications', href: '/dashboard/notifications' },
    ],
  },
  {
    title: 'Platform',
    links: [
      { label: 'Admin', href: '/admin' },
      { label: 'Settings', href: '/dashboard/settings' },
      { label: 'Sign In', href: '/login' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[2fr_3fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              The complete competitive esports ecosystem. Discover tournaments,
              track brackets, and build your career.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {groups.map((g) => (
              <div key={g.title}>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">
                  {g.title}
                </h3>
                <ul className="space-y-2">
                  {g.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© 2026 EsportsHub 2.0. A fictional demo platform.</p>
          <p>Built for competitive gaming.</p>
        </div>
      </div>
    </footer>
  )
}
