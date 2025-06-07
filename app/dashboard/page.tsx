import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import DashboardContent from "@/components/dashboard-content"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin")
  }

  const events = await prisma.event.findMany({
    where: session.user.role === "ADMIN" || session.user.role === "STAFF" ? {} : { ownerId: session.user.id },
    include: {
      owner: true,
      rsvps: true,
    },
    orderBy: { createdAt: "desc" },
  })

  return <DashboardContent events={events} user={session.user} />
}