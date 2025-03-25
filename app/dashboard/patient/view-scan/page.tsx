"use client"

import { useState } from "react"
import { ArrowLeft, Download, ZoomIn, ZoomOut, RotateCw, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function ViewScanPage() {
  const [zoomLevel, setZoomLevel] = useState(100)
  const [rotation, setRotation] = useState(0)

  const handleZoomIn = () => {
    if (zoomLevel < 200) setZoomLevel(zoomLevel + 25)
  }

  const handleZoomOut = () => {
    if (zoomLevel > 50) setZoomLevel(zoomLevel - 25)
  }

  const handleRotate = () => {
    setRotation((rotation + 90) % 360)
  }

  // Ajouter des fonctions pour simuler le téléchargement
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

  const handleDownloadScan = () => {
    // Simuler le téléchargement d'une image
    const link = document.createElement("a")
    link.href = "/placeholder.svg?height=400&width=400"
    link.setAttribute("download", "chest_xray.png")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    alert("Téléchargement de l'image commencé...")
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Link href="javascript:history.back()" className="mr-4">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-white">Chest X-Ray</h1>
        <Badge className="ml-4">June 15, 2023</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Scan Image</CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon" onClick={handleZoomIn}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleZoomOut}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleRotate}>
                  <RotateCw className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex justify-center p-0 overflow-hidden">
              <div
                className="relative bg-black/20 w-full h-[500px] flex items-center justify-center"
                style={{ padding: "20px" }}
              >
                <img
                  src="/placeholder.svg?height=400&width=400"
                  alt="Chest X-Ray"
                  style={{
                    transform: `scale(${zoomLevel / 100}) rotate(${rotation}deg)`,
                    transition: "transform 0.3s ease",
                    maxWidth: "100%",
                    maxHeight: "100%",
                  }}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button>
                <FileText className="h-4 w-4 mr-2" />
                Analyze with AI
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30 mb-6">
            <CardHeader>
              <CardTitle className="text-white">Scan Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-blue-200">Scan Type</p>
                  <p className="text-white">Chest X-Ray</p>
                </div>
                <div>
                  <p className="text-sm text-blue-200">Date Performed</p>
                  <p className="text-white">June 15, 2023</p>
                </div>
                <div>
                  <p className="text-sm text-blue-200">Performed By</p>
                  <p className="text-white">Dr. Sarah Johnson</p>
                </div>
                <div>
                  <p className="text-sm text-blue-200">Facility</p>
                  <p className="text-white">DEEPVISION Medical Center</p>
                </div>
                <div>
                  <p className="text-sm text-blue-200">Status</p>
                  <Badge>Analyzed</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30">
            <CardHeader>
              <CardTitle className="text-white">AI Analysis Results</CardTitle>
              <CardDescription className="text-blue-100">Automated findings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-md">
                  <p className="font-medium text-green-300 mb-1">No Abnormalities Detected</p>
                  <p className="text-sm text-blue-100">
                    The AI analysis did not detect any significant abnormalities in this scan.
                  </p>
                </div>
                <div>
                  <p className="text-sm text-blue-200 mb-2">Analysis Details:</p>
                  <ul className="space-y-2 text-sm text-blue-100">
                    <li>• Lung fields appear clear</li>
                    <li>• No evidence of consolidation</li>
                    <li>• Heart size within normal limits</li>
                    <li>• No pleural effusion</li>
                    <li>• No pneumothorax</li>
                  </ul>
                </div>
                <div className="pt-4 border-t border-blue-800/30">
                  <p className="text-xs text-blue-200">
                    Note: AI analysis is provided as a screening tool and should not replace professional medical
                    advice. Please consult with your healthcare provider for a complete evaluation.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleDownloadReport}>
                <Download className="h-4 w-4 mr-2" />
                Télécharger Rapport
              </Button>
              <Button variant="outline" onClick={handleDownloadScan}>
                <FileText className="h-4 w-4 mr-2" />
                Télécharger Scan
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

