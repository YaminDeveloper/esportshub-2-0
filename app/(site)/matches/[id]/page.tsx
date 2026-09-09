import { LiveMatchView } from '@/components/matches/live-match-view'

export const metadata = { title: 'Live Match — EsportsHub 2.0' }

export default async function LiveMatchPage({ params }: { params: Promise<{ id: string }> }) {
  await params
  return <LiveMatchView />
}
