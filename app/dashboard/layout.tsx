import type React from "react"
import Navigation from "@/components/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-950">
      <Navigation />
      {children}
    </div>
  )
}

