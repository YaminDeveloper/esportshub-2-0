import { HomeDashboard } from '@/components/home/home-dashboard'
import { EsportsSidebar } from '@/components/home/esports-sidebar'

export default function HomePage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-72px)] max-w-[1600px]">
      <EsportsSidebar />
      <main className="min-w-0 flex-1">
        <HomeDashboard />
      </main>
    </div>
  )
}
