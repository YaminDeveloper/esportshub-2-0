import { SettingsPanel } from '@/components/dashboard/settings-panel'

export const metadata = { title: 'Settings — EsportsHub 2.0' }

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:py-10">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your profile, account, and preferences.
        </p>
      </div>
      <SettingsPanel />
    </div>
  )
}
