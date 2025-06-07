import { prisma } from "@/lib/prisma"
import PublicEventsView from "@/components/public-events-view"

export const metadata = {
  title: "All Events - EventEasy",
  description: "Browse all upcoming and past events on EventEasy",
}

export default async function PublicEventsPage() {
  // Fetch all events with basic information
  const events = await prisma.event.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      location: true,
      datetime: true,
      owner: {
        select: {
          name: true,
        },
      },
      _count: {
        select: {
          rsvps: true,
        },
      },
    },
    orderBy: [
      { datetime: "asc" }, // Upcoming events first
    ],
  })

  return <PublicEventsView events={events} />
}
