// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Calendar, Users, Plus, Edit, Trash2, ExternalLink } from "lucide-react"
// import { format } from "date-fns"
// import Link from "next/link"
// import { useRouter } from "next/navigation"

// interface Event {
//   id: string
//   title: string
//   description: string | null
//   location: string
//   datetime: string
//   owner: {
//     name: string
//     email: string
//   }
//   rsvps: Array<{
//     id: string
//     name: string
//     email: string
//   }>
// }

// interface DashboardUser {
//   id: string
//   name?: string | null
//   email?: string | null
//   role?: string
// }

// interface DashboardContentProps {
//   events: Event[]
//   user: DashboardUser
// }

// export default function DashboardContent({ events, user }: DashboardContentProps) {
//   const [loading, setLoading] = useState<string | null>(null)
//   const router = useRouter()

//   const handleDeleteEvent = async (eventId: string) => {
//     if (!confirm("Are you sure you want to delete this event?")) return

//     setLoading(eventId)
//     try {
//       const response = await fetch(`/api/events/${eventId}`, {
//         method: "DELETE",
//       })

//       if (response.ok) {
//         router.refresh()
//       }
//     } catch (error) {
//       console.error("Error deleting event:", error)
//     } finally {
//       setLoading(null)
//     }
//   }

//   const exportRSVPs = async (eventId: string, eventTitle: string) => {
//     try {
//       const response = await fetch(`/api/events/${eventId}/export`)
//       const blob = await response.blob()
//       const url = window.URL.createObjectURL(blob)
//       const a = document.createElement("a")
//       a.href = url
//       a.download = `${eventTitle}-rsvps.csv`
//       document.body.appendChild(a)
//       a.click()
//       window.URL.revokeObjectURL(url)
//       document.body.removeChild(a)
//     } catch (error) {
//       console.error("Error exporting RSVPs:", error)
//     }
//   }

//   return (
//     <div className="flex-1 p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
//       {/* Page Header */}
//       <div className="mb-6 lg:mb-8">
//         <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Events</CardTitle>
//             <Calendar className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{events.length}</div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total RSVPs</CardTitle>
//             <Users className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{events.reduce((total, event) => total + event.rsvps.length, 0)}</div>
//           </CardContent>
//         </Card>

//         <Card className="sm:col-span-2 lg:col-span-1">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
//             <Calendar className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               {events.filter((event) => new Date(event.datetime) > new Date()).length}
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Events List */}
//       <div className="space-y-4 lg:space-y-6">
//         <h2 className="text-xl sm:text-2xl font-bold">Your Events</h2>

//         {events.length === 0 ? (
//           <Card>
//             <CardContent className="text-center py-8 sm:py-12">
//               <Calendar className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-4" />
//               <h3 className="text-lg font-semibold mb-2">No events yet</h3>
//               <p className="text-gray-600 mb-4">Create your first event to get started</p>
//               <Button asChild>
//                 <Link href="/dashboard/events/new">Create Event</Link>
//               </Button>
//             </CardContent>
//           </Card>
//         ) : (
//           <div className="grid gap-4 lg:gap-6">
//             {events.map((event) => (
//               <Card key={event.id}>
//                 <CardHeader>
//                   <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
//                     <div className="flex-1 min-w-0">
//                       <CardTitle className="text-lg sm:text-xl break-words">{event.title}</CardTitle>
//                       {event.description && (
//                         <CardDescription className="mt-2 break-words">{event.description}</CardDescription>
//                       )}
//                     </div>
//                     <div className="flex flex-wrap gap-2 sm:flex-nowrap">
//                       <Button variant="outline" size="sm" asChild className="flex-1 sm:flex-none">
//                         <Link href={`/event/${event.id}`}>
//                           <ExternalLink className="w-4 h-4 sm:mr-0 mr-2" />
//                           <span className="sm:sr-only">View</span>
//                         </Link>
//                       </Button>
//                       <Button variant="outline" size="sm" asChild className="flex-1 sm:flex-none">
//                         <Link href={`/dashboard/events/${event.id}/edit`}>
//                           <Edit className="w-4 h-4 sm:mr-0 mr-2" />
//                           <span className="sm:sr-only">Edit</span>
//                         </Link>
//                       </Button>
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => handleDeleteEvent(event.id)}
//                         disabled={loading === event.id}
//                         className="flex-1 sm:flex-none"
//                       >
//                         <Trash2 className="w-4 h-4 sm:mr-0 mr-2" />
//                         <span className="sm:sr-only">Delete</span>
//                       </Button>
//                     </div>
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                       <p className="text-sm text-gray-600 flex items-start">
//                         <Calendar className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
//                         <span className="break-words">
//                           {format(new Date(event.datetime), "PPP p")}
//                         </span>
//                       </p>
//                       <p className="text-sm text-gray-600 flex items-start">
//                         <span className="mr-2 mt-0.5">📍</span>
//                         <span className="break-words">{event.location}</span>
//                       </p>
//                       {user.role === "ADMIN" && (
//                         <p className="text-sm text-gray-600 flex items-start">
//                           <span className="mr-2 mt-0.5">👤</span>
//                           <span className="break-words">{event.owner.name}</span>
//                         </p>
//                       )}
//                     </div>
//                     <div>
//                       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
//                         <span className="text-sm font-medium">RSVPs: {event.rsvps.length}</span>
//                         {event.rsvps.length > 0 && (
//                           <Button 
//                             variant="outline" 
//                             size="sm" 
//                             onClick={() => exportRSVPs(event.id, event.title)}
//                             className="w-full sm:w-auto"
//                           >
//                             Export CSV
//                           </Button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Plus, Edit, Trash2, ExternalLink, Clock, MapPin, Download, TrendingUp, Eye } from "lucide-react"
import { format } from "date-fns"
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
  }
  rsvps: Array<{
    id: string
    name: string
    email: string
  }>
}

