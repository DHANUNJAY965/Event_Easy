// "use client"

// import type React from "react"
// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { Badge } from "@/components/ui/badge"
// import { Calendar, MapPin, User, Users, Clock, CheckCircle } from "lucide-react"


// interface Event {
//   id: string
//   title: string
//   description: string | null
//   location: string
//   datetime: string
//   owner: {
//     name: string
//   }
//   rsvps: Array<{ id: string }>
// }

// interface EventPublicViewProps {
//   event: Event
// }

// export default function EventPublicView({ event }: EventPublicViewProps) {
//   const [rsvpData, setRsvpData] = useState({ name: "", email: "" })
//   const [loading, setLoading] = useState(false)
//   const [success, setSuccess] = useState(false)
//   const [error, setError] = useState("")

//   const handleRSVP = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)
//     setError("")

//     try {
//       const response = await fetch(`/api/events/${event.id}/rsvp`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(rsvpData),
//       })

//       if (response.ok) {
//         setSuccess(true)
//         setRsvpData({ name: "", email: "" })
//       } else {
//         const data = await response.json()
//         setError(data.error || "Something went wrong")
//       }
//     } catch (error) {
//       setError("Something went wrong")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const isEventPast = new Date(event.datetime) < new Date()

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Section */}
//       <div className="bg-white border-b border-gray-200">
//         <div className="px-6 py-12">
//           <div className="mx-auto max-w-4xl">
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 {isEventPast && (
//                   <Badge variant="secondary" className="mb-4">
//                     Past Event
//                   </Badge>
//                 )}
//                 <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
//                   {event.title}
//                 </h1>
//                 {event.description && (
//                   <p className="text-lg text-gray-600 max-w-2xl">
//                     {event.description}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="px-6 py-8">
//         <div className="mx-auto max-w-6xl">
//           <div className="grid lg:grid-cols-3 gap-8">
            
//             {/* Event Details Card */}
//             <div className="lg:col-span-2">
//               <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
//                 <CardContent className="p-8">
//                   <h2 className="text-2xl font-semibold text-gray-900 mb-8">Event Details</h2>
                  
//                   <div className="grid sm:grid-cols-2 gap-6">
//                     <div className="group hover:scale-105 transition-transform duration-200">
//                       <div className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
//                         <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
//                           <Calendar className="w-6 h-6 text-white" />
//                         </div>
//                         <div>
//                           <h3 className="font-semibold text-gray-900 mb-1">Date & Time</h3>
//                           <p className="text-gray-700 font-medium">
//                             {new Date(event.datetime).toLocaleDateString('en-US', { 
//                               weekday: 'long', 
//                               year: 'numeric', 
//                               month: 'long', 
//                               day: 'numeric' 
//                             })}
//                           </p>
//                           <p className="text-gray-600 text-sm">
//                             {new Date(event.datetime).toLocaleTimeString('en-US', { 
//                               hour: 'numeric', 
//                               minute: '2-digit', 
//                               hour12: true 
//                             })}
//                           </p>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="group hover:scale-105 transition-transform duration-200">
//                       <div className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-br from-red-50 to-pink-50 border border-red-100">
//                         <div className="flex-shrink-0 w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
//                           <MapPin className="w-6 h-6 text-white" />
//                         </div>
//                         <div>
//                           <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
//                           <p className="text-gray-700">{event.location}</p>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="group hover:scale-105 transition-transform duration-200">
//                       <div className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
//                         <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
//                           <User className="w-6 h-6 text-white" />
//                         </div>
//                         <div>
//                           <h3 className="font-semibold text-gray-900 mb-1">Organized by</h3>
//                           <p className="text-gray-700">{event.owner.name}</p>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="group hover:scale-105 transition-transform duration-200">
//                       <div className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-100">
//                         <div className="flex-shrink-0 w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
//                           <Users className="w-6 h-6 text-white" />
//                         </div>
//                         <div>
//                           <h3 className="font-semibold text-gray-900 mb-1">Attendees</h3>
//                           <p className="text-gray-700">
//                             <span className="font-semibold text-purple-600">{event.rsvps.length}</span> people attending
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* RSVP Card */}
//             <div className="lg:col-span-1">
//               <div className="sticky top-8">
//                 {success ? (
//                   <Card className="shadow-xl border-0 bg-gradient-to-br from-green-50 to-emerald-50">
//                     <CardContent className="p-8 text-center">
//                       <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
//                         <CheckCircle className="w-8 h-8 text-white" />
//                       </div>
//                       <h3 className="text-xl font-semibold text-green-900 mb-2">You're All Set!</h3>
//                       <p className="text-green-700">
//                         Thank you for your RSVP! We look forward to seeing you at the event.
//                       </p>
//                     </CardContent>
//                   </Card>
//                 ) : (
//                   <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
//                     <CardHeader className="text-center pb-4">
//                       <CardTitle className="text-2xl text-gray-900">
//                         {isEventPast ? "Event Concluded" : "Join This Event"}
//                       </CardTitle>
//                       <CardDescription className="text-base">
//                         {isEventPast 
//                           ? "This event has already taken place" 
//                           : "Reserve your spot today!"
//                         }
//                       </CardDescription>
//                     </CardHeader>
//                     <CardContent className="px-8 pb-8">
//                       {!isEventPast ? (
//                         <div onSubmit={handleRSVP} className="space-y-6">
//                           {error && (
//                             <Alert className="border-red-200 bg-red-50">
//                               <AlertDescription className="text-red-700">{error}</AlertDescription>
//                             </Alert>
//                           )}

//                           <div className="space-y-2">
//                             <Label htmlFor="name" className="text-gray-700 font-medium">Your Name</Label>
//                             <Input
//                               id="name"
//                               placeholder="Enter your full name"
//                               value={rsvpData.name}
//                               onChange={(e) => setRsvpData({ ...rsvpData, name: e.target.value })}
//                               className="h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
//                               required
//                             />
//                           </div>

//                           <div className="space-y-2">
//                             <Label htmlFor="email" className="text-gray-700 font-medium">Email Address</Label>
//                             <Input
//                               id="email"
//                               type="email"
//                               placeholder="Enter your email"
//                               value={rsvpData.email}
//                               onChange={(e) => setRsvpData({ ...rsvpData, email: e.target.value })}
//                               className="h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
//                               required
//                             />
//                           </div>

//                           <Button 
//                             onClick={handleRSVP}
//                             type="button" 
//                             className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105" 
//                             disabled={loading}
//                           >
//                             {loading ? (
//                               <div className="flex items-center space-x-2">
//                                 <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                                 <span>Confirming...</span>
//                               </div>
//                             ) : (
//                               "Confirm Attendance"
//                             )}
//                           </Button>
//                         </div>
//                       ) : (
//                         <div className="text-center py-8">
//                           <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                           <p className="text-gray-500">RSVP is no longer available for this event.</p>
//                         </div>
//                       )}
//                     </CardContent>
//                   </Card>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, User, Users, Clock, CheckCircle } from "lucide-react"

interface Event {
  id: string
  title: string
  description: string | null
  location: string
  datetime: string
  owner: {
    name: string
  }
  rsvps: Array<{ id: string }>
}

interface EventPublicViewProps {
  event: Event
}

export default function EventPublicView({ event }: EventPublicViewProps) {
  const [rsvpData, setRsvpData] = useState({ name: "", email: "" })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleRSVP = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch(`/api/events/${event.id}/rsvp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rsvpData),
      })

      if (response.ok) {
        setSuccess(true)
        setRsvpData({ name: "", email: "" })
      } else {
        const data = await response.json()
        setError(data.error || "Something went wrong")
      }
    } catch (error) {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const isEventPast = new Date(event.datetime) < new Date()
  const eventDate = new Date(event.datetime)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                {isEventPast && (
                  <Badge 
                    variant="secondary" 
                    className="mb-4 bg-slate-100 text-slate-600"
                  >
                    Past Event
                  </Badge>
                )}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
                  {event.title}
                </h1>
                {event.description && (
                  <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
                    {event.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Event Details Card */}
            <div className="lg:col-span-2">
              <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardHeader className="pb-4 sm:pb-6">
                  <CardTitle className="text-xl sm:text-2xl font-bold text-slate-900">Event Details</CardTitle>
                </CardHeader>
                <CardContent className="p-6 sm:p-8 pt-0">
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="group">
                      <div className="flex items-start space-x-4 p-4 sm:p-5 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors duration-200 bg-white">
                        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                          <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-slate-900 mb-1 text-sm sm:text-base">Date & Time</h3>
                          <p className="text-slate-700 font-medium text-sm sm:text-base break-words">
                            {eventDate.toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </p>
                          <p className="text-slate-500 text-xs sm:text-sm">
                            {eventDate.toLocaleTimeString('en-US', { 
                              hour: 'numeric', 
                              minute: '2-digit', 
                              hour12: true 
                            })}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="group">
                      <div className="flex items-start space-x-4 p-4 sm:p-5 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors duration-200 bg-white">
                        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                          <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-slate-900 mb-1 text-sm sm:text-base">Location</h3>
                          <p className="text-slate-700 text-sm sm:text-base break-words">{event.location}</p>
                        </div>
                      </div>
                    </div>

                    <div className="group">
                      <div className="flex items-start space-x-4 p-4 sm:p-5 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors duration-200 bg-white">
                        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                          <User className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-slate-900 mb-1 text-sm sm:text-base">Organized by</h3>
                          <p className="text-slate-700 text-sm sm:text-base break-words">{event.owner.name}</p>
                        </div>
                      </div>
                    </div>

                    <div className="group">
                      <div className="flex items-start space-x-4 p-4 sm:p-5 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors duration-200 bg-white">
                        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <Users className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-slate-900 mb-1 text-sm sm:text-base">Attendees</h3>
                          <p className="text-slate-700 text-sm sm:text-base">
                            <span className="font-semibold text-emerald-600">{event.rsvps.length}</span> people attending
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* RSVP Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                {success ? (
                  <Card className="border-slate-200 shadow-sm bg-white">
                    <CardContent className="p-6 sm:p-8 text-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                        <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">You're All Set!</h3>
                      <p className="text-slate-600 text-sm sm:text-base">
                        Thank you for your RSVP! We look forward to seeing you at the event.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white">
                    <CardHeader className="text-center pb-4">
                      <CardTitle className="text-xl sm:text-2xl text-slate-900">
                        {isEventPast ? "Event Concluded" : "Join This Event"}
                      </CardTitle>
                      <CardDescription className="text-sm sm:text-base text-slate-600">
                        {isEventPast 
                          ? "This event has already taken place" 
                          : "Reserve your spot today!"
                        }
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="px-6 sm:px-8 pb-6 sm:pb-8">
                      {!isEventPast ? (
                        <div className="space-y-4 sm:space-y-6">
                          {error && (
                            <Alert className="border-red-200 bg-red-50">
                              <AlertDescription className="text-red-700 text-sm">{error}</AlertDescription>
                            </Alert>
                          )}

                          <div className="space-y-2">
                            <Label htmlFor="name" className="text-slate-700 font-medium text-sm">Your Name</Label>
                            <Input
                              id="name"
                              placeholder="Enter your full name"
                              value={rsvpData.name}
                              onChange={(e) => setRsvpData({ ...rsvpData, name: e.target.value })}
                              className="h-10 sm:h-12 border-slate-200 focus:border-slate-400 focus:ring-slate-400 text-sm"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-slate-700 font-medium text-sm">Email Address</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="Enter your email"
                              value={rsvpData.email}
                              onChange={(e) => setRsvpData({ ...rsvpData, email: e.target.value })}
                              className="h-10 sm:h-12 border-slate-200 focus:border-slate-400 focus:ring-slate-400 text-sm"
                              required
                            />
                          </div>

                          <Button 
                            onClick={handleRSVP}
                            type="button" 
                            className="w-full h-10 sm:h-12 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-200" 
                            disabled={loading}
                          >
                            {loading ? (
                              <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span className="text-sm">Confirming...</span>
                              </div>
                            ) : (
                              <span className="text-sm">Confirm Attendance</span>
                            )}
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center py-6 sm:py-8">
                          <Clock className="w-10 h-10 sm:w-12 sm:h-12 text-slate-400 mx-auto mb-4" />
                          <p className="text-slate-500 text-sm sm:text-base">RSVP is no longer available for this event.</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}