import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import UserManagement from "@/components/user-management"

export default async function UsersPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin")
  }

  if (session.user.role !== "ADMIN") {
    redirect("/dashboard")
  }

  const users = await prisma.user.findMany({
    where: {
      OR: [
        { role: { not: "ADMIN" } }, 
        { id: session.user.id }, 
      ],
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      _count: {
        select: {
          events: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  })

  return <UserManagement users={users} currentUserId={session.user.id} />
}