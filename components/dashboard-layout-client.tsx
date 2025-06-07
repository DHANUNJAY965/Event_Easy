"use client"

import type React from "react"
import { useState } from "react"
import DashboardSidebar from "@/components/dashboard-sidebar"

interface DashboardLayoutClientProps {
  children: React.ReactNode
  user: {
    id: string
    name?: string | null
    email?: string | null
    role?: string
  }
}

export default function DashboardLayoutClient({ children, user }: DashboardLayoutClientProps) {
  const [isSidebarHovered, setIsSidebarHovered] = useState(false)

  const handleSidebarHover = (isHovered: boolean) => {
    setIsSidebarHovered(isHovered)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar user={user} onSidebarHover={handleSidebarHover} />
      <div 
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isSidebarHovered ? 'lg:ml-64' : 'lg:ml-16'
        }`}
      >
        {children}
      </div>
    </div>
  )
}