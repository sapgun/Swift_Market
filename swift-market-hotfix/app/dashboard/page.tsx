import { DashboardContent } from "@/components/dashboard/dashboard-content"
import { Header } from "@/components/header"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Manage your Swift Market account and track your orders in real-time
            </p>
          </div>
          <DashboardContent />
        </div>
      </main>
    </div>
  )
}
