"use client"

import { useState } from "react"
import { ArrowLeft, Calendar, MapPin } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ScheduleAppointmentPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const router = useRouter()

  const handleBookAppointment = () => {
    if (selectedDate && selectedTime) {
      // Dans une vraie application, vous feriez un appel API ici
      router.push("/dashboard/premium/confirm-appointment")
    } else {
      alert("Veuillez sélectionner une date et une heure")
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Link href="/dashboard/premium" className="mr-4">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-white">Planifier un Rendez-vous</h1>
        <Badge className="ml-4 bg-gradient-to-r from-amber-500 to-amber-300 text-black border-0">PREMIUM</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30">
          <CardHeader>
            <CardTitle className="text-white">Type d'examen</CardTitle>
            <CardDescription className="text-blue-100">Radiographie (X-Ray)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              <div className="p-4 rounded-md text-center cursor-pointer bg-blue-500/30 border-2 border-blue-500/50">
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
            <CardTitle className="text-white">Sélectionner Date & Heure</CardTitle>
            <CardDescription className="text-blue-100">Choisissez quand vous souhaitez venir</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-blue-200 mb-2">Dates Disponibles</p>
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
                <p className="text-sm text-blue-200 mb-2">Heures Disponibles</p>
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

      <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30 mt-6">
        <CardHeader>
          <CardTitle className="text-white">Centre médical</CardTitle>
          <CardDescription className="text-blue-100">DEEPVISION Centre Principal</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            <div className="p-4 rounded-md cursor-pointer bg-blue-500/30 border border-blue-500/50">
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
          <Button className="w-full" disabled={!selectedDate || !selectedTime} onClick={handleBookAppointment}>
            Continuer
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

const availableDates = [
  { value: "2023-08-10", day: "Jeu", date: "10", month: "Août" },
  { value: "2023-08-11", day: "Ven", date: "11", month: "Août" },
  { value: "2023-08-14", day: "Lun", date: "14", month: "Août" },
  { value: "2023-08-15", day: "Mar", date: "15", month: "Août" },
  { value: "2023-08-16", day: "Mer", date: "16", month: "Août" },
  { value: "2023-08-17", day: "Jeu", date: "17", month: "Août" },
]

const availableTimes = ["9:00", "10:00", "11:00", "13:00", "14:00", "15:00"]

