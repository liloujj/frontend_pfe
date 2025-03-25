"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

export default function ReschedulePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const appointmentId = searchParams.get("id")

  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [appointment, setAppointment] = useState<any>(null)

  useEffect(() => {
    // Dans une vraie application, vous feriez un appel API pour récupérer les détails du rendez-vous
    // Ici, nous simulons la récupération des données
    if (appointmentId) {
      const foundAppointment = upcomingAppointments.find((a) => a.id.toString() === appointmentId)
      if (foundAppointment) {
        setAppointment(foundAppointment)
      }
    }
  }, [appointmentId])

  const handleReschedule = () => {
    if (selectedDate && selectedTime) {
      // Dans une vraie application, vous feriez un appel API pour mettre à jour le rendez-vous
      alert(`Appointment rescheduled to ${selectedDate} at ${selectedTime}`)
      router.push("/dashboard/patient")
    } else {
      alert("Please select a date and time")
    }
  }

  if (!appointment) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center mb-6">
          <Link href="/dashboard/patient" className="mr-4">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-white">Reschedule Appointment</h1>
        </div>
        <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30">
          <CardContent className="py-10 text-center">
            <p className="text-white">Appointment not found or invalid ID.</p>
            <Link href="/dashboard/patient">
              <Button className="mt-4">Return to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Link href="/dashboard/patient" className="mr-4">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-white">Reschedule Appointment</h1>
      </div>

      <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30 mb-6">
        <CardHeader>
          <CardTitle className="text-white">Current Appointment</CardTitle>
          <CardDescription className="text-blue-100">Details of your current appointment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-white/5 p-4 rounded-md">
            <div className="flex items-start gap-3">
              <div className="bg-blue-500/20 p-2 rounded-md">
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
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30">
        <CardHeader>
          <CardTitle className="text-white">Select New Date & Time</CardTitle>
          <CardDescription className="text-blue-100">
            Choose when you want to reschedule your appointment
          </CardDescription>
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
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push("/dashboard/patient")}>
            Keep Current Appointment
          </Button>
          <Button disabled={!selectedDate || !selectedTime} onClick={handleReschedule}>
            Confirm Reschedule
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

// Sample data
const upcomingAppointments = [
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

