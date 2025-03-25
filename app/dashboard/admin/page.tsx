"use client"

import { useState } from "react"
import { Calendar, Clock, FileText, Upload, Users, CheckCircle, XCircle, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AdminDashboard() {
  const [searchPatient, setSearchPatient] = useState("")
  const [searchAppointment, setSearchAppointment] = useState("")

  const filteredPatients = adminPatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchPatient.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchPatient.toLowerCase()) ||
      patient.id.toString().includes(searchPatient),
  )

  const filteredAppointments = adminAppointments.filter(
    (appointment) =>
      appointment.patientName.toLowerCase().includes(searchAppointment.toLowerCase()) ||
      appointment.type.toLowerCase().includes(searchAppointment.toLowerCase()) ||
      appointment.date.includes(searchAppointment),
  )

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <Badge variant="outline" className="bg-red-500/20 text-red-300 border-red-500/30 px-3 py-1">
          ADMIN
        </Badge>
      </div>

      <Tabs defaultValue="patients" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="scans">Manage Scans</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        {/* Patients Tab */}
        <TabsContent value="patients">
          <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-white">Patient Management</CardTitle>
                  <CardDescription className="text-blue-100">Manage all registered patients</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Search patients..."
                    className="w-64 bg-white/5 border-blue-800/30 text-white"
                    value={searchPatient}
                    onChange={(e) => setSearchPatient(e.target.value)}
                  />
                  <Button variant="outline">Add Patient</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-blue-800/30">
                <div className="bg-white/5 p-3 grid grid-cols-12 gap-4 font-medium text-white border-b border-blue-800/30">
                  <div className="col-span-1">ID</div>
                  <div className="col-span-3">Name</div>
                  <div className="col-span-3">Email</div>
                  <div className="col-span-2">Account Type</div>
                  <div className="col-span-1">Status</div>
                  <div className="col-span-2">Actions</div>
                </div>
                {filteredPatients.length > 0 ? (
                  <div className="divide-y divide-blue-800/30">
                    {filteredPatients.map((patient) => (
                      <div
                        key={patient.id}
                        className="p-3 grid grid-cols-12 gap-4 text-blue-100 items-center hover:bg-white/5"
                      >
                        <div className="col-span-1">{patient.id}</div>
                        <div className="col-span-3 flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={patient.avatar} alt={patient.name} />
                            <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-white">{patient.name}</span>
                        </div>
                        <div className="col-span-3">{patient.email}</div>
                        <div className="col-span-2">
                          <Badge
                            variant={patient.accountType === "Premium" ? "outline" : "secondary"}
                            className={
                              patient.accountType === "Premium"
                                ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                                : ""
                            }
                          >
                            {patient.accountType}
                          </Badge>
                        </div>
                        <div className="col-span-1">
                          <Badge variant={patient.status === "Active" ? "default" : "destructive"}>
                            {patient.status}
                          </Badge>
                        </div>
                        <div className="col-span-2 flex gap-2">
                          <Button size="sm" variant="outline" className="h-8">
                            Edit
                          </Button>
                          <Button size="sm" variant="outline" className="h-8">
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-blue-200">
                    <Users className="mx-auto h-12 w-12 mb-3 opacity-50" />
                    <p>No patients found matching your search</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-blue-200">
                Showing {filteredPatients.length} of {adminPatients.length} patients
              </div>
              <div className="flex gap-1">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Appointments Tab */}
        <TabsContent value="appointments">
          <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-white">Appointment Management</CardTitle>
                  <CardDescription className="text-blue-100">Manage all scheduled appointments</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Search appointments..."
                    className="w-64 bg-white/5 border-blue-800/30 text-white"
                    value={searchAppointment}
                    onChange={(e) => setSearchAppointment(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-blue-800/30">
                <div className="bg-white/5 p-3 grid grid-cols-12 gap-4 font-medium text-white border-b border-blue-800/30">
                  <div className="col-span-1">ID</div>
                  <div className="col-span-3">Patient</div>
                  <div className="col-span-2">Type</div>
                  <div className="col-span-2">Date & Time</div>
                  <div className="col-span-1">Status</div>
                  <div className="col-span-3">Actions</div>
                </div>
                {filteredAppointments.length > 0 ? (
                  <div className="divide-y divide-blue-800/30">
                    {filteredAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="p-3 grid grid-cols-12 gap-4 text-blue-100 items-center hover:bg-white/5"
                      >
                        <div className="col-span-1">{appointment.id}</div>
                        <div className="col-span-3 flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={appointment.patientAvatar} alt={appointment.patientName} />
                            <AvatarFallback>{appointment.patientName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-white">{appointment.patientName}</div>
                            <div className="text-xs">{appointment.patientEmail}</div>
                          </div>
                        </div>
                        <div className="col-span-2">{appointment.type}</div>
                        <div className="col-span-2">
                          <div>{appointment.date}</div>
                          <div className="text-xs">{appointment.time}</div>
                        </div>
                        <div className="col-span-1">
                          <Badge
                            variant={
                              appointment.status === "Confirmed"
                                ? "default"
                                : appointment.status === "Pending"
                                  ? "secondary"
                                  : appointment.status === "Cancelled"
                                    ? "destructive"
                                    : "outline"
                            }
                          >
                            {appointment.status}
                          </Badge>
                        </div>
                        <div className="col-span-3 flex gap-2">
                          <Button size="sm" variant="outline" className="h-8">
                            <CheckCircle className="h-4 w-4 mr-1" /> Confirm
                          </Button>
                          <Button size="sm" variant="outline" className="h-8">
                            <XCircle className="h-4 w-4 mr-1" /> Cancel
                          </Button>
                          <Button size="sm" variant="outline" className="h-8">
                            <Calendar className="h-4 w-4 mr-1" /> Reschedule
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-blue-200">
                    <Calendar className="mx-auto h-12 w-12 mb-3 opacity-50" />
                    <p>No appointments found matching your search</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Scans Tab */}
        <TabsContent value="scans">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30">
              <CardHeader>
                <CardTitle className="text-white">Upload Patient Scans</CardTitle>
                <CardDescription className="text-blue-100">Upload scans for patients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="patient-select" className="text-white">
                      Select Patient
                    </Label>
                    <select
                      id="patient-select"
                      className="w-full p-2 rounded-md bg-white/5 border border-blue-800/30 text-white"
                    >
                      <option value="" disabled selected>
                        Select a patient
                      </option>
                      {adminPatients.map((patient) => (
                        <option key={patient.id} value={patient.id}>
                          {patient.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="scan-type" className="text-white">
                      Scan Type
                    </Label>
                    <select
                      id="scan-type"
                      className="w-full p-2 rounded-md bg-white/5 border border-blue-800/30 text-white"
                    >
                      <option value="" disabled selected>
                        Select scan type
                      </option>
                      <option value="xray">X-Ray</option>
                      <option value="mri">MRI</option>
                      <option value="ct">CT Scan</option>
                      <option value="ultrasound">Ultrasound</option>
                    </select>
                  </div>

                  <div className="border-2 border-dashed border-blue-400/30 rounded-lg p-6 text-center">
                    <Upload className="h-10 w-10 mx-auto mb-4 text-blue-300" />
                    <p className="text-blue-100 mb-4">Select a scan to upload</p>
                    <input type="file" id="admin-scan-upload" className="hidden" accept="image/*,.pdf,.dcm" />
                    <label htmlFor="admin-scan-upload">
                      <Button asChild>
                        <span>Select File</span>
                      </Button>
                    </label>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="scan-notes" className="text-white">
                      Notes (Optional)
                    </Label>
                    <textarea
                      id="scan-notes"
                      className="w-full p-2 rounded-md bg-white/5 border border-blue-800/30 text-white h-20"
                      placeholder="Add any notes about this scan"
                    ></textarea>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Upload Scan</Button>
              </CardFooter>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30">
              <CardHeader>
                <CardTitle className="text-white">Recent Uploads</CardTitle>
                <CardDescription className="text-blue-100">Recently uploaded patient scans</CardDescription>
              </CardHeader>
              <CardContent>
                {adminRecentUploads.length > 0 ? (
                  <ul className="space-y-3">
                    {adminRecentUploads.map((upload) => (
                      <li key={upload.id} className="bg-white/5 p-3 rounded-md">
                        <div className="flex justify-between items-start mb-1">
                          <div className="flex items-center gap-2">
                            <div className="bg-blue-500/20 p-2 rounded-md">
                              <FileText className="h-4 w-4 text-blue-300" />
                            </div>
                            <div>
                              <p className="text-white font-medium">{upload.scanType}</p>
                              <p className="text-xs text-blue-200">Patient: {upload.patientName}</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {upload.date}
                          </Badge>
                        </div>
                        <div className="flex justify-between mt-3">
                          <Badge
                            variant={
                              upload.status === "Available"
                                ? "default"
                                : upload.status === "Processing"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {upload.status}
                          </Badge>
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost" className="h-7 px-2">
                              View
                            </Button>
                            <Button size="sm" variant="ghost" className="h-7 px-2">
                              Edit
                            </Button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-8 text-blue-200">
                    <FileText className="mx-auto h-12 w-12 mb-3 opacity-50" />
                    <p>No recent uploads</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6 bg-white/10 backdrop-blur-sm border-blue-800/30">
            <CardHeader>
              <CardTitle className="text-white">AI Analysis Alerts</CardTitle>
              <CardDescription className="text-blue-100">Alerts for scans that require attention</CardDescription>
            </CardHeader>
            <CardContent>
              {adminAlerts.length > 0 ? (
                <ul className="space-y-3">
                  {adminAlerts.map((alert) => (
                    <li key={alert.id} className="bg-white/5 p-4 rounded-md">
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-md ${
                            alert.severity === "High"
                              ? "bg-red-500/20"
                              : alert.severity === "Medium"
                                ? "bg-amber-500/20"
                                : "bg-blue-500/20"
                          }`}
                        >
                          <AlertTriangle
                            className={`h-5 w-5 ${
                              alert.severity === "High"
                                ? "text-red-300"
                                : alert.severity === "Medium"
                                  ? "text-amber-300"
                                  : "text-blue-300"
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="text-white font-medium">
                              {alert.patientName} - {alert.scanType}
                            </p>
                            <Badge
                              variant={
                                alert.severity === "High"
                                  ? "destructive"
                                  : alert.severity === "Medium"
                                    ? "secondary"
                                    : "default"
                              }
                            >
                              {alert.severity} Priority
                            </Badge>
                          </div>
                          <p className="text-sm text-blue-100 mt-1">{alert.message}</p>
                          <div className="flex items-center text-xs text-blue-200 mt-2">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            <span>{alert.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 mt-3">
                        <Button size="sm" variant="outline">
                          Review Scan
                        </Button>
                        <Button size="sm">Contact Patient</Button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-8 text-blue-200">
                  <AlertTriangle className="mx-auto h-12 w-12 mb-3 opacity-50" />
                  <p>No alerts at this time</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent value="messages">
          <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-white">Message Center</CardTitle>
                  <CardDescription className="text-blue-100">Manage communications with patients</CardDescription>
                </div>
                <Button>New Message</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 border border-blue-800/30 rounded-md overflow-hidden">
                  <div className="bg-white/5 p-3 border-b border-blue-800/30">
                    <Input placeholder="Search messages..." className="bg-white/5 border-blue-800/30 text-white" />
                  </div>
                  <div className="divide-y divide-blue-800/30 max-h-[400px] overflow-y-auto">
                    {adminMessages.map((message, index) => (
                      <div
                        key={message.id}
                        className={`p-3 hover:bg-white/5 cursor-pointer ${index === 0 ? "bg-white/5" : ""}`}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={message.avatar} alt={message.name} />
                            <AvatarFallback>{message.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center">
                              <p className="text-white font-medium truncate">{message.name}</p>
                              <p className="text-xs text-blue-200">{message.time}</p>
                            </div>
                            <p className="text-sm text-blue-100 truncate">{message.preview}</p>
                          </div>
                          {message.unread && <div className="h-2 w-2 bg-blue-500 rounded-full"></div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2 border border-blue-800/30 rounded-md overflow-hidden flex flex-col">
                  <div className="bg-white/5 p-3 border-b border-blue-800/30 flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={adminMessages[0].avatar} alt={adminMessages[0].name} />
                      <AvatarFallback>{adminMessages[0].name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-white font-medium">{adminMessages[0].name}</p>
                      <p className="text-xs text-blue-200">Last active: 10 minutes ago</p>
                    </div>
                  </div>

                  <div className="flex-1 p-4 space-y-4 max-h-[300px] overflow-y-auto">
                    <div className="flex justify-start">
                      <div className="bg-white/5 p-3 rounded-lg max-w-[80%]">
                        <p className="text-blue-100">
                          Hello, I've been experiencing some discomfort after my recent scan. Could you please check if
                          there's anything concerning in the results?
                        </p>
                        <p className="text-xs text-blue-200 mt-1 text-right">10:30 AM</p>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <div className="bg-blue-500/20 p-3 rounded-lg max-w-[80%]">
                        <p className="text-blue-100">
                          Hi {adminMessages[0].name}, I've reviewed your recent scan results and everything looks
                          normal. The discomfort you're experiencing is likely temporary and should subside within a few
                          days.
                        </p>
                        <p className="text-xs text-blue-200 mt-1 text-right">10:45 AM</p>
                      </div>
                    </div>

                    <div className="flex justify-start">
                      <div className="bg-white/5 p-3 rounded-lg max-w-[80%]">
                        <p className="text-blue-100">
                          Thank you for checking. Should I schedule a follow-up appointment if the discomfort persists?
                        </p>
                        <p className="text-xs text-blue-200 mt-1 text-right">11:02 AM</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border-t border-blue-800/30">
                    <div className="flex gap-2">
                      <Input placeholder="Type your message..." className="bg-white/5 border-blue-800/30 text-white" />
                      <Button>Send</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Sample data
const adminPatients = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    accountType: "Standard",
    status: "Active",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    name: "Emily Johnson",
    email: "emily.j@example.com",
    accountType: "Premium",
    status: "Active",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.b@example.com",
    accountType: "Standard",
    status: "Inactive",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah.w@example.com",
    accountType: "Premium",
    status: "Active",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 5,
    name: "David Lee",
    email: "david.lee@example.com",
    accountType: "Standard",
    status: "Active",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

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
  },
]

const adminRecentUploads = [
  {
    id: 1,
    patientName: "John Smith",
    scanType: "Chest X-Ray",
    date: "August 5, 2023",
    status: "Available",
  },
  {
    id: 2,
    patientName: "Emily Johnson",
    scanType: "Brain MRI",
    date: "August 6, 2023",
    status: "Processing",
  },
  {
    id: 3,
    patientName: "Michael Brown",
    scanType: "Abdominal CT Scan",
    date: "August 7, 2023",
    status: "Available",
  },
]

const adminAlerts = [
  {
    id: 1,
    patientName: "Sarah Wilson",
    scanType: "Lung X-Ray",
    severity: "High",
    message: "Potential abnormality detected in the lower right lung. Immediate review recommended.",
    date: "August 7, 2023",
  },
  {
    id: 2,
    patientName: "David Lee",
    scanType: "Brain MRI",
    severity: "Medium",
    message: "Unusual pattern detected in frontal lobe. Further examination may be required.",
    date: "August 6, 2023",
  },
  {
    id: 3,
    patientName: "Emily Johnson",
    scanType: "Spine MRI",
    severity: "Low",
    message: "Minor irregularity in L4-L5 region. Consider follow-up in 3 months.",
    date: "August 5, 2023",
  },
]

const adminMessages = [
  {
    id: 1,
    name: "John Smith",
    preview: "Hello, I've been experiencing some discomfort after my recent scan. Could you please check...",
    time: "11:02 AM",
    unread: true,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Emily Johnson",
    preview: "Thank you for the quick response. I'll schedule the follow-up appointment as suggested.",
    time: "Yesterday",
    unread: false,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Michael Brown",
    preview: "I need to reschedule my appointment for next week. Is there any availability on Thursday?",
    time: "Aug 5",
    unread: true,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    preview: "Could you please send me a copy of my latest scan results? I need them for a specialist consultation.",
    time: "Aug 4",
    unread: false,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

