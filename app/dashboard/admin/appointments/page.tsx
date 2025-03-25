"use client"

import { useState } from "react"
import { ArrowLeft, Search, Calendar, CheckCircle, XCircle, Clock, FileText, Download } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"

export default function AppointmentsManagementPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [isRescheduleDialogOpen, setIsRescheduleDialogOpen] = useState(false)
  const [isCancelConfirmOpen, setIsCancelConfirmOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null)
  const [appointmentToCancel, setAppointmentToCancel] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [appointments, setAppointments] = useState(adminAppointments)
  const [currentView, setCurrentView] = useState<"list" | "details">("list")
  const [appointmentDetails, setAppointmentDetails] = useState<any>(null)
  const [appointmentNotes, setAppointmentNotes] = useState("")

  const filteredAppointments = appointments.filter(
    (appointment) =>
      (searchQuery === "" ||
        appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appointment.patientEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appointment.type.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (statusFilter === "all" || appointment.status === statusFilter) &&
      (typeFilter === "all" || appointment.type === typeFilter),
  )

  // Fonction pour confirmer un rendez-vous
  const handleConfirmAppointment = (id: number) => {
    // Trouver l'index du rendez-vous dans la liste
    const appointmentIndex = appointments.findIndex((appointment) => appointment.id === id)

    if (appointmentIndex !== -1) {
      // Créer une copie du tableau des rendez-vous
      const updatedAppointments = [...appointments]

      // Mettre à jour le statut du rendez-vous
      updatedAppointments[appointmentIndex] = {
        ...updatedAppointments[appointmentIndex],
        status: "Confirmed",
      }

      // Mettre à jour l'état
      setAppointments(updatedAppointments)

      // Afficher une confirmation
      alert(`Rendez-vous pour ${updatedAppointments[appointmentIndex].patientName} a été confirmé.`)
    }
  }

  // Fonction pour ouvrir le dialogue de confirmation d'annulation
  const openCancelConfirm = (id: number) => {
    setAppointmentToCancel(id)
    setIsCancelConfirmOpen(true)
  }

  // Fonction pour annuler un rendez-vous
  const handleCancelAppointment = () => {
    if (appointmentToCancel === null) return

    // Trouver l'index du rendez-vous dans la liste
    const appointmentIndex = appointments.findIndex((appointment) => appointment.id === appointmentToCancel)

    if (appointmentIndex !== -1) {
      // Créer une copie du tableau des rendez-vous
      const updatedAppointments = [...appointments]

      // Mettre à jour le statut du rendez-vous
      updatedAppointments[appointmentIndex] = {
        ...updatedAppointments[appointmentIndex],
        status: "Cancelled",
      }

      // Mettre à jour l'état
      setAppointments(updatedAppointments)

      // Fermer le dialogue
      setIsCancelConfirmOpen(false)
      setAppointmentToCancel(null)

      // Afficher une confirmation
      alert(`Rendez-vous pour ${updatedAppointments[appointmentIndex].patientName} a été annulé.`)
    }
  }

  // Fonction pour ouvrir le dialogue de re-planification
  const handleRescheduleAppointment = (id: number) => {
    // Trouver le rendez-vous dans la liste
    const appointmentToReschedule = appointments.find((appointment) => appointment.id === id)

    if (appointmentToReschedule) {
      setSelectedAppointment(appointmentToReschedule)
      setSelectedDate(null)
      setSelectedTime(null)
      setIsRescheduleDialogOpen(true)
    }
  }

  // Fonction pour confirmer la re-planification
  const handleConfirmReschedule = () => {
    if (!selectedDate || !selectedTime) {
      alert("Veuillez sélectionner une date et une heure pour le rendez-vous re-planifié.")
      return
    }

    if (selectedAppointment) {
      // Trouver l'index du rendez-vous dans la liste
      const appointmentIndex = appointments.findIndex((appointment) => appointment.id === selectedAppointment.id)

      if (appointmentIndex !== -1) {
        // Créer une copie du tableau des rendez-vous
        const updatedAppointments = [...appointments]

        // Mettre à jour le rendez-vous
        updatedAppointments[appointmentIndex] = {
          ...updatedAppointments[appointmentIndex],
          date: selectedDate.replace(/-/g, " "),
          time: selectedTime,
          status: "Confirmed",
        }

        // Mettre à jour l'état
        setAppointments(updatedAppointments)

        // Afficher une confirmation
        alert(
          `Rendez-vous pour ${selectedAppointment.patientName} a été re-planifié pour le ${selectedDate} à ${selectedTime}.`,
        )

        // Fermer le dialogue
        setIsRescheduleDialogOpen(false)
        setSelectedDate(null)
        setSelectedTime(null)
      }
    }
  }

  // Fonction pour afficher les détails d'un rendez-vous
  const handleViewAppointmentDetails = (appointment: any) => {
    setAppointmentDetails(appointment)
    setAppointmentNotes(appointment.notes || "")
    setCurrentView("details")
  }

  // Fonction pour revenir à la liste des rendez-vous
  const handleBackToList = () => {
    setCurrentView("list")
    setAppointmentDetails(null)
  }

  // Fonction pour sauvegarder les notes
  const handleSaveNotes = () => {
    if (!appointmentDetails) return

    // Trouver l'index du rendez-vous dans la liste
    const appointmentIndex = appointments.findIndex((appointment) => appointment.id === appointmentDetails.id)

    if (appointmentIndex !== -1) {
      // Créer une copie du tableau des rendez-vous
      const updatedAppointments = [...appointments]

      // Mettre à jour les notes du rendez-vous
      updatedAppointments[appointmentIndex] = {
        ...updatedAppointments[appointmentIndex],
        notes: appointmentNotes,
      }

      // Mettre à jour l'état
      setAppointments(updatedAppointments)

      // Mettre à jour les détails du rendez-vous
      setAppointmentDetails({
        ...appointmentDetails,
        notes: appointmentNotes,
      })

      // Afficher une confirmation
      alert(`Notes mises à jour pour le rendez-vous de ${appointmentDetails.patientName}.`)
    }
  }

  // Fonction pour exporter les rendez-vous (simulée)
  const handleExportAppointments = () => {
    alert(
      "Export des données de rendez-vous en cours. Dans une application réelle, cela téléchargerait un fichier CSV ou Excel.",
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Link href="/dashboard/admin" className="mr-4">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-white">Appointment Management</h1>
      </div>

      {currentView === "list" ? (
        <>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="all">All Appointments</TabsTrigger>
              <TabsTrigger value="today">Today's Appointments</TabsTrigger>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30">
                <CardHeader>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <CardTitle className="text-white">All Appointments</CardTitle>
                      <CardDescription className="text-blue-100">Manage all scheduled appointments</CardDescription>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                      <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 h-4 w-4" />
                        <Input
                          placeholder="Search appointments..."
                          className="bg-white/5 border-blue-800/30 text-white pl-10 w-full"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full md:w-[180px] bg-white/5 border-blue-800/30 text-white">
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="Confirmed">Confirmed</SelectItem>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger className="w-full md:w-[180px] bg-white/5 border-blue-800/30 text-white">
                          <SelectValue placeholder="Filter by type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="X-Ray">X-Ray</SelectItem>
                          <SelectItem value="MRI">MRI</SelectItem>
                          <SelectItem value="CT Scan">CT Scan</SelectItem>
                          <SelectItem value="Ultrasound">Ultrasound</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" className="w-full md:w-auto" onClick={handleExportAppointments}>
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredAppointments.length > 0 ? (
                      filteredAppointments.map((appointment) => (
                        <div key={appointment.id} className="bg-white/5 p-4 rounded-md">
                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div className="flex items-start gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={appointment.patientAvatar} alt={appointment.patientName} />
                                <AvatarFallback>{appointment.patientName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-white font-medium">{appointment.patientName}</p>
                                <p className="text-xs text-blue-200">{appointment.patientEmail}</p>
                                <div className="flex items-center mt-1">
                                  <Badge variant="outline" className="mr-2">
                                    {appointment.type}
                                  </Badge>
                                  <Badge
                                    variant={
                                      appointment.status === "Confirmed"
                                        ? "default"
                                        : appointment.status === "Pending"
                                          ? "secondary"
                                          : "destructive"
                                    }
                                  >
                                    {appointment.status}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-start md:items-end">
                              <div className="flex items-center text-blue-100">
                                <Calendar className="h-4 w-4 mr-2" />
                                <span>{appointment.date}</span>
                              </div>
                              <div className="flex items-center text-blue-100 mt-1">
                                <Clock className="h-4 w-4 mr-2" />
                                <span>{appointment.time}</span>
                              </div>
                              <div className="flex gap-2 mt-3">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8"
                                  onClick={() => handleConfirmAppointment(appointment.id)}
                                  disabled={appointment.status === "Confirmed" || appointment.status === "Cancelled"}
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" /> Confirm
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8"
                                  onClick={() => openCancelConfirm(appointment.id)}
                                  disabled={appointment.status === "Cancelled"}
                                >
                                  <XCircle className="h-4 w-4 mr-1" /> Cancel
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8"
                                  onClick={() => handleRescheduleAppointment(appointment.id)}
                                  disabled={appointment.status === "Cancelled"}
                                >
                                  <Calendar className="h-4 w-4 mr-1" /> Reschedule
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8"
                                  onClick={() => handleViewAppointmentDetails(appointment)}
                                >
                                  <FileText className="h-4 w-4 mr-1" /> Details
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-blue-200">
                        <Calendar className="mx-auto h-12 w-12 mb-3 opacity-50" />
                        <p>No appointments found matching your search</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="today">
              <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30">
                <CardHeader>
                  <CardTitle className="text-white">Today's Appointments</CardTitle>
                  <CardDescription className="text-blue-100">Appointments scheduled for today</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {todayAppointments.length > 0 ? (
                      todayAppointments.map((appointment) => (
                        <div key={appointment.id} className="bg-white/5 p-3 rounded-md">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarImage src={appointment.patientAvatar} alt={appointment.patientName} />
                                <AvatarFallback>{appointment.patientName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-white font-medium">{appointment.patientName}</p>
                                <div className="flex items-center text-xs text-blue-200">
                                  <Clock className="h-3 w-3 mr-1" />
                                  <span>{appointment.time}</span>
                                </div>
                              </div>
                            </div>
                            <Badge
                              variant={
                                appointment.status === "Confirmed"
                                  ? "default"
                                  : appointment.status === "Pending"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {appointment.status}
                            </Badge>
                          </div>
                          <div className="mt-2 flex justify-between items-center">
                            <Badge variant="outline">{appointment.type}</Badge>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 px-2"
                                onClick={() => handleConfirmAppointment(appointment.id)}
                                disabled={appointment.status === "Confirmed" || appointment.status === "Cancelled"}
                              >
                                Confirm
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 px-2"
                                onClick={() => openCancelConfirm(appointment.id)}
                                disabled={appointment.status === "Cancelled"}
                              >
                                Cancel
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 px-2"
                                onClick={() => handleViewAppointmentDetails(appointment)}
                              >
                                Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-blue-200">
                        <p>No appointments scheduled for today</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stats">
              <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30">
                <CardHeader>
                  <CardTitle className="text-white">Appointment Statistics</CardTitle>
                  <CardDescription className="text-blue-100">Overview of appointment data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-4 rounded-md">
                      <p className="text-blue-200 text-sm">Total Appointments</p>
                      <p className="text-white text-2xl font-bold mt-1">{appointments.length}</p>
                      <p className="text-green-400 text-xs mt-2">↑ 8% from last week</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-md">
                      <p className="text-blue-200 text-sm">Confirmed</p>
                      <p className="text-white text-2xl font-bold mt-1">
                        {appointments.filter((a) => a.status === "Confirmed").length}
                      </p>
                      <p className="text-green-400 text-xs mt-2">↑ 12% from last week</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-md">
                      <p className="text-blue-200 text-sm">Pending</p>
                      <p className="text-white text-2xl font-bold mt-1">
                        {appointments.filter((a) => a.status === "Pending").length}
                      </p>
                      <p className="text-blue-200 text-xs mt-2">No change from last week</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-md">
                      <p className="text-blue-200 text-sm">Cancelled</p>
                      <p className="text-white text-2xl font-bold mt-1">
                        {appointments.filter((a) => a.status === "Cancelled").length}
                      </p>
                      <p className="text-red-400 text-xs mt-2">↑ 3% from last week</p>
                    </div>
                  </div>
                  <div className="mt-4 bg-white/5 p-4 rounded-md">
                    <p className="text-blue-200 text-sm mb-2">Appointment Types</p>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-white">X-Ray</span>
                          <span className="text-blue-200">
                            {appointments.filter((a) => a.type === "X-Ray").length} appointments
                          </span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{
                              width: `${
                                (appointments.filter((a) => a.type === "X-Ray").length / appointments.length) * 100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-white">MRI</span>
                          <span className="text-blue-200">
                            {appointments.filter((a) => a.type === "MRI").length} appointments
                          </span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{
                              width: `${
                                (appointments.filter((a) => a.type === "MRI").length / appointments.length) * 100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-white">CT Scan</span>
                          <span className="text-blue-200">
                            {appointments.filter((a) => a.type === "CT Scan").length} appointments
                          </span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{
                              width: `${
                                (appointments.filter((a) => a.type === "CT Scan").length / appointments.length) * 100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      ) : (
        <>
          {appointmentDetails && (
            <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30">
              <CardHeader>
                <div className="flex items-center">
                  <Button variant="outline" className="mr-4" onClick={handleBackToList}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to List
                  </Button>
                  <div>
                    <CardTitle className="text-white">{appointmentDetails.patientName} - Appointment Details</CardTitle>
                    <CardDescription className="text-blue-100">Manage this appointment's information</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="bg-white/5 p-4 rounded-md mb-4">
                      <h3 className="text-white font-medium mb-4">Patient Information</h3>
                      <div className="flex items-center gap-4 mb-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={appointmentDetails.patientAvatar} alt={appointmentDetails.patientName} />
                          <AvatarFallback>{appointmentDetails.patientName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-white font-medium">{appointmentDetails.patientName}</p>
                          <p className="text-blue-200">{appointmentDetails.patientEmail}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-blue-200">Patient ID</p>
                          <p className="text-white">{appointmentDetails.id}</p>
                        </div>
                        <div>
                          <p className="text-sm text-blue-200">Phone</p>
                          <p className="text-white">+1 (555) 123-4567</p>
                        </div>
                        <div>
                          <p className="text-sm text-blue-200">Age</p>
                          <p className="text-white">34</p>
                        </div>
                        <div>
                          <p className="text-sm text-blue-200">Gender</p>
                          <p className="text-white">Male</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/5 p-4 rounded-md">
                      <h3 className="text-white font-medium mb-4">Medical History</h3>
                      <div className="space-y-2 text-sm text-blue-100">
                        <p>• Previous {appointmentDetails.type} scan on June 12, 2023</p>
                        <p>• Diagnosed with mild hypertension in 2021</p>
                        <p>• No known allergies to contrast agents</p>
                        <p>• Regular check-ups every 6 months</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="bg-white/5 p-4 rounded-md mb-4">
                      <h3 className="text-white font-medium mb-4">Appointment Details</h3>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-blue-200">Date</p>
                          <div className="flex items-center text-white">
                            <Calendar className="h-4 w-4 mr-2 text-blue-300" />
                            {appointmentDetails.date}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-blue-200">Time</p>
                          <div className="flex items-center text-white">
                            <Clock className="h-4 w-4 mr-2 text-blue-300" />
                            {appointmentDetails.time}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-blue-200">Scan Type</p>
                          <Badge variant="outline">{appointmentDetails.type}</Badge>
                        </div>
                        <div>
                          <p className="text-sm text-blue-200">Status</p>
                          <Badge
                            variant={
                              appointmentDetails.status === "Confirmed"
                                ? "default"
                                : appointmentDetails.status === "Pending"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {appointmentDetails.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => handleConfirmAppointment(appointmentDetails.id)}
                          disabled={
                            appointmentDetails.status === "Confirmed" || appointmentDetails.status === "Cancelled"
                          }
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Confirm
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => openCancelConfirm(appointmentDetails.id)}
                          disabled={appointmentDetails.status === "Cancelled"}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleRescheduleAppointment(appointmentDetails.id)}
                          disabled={appointmentDetails.status === "Cancelled"}
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Reschedule
                        </Button>
                      </div>
                    </div>
                    <div className="bg-white/5 p-4 rounded-md">
                      <h3 className="text-white font-medium mb-4">Notes</h3>
                      <Textarea
                        className="bg-white/5 border-blue-800/30 text-white min-h-[150px] mb-4"
                        placeholder="Add notes about this appointment..."
                        value={appointmentNotes}
                        onChange={(e) => setAppointmentNotes(e.target.value)}
                      />
                      <Button className="w-full" onClick={handleSaveNotes}>
                        Save Notes
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* Dialogue de re-planification */}
      <Dialog open={isRescheduleDialogOpen} onOpenChange={setIsRescheduleDialogOpen}>
        <DialogContent className="bg-gray-900 border-blue-800/30 text-white">
          <DialogHeader>
            <DialogTitle>Reschedule Appointment</DialogTitle>
            <DialogDescription className="text-blue-100">
              {selectedAppointment &&
                `Select a new date and time for ${selectedAppointment.patientName}'s appointment.`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label className="text-white mb-2 block">Available Dates</Label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "2023-08-20", day: "Sun", date: "20", month: "Aug" },
                  { value: "2023-08-21", day: "Mon", date: "21", month: "Aug" },
                  { value: "2023-08-22", day: "Tue", date: "22", month: "Aug" },
                  { value: "2023-08-23", day: "Wed", date: "23", month: "Aug" },
                  { value: "2023-08-24", day: "Thu", date: "24", month: "Aug" },
                  { value: "2023-08-25", day: "Fri", date: "25", month: "Aug" },
                ].map((date) => (
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
              <Label className="text-white mb-2 block">Available Times</Label>
              <div className="grid grid-cols-3 gap-2">
                {["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"].map((time) => (
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
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRescheduleDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmReschedule} disabled={!selectedDate || !selectedTime}>
              Confirm Reschedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogue de confirmation d'annulation */}
      <Dialog open={isCancelConfirmOpen} onOpenChange={setIsCancelConfirmOpen}>
        <DialogContent className="bg-gray-900 border-blue-800/30 text-white">
          <DialogHeader>
            <DialogTitle>Confirm Cancellation</DialogTitle>
            <DialogDescription className="text-blue-100">
              Are you sure you want to cancel this appointment? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsCancelConfirmOpen(false)}>
              No, Keep Appointment
            </Button>
            <Button variant="destructive" onClick={handleCancelAppointment}>
              Yes, Cancel Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Données d'exemple
const adminAppointments = [
  {
    id: 1,
    patientName: "John Smith",
    patientEmail: "john.smith@example.com",
    patientAvatar: "/placeholder.svg?height=32&width=32",
    type: "X-Ray",
    date: "August 10, 2023",
    time: "10:30 AM",
    status: "Pending",
    notes: "Patient mentioned discomfort in chest area. Requested chest X-ray for evaluation.",
  },
  {
    id: 2,
    patientName: "Emily Johnson",
    patientEmail: "emily.j@example.com",
    patientAvatar: "/placeholder.svg?height=32&width=32",
    type: "MRI",
    date: "August 12, 2023",
    time: "2:15 PM",
    status: "Confirmed",
    notes: "Follow-up MRI to check progress after treatment.",
  },
  {
    id: 3,
    patientName: "Michael Brown",
    patientEmail: "michael.b@example.com",
    patientAvatar: "/placeholder.svg?height=32&width=32",
    type: "CT Scan",
    date: "August 15, 2023",
    time: "9:00 AM",
    status: "Cancelled",
    notes: "Patient called to cancel due to scheduling conflict.",
  },
  {
    id: 4,
    patientName: "Sarah Wilson",
    patientEmail: "sarah.w@example.com",
    patientAvatar: "/placeholder.svg?height=32&width=32",
    type: "Ultrasound",
    date: "August 18, 2023",
    time: "11:45 AM",
    status: "Confirmed",
    notes: "",
  },
  {
    id: 5,
    patientName: "David Lee",
    patientEmail: "david.lee@example.com",
    patientAvatar: "/placeholder.svg?height=32&width=32",
    type: "X-Ray",
    date: "August 20, 2023",
    time: "3:30 PM",
    status: "Pending",
    notes: "First-time patient. Complains of knee pain after sports injury.",
  },
]

const todayAppointments = [
  {
    id: 1,
    patientName: "John Smith",
    patientEmail: "john.smith@example.com",
    patientAvatar: "/placeholder.svg?height=32&width=32",
    type: "X-Ray",
    date: "Today",
    time: "10:30 AM",
    status: "Pending",
    notes: "Patient mentioned discomfort in chest area. Requested chest X-ray for evaluation.",
  },
  {
    id: 2,
    patientName: "Lisa Martinez",
    patientEmail: "lisa.m@example.com",
    patientAvatar: "/placeholder.svg?height=32&width=32",
    type: "MRI",
    date: "Today",
    time: "1:15 PM",
    status: "Confirmed",
    notes: "Annual checkup MRI scan.",
  },
  {
    id: 3,
    patientName: "Robert Taylor",
    patientEmail: "robert.t@example.com",
    patientAvatar: "/placeholder.svg?height=32&width=32",
    type: "Ultrasound",
    date: "Today",
    time: "4:00 PM",
    status: "Confirmed",
    notes: "Abdominal ultrasound to investigate reported pain.",
  },
]

