import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { name, email } = await request.json()

    const event = await prisma.event.findUnique({
      where: { id: params.id },
    })

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    const existingRSVP = await prisma.rSVP.findUnique({
      where: {
        email_eventId: {
          email,
          eventId: params.id,
        },
      },
    })

    if (existingRSVP) {
      return NextResponse.json({ error: "You have already RSVPed for this event" }, { status: 400 })
    }

    const rsvp = await prisma.rSVP.create({
      data: {
        name,
        email,
        eventId: params.id,
      },
    })

    return NextResponse.json(rsvp, { status: 201 })
  } catch (error) {
    console.error("Error creating RSVP:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
