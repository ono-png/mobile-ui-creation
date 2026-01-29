import { DashboardLayout } from "@/components/dashboard-layout"
import { ExistingSiteReservationForm } from "@/components/existing-site-reservation-form"

export default function ExistingSiteReservationPage({ params }: { params: { id: string } }) {
  return (
    <DashboardLayout>
      <ExistingSiteReservationForm siteId={params.id} />
    </DashboardLayout>
  )
}
