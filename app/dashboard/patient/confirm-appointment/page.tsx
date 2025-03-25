"use client"

import { useState } from "react"
import { ArrowLeft, Calendar, Clock, MapPin, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ConfirmAppointmentPage() {
  const [isConfirming, setIsConfirming] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const router = useRouter()

  const handleConfirm = () => {
    setIsConfirming(true)
    // Simuler un délai de traitement
    setTimeout(() => {
      setIsConfirming(false)
      setIsConfirmed(true)
      // Rediriger après 2 secondes
      setTimeout(() => {
        router.push("/dashboard/patient")
      }, 2000)
    }, 1500)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Link href="/dashboard/patient/schedule" className="mr-4">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-white">Confirmer le Rendez-vous</h1>
      </div>

      {isConfirmed ? (
        <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30 max-w-md mx-auto">
          <CardContent className="pt-6 pb-6 text-center">
            <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Rendez-vous Confirmé!</h2>
            <p className="text-blue-100 mb-4">Votre rendez-vous a été confirmé avec succès.</p>
            <p className="text-blue-200 text-sm">Redirection vers le tableau de bord...</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30">
            <CardHeader>
              <CardTitle className="text-white">Détails du Rendez-vous</CardTitle>
              <CardDescription className="text-blue-100">Vérifiez les détails avant de confirmer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white/5 p-4 rounded-md">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-500/20 p-2 rounded-md">
                    <Calendar className="h-5 w-5 text-blue-300" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Radiographie Thoracique (X-Ray)</p>
                    <div className="flex items-center text-sm text-blue-200 mt-1">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      <span>15 Août 2023</span>
                    </div>
                    <div className="flex items-center text-sm text-blue-200 mt-0.5">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      <span>10:30 AM</span>
                    </div>
                    <div className="flex items-center text-sm text-blue-200 mt-0.5">
                      <MapPin className="h-3.5 w-3.5 mr-1" />
                      <span>DEEPVISION Centre Principal</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 p-4 rounded-md">
                <h3 className="text-white font-medium mb-2">Instructions</h3>
                <ul className="space-y-1 text-sm text-blue-100">
                  <li>• Veuillez arriver 15 minutes avant l'heure prévue</li>
                  <li>• Apportez votre carte d'identité et votre carte d'assurance</li>
                  <li>• Portez des vêtements confortables sans éléments métalliques</li>
                  <li>• Informez le personnel de toute allergie ou condition médicale</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleConfirm} disabled={isConfirming}>
                {isConfirming ? "Traitement en cours..." : "Confirmer le Rendez-vous"}
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30">
            <CardHeader>
              <CardTitle className="text-white">Informations sur l'Examen</CardTitle>
              <CardDescription className="text-blue-100">À propos de la radiographie thoracique</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white/5 p-4 rounded-md">
                <h3 className="text-white font-medium mb-2">Qu'est-ce qu'une radiographie thoracique?</h3>
                <p className="text-sm text-blue-100">
                  Une radiographie thoracique est un examen médical qui utilise de faibles doses de rayonnement pour
                  produire des images de l'intérieur de votre poitrine. Elle permet de visualiser les poumons, le cœur,
                  les gros vaisseaux, les côtes et le diaphragme.
                </p>
              </div>

              <div className="bg-white/5 p-4 rounded-md">
                <h3 className="text-white font-medium mb-2">Préparation</h3>
                <p className="text-sm text-blue-100">
                  Aucune préparation spéciale n'est nécessaire pour une radiographie thoracique. Vous devrez simplement
                  retirer tout bijou, lunettes ou objets métalliques de la zone à examiner et porter une blouse
                  d'hôpital si nécessaire.
                </p>
              </div>

              <div className="bg-white/5 p-4 rounded-md">
                <h3 className="text-white font-medium mb-2">Durée</h3>
                <p className="text-sm text-blue-100">
                  L'examen lui-même ne prend que quelques minutes. Vous serez positionné devant une plaque de
                  radiographie et on vous demandera de retenir votre respiration pendant quelques secondes pendant que
                  l'image est prise.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

