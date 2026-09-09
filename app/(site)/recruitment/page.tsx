import { RecruitmentBoard } from '@/components/recruitment/recruitment-board'

export const metadata = { title: 'Recruitment — EsportsHub 2.0' }

export default function RecruitmentPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-primary uppercase">
          <span className="h-px w-6 bg-primary" />
          Marketplace
        </div>
        <h1 className="font-display text-4xl font-bold tracking-tight">
          Recruitment
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Where rosters find their next star and free agents find their next
          home. Browse open slots or post your own listing.
        </p>
      </div>
      <RecruitmentBoard />
    </div>
  )
}
