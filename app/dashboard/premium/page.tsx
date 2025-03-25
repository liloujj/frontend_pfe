"use client"

import type React from "react"
import { useState } from "react"
import { Calendar, Clock, FileText, Upload, MessageSquare, AlertCircle, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

export default function PremiumDashboard() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Premium Dashboard</h1>
        <Badge variant="outline" className="bg-gradient-to-r from-amber-500 to-amber-300 text-black border-0 px-3 py-1">
          PREMIUM
        </Badge>
      </div>

      <Tabs defaultValue="scans" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="scans">My Scans</TabsTrigger>
          <TabsTrigger value="upload">Upload & Analyze</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="doctors">Doctors</TabsTrigger>
        </TabsList>

        {/* Scans Tab */}
        <TabsContent value="scans">
          <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30">
            <CardHeader>
              <CardTitle className="text-white">My Medical Documents</CardTitle>
              <CardDescription className="text-blue-100">All your uploaded medical documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {medicalDocuments.map((doc) => (
                  <div key={doc.id} className="bg-white/5 p-4 rounded-md">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-blue-500/20 p-2 rounded-md">
                        <FileText className="h-5 w-5 text-blue-300" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{doc.name}</p>
                        <p className="text-xs text-blue-200">{doc.date}</p>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <Badge variant="outline" className="text-xs">
                        {doc.type}
                      </Badge>
                      <div className="flex gap-2">
                        <Link href={`/dashboard/premium/view-scan?id=${doc.id}`}>
                          <Button size="sm" variant="ghost" className="h-7 px-2">
                            View
                          </Button>
                        </Link>
                        <Link href={`/dashboard/premium/view-report?id=${doc.id}`}>
                          <Button size="sm" variant="ghost" className="h-7 px-2">
                            Results
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6 bg-white/10 backdrop-blur-sm border-blue-800/30">
            <CardHeader>
              <CardTitle className="text-white">Analysis Results</CardTitle>
              <CardDescription className="text-blue-100">Results from your previous scans</CardDescription>
            </CardHeader>
            <CardContent>
              {premiumAnalysisResults.length > 0 ? (
                <ul className="space-y-3">
                  {premiumAnalysisResults.map((result) => (
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
                      <div className="flex gap-2 mt-3">
                        <Link href={`/dashboard/premium/view-report?id=${result.id}`}>
                          <Button variant="outline" size="sm">
                            View Full Report
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm">
                          Download PDF
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

        {/* Upload & Analyze Tab */}
        <TabsContent value="upload">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30">
              <CardHeader>
                <CardTitle className="text-white">Upload Medical Document</CardTitle>
                <CardDescription className="text-blue-100">
                  Upload any medical document for instant AI analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-blue-400/30 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 mx-auto mb-4 text-blue-300" />
                  <p className="text-blue-100 mb-4">Drag and drop your medical document or click to browse</p>
                  <p className="text-xs text-blue-200 mb-6">Supported formats: JPG, PNG, PDF, DICOM</p>
                  <input
                    type="file"
                    id="document-upload"
                    className="hidden"
                    accept="image/*,.pdf,.dcm"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="document-upload">
                    <Button asChild>
                      <span>Select File</span>
                    </Button>
                  </label>
                  {selectedFile && <p className="mt-4 text-sm text-blue-100">Selected: {selectedFile.name}</p>}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                <Button className="w-full" disabled={!selectedFile}>
                  Upload & Analyze Now
                </Button>
                <p className="text-xs text-blue-200 text-center">
                  As a premium member, your results will be available immediately after processing
                </p>
              </CardFooter>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30">
              <CardHeader>
                <CardTitle className="text-white">Premium Benefits</CardTitle>
                <CardDescription className="text-blue-100">Your exclusive premium features</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="bg-amber-500/20 p-2 rounded-md mt-0.5">
                      <Upload className="h-4 w-4 text-amber-300" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Direct Upload</p>
                      <p className="text-sm text-blue-200">Upload any medical document, even from other laboratories</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-amber-500/20 p-2 rounded-md mt-0.5">
                      <Clock className="h-4 w-4 text-amber-300" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Instant Results</p>
                      <p className="text-sm text-blue-200">Get AI analysis results immediately after processing</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-amber-500/20 p-2 rounded-md mt-0.5">
                      <User className="h-4 w-4 text-amber-300" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Doctor Network</p>
                      <p className="text-sm text-blue-200">
                        Access to our network of specialist doctors for consultations
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-amber-500/20 p-2 rounded-md mt-0.5">
                      <MessageSquare className="h-4 w-4 text-amber-300" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Priority Support</p>
                      <p className="text-sm text-blue-200">Get priority responses from our medical team</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
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
                  <Link href="/dashboard/premium/schedule">
                    <Button className="w-full">Prendre Rendez-vous</Button>
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

        {/* Doctors Tab */}
        <TabsContent value="doctors">
          <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30">
            <CardHeader>
              <CardTitle className="text-white">Available Specialists</CardTitle>
              <CardDescription className="text-blue-100">
                Connect with medical specialists for consultations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {doctors.map((doctor) => (
                  <div key={doctor.id} className="bg-white/5 p-4 rounded-md">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12 border-2 border-blue-500/30">
                        <AvatarImage src={doctor.avatar} alt={doctor.name} />
                        <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-white font-medium">{doctor.name}</p>
                        <p className="text-sm text-blue-200">{doctor.specialty}</p>
                        <div className="flex items-center mt-1">
                          <Badge variant="outline" className="text-xs mr-2">
                            {doctor.availability}
                          </Badge>
                          <p className="text-xs text-blue-300">{doctor.experience}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-blue-800/30 flex justify-between">
                      <Link href="/dashboard/premium/doctor-profile">
                        <Button size="sm" variant="outline">
                          View Profile
                        </Button>
                      </Link>
                      <Link href="/dashboard/premium/schedule">
                        <Button size="sm">Prendre Rendez-vous</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Sample data
const medicalDocuments = [
  { id: 1, name: "Chest X-Ray", date: "June 15, 2023", type: "X-Ray" },
  { id: 2, name: "Spine MRI", date: "July 3, 2023", type: "MRI" },
  { id: 3, name: "Blood Test Results", date: "July 10, 2023", type: "Lab Report" },
  { id: 4, name: "Cardiac Ultrasound", date: "July 25, 2023", type: "Ultrasound" },
  { id: 5, name: "Brain CT Scan", date: "August 2, 2023", type: "CT Scan" },
]

const premiumAnalysisResults = [
  {
    id: 1,
    scanName: "Chest X-Ray",
    date: "June 18, 2023",
    status: "Negative",
    description: "No abnormalities detected. Lungs appear clear and healthy.",
  },
  {
    id: 2,
    scanName: "Brain CT Scan",
    date: "August 2, 2023",
    status: "Positive",
    description: "Small abnormality detected in the frontal lobe. Further examination recommended.",
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

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Radiologist",
    availability: "Available Now",
    experience: "15 years experience",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Neurologist",
    availability: "Available Tomorrow",
    experience: "12 years experience",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Cardiologist",
    availability: "Available Now",
    experience: "10 years experience",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Pulmonologist",
    availability: "Available Friday",
    experience: "8 years experience",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Dr. Aisha Patel",
    specialty: "Oncologist",
    availability: "Available Now",
    experience: "14 years experience",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

