import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect, notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import UserPasswordForm from "@/components/user-password-form"

interface ChangePasswordPageProps {
  params: { id: string }
}

export default async function ChangePasswordPage({ params }: ChangePasswordPageProps) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin")
  }

  if (session.user.role !== "ADMIN") {
    redirect("/dashboard")
  }

  const user = await prisma.user.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      name: true,
      email: true,
    },
  })

  if (!user) {
    notFound()
  }

  if (user.id === session.user.id) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 pt-16 lg:pt-8 flex items-center justify-center min-h-screen lg:block lg:min-h-0">
        <div className="max-w-md mx-auto w-full">
          {/* <h1 className="text-2xl font-bold mb-6">Change Password for {user.name}</h1> */}
          <UserPasswordForm userId={user.id} userEmail={user.email} />
        </div>
      </div>
    </div>
  )
}