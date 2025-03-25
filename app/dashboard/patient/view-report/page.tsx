"use client"

import { ArrowLeft, Download, FileText, CheckCircle, MessageSquare } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function ViewReportPage() {
  const handleDownloadReport = () => {
    // Simuler le téléchargement d'un rapport PDF
    const link = document.createElement("a")
    link.href = "#"
    link.setAttribute("download", "chest_xray_report.pdf")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    alert("Téléchargement du rapport commencé...")
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Link href="/dashboard/patient" className="mr-4">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-white">Rapport d'analyse IA</h1>
        <Badge className="ml-4">Chest X-Ray - June 18, 2023</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-white">Résultats de l'analyse</CardTitle>
                <Badge variant="default">Négatif</Badge>
              </div>
              <CardDescription className="text-blue-100">
                Analyse effectuée par l'IA DEEPVISION le 18 juin 2023
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-green-500/10 border border-green-500/20 rounded-md p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <h3 className="text-lg font-medium text-green-300">Aucune anomalie détectée</h3>
                </div>
                <p className="text-blue-100">
                  L'analyse n'a révélé aucune anomalie significative dans cette radiographie thoracique. Les poumons
                  apparaissent clairs et en bonne santé.
                </p>
              </div>

              <div>
                <h3 className="text-white font-medium mb-2">Détails de l'analyse</h3>
                <div className="bg-white/5 rounded-md p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-blue-200 text-sm mb-1">Poumons</h4>
                      <p className="text-blue-100">
                        Les champs pulmonaires apparaissent clairs. Aucune opacité focale ou diffuse n'est observée.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-blue-200 text-sm mb-1">Cœur</h4>
                      <p className="text-blue-100">
                        La taille du cœur est dans les limites normales. Aucune cardiomégalie n'est observée.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-blue-200 text-sm mb-1">Médiastin</h4>
                      <p className="text-blue-100">
                        Le médiastin est de taille et de contour normaux. Aucune masse médiastinale n'est observée.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-blue-200 text-sm mb-1">Plèvre</h4>
                      <p className="text-blue-100">Aucun épanchement pleural n'est observé. Pas de pneumothorax.</p>
                    </div>
                    <div>
                      <h4 className="text-blue-200 text-sm mb-1">Ossature</h4>
                      <p className="text-blue-100">
                        Les structures osseuses visibles sont normales. Aucune fracture ou lésion osseuse n'est
                        observée.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-blue-200 text-sm mb-1">Tissus mous</h4>
                      <p className="text-blue-100">
                        Les tissus mous sont normaux. Aucune anomalie des tissus mous n'est observée.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-white font-medium mb-2">Méthodologie d'analyse</h3>
                <p className="text-blue-100">
                  Cette analyse a été réalisée à l'aide de notre algorithme d'intelligence artificielle DEEPVISION, qui
                  a été formé sur plus de 1 million de radiographies thoraciques annotées par des radiologues experts.
                  L'algorithme utilise des réseaux de neurones convolutifs profonds pour détecter les anomalies avec une
                  précision de 95%.
                </p>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-md p-4">
                <h3 className="text-white font-medium mb-2">Avertissement médical</h3>
                <p className="text-sm text-blue-100">
                  Cette analyse par IA est fournie à titre informatif et ne remplace pas l'avis d'un professionnel de la
                  santé qualifié. Veuillez consulter votre médecin pour une évaluation complète et un diagnostic.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleDownloadReport} className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Télécharger le rapport complet (PDF)
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30 mb-6">
            <CardHeader>
              <CardTitle className="text-white">Informations sur le scan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-blue-200">Type de scan</p>
                  <p className="text-white">Radiographie thoracique (X-Ray)</p>
                </div>
                <div>
                  <p className="text-sm text-blue-200">Date de réalisation</p>
                  <p className="text-white">15 juin 2023</p>
                </div>
                <div>
                  <p className="text-sm text-blue-200">Date d'analyse</p>
                  <p className="text-white">18 juin 2023</p>
                </div>
                <div>
                  <p className="text-sm text-blue-200">Réalisé par</p>
                  <p className="text-white">Dr. Sarah Johnson</p>
                </div>
                <div>
                  <p className="text-sm text-blue-200">Établissement</p>
                  <p className="text-white">DEEPVISION Medical Center</p>
                </div>
                <div>
                  <p className="text-sm text-blue-200">Statut</p>
                  <Badge>Analysé</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30">
            <CardHeader>
              <CardTitle className="text-white">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/dashboard/patient/view-scan">
                <Button variant="outline" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Voir l'image du scan
                </Button>
              </Link>
              <Link href="/dashboard/patient/messages">
                <Button variant="outline" className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contacter un médecin
                </Button>
              </Link>
              <Button variant="outline" className="w-full" onClick={handleDownloadReport}>
                <Download className="h-4 w-4 mr-2" />
                Télécharger le rapport
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

