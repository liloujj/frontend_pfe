"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

// Ajouter l'utilisation des paramètres de recherche
import { useSearchParams } from "next/navigation"

// Ajouter l'import du router
import { useRouter } from "next/navigation"

export default function ScheduleAppointmentPage() {
  const [selectedScanType, setSelectedScanType] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [upcomingAppointments, setUpcomingAppointments] = useState([
    {
      id: 1,
      type: "Chest X-Ray",
      date: "August 10, 2023",
      time: "10:30 AM",
      location: "DEEPVISION Main Center",
      status: "Confirmed",
    },
    {
      id: 2,
      type: "MRI Brain Scan",
      date: "August 25, 2023",
      time: "2:15 PM",
      location: "DEEPVISION North Branch",
      status: "Pending",
    },
  ])

  // Dans la fonction principale, ajouter:
  const searchParams = useSearchParams()
  const rescheduleId = searchParams.get("reschedule")

  const router = useRouter()

  // Ajouter un useEffect pour gérer le reschedule
  useEffect(() => {
    if (rescheduleId) {
      // Dans une vraie application, vous feriez un appel API pour récupérer les détails du rendez-vous
      const appointmentToReschedule = upcomingAppointments.find((a) => a.id.toString() === rescheduleId)
      if (appointmentToReschedule) {
        // Pré-sélectionner le type de scan
        setSelectedScanType(appointmentToReschedule.type)
        // Vous pourriez également pré-sélectionner d'autres informations
      }
    }
  }, [rescheduleId, upcomingAppointments])

  // Modifier la fonction handleBookAppointment pour rediriger vers la page de confirmation
  const handleBookAppointment = () => {
    if (selectedDate && selectedTime) {
      // Dans une vraie application, vous feriez un appel API ici
      if (rescheduleId) {
        alert(`Rendez-vous reprogrammé pour le ${selectedDate} à ${selectedTime}`)
        router.push("/dashboard/patient")
      } else {
        // Rediriger vers la page de confirmation
        router.push("/dashboard/patient/confirm-appointment")
      }
    } else {
      alert("Veuillez sélectionner une date et une heure")
    }
  }

  const handleCancelAppointment = (id: number) => {
    if (confirm("Are you sure you want to cancel this appointment?")) {
      // Filtrer les rendez-vous pour supprimer celui qui a été annulé
      const updatedAppointments = upcomingAppointments.filter((appointment) => appointment.id !== id)
      // Dans une vraie application, vous feriez un appel API ici
      alert(`Appointment ${id} has been cancelled.`)
      // Mettre à jour l'état local (dans une vraie application, cela serait géré par un état global ou une requête API)
      setUpcomingAppointments(updatedAppointments)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Link href="/dashboard/patient" className="mr-4">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        {/* Modifier le titre de la page pour indiquer s'il s'agit d'un reschedule */}
        <h1 className="text-3xl font-bold text-white">
          {rescheduleId ? "Reschedule Appointment" : "Schedule Appointment"}
        </h1>
      </div>

      <Tabs defaultValue="new" className="w-full">
        <TabsList className="grid grid-cols-2 mb-8">
          <TabsTrigger value="new">New Appointment</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Appointments</TabsTrigger>
        </TabsList>

        <TabsContent value="new">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Modifier le contenu de la carte "Select Scan Type" */}
            <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30">
              <CardHeader>
                <CardTitle className="text-white">Type d'examen</CardTitle>
                <CardDescription className="text-blue-100">Radiographie (X-Ray)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  <div
                    className="p-4 rounded-md text-center cursor-pointer bg-blue-500/30 border-2 border-blue-500/50"
                    onClick={() => setSelectedScanType("X-Ray")}
                  >
                    <div className="bg-blue-500/20 p-2 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-blue-300" />
                    </div>
                    <p className="text-white font-medium">Radiographie (X-Ray)</p>
                    <p className="text-xs text-blue-200 mt-1">15-20 min</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30">
              <CardHeader>
                <CardTitle className="text-white">Select Date & Time</CardTitle>
                <CardDescription className="text-blue-100">Choose when you want to come in</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-blue-200 mb-2">Available Dates</p>
                    <div className="grid grid-cols-3 gap-2">
                      {availableDates.map((date) => (
                        <div
                          key={date.value}
                          className={`p-2 rounded-md text-center cursor-pointer transition-colors ${
                            selectedDate === date.value
                              ? "bg-blue-500/30 border border-blue-500/50"
                              : "bg-white/5 hover:bg-white/10"
                          }`}
                          onClick={() => setSelectedDate(date.value)}
                        >
                          <p className="text-xs text-blue-200">{date.day}</p>
                          <p className="text-white font-medium">{date.date}</p>
                          <p className="text-xs text-blue-200">{date.month}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-blue-200 mb-2">Available Times</p>
                    <div className="grid grid-cols-3 gap-2">
                      {availableTimes.map((time) => (
                        <div
                          key={time}
                          className={`p-2 rounded-md text-center cursor-pointer transition-colors ${
                            selectedTime === time
                              ? "bg-blue-500/30 border border-blue-500/50"
                              : "bg-white/5 hover:bg-white/10"
                          }`}
                          onClick={() => setSelectedTime(time)}
                        >
                          <p className="text-white">{time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Modifier le contenu de la carte "Select Location" */}
          <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30 mt-6">
            <CardHeader>
              <CardTitle className="text-white">Centre médical</CardTitle>
              <CardDescription className="text-blue-100">DEEPVISION Centre Principal</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                <div
                  className="p-4 rounded-md cursor-pointer bg-blue-500/30 border border-blue-500/50"
                  onClick={() => setSelectedLocation("DEEPVISION Main Center")}
                >
                  <div className="flex items-start">
                    <div className="bg-blue-500/20 p-2 rounded-md mr-3">
                      <MapPin className="h-5 w-5 text-blue-300" />
                    </div>
                    <div>
                      <p className="text-white font-medium">DEEPVISION Centre Principal</p>
                      <p className="text-sm text-blue-200 mt-1">123 Medical Plaza, Suite 100</p>
                      <div className="flex items-center mt-2">
                        <Badge variant="outline" className="text-xs mr-2">
                          2.3 km
                        </Badge>
                        <p className="text-xs text-blue-300">Tous les services disponibles</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              {/* Modifier le texte du bouton de soumission */}
              <Button className="w-full" disabled={!selectedDate || !selectedTime} onClick={handleBookAppointment}>
                {rescheduleId ? "Reprogrammer le rendez-vous" : "Confirmer le rendez-vous"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming">
          <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30">
            <CardHeader>
              <CardTitle className="text-white">Your Upcoming Appointments</CardTitle>
              <CardDescription className="text-blue-100">Manage your scheduled appointments</CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingAppointments.length > 0 ? (
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="bg-white/5 p-4 rounded-md">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start">
                          <div className="bg-blue-500/20 p-2 rounded-md mr-3">
                            <Calendar className="h-5 w-5 text-blue-300" />
                          </div>
                          <div>
                            <p className="text-white font-medium">{appointment.type}</p>
                            <div className="flex items-center text-sm text-blue-200 mt-1">
                              <Calendar className="h-3.5 w-3.5 mr-1" />
                              <span>{appointment.date}</span>
                            </div>
                            <div className="flex items-center text-sm text-blue-200 mt-0.5">
                              <Clock className="h-3.5 w-3.5 mr-1" />
                              <span>{appointment.time}</span>
                            </div>
                            <div className="flex items-center text-sm text-blue-200 mt-0.5">
                              <MapPin className="h-3.5 w-3.5 mr-1" />
                              <span>{appointment.location}</span>
                            </div>
                          </div>
                        </div>
                        <Badge
                          variant={
                            appointment.status === "Confirmed"
                              ? "default"
                              : appointment.status === "Pending"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {appointment.status}
                        </Badge>
                      </div>
                      <div className="flex justify-end gap-2 mt-4">
                        <Link href={`/dashboard/patient/schedule?reschedule=${appointment.id}`}>
                          <Button variant="outline" size="sm">
                            Reschedule
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-400 hover:text-red-300"
                          onClick={() => handleCancelAppointment(appointment.id)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-blue-200">
                  <Calendar className="mx-auto h-12 w-12 mb-3 opacity-50" />
                  <p>No upcoming appointments</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Modifier les types de scan pour n'avoir que X-Ray
const scanTypes = [{ id: 1, name: "X-Ray", duration: "15-20 min", icon: Calendar }]

// Modifier les emplacements pour n'avoir qu'un seul endroit
const locations = [
  {
    id: 1,
    name: "DEEPVISION Main Center",
    address: "123 Medical Plaza, Suite 100",
    distance: "2.3 miles away",
    availability: "All services available",
  },
]

const availableDates = [
  { value: "2023-08-10", day: "Thu", date: "10", month: "Aug" },
  { value: "2023-08-11", day: "Fri", date: "11", month: "Aug" },
  { value: "2023-08-14", day: "Mon", date: "14", month: "Aug" },
  { value: "2023-08-15", day: "Tue", date: "15", month: "Aug" },
  { value: "2023-08-16", day: "Wed", date: "16", month: "Aug" },
  { value: "2023-08-17", day: "Thu", date: "17", month: "Aug" },
]

const availableTimes = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"]

