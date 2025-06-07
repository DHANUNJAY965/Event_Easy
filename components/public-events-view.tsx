// "use client"

// import { useState, useMemo } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Calendar, MapPin, Users, Search, Filter, Clock } from "lucide-react"
// import { format, isAfter, isBefore, addDays } from "date-fns"
// import Link from "next/link"
// import { motion } from "framer-motion"

// interface Event {
//   id: string
//   title: string
//   description: string | null
//   location: string
//   datetime: string
//   owner: {
//     name: string
//   }
//   _count: {
//     rsvps: number
//   }
// }

// interface PublicEventsViewProps {
//   events: Event[]
// }

// export default function PublicEventsView({ events }: PublicEventsViewProps) {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [filterType, setFilterType] = useState("all")
//   const [sortBy, setSortBy] = useState("date")

//   const filteredAndSortedEvents = useMemo(() => {
//     let filtered = events

//     if (searchTerm) {
//       filtered = filtered.filter(
//         (event) =>
//           event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           event.owner.name.toLowerCase().includes(searchTerm.toLowerCase()),
//       )
//     }

//     const now = new Date()
//     if (filterType === "upcoming") {
//       filtered = filtered.filter((event) => isAfter(new Date(event.datetime), now))
//     } else if (filterType === "past") {
//       filtered = filtered.filter((event) => isBefore(new Date(event.datetime), now))
//     } else if (filterType === "this-week") {
//       const weekFromNow = addDays(now, 7)
//       filtered = filtered.filter(
//         (event) => isAfter(new Date(event.datetime), now) && isBefore(new Date(event.datetime), weekFromNow),
//       )
//     }

//     filtered.sort((a, b) => {
//       switch (sortBy) {
//         case "date":
//           return new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
//         case "title":
//           return a.title.localeCompare(b.title)
//         case "rsvps":
//           return b._count.rsvps - a._count.rsvps
//         default:
//           return 0
//       }
//     })

//     return filtered
//   }, [events, searchTerm, filterType, sortBy])

//   const upcomingEvents = events.filter((event) => isAfter(new Date(event.datetime), new Date()))
//   const pastEvents = events.filter((event) => isBefore(new Date(event.datetime), new Date()))

//   const getEventStatus = (datetime: string) => {
//     const eventDate = new Date(datetime)
//     const now = new Date()

//     if (isAfter(eventDate, now)) {
//       return { status: "upcoming", color: "bg-green-100 text-green-800" }
//     } else {
//       return { status: "past", color: "bg-gray-100 text-gray-800" }
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       {/* Header */}
//       <section className="py-12 px-4">
//         <div className="container mx-auto">
//           <div className="text-center mb-8">
//             <h1 className="text-4xl font-bold text-gray-900 mb-4">All Events</h1>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Discover amazing events happening around you. From conferences to workshops, find your next great
//               experience.
//             </p>
//           </div>

//           {/* Stats */}
//           <div className="grid md:grid-cols-3 gap-6 mb-8">
//             <Card>
//               <CardHeader className="text-center">
//                 <CardTitle className="text-2xl font-bold">{events.length}</CardTitle>
//                 <CardDescription>Total Events</CardDescription>
//               </CardHeader>
//             </Card>
//             <Card>
//               <CardHeader className="text-center">
//                 <CardTitle className="text-2xl font-bold">{upcomingEvents.length}</CardTitle>
//                 <CardDescription>Upcoming Events</CardDescription>
//               </CardHeader>
//             </Card>
//             <Card>
//               <CardHeader className="text-center">
//                 <CardTitle className="text-2xl font-bold">
//                   {events.reduce((total, event) => total + event._count.rsvps, 0)}
//                 </CardTitle>
//                 <CardDescription>Total RSVPs</CardDescription>
//               </CardHeader>
//             </Card>
//           </div>

//           {/* Filters and Search */}
//           <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
//             <div className="grid md:grid-cols-4 gap-4">
//               <div className="relative">
//                 <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                 <Input
//                   placeholder="Search events..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10"
//                 />
//               </div>

