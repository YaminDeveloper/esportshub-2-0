import { notFound } from 'next/navigation'
import { tournaments } from '@/lib/data'
import { TournamentDetail } from '@/components/tournaments/tournament-detail'

export function generateStaticParams() {
  return tournaments.map((t) => ({ id: t.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const t = tournaments.find((x) => x.id === id)
  return { title: t ? `${t.name} — EsportsHub 2.0` : 'Tournament' }
}

export default async function TournamentPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const t = tournaments.find((x) => x.id === id)
  if (!t) notFound()
  return <TournamentDetail t={t} />
}
