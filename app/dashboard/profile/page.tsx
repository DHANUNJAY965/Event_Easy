import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import ProfileForm from "@/components/profile-form"

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin")
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  })

  if (!user) {
    redirect("/auth/signin")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="">
        <div className="pt-16 lg:pt-8 px-4 pb-8">
          <div className="container mx-auto max-w-4xl">
            <div className="max-w-2xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  Profile settings
                </h1>
                <p className="text-gray-600">
                  Manage your account and preferences
                </p>
              </div>
              
              <ProfileForm user={user} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}