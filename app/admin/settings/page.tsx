'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

function Toggle({ label, desc, defaultOn }: { label: string; desc: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(!!defaultOn)
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-card px-4 py-3.5">
      <div>
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
      <button
        onClick={() => setOn((v) => !v)}
        className={cn('relative h-6 w-11 shrink-0 rounded-full transition-colors', on ? 'bg-primary' : 'bg-secondary')}
        aria-pressed={on}
      >
        <span className={cn('absolute top-0.5 size-5 rounded-full bg-background transition-transform', on ? 'translate-x-5' : 'translate-x-0.5')} />
      </button>
    </div>
  )
}

export default function AdminSettings() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:py-10">
      <h1 className="mb-6 font-display text-3xl font-bold tracking-tight">Platform Settings</h1>
      <div className="space-y-3">
        <Toggle label="Open registrations" desc="Allow new users to create accounts" defaultOn />
        <Toggle label="Tournament creation" desc="Let verified organizers create events" defaultOn />
        <Toggle label="Auto-verify accounts" desc="Skip manual review for new signups" />
        <Toggle label="Maintenance mode" desc="Take the platform offline for updates" />
        <Toggle label="Anti-cheat enforcement" desc="Require client integrity checks" defaultOn />
        <Toggle label="Public API access" desc="Expose read-only stats endpoints" defaultOn />
      </div>
      <div className="mt-6 flex justify-end">
        <Button className="h-9 glow-primary">Save settings</Button>
      </div>
    </div>
  )
}
