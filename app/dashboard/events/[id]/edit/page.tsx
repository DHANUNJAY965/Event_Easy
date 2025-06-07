import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect, notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import EventForm from "@/components/event-form"

interface EditEventPageProps {
  params: { id: string }
}

export default async function EditEventPage({ params }: EditEventPageProps) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin")
  }

  const event = await prisma.event.findUnique({
    where: { id: params.id },
    include: {
      owner: true,
    },
  })

  if (!event) {
    notFound()
  }

  const canEdit = session.user.role === "ADMIN" || session.user.role === "STAFF" || event.ownerId === session.user.id

  if (!canEdit) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Edit Event</h1>
            <p className="text-gray-600">Update your event details</p>
          </div>
          <EventForm event={event} />
        </div>
      </div>
    </div>
  )
}
