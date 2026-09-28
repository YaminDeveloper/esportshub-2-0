import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { OrganizationDashboard } from '@/components/dashboard/organization-dashboard'

export const metadata = { title: 'Organization — EsportsHub 2.0' }

export default async function OrganizationPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect('/login')
  return <OrganizationDashboard />
}
