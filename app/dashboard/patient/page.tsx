"use client"

import type React from "react"
import { useState } from "react"
import { Calendar, Clock, FileText, MessageSquare, AlertCircle, Star, Download, Edit, Trash } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

// Sample data
const availableScans = [
  { id: 1, name: "Chest X-Ray", date: "June 15, 2023" },
  { id: 2, name: "Spine MRI", date: "July 3, 2023" },
]

const analysisResults = [
  {
    id: 1,
    scanName: "Chest X-Ray",
    date: "June 18, 2023",
    status: "Negative",
    description: "No abnormalities detected. Lungs appear clear and healthy.",
  },
]

const upcomingAppointments = [
  {
    id: 1,
    type: "Chest X-Ray",
    date: "August 10, 2023",
    time: "10:30 AM",
    status: "Confirmed",
  },
  {
    id: 2,
    type: "MRI Brain Scan",
    date: "August 25, 2023",
    time: "2:15 PM",
    status: "Pending",
  },
]

const initialMessages = [
  {
    id: 1,
    subject: "Your X-Ray Results",
    date: "June 18, 2023",
    preview:
      "Your recent X-Ray results have been analyzed and are now available in your dashboard. Please review them at your earliest convenience.",
  },
  {
    id: 2,
    subject: "Appointment Confirmation",
    date: "July 28, 2023",
    preview:
      "This is to confirm your appointment for a Chest X-Ray on August 10, 2023 at 10:30 AM. Please arrive 15 minutes early to complete registration.",
  },
]