interface DashboardUser {
  id: string
  name?: string | null
  email?: string | null
  role?: string
}

interface DashboardContentProps {
  events: Event[]
  user: DashboardUser
}

export default function DashboardContent({ events, user }: DashboardContentProps) {
  const [loading, setLoading] = useState<string | null>(null)
  const router = useRouter()

  // Calculate stats
  const totalRSVPs = events.reduce((total, event) => total + event.rsvps.length, 0)
  const upcomingEvents = events.filter((event) => new Date(event.datetime) > new Date())

  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return

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

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8 bg-slate-50 min-h-screen">
      {/* Page Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Dashboard</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
        <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 sm:pb-3">
            <CardTitle className="text-xs sm:text-sm font-medium text-slate-600">Total Events</CardTitle>
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-slate-100 rounded-lg flex items-center justify-center">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-slate-600" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl sm:text-3xl font-bold text-slate-900">{events.length}</div>
            <p className="text-xs text-slate-500 mt-1">All time events</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 sm:pb-3">
            <CardTitle className="text-xs sm:text-sm font-medium text-slate-600">Total RSVPs</CardTitle>
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Users className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl sm:text-3xl font-bold text-slate-900">{totalRSVPs}</div>
            <p className="text-xs text-slate-500 mt-1">Total attendees</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 sm:pb-3">
            <CardTitle className="text-xs sm:text-sm font-medium text-slate-600">Upcoming</CardTitle>
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl sm:text-3xl font-bold text-slate-900">{upcomingEvents.length}</div>
            <p className="text-xs text-slate-500 mt-1">Events coming up</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 sm:pb-3">
            <CardTitle className="text-xs sm:text-sm font-medium text-slate-600">Avg. RSVPs</CardTitle>
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Eye className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl sm:text-3xl font-bold text-slate-900">
              {events.length > 0 ? Math.round(totalRSVPs / events.length) : 0}
            </div>
            <p className="text-xs text-slate-500 mt-1">Per event</p>
          </CardContent>
        </Card>
      </div>

      {/* Events Section */}
      <div className="space-y-6 sm:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Your Events</h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">Manage and track all your events</p>
          </div>
        </div>

        {events.length === 0 ? (
          <Card className="border-slate-200">
            <CardContent className="text-center py-12 sm:py-16 px-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">No events yet</h3>
              <p className="text-sm sm:text-base text-slate-600 mb-6 max-w-md mx-auto">
                Get started by creating your first event. It only takes a few minutes to set up!
              </p>
              <Button 
                className="bg-slate-900 hover:bg-slate-800 text-white shadow-lg w-full sm:w-auto"
                asChild
              >
                <Link href="/dashboard/events/new">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Event
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:gap-6">
            {events.map((event) => {
              const isUpcoming = new Date(event.datetime) > new Date()
              const eventDate = new Date(event.datetime)
              
              return (
                <Card key={event.id} className="border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 hover:border-slate-300">
                  <CardHeader className="pb-3 sm:pb-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-0">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                          <CardTitle className="text-lg sm:text-xl text-slate-900 break-words">{event.title}</CardTitle>
                          <Badge 
                            variant={isUpcoming ? "default" : "secondary"}
                            className={`w-fit ${isUpcoming 
                              ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" 
                              : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {isUpcoming ? "Upcoming" : "Past"}
                          </Badge>
                        </div>
                        {event.description && (
                          <CardDescription className="text-slate-600 text-sm sm:text-base leading-relaxed break-words">
                            {event.description}
                          </CardDescription>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 sm:ml-4 flex-shrink-0">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          asChild
                          className="border-slate-300 text-slate-600 hover:bg-slate-50"
                        >
                          <Link href={`/event/${event.id}`}>
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          asChild
                          className="border-slate-300 text-slate-600 hover:bg-slate-50"
                        >
                          <Link href={`/dashboard/events/${event.id}/edit`}>
                            <Edit className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteEvent(event.id)}
                          disabled={loading === event.id}
                          className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-3">
                        <div className="flex items-start text-slate-600">
                          <Clock className="w-4 h-4 mr-3 text-slate-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm break-words">
                            {format(eventDate, "EEEE, MMMM d, yyyy 'at' h:mm a")}
                          </span>
                        </div>
                        <div className="flex items-start text-slate-600">
                          <MapPin className="w-4 h-4 mr-3 text-slate-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm break-words">{event.location}</span>
                        </div>
                        {user.role === "ADMIN" && (
                          <div className="flex items-start text-slate-600">
                            <Users className="w-4 h-4 mr-3 text-slate-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm break-words">Created by {event.owner.name}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="text-center sm:text-left">
                          <div className="text-xl sm:text-2xl font-bold text-slate-900">{event.rsvps.length}</div>
                          <div className="text-sm text-slate-500">RSVPs</div>
                        </div>
                        {event.rsvps.length > 0 && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => exportRSVPs(event.id, event.title)}
                            className="border-slate-300 text-slate-600 hover:bg-slate-50 w-full sm:w-auto"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            <span className="sm:hidden">Export</span>
                            <span className="hidden sm:inline">Export CSV</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
