import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import AllEventsContent from "@/components/all-events/all-events-content"

export default async function AllEventsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin")
  }

  // Only Staff and Admin can access all events
  if (session.user.role !== "STAFF" && session.user.role !== "ADMIN") {
    redirect("/dashboard")
  }

  const events = await prisma.event.findMany({
    include: {
      owner: {
        select: { name: true, email: true, role: true },
      },
      rsvps: true,
    },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <AllEventsContent events={events} userRole={session.user.role} />
      </div>
    </div>
  )
}
