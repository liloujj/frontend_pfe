"use client"

import type React from "react"

import { useState, useRef } from "react"
import { ArrowLeft, Upload, FileText, AlertTriangle, Search, Filter, Download, Eye, Edit, Trash } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Données d'exemple
const patients = [
  { id: 1, name: "John Smith" },
  { id: 2, name: "Emily Johnson" },
  { id: 3, name: "Michael Brown" },
  { id: 4, name: "Sarah Wilson" },
  { id: 5, name: "David Lee" },
]

const adminScans = [
  {
    id: 1,
    patientName: "John Smith",
    scanType: "Chest X-Ray",
    date: "August 5, 2023",
    status: "Available",
    notes: "Normal lung appearance. No significant findings.",
  },
  {
    id: 2,
    patientName: "Emily Johnson",
    scanType: "Brain MRI",
    date: "August 6, 2023",
    status: "Processing",
    notes: "Patient reported recurring headaches. Compare with previous scan from January.",
  },
  {
    id: 3,
    patientName: "Michael Brown",
    scanType: "Abdominal CT Scan",
    date: "August 7, 2023",
    status: "Available",
    notes: "Follow-up scan after treatment.",
  },
  {
    id: 4,
    patientName: "Sarah Wilson",
    scanType: "Lung X-Ray",
    date: "August 7, 2023",
    status: "Available",
    notes: "Patient has history of pneumonia. Checking for recurrence.",
  },
  {
    id: 5,
    patientName: "David Lee",
    scanType: "Brain MRI",
    date: "August 8, 2023",
    status: "Processing",
    notes: "",
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

export default function ScansManagementPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<string>("")
  const [selectedScanType, setSelectedScanType] = useState<string>("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [notes, setNotes] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  const [selectedScan, setSelectedScan] = useState<any>(null)
  const [scanToDelete, setScanToDelete] = useState<number | null>(null)

  // État pour les scans
  const [scans, setScans] = useState(adminScans)

  // État pour le scan édité
  const [editedScan, setEditedScan] = useState<any>(null)

  // Filtrer les scans selon la recherche
  const filteredScans = scans.filter(
    (scan) =>
      scan.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scan.scanType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scan.status.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  // Fonction pour télécharger un scan
  const handleUploadScan = () => {
    if (!selectedPatient || !selectedScanType || !selectedFile) {
      alert("Veuillez remplir tous les champs obligatoires")
      return
    }

    // Créer un nouveau scan (ID serait généralement géré par le backend)
    const newId = scans.length > 0 ? Math.max(...scans.map((s) => s.id)) + 1 : 1

    const newScan = {
      id: newId,
      patientName: selectedPatient,
      scanType: selectedScanType,
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      status: "Processing",
      notes: notes,
    }

    // Ajouter le scan à la liste
    setScans([...scans, newScan])

    // Réinitialiser le formulaire
    setSelectedPatient("")
    setSelectedScanType("")
    setSelectedFile(null)
    setNotes("")

    // Afficher une confirmation
    alert(`Scan téléchargé pour ${selectedPatient}. En cours de traitement.`)
  }

  // Fonction pour ouvrir le dialogue d'édition de scan
  const handleEditScan = (scan: any) => {
    setSelectedScan({
      ...scan,
      notes: scan.notes || "",
    })
    setEditedScan({
      ...scan,
      notes: scan.notes || "",
    })
    setIsEditDialogOpen(true)
  }

  // Fonction pour voir les détails d'un scan
  const handleViewScan = (scan: any) => {
    setSelectedScan(scan)
    setIsViewDialogOpen(true)
  }

  // Fonction pour ouvrir le dialogue de confirmation de suppression
  const openDeleteConfirm = (id: number) => {
    setScanToDelete(id)
    setIsDeleteConfirmOpen(true)
  }

  // Fonction pour supprimer un scan
  const handleDeleteScan = () => {
    if (scanToDelete === null) return

    // Trouver le scan dans la liste
    const scanToDeleteObj = scans.find((scan) => scan.id === scanToDelete)

    if (scanToDeleteObj) {
      // Créer une copie du tableau sans le scan supprimé
      const updatedScans = scans.filter((scan) => scan.id !== scanToDelete)

      // Mettre à jour l'état
      setScans(updatedScans)

      // Fermer le dialogue
      setIsDeleteConfirmOpen(false)
      setScanToDelete(null)

      // Afficher une confirmation
      alert(`Scan pour ${scanToDeleteObj.patientName} a été supprimé.`)
    }
  }

  // Fonction pour sauvegarder les modifications d'un scan
  const handleSaveEdit = () => {
    if (!selectedScan || !editedScan) return

    // Trouver l'index du scan dans la liste
    const scanIndex = scans.findIndex((scan) => scan.id === selectedScan.id)

    if (scanIndex !== -1) {
      // Créer une copie du tableau des scans
      const updatedScans = [...scans]

      // Mettre à jour le scan
      updatedScans[scanIndex] = {
        ...updatedScans[scanIndex],
        ...editedScan,
      }

      // Mettre à jour l'état
      setScans(updatedScans)

      // Fermer le dialogue
      setIsEditDialogOpen(false)

      // Afficher une confirmation
      alert("Détails du scan mis à jour avec succès!")
    }
  }

  // Fonction pour traiter un scan d'alerte
  const handleProcessAlert = (alertId: number) => {
    alert(`Alerte ${alertId} a été traitée. Dans une application réelle, cela marquerait l'alerte comme résolue.`)
  }

  // Fonction pour contacter un patient à partir d'une alerte
  const handleContactPatient = (alertId: number) => {
    const alert = adminAlerts.find((a) => a.id === alertId)
    if (alert) {
      router.push("/dashboard/admin/messages")
    }
  }

  // Fonction pour exporter les scans (simulée)
  const handleExportScans = () => {
    alert(
      "Export des données de scans en cours. Dans une application réelle, cela téléchargerait un fichier CSV ou Excel.",
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
        <h1 className="text-3xl font-bold text-white">Scan Management</h1>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="all">All Scans</TabsTrigger>
          <TabsTrigger value="upload">Upload Scan</TabsTrigger>
          <TabsTrigger value="alerts">AI Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30">
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <CardTitle className="text-white">All Scans</CardTitle>
                  <CardDescription className="text-blue-100">Manage all patient scans</CardDescription>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 h-4 w-4" />
                    <Input
                      placeholder="Search scans..."
                      className="bg-white/5 border-blue-800/30 text-white pl-10 w-full"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" className="w-full md:w-auto">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" className="w-full md:w-auto" onClick={handleExportScans}>
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredScans.length > 0 ? (
                  filteredScans.map((scan) => (
                    <div key={scan.id} className="bg-white/5 p-4 rounded-md">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-500/20 p-2 rounded-md">
                            <FileText className="h-5 w-5 text-blue-300" />
                          </div>
                          <div>
                            <p className="text-white font-medium">{scan.scanType}</p>
                            <p className="text-xs text-blue-200">Patient: {scan.patientName}</p>
                            <p className="text-xs text-blue-200">Uploaded: {scan.date}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-start md:items-end">
                          <Badge
                            variant={
                              scan.status === "Available"
                                ? "default"
                                : scan.status === "Processing"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {scan.status}
                          </Badge>
                          <div className="flex gap-2 mt-3">
                            <Button size="sm" variant="outline" onClick={() => handleViewScan(scan)}>
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleEditScan(scan)}>
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openDeleteConfirm(scan.id)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-blue-200">
                    <FileText className="mx-auto h-12 w-12 mb-3 opacity-50" />
                    <p>No scans found matching your search</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload">
          <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30">
            <CardHeader>
              <CardTitle className="text-white">Upload Patient Scan</CardTitle>
              <CardDescription className="text-blue-100">Upload a new scan for a patient</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="patient-select" className="text-white">
                    Select Patient
                  </label>
                  <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                    <SelectTrigger className="bg-white/5 border-blue-800/30 text-white">
                      <SelectValue placeholder="Select a patient" />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.map((patient) => (
                        <SelectItem key={patient.id} value={patient.name}>
                          {patient.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="scan-type" className="text-white">
                    Scan Type
                  </label>
                  <Select value={selectedScanType} onValueChange={setSelectedScanType}>
                    <SelectTrigger className="bg-white/5 border-blue-800/30 text-white">
                      <SelectValue placeholder="Select scan type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="X-Ray">X-Ray</SelectItem>
                      <SelectItem value="MRI">MRI</SelectItem>
                      <SelectItem value="CT Scan">CT Scan</SelectItem>
                      <SelectItem value="Ultrasound">Ultrasound</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="border-2 border-dashed border-blue-400/30 rounded-lg p-6 text-center">
                  <Upload className="h-10 w-10 mx-auto mb-4 text-blue-300" />
                  <p className="text-blue-100 mb-4">{selectedFile ? selectedFile.name : "Select a scan to upload"}</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    id="admin-scan-upload"
                    className="hidden"
                    accept="image/*,.pdf,.dcm"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="admin-scan-upload">
                    <Button asChild>
                      <span>Select File</span>
                    </Button>
                  </label>
                </div>

                <div className="space-y-2">
                  <label htmlFor="scan-notes" className="text-white">
                    Notes (Optional)
                  </label>
                  <textarea
                    id="scan-notes"
                    className="w-full p-2 rounded-md bg-white/5 border border-blue-800/30 text-white h-20"
                    placeholder="Add any notes about this scan"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={handleUploadScan}
                disabled={!selectedPatient || !selectedScanType || !selectedFile}
              >
                Upload Scan
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="alerts">
          <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30">
            <CardHeader>
              <CardTitle className="text-white">AI Analysis Alerts</CardTitle>
              <CardDescription className="text-blue-100">Alerts for scans that require attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {adminAlerts.map((alert) => (
                  <div key={alert.id} className="bg-white/5 p-4 rounded-md">
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
                          <FileText className="h-3.5 w-3.5 mr-1" />
                          <span>{alert.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-3">
                      <Button size="sm" variant="outline" onClick={() => handleProcessAlert(alert.id)}>
                        Review Scan
                      </Button>
                      <Button size="sm" onClick={() => handleContactPatient(alert.id)}>
                        Contact Patient
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialogue de visualisation de scan */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="bg-gray-900 border-blue-800/30 text-white">
          <DialogHeader>
            <DialogTitle>View Scan</DialogTitle>
          </DialogHeader>
          {selectedScan && (
            <div className="space-y-4 py-2">
              <div className="flex justify-center">
                <div className="bg-black/20 p-4 rounded-md">
                  <img
                    src="/placeholder.svg?height=300&width=300"
                    alt={`${selectedScan.scanType} for ${selectedScan.patientName}`}
                    className="max-w-full h-auto"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div>
                  <p className="text-sm text-blue-200">Patient Name</p>
                  <p className="text-white">{selectedScan.patientName}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-200">Scan Type</p>
                  <p className="text-white">{selectedScan.scanType}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-200">Date</p>
                  <p className="text-white">{selectedScan.date}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-200">Status</p>
                  <p className="text-white">
                    <Badge
                      variant={
                        selectedScan.status === "Available"
                          ? "default"
                          : selectedScan.status === "Processing"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {selectedScan.status}
                    </Badge>
                  </p>
                </div>
              </div>

              {selectedScan.notes && (
                <div className="pt-4">
                  <p className="text-sm text-blue-200">Notes</p>
                  <div className="bg-white/5 p-3 rounded-md text-blue-100 mt-1">{selectedScan.notes}</div>
                </div>
              )}

              <div className="flex justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsViewDialogOpen(false)
                    handleEditScan(selectedScan)
                  }}
                >
                  Edit Scan
                </Button>
                <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialogue d'édition de scan */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-gray-900 border-blue-800/30 text-white">
          <DialogHeader>
            <DialogTitle>Edit Scan</DialogTitle>
            <DialogDescription className="text-blue-100">Update the scan information.</DialogDescription>
          </DialogHeader>
          {selectedScan && editedScan && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="patient-name">Patient Name</Label>
                <Input
                  id="patient-name"
                  value={editedScan.patientName || ""}
                  onChange={(e) => setEditedScan({ ...editedScan, patientName: e.target.value })}
                  className="bg-white/5 border-blue-800/30 text-white"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="scan-type">Scan Type</Label>
                <Select
                  value={editedScan.scanType || ""}
                  onValueChange={(value) => setEditedScan({ ...editedScan, scanType: value })}
                >
                  <SelectTrigger id="scan-type" className="bg-white/5 border-blue-800/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Chest X-Ray">Chest X-Ray</SelectItem>
                    <SelectItem value="Brain MRI">Brain MRI</SelectItem>
                    <SelectItem value="Abdominal CT Scan">Abdominal CT Scan</SelectItem>
                    <SelectItem value="Lung X-Ray">Lung X-Ray</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  value={editedScan.date || ""}
                  onChange={(e) => setEditedScan({ ...editedScan, date: e.target.value })}
                  className="bg-white/5 border-blue-800/30 text-white"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={editedScan.status || ""}
                  onValueChange={(value) => setEditedScan({ ...editedScan, status: value })}
                >
                  <SelectTrigger id="status" className="bg-white/5 border-blue-800/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Processing">Processing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  className="bg-white/5 border-blue-800/30 text-white min-h-[100px]"
                  placeholder="Add any notes about this scan"
                  value={editedScan.notes || ""}
                  onChange={(e) => setEditedScan({ ...editedScan, notes: e.target.value })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogue de confirmation de suppression */}
      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent className="bg-gray-900 border-blue-800/30 text-white">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription className="text-blue-100">
              Are you sure you want to delete this scan? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsDeleteConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteScan}>
              Delete Scan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