export default function PatientDashboard() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isAnalyzeDialogOpen, setIsAnalyzeDialogOpen] = useState(false)
  const [selectedScanForAnalysis, setSelectedScanForAnalysis] = useState<number | null>(null)
  const [messages, setMessages] = useState(initialMessages)
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null)
  const [editedMessageText, setEditedMessageText] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleAnalyzeClick = () => {
    setSelectedScanForAnalysis(null)
    setIsAnalyzeDialogOpen(true)
  }

  const handleAnalyzeConfirm = () => {
    if (selectedScanForAnalysis !== null) {
      alert(
        `Votre demande d'analyse pour le scan ${availableScans.find((scan) => scan.id === selectedScanForAnalysis)?.name} a été soumise. Les résultats seront disponibles dans les 24 à 48 heures.`,
      )
      setIsAnalyzeDialogOpen(false)
      setSelectedScanForAnalysis(null)
    } else {
      alert("Veuillez sélectionner un scan à analyser.")
    }
  }

  const handleEditMessage = (id: number, text: string) => {
    setEditingMessageId(id)
    setEditedMessageText(text)
  }

  const handleSaveEdit = (id: number) => {
    setMessages(messages.map((msg) => (msg.id === id ? { ...msg, preview: editedMessageText } : msg)))
    setEditingMessageId(null)
  }

  const handleCancelEdit = () => {
    setEditingMessageId(null)
  }

  const handleDeleteMessage = (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce message ?")) {
      setMessages(messages.filter((msg) => msg.id !== id))
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Patient Dashboard</h1>
        <Link href="/dashboard/patient/upgrade">
          <Button className="bg-gradient-to-r from-amber-500 to-amber-300 text-black hover:from-amber-600 hover:to-amber-400">
            <Star className="h-4 w-4 mr-2" />
            Upgrade to Premium
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="scans" className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="scans">My Scans</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        {/* Scans Tab */}
        <TabsContent value="scans">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30">
              <CardHeader>
                <CardTitle className="text-white">Available Scans</CardTitle>
                <CardDescription className="text-blue-100">Scans uploaded by the laboratory</CardDescription>
              </CardHeader>
              <CardContent>
                {availableScans.length > 0 ? (
                  <ul className="space-y-3">
                    {availableScans.map((scan) => (
                      <li key={scan.id} className="bg-white/5 p-3 rounded-md flex justify-between items-center">
                        <div>
                          <p className="text-white font-medium">{scan.name}</p>
                          <p className="text-sm text-blue-200">{scan.date}</p>
                        </div>
                        <div className="flex gap-2">
                          <Link href="/dashboard/patient/view-scan">
                            <Button size="sm" variant="outline" className="h-8">
                              View
                            </Button>
                          </Link>
                          <Button
                            size="sm"
                            className="h-8"
                            onClick={() => {
                              setSelectedScanForAnalysis(scan.id)
                              setIsAnalyzeDialogOpen(true)
                            }}
                          >
                            Analyze
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-8 text-blue-200">
                    <FileText className="mx-auto h-12 w-12 mb-3 opacity-50" />
                    <p>No scans available yet</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30">
              <CardHeader>
                <CardTitle className="text-white">AI Analysis</CardTitle>
                <CardDescription className="text-blue-100">Analyze your available scans</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-6 text-center">
                  <div className="bg-white/5 p-4 rounded-md mb-4">
                    <FileText className="h-10 w-10 mx-auto mb-4 text-blue-300" />
                    <p className="text-blue-100 mb-2">
                      Vous pouvez demander une analyse IA pour les scans téléchargés par votre prestataire de soins
                    </p>
                    <p className="text-xs text-blue-200 mb-4">
                      Les résultats seront disponibles dans les 24 à 48 heures
                    </p>
                    <Button className="w-full" disabled={availableScans.length === 0} onClick={handleAnalyzeClick}>
                      Analyser les scans disponibles
                    </Button>
                    {availableScans.length === 0 && (
                      <p className="mt-2 text-xs text-blue-200">Aucun scan disponible pour analyse</p>
                    )}
                  </div>

                  <div className="bg-gradient-to-r from-amber-500/20 to-amber-300/10 p-4 rounded-md mt-4">
                    <div className="flex items-center mb-2">
                      <Star className="h-5 w-5 text-amber-300 mr-2" />
                      <p className="text-white font-medium">Fonctionnalité Premium</p>
                    </div>
                    <p className="text-sm text-blue-100 mb-3">
                      Passez à Premium pour télécharger vos propres documents médicaux de n'importe quelle source pour
                      une analyse IA instantanée
                    </p>
                    <Link href="/dashboard/patient/upgrade">
                      <Button
                        variant="outline"
                        className="w-full border-amber-500/50 text-amber-300 hover:bg-amber-500/20"
                      >
                        Passer à Premium
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6 bg-white/10 backdrop-blur-sm border-blue-800/30">
            <CardHeader>
              <CardTitle className="text-white">Analysis Results</CardTitle>
              <CardDescription className="text-blue-100">Results from your previous scans</CardDescription>
            </CardHeader>
            <CardContent>
              {analysisResults.length > 0 ? (
                <ul className="space-y-3">
                  {analysisResults.map((result) => (
                    <li key={result.id} className="bg-white/5 p-4 rounded-md">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-white font-medium">{result.scanName}</p>
                          <p className="text-sm text-blue-200">{result.date}</p>
                        </div>
                        <Badge variant={result.status === "Positive" ? "destructive" : "default"}>
                          {result.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-blue-100 mt-2">{result.description}</p>
                      <div className="flex justify-between mt-3">
                        <Link href={`/dashboard/patient/view-report?id=${result.id}`}>
                          <Button variant="outline" size="sm" className="flex items-center">
                            <FileText className="h-4 w-4 mr-2" />
                            Voir le rapport complet
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Télécharger
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-8 text-blue-200">
                  <AlertCircle className="mx-auto h-12 w-12 mb-3 opacity-50" />
                  <p>No analysis results yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appointments Tab */}
        <TabsContent value="appointments">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30">
              <CardHeader>
                <CardTitle className="text-white">Schedule Appointment</CardTitle>
                <CardDescription className="text-blue-100">Book a new appointment for a scan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-white/5 p-4 rounded-md text-center cursor-pointer hover:bg-white/10 transition-colors">
                      <Calendar className="h-8 w-8 mx-auto mb-2 text-blue-300" />
                      <p className="text-white font-medium">X-Ray</p>
                    </div>
                  </div>
                  <Link href="/dashboard/patient/schedule">
                    <Button className="w-full">Book Appointment</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30">
              <CardHeader>
                <CardTitle className="text-white">Upcoming Appointments</CardTitle>
                <CardDescription className="text-blue-100">Your scheduled appointments</CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingAppointments.length > 0 ? (
                  <ul className="space-y-3">
                    {upcomingAppointments.map((appointment) => (
                      <li key={appointment.id} className="bg-white/5 p-3 rounded-md">
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-500/20 p-2 rounded-md">
                            <Calendar className="h-5 w-5 text-blue-300" />
                          </div>
                          <div className="flex-1">
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
                        <div className="flex justify-end gap-2 mt-2">
                          <Link href={`/dashboard/patient/schedule?reschedule=${appointment.id}`}>
                            <Button variant="outline" size="sm" className="h-7 px-2">
                              Reschedule
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 px-2 text-red-400 hover:text-red-300"
                            onClick={() => {
                              if (confirm("Are you sure you want to cancel this appointment?")) {
                                alert(`Appointment ${appointment.id} has been cancelled.`)
                                // Dans une vraie application, vous feriez un appel API ici
                              }
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-8 text-blue-200">
                    <Calendar className="mx-auto h-12 w-12 mb-3 opacity-50" />
                    <p>No upcoming appointments</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent value="messages">
          <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30">
            <CardHeader>
              <CardTitle className="text-white">Messages</CardTitle>
              <CardDescription className="text-blue-100">Communication with the laboratory</CardDescription>
            </CardHeader>
            <CardContent>
              {messages.length > 0 ? (
                <ul className="space-y-3">
                  {messages.map((message) => (
                    <li key={message.id} className="bg-white/5 p-3 rounded-md">
                      <div className="flex justify-between items-start mb-1">
                        <p className="text-white font-medium">{message.subject}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {message.date}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-blue-300 hover:text-blue-100"
                            onClick={() => handleDeleteMessage(message.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {editingMessageId === message.id ? (
                        <div className="mt-2">
                          <Textarea
                            className="w-full p-2 bg-white/10 border border-blue-800/30 rounded-md text-white text-sm"
                            value={editedMessageText}
                            onChange={(e) => setEditedMessageText(e.target.value)}
                            rows={3}
                          />
                          <div className="flex justify-end gap-2 mt-2">
                            <Button variant="ghost" size="sm" className="h-7 px-2" onClick={handleCancelEdit}>
                              Annuler
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 px-2"
                              onClick={() => handleSaveEdit(message.id)}
                            >
                              Enregistrer
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="text-sm text-blue-100 line-clamp-2">{message.preview}</p>
                          <div className="flex justify-between mt-2">
                            <Link href="/dashboard/patient/messages">
                              <Button variant="ghost" size="sm" className="h-7 px-2 text-blue-300">
                                Lire le message
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 px-2 text-blue-300"
                              onClick={() => handleEditMessage(message.id, message.preview)}
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Modifier
                            </Button>
                          </div>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-8 text-blue-200">
                  <MessageSquare className="mx-auto h-12 w-12 mb-3 opacity-50" />
                  <p>No messages yet</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Link href="/dashboard/patient/messages">
                <Button className="w-full">New Message</Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mt-6 bg-white/10 backdrop-blur-sm border-blue-800/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Star className="h-5 w-5 text-amber-300 mr-2" />
            Premium Benefits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-r from-amber-500/20 to-amber-300/10 p-4 rounded-md">
            <p className="text-white font-medium mb-2">Passez à Premium pour des fonctionnalités améliorées!</p>
            <ul className="space-y-2 text-sm text-blue-100">
              <li className="flex items-start">
                <Star className="h-4 w-4 text-amber-300 mt-0.5 mr-2" />
                Analyse IA instantanée sans période d'attente
              </li>
              <li className="flex items-start">
                <Star className="h-4 w-4 text-amber-300 mt-0.5 mr-2" />
                Accès à notre réseau de médecins spécialistes pour des consultations
              </li>
              <li className="flex items-start">
                <Star className="h-4 w-4 text-amber-300 mt-0.5 mr-2" />
                Téléchargement direct de tout document médical, même d'autres laboratoires
              </li>
              <li className="flex items-start">
                <Star className="h-4 w-4 text-amber-300 mt-0.5 mr-2" />
                Support prioritaire de notre équipe médicale
              </li>
            </ul>
            <div className="mt-4">
              <Link href="/dashboard/patient/upgrade">
                <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-300 text-black hover:from-amber-600 hover:to-amber-400">
                  Passer à Premium - 2,500 DZD/mois
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dialog pour choisir le scan à analyser */}
      <Dialog open={isAnalyzeDialogOpen} onOpenChange={setIsAnalyzeDialogOpen}>
        <DialogContent className="bg-gray-900 border-blue-800/30 text-white">
          <DialogHeader>
            <DialogTitle>Choisir un scan à analyser</DialogTitle>
            <DialogDescription className="text-blue-100">
              Sélectionnez le scan que vous souhaitez analyser avec notre IA
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <RadioGroup
              value={selectedScanForAnalysis?.toString()}
              onValueChange={(value) => setSelectedScanForAnalysis(Number.parseInt(value))}
            >
              {availableScans.map((scan) => (
                <div key={scan.id} className="flex items-center space-x-2 mb-2 p-2 rounded hover:bg-white/5">
                  <RadioGroupItem value={scan.id.toString()} id={`scan-${scan.id}`} />
                  <Label htmlFor={`scan-${scan.id}`} className="flex-1 cursor-pointer">
                    <div className="font-medium">{scan.name}</div>
                    <div className="text-sm text-blue-200">{scan.date}</div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAnalyzeDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleAnalyzeConfirm} disabled={selectedScanForAnalysis === null}>
              Confirmer l'analyse
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

