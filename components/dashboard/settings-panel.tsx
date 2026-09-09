'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { PlayerAvatar } from '@/components/esports/player-avatar'
import { games } from '@/lib/data'

const tabs = ['Profile', 'Account', 'Notifications', 'Privacy'] as const
type Tab = (typeof tabs)[number]

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      {children}
    </label>
  )
}

function Input(props: React.ComponentProps<'input'>) {
  return (
    <input
      {...props}
      className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none transition-colors focus:border-primary"
    />
  )
}

function Toggle({ label, desc, defaultOn }: { label: string; desc: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(!!defaultOn)
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-surface/40 px-4 py-3">
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

export function SettingsPanel() {
  const [tab, setTab] = useState<Tab>('Profile')

  return (
    <div className="grid gap-8 lg:grid-cols-[12rem_1fr]">
      <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              'shrink-0 rounded-md px-3 py-2 text-left text-sm font-medium transition-colors',
              tab === t ? 'bg-primary/15 text-primary' : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
            )}
          >
            {t}
          </button>
        ))}
      </nav>

      <div className="max-w-2xl space-y-6">
        {tab === 'Profile' && (
          <>
            <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-5">
              <PlayerAvatar handle="Razor" size="xl" />
              <div>
                <div className="font-display text-lg font-bold">Razor</div>
                <div className="text-sm text-muted-foreground">Diego Alvarez</div>
                <Button variant="outline" size="sm" className="mt-2 h-7">Change avatar</Button>
              </div>
            </div>
            <div className="grid gap-5 rounded-lg border border-border bg-card p-5 sm:grid-cols-2">
              <Field label="Handle"><Input defaultValue="Razor" /></Field>
              <Field label="Full name"><Input defaultValue="Diego Alvarez" /></Field>
              <Field label="Country"><Input defaultValue="United States" /></Field>
              <Field label="Main game">
                <select className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary">
                  {games.map((g) => <option key={g.id}>{g.name}</option>)}
                </select>
              </Field>
              <div className="sm:col-span-2">
                <Field label="Bio">
                  <textarea
                    rows={3}
                    defaultValue="The most feared entry fragger in Nova Strike."
                    className="w-full rounded-md border border-border bg-background p-3 text-sm outline-none focus:border-primary"
                  />
                </Field>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" className="h-9">Cancel</Button>
              <Button className="h-9 glow-primary">Save changes</Button>
            </div>
          </>
        )}

        {tab === 'Account' && (
          <div className="space-y-5 rounded-lg border border-border bg-card p-5">
            <Field label="Email"><Input type="email" defaultValue="razor@esportshub.gg" /></Field>
            <Field label="Current password"><Input type="password" defaultValue="password" /></Field>
            <Field label="New password"><Input type="password" placeholder="••••••••" /></Field>
            <div className="flex justify-end">
              <Button className="h-9 glow-primary">Update account</Button>
            </div>
          </div>
        )}

        {tab === 'Notifications' && (
          <div className="space-y-3">
            <Toggle label="Match reminders" desc="Get notified before your matches start" defaultOn />
            <Toggle label="Tournament updates" desc="Bracket changes and results" defaultOn />
            <Toggle label="Team invites" desc="Recruitment offers and roster changes" defaultOn />
            <Toggle label="New followers" desc="When someone follows your profile" />
            <Toggle label="Email digest" desc="Weekly summary of your activity" />
          </div>
        )}

        {tab === 'Privacy' && (
          <div className="space-y-3">
            <Toggle label="Public profile" desc="Anyone can view your stats and history" defaultOn />
            <Toggle label="Show online status" desc="Display when you're active" defaultOn />
            <Toggle label="Allow team invites" desc="Let organizations recruit you" defaultOn />
            <Toggle label="Show earnings" desc="Display prize money on your profile" />
          </div>
        )}
      </div>
    </div>
  )
}
