import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import EventPublicView from "@/components/event-public-view"

interface EventPageProps {
  params: { id: string }
}

export default async function EventPage({ params }: EventPageProps) {
  const event = await prisma.event.findUnique({
    where: { id: params.id },
    include: {
      owner: {
        select: { name: true },
      },
      rsvps: {
        select: { id: true },
      },
    },
  })

  if (!event) {
    notFound()
  }

  return <EventPublicView event={event} />
}
