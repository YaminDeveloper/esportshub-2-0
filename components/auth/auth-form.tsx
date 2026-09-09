'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { games } from '@/lib/data'

function Input({ className, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      {...props}
      className={cn(
        'h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none transition-colors focus:border-primary',
        className,
      )}
    />
  )
}

export function AuthForm({ mode }: { mode: 'login' | 'register' }) {
  const router = useRouter()
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [accountType, setAccountType] = useState<'player' | 'organizer'>('player')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => router.push('/dashboard'), 900)
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-bold tracking-tight">
        {mode === 'login' ? 'Welcome back' : 'Create your account'}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {mode === 'login'
          ? 'Sign in to continue to EsportsHub.'
          : 'Join the arena and start competing today.'}
      </p>

      {/* Social */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <Button variant="outline" className="h-10" type="button">
          <span className="font-display text-sm font-bold text-primary">G</span>
          Google
        </Button>
        <Button variant="outline" className="h-10" type="button">
          <span className="font-display text-sm font-bold text-primary">D</span>
          Discord
        </Button>
      </div>

      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or {mode === 'login' ? 'sign in' : 'sign up'} with email
        <span className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={submit} className="space-y-4">
        {mode === 'register' && (
          <>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setAccountType('player')}
                className={cn(
                  'rounded-md border px-3 py-2 text-sm font-medium transition-colors',
                  accountType === 'player' ? 'border-primary bg-primary/15 text-primary' : 'border-border text-muted-foreground',
                )}
              >
                Player
              </button>
              <button
                type="button"
                onClick={() => setAccountType('organizer')}
                className={cn(
                  'rounded-md border px-3 py-2 text-sm font-medium transition-colors',
                  accountType === 'organizer' ? 'border-primary bg-primary/15 text-primary' : 'border-border text-muted-foreground',
                )}
              >
                Organizer
              </button>
            </div>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">Handle</span>
              <Input placeholder="YourGamerTag" required />
            </label>
          </>
        )}

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">Email</span>
          <Input type="email" placeholder="you@esportshub.gg" required />
        </label>

        <label className="block">
          <span className="mb-1.5 flex items-center justify-between text-sm font-medium">
            Password
            {mode === 'login' && (
              <span className="text-xs text-primary hover:underline">Forgot?</span>
            )}
          </span>
          <div className="relative">
            <Input type={show ? 'text' : 'password'} placeholder="••••••••" required className="pr-10" />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              className="absolute right-2 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded text-muted-foreground hover:text-foreground"
              aria-label={show ? 'Hide password' : 'Show password'}
            >
              {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </label>

        {mode === 'register' && (
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">Region</span>
              <select className="h-10 w-full rounded-md border border-border bg-background px-2.5 text-sm outline-none focus:border-primary">
                <option>NA</option>
                <option>EU</option>
                <option>APAC</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">Main game</span>
              <select className="h-10 w-full rounded-md border border-border bg-background px-2.5 text-sm outline-none focus:border-primary">
                {games.map((g) => <option key={g.id}>{g.name}</option>)}
              </select>
            </label>
          </div>
        )}

        <Button type="submit" disabled={loading} className="h-10 w-full glow-primary">
          {loading && <Loader2 className="size-4 animate-spin" />}
          {mode === 'login' ? 'Sign In' : 'Create Account'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {mode === 'login' ? (
          <>
            New to EsportsHub?{' '}
            <Link href="/register" className="font-medium text-primary hover:underline">
              Create an account
            </Link>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </>
        )}
      </p>
    </div>
  )
}
