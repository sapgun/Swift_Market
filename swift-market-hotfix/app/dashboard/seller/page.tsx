import { ProtectedRoute } from "@/components/auth/protected-route"
import { SellerDashboardContent } from "@/components/dashboard/seller-dashboard-content"

export default function SellerDashboardPage() {
  return (
    <ProtectedRoute>
      <SellerDashboardContent />
    </ProtectedRoute>
  )
}