//               <Select value={filterType} onValueChange={setFilterType}>
//                 <SelectTrigger>
//                   <Filter className="w-4 h-4 mr-2" />
//                   <SelectValue placeholder="Filter by time" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Events</SelectItem>
//                   <SelectItem value="upcoming">Upcoming</SelectItem>
//                   <SelectItem value="this-week">This Week</SelectItem>
//                   <SelectItem value="past">Past Events</SelectItem>
//                 </SelectContent>
//               </Select>

//               <Select value={sortBy} onValueChange={setSortBy}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Sort by" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="date">Date</SelectItem>
//                   <SelectItem value="title">Title</SelectItem>
//                   <SelectItem value="rsvps">RSVPs</SelectItem>
//                 </SelectContent>
//               </Select>

//               <Button variant="outline" asChild>
//                 <Link href="/">Back to Home</Link>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Events Grid */}
//       <section className="pb-12 px-4">
//         <div className="container mx-auto">
//           {filteredAndSortedEvents.length === 0 ? (
//             <Card className="text-center py-12">
//               <CardContent>
//                 <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                 <h3 className="text-xl font-semibold mb-2">No events found</h3>
//                 <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
//               </CardContent>
//             </Card>
//           ) : (
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredAndSortedEvents.map((event, index) => {
//                 const eventStatus = getEventStatus(event.datetime)
//                 return (
//                   <motion.div
//                     key={event.id}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.3, delay: index * 0.1 }}
//                   >
//                     <Link href={`/event/${event.id}`}>
//                       <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group">
//                         <CardHeader>
//                           <div className="flex justify-between items-start mb-2">
//                             <Badge className={eventStatus.color}>{eventStatus.status}</Badge>
//                             <div className="flex items-center text-sm text-gray-500">
//                               <Users className="w-4 h-4 mr-1" />
//                               {event._count.rsvps}
//                             </div>
//                           </div>
//                           <CardTitle className="group-hover:text-blue-600 transition-colors">{event.title}</CardTitle>
//                           <CardDescription className="line-clamp-2">{event.description}</CardDescription>
//                         </CardHeader>
//                         <CardContent>
//                           <div className="space-y-2">
//                             <div className="flex items-center text-sm text-gray-600">
//                               <Calendar className="w-4 h-4 mr-2 text-blue-500" />
//                               <span>{format(new Date(event.datetime), "PPP")}</span>
//                             </div>
//                             <div className="flex items-center text-sm text-gray-600">
//                               <Clock className="w-4 h-4 mr-2 text-green-500" />
//                               <span>{format(new Date(event.datetime), "p")}</span>
//                             </div>
//                             <div className="flex items-center text-sm text-gray-600">
//                               <MapPin className="w-4 h-4 mr-2 text-red-500" />
//                               <span className="truncate">{event.location}</span>
//                             </div>
//                             <div className="flex items-center text-sm text-gray-600 pt-2 border-t">
//                               <span className="text-xs">Organized by {event.owner.name}</span>
//                             </div>
//                           </div>
//                         </CardContent>
//                       </Card>
//                     </Link>
//                   </motion.div>
//                 )
//               })}
//             </div>
//           )}
//         </div>
//       </section>
//     </div>
//   )
// }

"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Users, Search, Filter, Clock, Eye, TrendingUp } from "lucide-react"
import { format, isAfter, isBefore, addDays } from "date-fns"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"

interface Event {
  id: string
  title: string
  description: string | null
  location: string
  datetime: string
  owner: {
    name: string
  }
  _count: {
    rsvps: number
  }
}

interface PublicEventsViewProps {
  events: Event[]
}

export default function PublicEventsView({ events }: PublicEventsViewProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [sortBy, setSortBy] = useState("date")

  const filteredAndSortedEvents = useMemo(() => {
    let filtered = events

    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.owner.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    const now = new Date()
    if (filterType === "upcoming") {
      filtered = filtered.filter((event) => isAfter(new Date(event.datetime), now))
    } else if (filterType === "past") {
      filtered = filtered.filter((event) => isBefore(new Date(event.datetime), now))
    } else if (filterType === "this-week") {
      const weekFromNow = addDays(now, 7)
      filtered = filtered.filter(
        (event) => isAfter(new Date(event.datetime), now) && isBefore(new Date(event.datetime), weekFromNow),
      )
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
        case "title":
          return a.title.localeCompare(b.title)
        case "rsvps":
          return b._count.rsvps - a._count.rsvps
        default:
          return 0
      }
    })

    return filtered
  }, [events, searchTerm, filterType, sortBy])

  const upcomingEvents = events.filter((event) => isAfter(new Date(event.datetime), new Date()))
  const pastEvents = events.filter((event) => isBefore(new Date(event.datetime), new Date()))
  const totalRSVPs = events.reduce((total, event) => total + event._count.rsvps, 0)

  const getEventStatus = (datetime: string) => {
    const eventDate = new Date(datetime)
    const now = new Date()

    if (isAfter(eventDate, now)) {
      return { status: "upcoming", color: "bg-emerald-100 text-emerald-700" }
    } else {
      return { status: "past", color: "bg-slate-100 text-slate-600" }
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="py-8 sm:py-12 px-4">
        <div className="container mx-auto">
          {/* Brand Header */}
          <div className="flex items-center justify-center mb-8">
            <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center mr-4">
              <Image
                src="/logo5.png"
                alt="Calendar icon"
                width={48}
                height={48}
                className="text-white"
              />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">EventEasy</h1>
          </div>

          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Discover Events</h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
              Find amazing events happening around you. From conferences to workshops, discover your next great
              experience.
            </p>
          </div>

          {/* Stats Grid - Matching Dashboard Style */}
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
                <p className="text-xs text-slate-500 mt-1">Available events</p>
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

          {/* Filters and Search */}
          <Card className="border-slate-200 shadow-sm mb-8">
            <CardContent className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-slate-300 focus:border-slate-500"
                  />
                </div>

                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="border-slate-300 focus:border-slate-500">
                    <Filter className="w-4 h-4 mr-2 text-slate-500" />
                    <SelectValue placeholder="Filter by time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Events</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="this-week">This Week</SelectItem>
                    <SelectItem value="past">Past Events</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="border-slate-300 focus:border-slate-500">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="title">Title</SelectItem>
                    <SelectItem value="rsvps">RSVPs</SelectItem>
                  </SelectContent>
                </Select>

                <Button 
                  variant="outline" 
                  asChild
                  className="border-slate-300 text-slate-600 hover:bg-slate-50"
                >
                  <Link href="/">← Back to Home</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Events Grid */}
      <section className="pb-12 px-4">
        <div className="container mx-auto">
          {filteredAndSortedEvents.length === 0 ? (
            <Card className="border-slate-200 shadow-sm">
              <CardContent className="text-center py-12 sm:py-16 px-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">No events found</h3>
                <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto">
                  Try adjusting your search or filter criteria to find more events.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredAndSortedEvents.map((event, index) => {
                const eventStatus = getEventStatus(event.datetime)
                const eventDate = new Date(event.datetime)
                
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link href={`/event/${event.id}`}>
                      <Card className="h-full border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 hover:border-slate-300 cursor-pointer group">
                        <CardHeader className="pb-3 sm:pb-4">
                          <div className="flex justify-between items-start mb-2">
                            <Badge className={eventStatus.color}>
                              {eventStatus.status}
                            </Badge>
                            <div className="flex items-center text-sm text-slate-500">
                              <Users className="w-4 h-4 mr-1" />
                              {event._count.rsvps}
                            </div>
                          </div>
                          <CardTitle className="text-lg sm:text-xl text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {event.title}
                          </CardTitle>
                          {event.description && (
                            <CardDescription className="text-slate-600 line-clamp-2">
                              {event.description}
                            </CardDescription>
                          )}
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="space-y-3">
                            <div className="flex items-start text-slate-600">
                              <Calendar className="w-4 h-4 mr-3 text-blue-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">
                                {format(eventDate, "EEEE, MMMM d, yyyy")}
                              </span>
                            </div>
                            <div className="flex items-start text-slate-600">
                              <Clock className="w-4 h-4 mr-3 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">
                                {format(eventDate, "h:mm a")}
                              </span>
                            </div>
                            <div className="flex items-start text-slate-600">
                              <MapPin className="w-4 h-4 mr-3 text-red-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm truncate">{event.location}</span>
                            </div>
                            <div className="flex items-center text-slate-600 pt-2 border-t border-slate-200">
                              <span className="text-xs">Organized by {event.owner.name}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}