import Link from 'next/link'
import Image from 'next/image'
import { Trophy, Users, BarChart3 } from 'lucide-react'
import { Logo } from '@/components/site/logo'

const highlights = [
  { icon: Trophy, text: 'Compete in S-tier tournaments' },
  { icon: BarChart3, text: 'Climb the global rankings' },
  { icon: Users, text: 'Join elite teams and orgs' },
]

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden border-r border-border p-10 lg:flex">
        <Image src="/hero-arena.png" alt="" fill className="object-cover opacity-30" sizes="50vw" />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/85 to-background/60" />
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="relative">
          <Logo />
        </div>
        <div className="relative">
          <h2 className="max-w-sm font-display text-4xl font-bold leading-tight text-balance">
            Your competitive journey <span className="text-primary">starts here.</span>
          </h2>
          <ul className="mt-8 space-y-4">
            {highlights.map((h) => (
              <li key={h.text} className="flex items-center gap-3 text-sm">
                <span className="grid size-9 place-items-center rounded-lg bg-primary/15 text-primary">
                  <h.icon className="size-4.5" />
                </span>
                {h.text}
              </li>
            ))}
          </ul>
        </div>
        <p className="relative text-xs text-muted-foreground">
          © 2026 EsportsHub 2.0 · A fictional demo platform
        </p>
      </div>

      {/* Form panel */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between p-6 lg:hidden">
          <Logo />
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            Back to site
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center px-6 py-10">
          <div className="w-full max-w-sm">{children}</div>
        </div>
      </div>
    </div>
  )
}
