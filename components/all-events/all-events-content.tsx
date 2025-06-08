"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Users, Edit, Trash2, ExternalLink, ArrowLeft, Search, Filter } from "lucide-react"
import { format, isAfter } from "date-fns"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Event {
  id: string
  title: string
  description: string | null
  location: string
  datetime: string
  owner: {
    name: string
    email: string
    role: string
  }
  rsvps: Array<{
    id: string
    name: string
    email: string
  }>
}

interface AllEventsContentProps {
  events: Event[]
  userRole?: string
}

export default function AllEventsContent({ events, userRole }: AllEventsContentProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [loading, setLoading] = useState<string | null>(null)
  const router = useRouter()

  const handleDeleteEvent = async (eventId: string, eventTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${eventTitle}"? This action cannot be undone.`)) return

    setLoading(eventId)
    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        router.refresh()
      }
    } catch (error) {
      console.error("Error deleting event:", error)
    } finally {
      setLoading(null)
    }
  }

  const exportRSVPs = async (eventId: string, eventTitle: string) => {
    try {
      const response = await fetch(`/api/events/${eventId}/export`)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${eventTitle}-rsvps.csv`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Error exporting RSVPs:", error)
    }
  }

  // Filter and search events
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.owner.name.toLowerCase().includes(searchTerm.toLowerCase())

    const now = new Date()
    let matchesFilter = true

    switch (filterType) {
      case "upcoming":
        matchesFilter = isAfter(new Date(event.datetime), now)
        break
      case "past":
        matchesFilter = !isAfter(new Date(event.datetime), now)
        break
      case "my-events":
        // This would need the current user ID to filter properly
        matchesFilter = true
        break
      default:
        matchesFilter = true
    }

    return matchesSearch && matchesFilter
  })

  const upcomingEvents = events.filter((event) => isAfter(new Date(event.datetime), new Date())).length
  const totalRSVPs = events.reduce((sum, event) => sum + event.rsvps.length, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center space-x-4 mb-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">All Events Management</h1>
          <p className="text-gray-600">
            {userRole === "STAFF" ? "Staff view: " : "Admin view: "}
            Manage all events across the platform
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/events/new">
            <Calendar className="w-4 h-4 mr-2" />
            Create Event
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{events.length}</div>
            <p className="text-xs text-muted-foreground">{upcomingEvents} upcoming</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total RSVPs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRSVPs}</div>
            <p className="text-xs text-muted-foreground">Across all events</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Filtered Results</CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredEvents.length}</div>
            <p className="text-xs text-muted-foreground">Matching criteria</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search events, locations, or organizers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="past">Past Events</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Events List */}
      <div className="space-y-4">
        {filteredEvents.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No events found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </CardContent>
          </Card>
        ) : (
          filteredEvents.map((event) => (
            <Card key={event.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                      <Badge
                        variant={isAfter(new Date(event.datetime), new Date()) ? "default" : "secondary"}
                        className={
                          isAfter(new Date(event.datetime), new Date())
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }
                      >
                        {isAfter(new Date(event.datetime), new Date()) ? "Upcoming" : "Past"}
                      </Badge>
                    </div>
                    <CardDescription className="mb-2">{event.description}</CardDescription>
                    <div className="text-sm text-gray-600">
                      <p>📅 {format(new Date(event.datetime), "PPP p")}</p>
                      <p>📍 {event.location}</p>
                      <p>
                        👤 Organized by {event.owner.name} ({event.owner.role.replace("_", " ")})
                      </p>
                      <p>🎫 {event.rsvps.length} RSVPs</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/event/${event.id}`}>
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/events/${event.id}/edit`}>
                        <Edit className="w-4 h-4" />
                      </Link>
                    </Button>
                    {event.rsvps.length > 0 && (
                      <Button variant="outline" size="sm" onClick={() => exportRSVPs(event.id, event.title)}>
                        Export
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteEvent(event.id, event.title)}
                      disabled={loading === event.id}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
