import { NotificationsCenter } from '@/components/dashboard/notifications-center'

export const metadata = { title: 'Notifications — EsportsHub 2.0' }

export default function NotificationsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:py-10">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Notifications
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Stay on top of your matches, teams, and tournaments.
        </p>
      </div>
      <NotificationsCenter />
    </div>
  )
}
