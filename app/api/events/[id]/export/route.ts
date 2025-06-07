import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user owns the event or is admin/staff
    const event = await prisma.event.findUnique({
      where: { id: params.id },
      include: {
        rsvps: {
          orderBy: { createdAt: "desc" },
        },
      },
    })

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    if (event.ownerId !== session.user.id && !["ADMIN", "STAFF"].includes(session.user.role || "")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Generate CSV
    const csvHeader = "Name,Email,RSVP Date\n"
    const csvRows = event.rsvps
      .map((rsvp) => `"${rsvp.name}","${rsvp.email}","${rsvp.createdAt.toISOString()}"`)
      .join("\n")

    const csv = csvHeader + csvRows

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="${event.title}-rsvps.csv"`,
      },
    })
  } catch (error) {
    console.error("Error exporting RSVPs:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
