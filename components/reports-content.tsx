"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Users, TrendingUp, Download, ArrowLeft, BarChart3, PieChart, Activity, MapPin } from "lucide-react"
import { format, subDays, isAfter, isBefore } from "date-fns"
import Link from "next/link"

interface Event {
  id: string
  title: string
  description: string | null
  location: string
  datetime: string
  createdAt: string
  owner: {
    name: string
    email: string
    role: string
  }
  rsvps: Array<{
    id: string
    name: string
    email: string
    createdAt: string
  }>
}

interface UserStat {
  role: string
  _count: {
    role: number
  }
}

interface ReportData {
  events: Event[]
  userStats: UserStat[]
  totalEvents: number
  totalRSVPs: number
  upcomingEvents: number
  pastEvents: number
}

interface ReportsContentProps {
  data: ReportData
  userRole?: string
}

export default function ReportsContent({ data, userRole }: ReportsContentProps) {
  const [dateFilter, setDateFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date")

  const { events, userStats, totalEvents, totalRSVPs, upcomingEvents, pastEvents } = data

  const getFilteredEvents = () => {
    const now = new Date()
    let filtered = events

    switch (dateFilter) {
      case "last-7-days":
        const sevenDaysAgo = subDays(now, 7)
        filtered = events.filter((event) => isAfter(new Date(event.createdAt), sevenDaysAgo))
        break
      case "last-30-days":
        const thirtyDaysAgo = subDays(now, 30)
        filtered = events.filter((event) => isAfter(new Date(event.createdAt), thirtyDaysAgo))
        break
      case "upcoming":
        filtered = events.filter((event) => isAfter(new Date(event.datetime), now))
        break
      case "past":
        filtered = events.filter((event) => isBefore(new Date(event.datetime), now))
        break
      default:
        filtered = events
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "rsvps":
          return b.rsvps.length - a.rsvps.length
        case "title":
          return a.title.localeCompare(b.title)
        case "date":
        default:
          return new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
      }
    })
  }

  const filteredEvents = getFilteredEvents()

  const avgRSVPs = totalEvents > 0 ? Math.round(totalRSVPs / totalEvents) : 0

  const topEvents = [...events].sort((a, b) => b.rsvps.length - a.rsvps.length).slice(0, 5)

  const recentRSVPs = events
    .flatMap((event) =>
      event.rsvps.map((rsvp) => ({
        ...rsvp,
        eventTitle: event.title,
        eventId: event.id,
      })),
    )
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10)

  const exportToCSV = () => {
    const csvData = [
      ["Event Title", "Location", "Date", "Owner", "RSVPs", "Status"],
      ...filteredEvents.map((event) => [
        event.title,
        event.location,
        format(new Date(event.datetime), "PPP"),
        event.owner.name,
        event.rsvps.length.toString(),
        new Date(event.datetime) > new Date() ? "Upcoming" : "Past",
      ]),
    ]

    const csvContent = csvData.map((row) => row.map((field) => `"${field}"`).join(",")).join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `events-report-${format(new Date(), "yyyy-MM-dd")}.csv`
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6  ">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Event Reports & Analytics</h1>
          <p className="text-sm sm:text-base text-gray-600">Comprehensive insights into event performance and user engagement</p>
        </div>
        <Button onClick={exportToCSV} className="w-full sm:w-auto">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEvents}</div>
            <p className="text-xs text-muted-foreground">
              {upcomingEvents} upcoming, {pastEvents} past
            </p>
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
            <CardTitle className="text-sm font-medium">Avg RSVPs/Event</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgRSVPs}</div>
            <p className="text-xs text-muted-foreground">Average attendance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.reduce((sum, stat) => sum + stat._count.role, 0)}</div>
            <p className="text-xs text-muted-foreground">Total registered users</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Reports */}
      <Tabs defaultValue="events" className="w-full"> 
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 h-auto">
          <TabsTrigger value="events" className="text-xs sm:text-sm px-2 py-2">Events Overview</TabsTrigger>
          <TabsTrigger value="performance" className="text-xs sm:text-sm px-2 py-2">Top Performing</TabsTrigger>
          <TabsTrigger value="rsvps" className="text-xs sm:text-sm px-2 py-2">Recent RSVPs</TabsTrigger>
          {userRole === "ADMIN" && <TabsTrigger value="users" className="text-xs sm:text-sm px-2 py-2">User Analytics</TabsTrigger>}
        </TabsList>

        <TabsContent value="events" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
                <div className="space-y-1">
                  <CardTitle className="text-lg sm:text-xl">Events Overview</CardTitle>
                  <CardDescription className="text-sm">Detailed view of all events with filtering options</CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                      <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="past">Past Events</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="title">Title</SelectItem>
                      <SelectItem value="rsvps">RSVPs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 sm:p-6">
              {/* Mobile Card View */}
              <div className="block lg:hidden space-y-4 p-4 sm:p-6">
                {filteredEvents.map((event) => (
                  <Card key={event.id} className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium truncate">{event.title}</h3>
                          <p className="text-sm text-gray-500 line-clamp-2">{event.description}</p>
                        </div>
                        <Badge
                          variant={new Date(event.datetime) > new Date() ? "default" : "secondary"}
                          className={`ml-2 ${
                            new Date(event.datetime) > new Date()
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {new Date(event.datetime) > new Date() ? "Upcoming" : "Past"}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">Date:</span> {format(new Date(event.datetime), "MMM d, yyyy")}
                        </div>
                        <div>
                          <span className="text-gray-500">RSVPs:</span> 
                          <Badge variant="secondary" className="ml-1">{event.rsvps.length}</Badge>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1 text-gray-400" />
                          <span className="truncate">{event.location}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Owner:</span> {event.owner.name}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>RSVPs</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEvents.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{event.title}</div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">{event.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>{format(new Date(event.datetime), "MMM d, yyyy")}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                            <span className="truncate max-w-xs">{event.location}</span>
                          </div>
                        </TableCell>
                        <TableCell>{event.owner.name}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{event.rsvps.length}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={new Date(event.datetime) > new Date() ? "default" : "secondary"}
                            className={
                              new Date(event.datetime) > new Date()
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }
                          >
                            {new Date(event.datetime) > new Date() ? "Upcoming" : "Past"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg sm:text-xl">
                <BarChart3 className="w-5 h-5 mr-2" />
                Top Performing Events
              </CardTitle>
              <CardDescription>Events with the highest RSVP counts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topEvents.map((event, index) => (
                  <div key={event.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium truncate">{event.title}</h3>
                        <p className="text-sm text-gray-500">{format(new Date(event.datetime), "MMM d, yyyy")}</p>
                      </div>
                    </div>
                    <div className="text-center sm:text-right flex-shrink-0">
                      <div className="text-2xl font-bold">{event.rsvps.length}</div>
                      <div className="text-sm text-gray-500">RSVPs</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rsvps" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Recent RSVPs</CardTitle>
              <CardDescription>Latest event registrations across all events</CardDescription>
            </CardHeader>
            <CardContent className="p-0 sm:p-6">
              {/* Mobile Card View */}
              <div className="block lg:hidden space-y-4 p-4 sm:p-6">
                {recentRSVPs.map((rsvp) => (
                  <Card key={rsvp.id} className="p-4">
                    <div className="space-y-2">
                      <div className="font-medium">{rsvp.name}</div>
                      <div className="text-sm text-gray-600">{rsvp.email}</div>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <Link href={`/event/${rsvp.eventId}`} className="text-blue-600 hover:underline text-sm truncate">
                          {rsvp.eventTitle}
                        </Link>
                        <div className="text-xs text-gray-500">
                          {format(new Date(rsvp.createdAt), "MMM d, yyyy h:mm a")}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Event</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentRSVPs.map((rsvp) => (
                      <TableRow key={rsvp.id}>
                        <TableCell className="font-medium">{rsvp.name}</TableCell>
                        <TableCell>{rsvp.email}</TableCell>
                        <TableCell>
                          <Link href={`/event/${rsvp.eventId}`} className="text-blue-600 hover:underline">
                            {rsvp.eventTitle}
                          </Link>
                        </TableCell>
                        <TableCell>{format(new Date(rsvp.createdAt), "MMM d, yyyy h:mm a")}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {userRole === "ADMIN" && (
          <TabsContent value="users" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg sm:text-xl">
                  <PieChart className="w-5 h-5 mr-2" />
                  User Analytics
                </CardTitle>
                <CardDescription>Breakdown of users by role</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userStats.map((stat) => (
                    <div key={stat.role} className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold">{stat._count.role}</div>
                      <div className="text-sm text-gray-500">{stat.role.replace("_", " ")}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}