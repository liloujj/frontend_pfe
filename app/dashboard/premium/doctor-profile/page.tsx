"use client"
import { ArrowLeft, Star, Phone, Mail, MapPin, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function DoctorProfilePage() {
  // Normalement, vous récupéreriez l'ID du médecin depuis l'URL
  // et vous chargeriez ses données depuis une API
  const doctor = {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Radiologist",
    availability: "Available Now",
    experience: "15 years experience",
    rating: 4.8,
    reviewCount: 124,
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Dr. Sarah Johnson is a board-certified radiologist with over 15 years of experience in diagnostic imaging. She specializes in chest and abdominal imaging, with particular expertise in early cancer detection using advanced imaging techniques.",
    specializations: ["Chest Imaging", "Abdominal Imaging", "Cancer Detection", "MRI Interpretation"],
    education: [
      "MD, Harvard Medical School",
      "Residency in Radiology, Massachusetts General Hospital",
      "Fellowship in Thoracic Imaging, Johns Hopkins Hospital",
    ],
    contact: {
      phone: "+213 555 123 456",
      email: "dr.johnson@deepvisionlab.com",
      address: "123 Medical Plaza, Suite 100, Alger",
      hours: "Dimanche - Jeudi: 9h00 - 17h00",
    },
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
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Link href="/dashboard/premium/doctors" className="mr-4">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-white">Profil du Médecin</h1>
        <Badge className="ml-4 bg-gradient-to-r from-amber-500 to-amber-300 text-black border-0">PREMIUM</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 border-2 border-blue-500/30 mb-4">
                  <AvatarImage src={doctor.avatar} alt={doctor.name} />
                  <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold text-white">{doctor.name}</h2>
                <p className="text-blue-200 mb-2">{doctor.specialty}</p>
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(doctor.rating) ? "text-amber-400 fill-amber-400" : "text-blue-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-blue-300 ml-2">({doctor.reviewCount} avis)</span>
                </div>
                <Badge variant="outline" className="mb-4">
                  {doctor.experience}
                </Badge>

                <div className="w-full space-y-3 text-left">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-blue-300 mr-3" />
                    <p className="text-blue-100">{doctor.contact.phone}</p>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-blue-300 mr-3" />
                    <p className="text-blue-100">{doctor.contact.email}</p>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 text-blue-300 mr-3 mt-1" />
                    <p className="text-blue-100">{doctor.contact.address}</p>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-blue-300 mr-3" />
                    <p className="text-blue-100">{doctor.contact.hours}</p>
                  </div>
                </div>

                <Link href="/dashboard/premium/schedule" className="w-full mt-6">
                  <Button className="w-full">Prendre Rendez-vous</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30">
            <CardHeader>
              <CardTitle className="text-white">À propos du Dr. {doctor.name.split(" ")[1]}</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="about">Biographie</TabsTrigger>
                  <TabsTrigger value="expertise">Expertise</TabsTrigger>
                  <TabsTrigger value="reviews">Avis</TabsTrigger>
                </TabsList>

                <TabsContent value="about">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-white font-medium mb-2">Biographie</h3>
                      <p className="text-blue-100 text-sm">{doctor.bio}</p>
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-2">Formation</h3>
                      <ul className="space-y-2 text-sm text-blue-100">
                        {doctor.education.map((edu, index) => (
                          <li key={index}>• {edu}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="expertise">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-white font-medium mb-2">Spécialisations</h3>
                      <div className="flex flex-wrap gap-2">
                        {doctor.specializations.map((spec) => (
                          <Badge key={spec} variant="outline" className="bg-white/5">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-2">Services</h3>
                      <ul className="space-y-2 text-sm text-blue-100">
                        <li>• Interprétation des radiographies</li>
                        <li>• Consultation spécialisée</li>
                        <li>• Suivi médical</li>
                        <li>• Deuxième avis médical</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="reviews">
                  <div className="space-y-4">
                    {doctor.reviews.map((review) => (
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
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30 mt-6">
            <CardHeader>
              <CardTitle className="text-white">Disponibilités</CardTitle>
              <CardDescription className="text-blue-100">Prochains créneaux disponibles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-white font-medium mb-2">Cette semaine</h3>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                    {[
                      { day: "Dim", date: "13", slots: 3 },
                      { day: "Lun", date: "14", slots: 2 },
                      { day: "Mar", date: "15", slots: 5 },
                      { day: "Mer", date: "16", slots: 1 },
                      { day: "Jeu", date: "17", slots: 4 },
                    ].map((date) => (
                      <div
                        key={date.day}
                        className="p-2 rounded-md text-center cursor-pointer bg-white/5 hover:bg-white/10"
                      >
                        <p className="text-xs text-blue-200">{date.day}</p>
                        <p className="text-white font-medium">{date.date}</p>
                        <p className="text-xs text-blue-200">{date.slots} créneaux</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/dashboard/premium/schedule" className="w-full">
                <Button className="w-full">Voir tous les créneaux disponibles</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

