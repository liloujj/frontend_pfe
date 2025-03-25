"use client"

import type React from "react"

import { useState, useRef } from "react"
import { ArrowLeft, Upload, FileText, CheckCircle, AlertCircle, Download } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
      // Reset states when a new file is selected
      setUploadProgress(0)
      setIsUploading(false)
      setIsAnalyzing(false)
      setIsComplete(false)
      setAnalysisResult(null)
    }
  }

  const handleUpload = () => {
    if (!selectedFile) return

    setIsUploading(true)

    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 5
      setUploadProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        setIsUploading(false)
        setIsAnalyzing(true)

        // Simulate analysis (takes 3 seconds)
        setTimeout(() => {
          setIsAnalyzing(false)
          setIsComplete(true)

          // Mock analysis result
          setAnalysisResult({
            status: "Negative",
            confidence: 98.5,
            findings: "No abnormalities detected. Lungs appear clear and healthy.",
            recommendations: "No further action required. Continue with regular check-ups.",
          })
        }, 3000)
      }
    }, 200)
  }

  const handleNewUpload = () => {
    setSelectedFile(null)
    setUploadProgress(0)
    setIsUploading(false)
    setIsAnalyzing(false)
    setIsComplete(false)
    setAnalysisResult(null)

    // Focus the file input
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Link href="/dashboard/premium" className="mr-4">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-white">Upload & Analyze</h1>
        <Badge className="ml-4 bg-gradient-to-r from-amber-500 to-amber-300 text-black border-0">PREMIUM</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30">
          <CardHeader>
            <CardTitle className="text-white">Upload Medical Document</CardTitle>
            <CardDescription className="text-blue-100">
              Upload any medical document for instant AI analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isComplete ? (
              <div className="space-y-6">
                <div className="border-2 border-dashed border-blue-400/30 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 mx-auto mb-4 text-blue-300" />
                  <p className="text-blue-100 mb-4">
                    {selectedFile ? selectedFile.name : "Drag and drop your medical document or click to browse"}
                  </p>
                  <p className="text-xs text-blue-200 mb-6">Supported formats: JPG, PNG, PDF, DICOM</p>
                  <input
                    ref={fileInputRef}
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
                </div>

                {selectedFile && !isUploading && !isAnalyzing && (
                  <Button className="w-full" onClick={handleUpload}>
                    Upload & Analyze Now
                  </Button>
                )}

                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-blue-200">Uploading...</span>
                      <span className="text-blue-200">{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}

                {isAnalyzing && (
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-md p-4 text-center">
                    <div className="animate-pulse">
                      <p className="text-blue-300 font-medium">Analyzing your document...</p>
                      <p className="text-sm text-blue-200 mt-2">
                        Our AI is processing your document. This will only take a few seconds.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-green-500/10 border border-green-500/30 rounded-md p-4 text-center">
                <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-2" />
                <p className="text-green-300 font-medium">Analysis Complete!</p>
                <p className="text-sm text-blue-200 mt-2">
                  Your document has been successfully analyzed. View the results below.
                </p>
                <Button variant="outline" className="mt-4" onClick={handleNewUpload}>
                  Upload Another Document
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30">
          {isComplete && analysisResult ? (
            <>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-white">Analysis Results</CardTitle>
                    <CardDescription className="text-blue-100">AI-powered analysis of your document</CardDescription>
                  </div>
                  <Badge variant={analysisResult.status === "Negative" ? "default" : "destructive"}>
                    {analysisResult.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-blue-200 mb-1">Confidence Score</p>
                  <div className="flex items-center">
                    <Progress value={analysisResult.confidence} className="h-2 flex-1 mr-2" />
                    <span className="text-white font-medium">{analysisResult.confidence}%</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-blue-200 mb-1">Findings</p>
                  <p className="bg-white/5 p-3 rounded-md text-blue-100">{analysisResult.findings}</p>
                </div>

                <div>
                  <p className="text-sm text-blue-200 mb-1">Recommendations</p>
                  <p className="bg-white/5 p-3 rounded-md text-blue-100">{analysisResult.recommendations}</p>
                </div>

                <div className="pt-4 border-t border-blue-800/30">
                  <p className="text-xs text-blue-200">
                    Note: AI analysis is provided as a screening tool and should not replace professional medical
                    advice. Please consult with your healthcare provider for a complete evaluation.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  Télécharger Rapport
                </Button>
                <Button variant="outline" className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger Scan
                </Button>
              </CardFooter>
            </>
          ) : (
            <>
              <CardHeader>
                <CardTitle className="text-white">Analysis Results</CardTitle>
                <CardDescription className="text-blue-100">
                  Upload a document to see AI analysis results
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <AlertCircle className="h-16 w-16 text-blue-300/50 mb-4" />
                <p className="text-blue-200 text-center">
                  No analysis results yet. Upload a medical document to get instant AI analysis.
                </p>
              </CardContent>
            </>
          )}
        </Card>
      </div>

      {isComplete && analysisResult && (
        <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30 mt-6">
          <CardHeader>
            <CardTitle className="text-white">Médecins Spécialistes Recommandés</CardTitle>
            <CardDescription className="text-blue-100">Basé sur les résultats de votre analyse</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analysisResult.status === "Positive" ? (
                // Afficher des spécialistes pour les résultats positifs
                <>
                  <div className="bg-white/5 p-4 rounded-md">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10 border-2 border-blue-500/30">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Dr. Karim Benali" />
                        <AvatarFallback>KB</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-white font-medium">Dr. Karim Benali</p>
                        <p className="text-sm text-blue-200">Pneumologue</p>
                        <div className="flex items-center text-xs text-blue-300 mt-1">
                          <span>+213 555123456</span>
                        </div>
                        <div className="flex items-center text-xs text-blue-300 mt-0.5">
                          <span>Disponible: Dim-Jeu, 9h-16h</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end mt-3">
                      <Link href="/dashboard/premium/confirm-appointment">
                        <Button size="sm">Prendre Rendez-vous</Button>
                      </Link>
                    </div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-md">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10 border-2 border-blue-500/30">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Dr. Amina Khelif" />
                        <AvatarFallback>AK</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-white font-medium">Dr. Amina Khelif</p>
                        <p className="text-sm text-blue-200">Radiologue</p>
                        <div className="flex items-center text-xs text-blue-300 mt-1">
                          <span>+213 555789012</span>
                        </div>
                        <div className="flex items-center text-xs text-blue-300 mt-0.5">
                          <span>Disponible: Lun-Mer, 10h-17h</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end mt-3">
                      <Link href="/dashboard/premium/confirm-appointment">
                        <Button size="sm">Prendre Rendez-vous</Button>
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                // Afficher un message pour les résultats négatifs
                <div className="bg-white/5 p-4 rounded-md text-center">
                  <p className="text-blue-100">
                    Aucune anomalie n'a été détectée. Aucune consultation spécialisée n'est nécessaire pour le moment.
                  </p>
                  <p className="text-sm text-blue-200 mt-2">
                    Continuez vos examens de routine selon les recommandations de votre médecin traitant.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30 mt-6">
        <CardHeader>
          <CardTitle className="text-white">Premium Upload History</CardTitle>
          <CardDescription className="text-blue-100">Your recent document uploads and analyses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {uploadHistory.map((item) => (
              <div key={item.id} className="bg-white/5 p-4 rounded-md">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <div className="bg-blue-500/20 p-2 rounded-md mr-3">
                      <FileText className="h-5 w-5 text-blue-300" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{item.name}</p>
                      <p className="text-xs text-blue-200">{item.date}</p>
                    </div>
                  </div>
                  <Badge variant={item.result === "Negative" ? "default" : "destructive"}>{item.result}</Badge>
                </div>
                <p className="text-sm text-blue-100 mt-2">{item.summary}</p>
                <div className="flex justify-end gap-2 mt-3">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button size="sm">Download</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Sample data
const uploadHistory = [
  {
    id: 1,
    name: "Chest X-Ray.jpg",
    date: "August 5, 2023",
    result: "Negative",
    summary: "No abnormalities detected. Lungs appear clear and healthy.",
  },
  {
    id: 2,
    name: "Brain MRI.dcm",
    date: "July 28, 2023",
    result: "Positive",
    summary: "Small abnormality detected in the frontal lobe. Further examination recommended.",
  },
  {
    id: 3,
    name: "Blood Test Results.pdf",
    date: "July 15, 2023",
    result: "Negative",
    summary: "All values within normal range. No concerns identified.",
  },
]

