"use client"

import { useState } from "react"
import { ArrowLeft, Search, Video, MessageSquare, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function DoctorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null)
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null)

  const filteredDoctors = doctors.filter(
    (doctor) =>
      (searchQuery === "" ||
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedSpecialty === null || doctor.specialty === selectedSpecialty),
  )

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Link href="/dashboard/premium" className="mr-4">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-white">Doctor Network</h1>
        <Badge className="ml-4 bg-gradient-to-r from-amber-500 to-amber-300 text-black border-0">PREMIUM</Badge>
      </div>

      <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30 mb-6">
        <CardHeader>
          <CardTitle className="text-white">Find a Specialist</CardTitle>
          <CardDescription className="text-blue-100">
            Connect with medical specialists for consultations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 h-4 w-4" />
              <Input
                placeholder="Search by name or specialty..."
                className="bg-white/5 border-blue-800/30 text-white pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {specialties.map((specialty) => (
                <Badge
                  key={specialty}
                  variant="outline"
                  className={`cursor-pointer ${
                    selectedSpecialty === specialty
                      ? "bg-blue-500/30 border-blue-500/50"
                      : "bg-white/5 hover:bg-white/10"
                  }`}
                  onClick={() => setSelectedSpecialty(selectedSpecialty === specialty ? null : specialty)}
                >
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white/5 p-4 rounded-md cursor-pointer hover:bg-white/10 transition-colors"
                onClick={() => setSelectedDoctor(doctor)}
              >
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12 border-2 border-blue-500/30">
                    <AvatarImage src={doctor.avatar} alt={doctor.name} />
                    <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-white font-medium">{doctor.name}</p>
                    <p className="text-sm text-blue-200">{doctor.specialty}</p>
                    <div className="flex items-center mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < doctor.rating ? "text-amber-400 fill-amber-400" : "text-blue-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-blue-300 ml-2">({doctor.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center mt-2">
                      <Badge variant="outline" className="text-xs mr-2">
                        {doctor.availability}
                      </Badge>
                      <p className="text-xs text-blue-300">{doctor.experience}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-blue-800/30 flex flex-col gap-2">
                  <div className="flex items-center text-sm text-blue-200">
                    <span className="font-medium text-white mr-2">Spécialité:</span> {doctor.specialty}
                  </div>
                  <div className="flex items-center text-sm text-blue-200">
                    <span className="font-medium text-white mr-2">Téléphone:</span> +213{" "}
                    {Math.floor(Math.random() * 900000000) + 500000000}
                  </div>
                  <div className="flex items-center text-sm text-blue-200">
                    <span className="font-medium text-white mr-2">Horaires:</span> Dim-Jeu, 9h-17h
                  </div>
                  <Button size="sm" className="mt-2">
                    Prendre Rendez-vous
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredDoctors.length === 0 && (
            <div className="text-center py-8 text-blue-200">
              <p>No doctors found matching your search criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedDoctor && (
        <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16 border-2 border-blue-500/30">
                  <AvatarImage src={selectedDoctor.avatar} alt={selectedDoctor.name} />
                  <AvatarFallback>{selectedDoctor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-white">{selectedDoctor.name}</CardTitle>
                  <CardDescription className="text-blue-100">{selectedDoctor.specialty}</CardDescription>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < selectedDoctor.rating ? "text-amber-400 fill-amber-400" : "text-blue-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-blue-300 ml-2">({selectedDoctor.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => setSelectedDoctor(null)}>
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="about">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-white font-medium mb-2">Biography</h3>
                    <p className="text-blue-100 text-sm">{selectedDoctor.bio}</p>
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-2">Specializations</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedDoctor.specializations.map((spec: string) => (
                        <Badge key={spec} variant="outline" className="bg-white/5">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-2">Education & Training</h3>
                    <ul className="space-y-2 text-sm text-blue-100">
                      {selectedDoctor.education.map((edu: string, index: number) => (
                        <li key={index}>• {edu}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="schedule">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-white font-medium mb-2">Available Appointment Slots</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {availableDates.map((date) => (
                        <div
                          key={date.value}
                          className="p-2 rounded-md text-center cursor-pointer bg-white/5 hover:bg-white/10"
                        >
                          <p className="text-xs text-blue-200">{date.day}</p>
                          <p className="text-white font-medium">{date.date}</p>
                          <p className="text-xs text-blue-200">{date.month}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-2">Consultation Options</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-white/5 p-3 rounded-md">
                        <div className="flex items-center mb-2">
                          <Video className="h-5 w-5 text-blue-300 mr-2" />
                          <p className="text-white font-medium">Consultation en personne</p>
                        </div>
                        <p className="text-sm text-blue-200 mb-3">30 minutes - Au cabinet médical</p>
                        <Link href="/dashboard/premium/schedule">
                          <Button size="sm" className="w-full">
                            Prendre Rendez-vous
                          </Button>
                        </Link>
                      </div>
                      <div className="bg-white/5 p-3 rounded-md">
                        <div className="flex items-center mb-2">
                          <MessageSquare className="h-5 w-5 text-blue-300 mr-2" />
                          <p className="text-white font-medium">Consultation à distance</p>
                        </div>
                        <p className="text-sm text-blue-200 mb-3">Consultation par téléphone ou vidéo</p>
                        <Link href="/dashboard/premium/schedule">
                          <Button size="sm" className="w-full">
                            Prendre Rendez-vous
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews">
                <div className="space-y-4">
                  {selectedDoctor.reviews.map((review: any) => (
                    <div key={review.id} className="bg-white/5 p-3 rounded-md">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <p className="text-white font-medium">{review.name}</p>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < review.rating ? "text-amber-400 fill-amber-400" : "text-blue-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-blue-100">{review.comment}</p>
                      <p className="text-xs text-blue-200 mt-2">{review.date}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href="/dashboard/premium/doctor-profile">
              <Button size="sm" variant="outline">
                Voir Profil
              </Button>
            </Link>
            <Link href="/dashboard/premium/schedule">
              <Button>Prendre Rendez-vous</Button>
            </Link>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

// Sample data
const specialties = ["Radiologist", "Neurologist", "Cardiologist", "Pulmonologist", "Oncologist"]

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Radiologist",
    availability: "Available Now",
    experience: "15 years experience",
    rating: 4.8,
    reviewCount: 124,
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Dr. Sarah Johnson is a board-certified radiologist with over 15 years of experience in diagnostic imaging. She specializes in chest and abdominal imaging, with particular expertise in early cancer detection using advanced imaging techniques.",
    specializations: ["Chest Imaging", "Abdominal Imaging", "Cancer Detection", "MRI Interpretation"],
    education: [
      "MD, Harvard Medical School",
      "Residency in Radiology, Massachusetts General Hospital",
      "Fellowship in Thoracic Imaging, Johns Hopkins Hospital",
    ],
    reviews: [
      {
        id: 1,
        name: "John D.",
        rating: 5,
        comment:
          "Dr. Johnson provided an excellent interpretation of my complex chest CT. She explained everything clearly and answered all my questions.",
        date: "July 15, 2023",
      },
      {
        id: 2,
        name: "Maria S.",
        rating: 4,
        comment: "Very professional and knowledgeable. The consultation was thorough and helpful.",
        date: "June 28, 2023",
      },
      {
        id: 3,
        name: "Robert T.",
        rating: 5,
        comment:
          "Dr. Johnson detected an issue that other radiologists missed. I'm extremely grateful for her expertise.",
        date: "June 10, 2023",
      },
    ],
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Neurologist",
    availability: "Available Tomorrow",
    experience: "12 years experience",
    rating: 4.7,
    reviewCount: 98,
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Dr. Michael Chen is a neurologist specializing in brain imaging and neurological disorders. With 12 years of clinical experience, he focuses on the diagnosis and treatment of conditions affecting the brain and nervous system.",
    specializations: ["Brain Imaging", "Neurological Disorders", "Stroke Management", "Headache Treatment"],
    education: [
      "MD, Stanford University School of Medicine",
      "Residency in Neurology, UCSF Medical Center",
      "Fellowship in Neuroimaging, Mayo Clinic",
    ],
    reviews: [
      {
        id: 1,
        name: "Emily R.",
        rating: 5,
        comment:
          "Dr. Chen is exceptional. He took the time to explain my MRI results in detail and outlined a clear treatment plan.",
        date: "July 20, 2023",
      },
      {
        id: 2,
        name: "David L.",
        rating: 4,
        comment: "Very thorough and knowledgeable. The video consultation was convenient and effective.",
        date: "July 5, 2023",
      },
    ],
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Cardiologist",
    availability: "Available Now",
    experience: "10 years experience",
    rating: 4.9,
    reviewCount: 112,
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Dr. Emily Rodriguez is a cardiologist with expertise in cardiac imaging and heart disease management. She has 10 years of experience in diagnosing and treating various heart conditions using advanced imaging techniques.",
    specializations: ["Cardiac Imaging", "Heart Disease", "Echocardiography", "Preventive Cardiology"],
    education: [
      "MD, Yale School of Medicine",
      "Residency in Internal Medicine, Brigham and Women's Hospital",
      "Fellowship in Cardiovascular Disease, Cleveland Clinic",
    ],
    reviews: [
      {
        id: 1,
        name: "Thomas W.",
        rating: 5,
        comment:
          "Dr. Rodriguez is amazing. Her interpretation of my cardiac CT was detailed and she provided excellent recommendations.",
        date: "July 25, 2023",
      },
      {
        id: 2,
        name: "Susan M.",
        rating: 5,
        comment:
          "Extremely knowledgeable and caring. She took the time to answer all my questions about my heart condition.",
        date: "July 12, 2023",
      },
    ],
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Pulmonologist",
    availability: "Available Friday",
    experience: "8 years experience",
    rating: 4.6,
    reviewCount: 76,
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Dr. James Wilson is a pulmonologist specializing in lung imaging and respiratory disorders. With 8 years of experience, he focuses on the diagnosis and management of conditions affecting the lungs and respiratory system.",
    specializations: ["Lung Imaging", "COPD", "Asthma", "Pulmonary Fibrosis"],
    education: [
      "MD, Duke University School of Medicine",
      "Residency in Internal Medicine, Johns Hopkins Hospital",
      "Fellowship in Pulmonary Medicine, Massachusetts General Hospital",
    ],
    reviews: [
      {
        id: 1,
        name: "Patricia K.",
        rating: 5,
        comment:
          "Dr. Wilson provided an excellent analysis of my chest X-ray and gave me clear instructions for managing my condition.",
        date: "July 18, 2023",
      },
      {
        id: 2,
        name: "Michael D.",
        rating: 4,
        comment: "Very professional and thorough. The consultation was helpful in understanding my respiratory issues.",
        date: "July 3, 2023",
      },
    ],
  },
  {
    id: 5,
    name: "Dr. Aisha Patel",
    specialty: "Oncologist",
    availability: "Available Now",
    experience: "14 years experience",
    rating: 4.9,
    reviewCount: 135,
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Dr. Aisha Patel is an oncologist with expertise in cancer imaging and treatment. With 14 years of experience, she specializes in the interpretation of imaging studies for cancer diagnosis, staging, and treatment monitoring.",
    specializations: ["Cancer Imaging", "Tumor Detection", "Treatment Monitoring", "Radiation Oncology"],
    education: [
      "MD, Johns Hopkins School of Medicine",
      "Residency in Radiation Oncology, Memorial Sloan Kettering Cancer Center",
      "Fellowship in Cancer Imaging, MD Anderson Cancer Center",
    ],
    reviews: [
      {
        id: 1,
        name: "Jennifer L.",
        rating: 5,
        comment:
          "Dr. Patel is exceptional. Her expertise in interpreting my imaging studies was crucial for my cancer treatment.",
        date: "July 22, 2023",
      },
      {
        id: 2,
        name: "Robert S.",
        rating: 5,
        comment:
          "Dr. Patel provided detailed explanations of my scan results and developed a comprehensive treatment plan. Her expertise is invaluable.",
        date: "July 10, 2023",
      },
      {
        id: 3,
        name: "Lisa M.",
        rating: 4,
        comment:
          "Very knowledgeable and compassionate. She took the time to address all my concerns about my diagnosis.",
        date: "June 30, 2023",
      },
    ],
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

