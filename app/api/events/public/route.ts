import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const filter = searchParams.get("filter") // 'upcoming', 'past', 'all'
    const sort = searchParams.get("sort") // 'date', 'title', 'rsvps'
    const limit = searchParams.get("limit")

    // Build where clause
    const where: any = {}

    // Add search filter
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { location: { contains: search, mode: "insensitive" } },
        { owner: { name: { contains: search, mode: "insensitive" } } },
      ]
    }

    // Add time filter
    const now = new Date()
    if (filter === "upcoming") {
      where.datetime = { gt: now }
    } else if (filter === "past") {
      where.datetime = { lt: now }
    }

    // Build orderBy clause
    let orderBy: any = { datetime: "asc" }
    if (sort === "title") {
      orderBy = { title: "asc" }
    } else if (sort === "rsvps") {
      orderBy = { rsvps: { _count: "desc" } }
    }

    // Fetch events
    const events = await prisma.event.findMany({
      where,
      select: {
        id: true,
        title: true,
        description: true,
        location: true,
        datetime: true,
        createdAt: true,
        owner: {
          select: {
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            rsvps: true,
          },
        },
      },
      orderBy,
      take: limit ? Number.parseInt(limit) : undefined,
    })

    // Add computed fields
    const eventsWithStatus = events.map((event) => ({
      ...event,
      status: new Date(event.datetime) > now ? "upcoming" : "past",
      rsvpCount: event._count.rsvps,
    }))

    return NextResponse.json({
      events: eventsWithStatus,
      total: events.length,
      upcoming: events.filter((event) => new Date(event.datetime) > now).length,
      past: events.filter((event) => new Date(event.datetime) <= now).length,
    })
  } catch (error) {
    console.error("Error fetching public events:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
