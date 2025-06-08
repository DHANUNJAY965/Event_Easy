import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import ReportsContent from "@/components/reports-content"

export default async function ReportsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin")
  }

  // Only Staff and Admin can access reports
  if (session.user.role !== "STAFF" && session.user.role !== "ADMIN") {
    redirect("/dashboard")
  }

  // Fetch comprehensive event data for reports
  const events = await prisma.event.findMany({
    include: {
      owner: {
        select: { name: true, email: true, role: true },
      },
      rsvps: {
        select: { id: true, name: true, email: true, createdAt: true },
      },
    },
    orderBy: { createdAt: "desc" },
  })

  // Fetch user statistics
  const userStats = await prisma.user.groupBy({
    by: ["role"],
    _count: {
      role: true,
    },
  })

  // Calculate additional statistics
  const totalEvents = events.length
  const totalRSVPs = events.reduce((sum, event) => sum + event.rsvps.length, 0)
  const upcomingEvents = events.filter((event) => new Date(event.datetime) > new Date()).length
  const pastEvents = events.filter((event) => new Date(event.datetime) <= new Date()).length

  const reportData = {
    events,
    userStats,
    totalEvents,
    totalRSVPs,
    upcomingEvents,
    pastEvents,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className=" px-4 py-8">
        <ReportsContent data={reportData} userRole={session.user.role} />
      </div>
    </div>
  )
}
