"use client"

import { useState } from "react"
import { ArrowLeft, Search, Edit, Eye, Trash2, Plus, Download } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

export default function PatientsManagementPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const patientsPerPage = 5

  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false)
  const [isEditPatientOpen, setIsEditPatientOpen] = useState(false)
  const [isViewPatientOpen, setIsViewPatientOpen] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<any>(null)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  const [patientToDelete, setPatientToDelete] = useState<number | null>(null)
  const [patients, setPatients] = useState(adminPatients)

  // État pour le nouveau patient
  const [newPatient, setNewPatient] = useState({
    name: "",
    email: "",
    accountType: "Standard",
    status: "Active",
  })

  // État pour le patient édité
  const [editedPatient, setEditedPatient] = useState({
    id: 0,
    name: "",
    email: "",
    accountType: "",
    status: "",
    avatar: "",
  })

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toString().includes(searchQuery),
  )

  const indexOfLastPatient = currentPage * patientsPerPage
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage
  const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient)
  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage)

  // Fonction pour ouvrir le dialogue de confirmation de suppression
  const openDeleteConfirm = (id: number) => {
    setPatientToDelete(id)
    setIsDeleteConfirmOpen(true)
  }

  // Fonction pour supprimer un patient
  const handleDeletePatient = () => {
    if (patientToDelete === null) return

    // Créer une copie du tableau sans le patient supprimé
    const updatedPatients = patients.filter((patient) => patient.id !== patientToDelete)

    // Mettre à jour l'état
    setPatients(updatedPatients)

    // Fermer le dialogue
    setIsDeleteConfirmOpen(false)
    setPatientToDelete(null)

    // Afficher une confirmation
    alert(`Patient avec ID ${patientToDelete} a été supprimé avec succès`)
  }

  // Fonction pour ajouter un patient
  const handleAddPatient = () => {
    setNewPatient({
      name: "",
      email: "",
      accountType: "Standard",
      status: "Active",
    })
    setIsAddPatientOpen(true)
  }

  // Fonction pour ouvrir le dialogue d'édition de patient
  const handleEditPatient = (patient: any) => {
    setEditedPatient({
      id: patient.id,
      name: patient.name,
      email: patient.email,
      accountType: patient.accountType,
      status: patient.status,
      avatar: patient.avatar || "/placeholder.svg?height=32&width=32",
    })
    setSelectedPatient(patient)
    setIsEditPatientOpen(true)
  }

  // Fonction pour enregistrer un nouveau patient
  const handleSaveNewPatient = () => {
    // Valider le formulaire
    if (!newPatient.name || !newPatient.email) {
      alert("Veuillez remplir tous les champs obligatoires")
      return
    }

    // Créer un nouvel ID (généralement géré par le backend)
    const newId = patients.length > 0 ? Math.max(...patients.map((p) => p.id)) + 1 : 1

    // Créer un nouveau patient
    const patient = {
      id: newId,
      name: newPatient.name,
      email: newPatient.email,
      accountType: newPatient.accountType,
      status: newPatient.status,
      avatar: "/placeholder.svg?height=32&width=32",
    }

    // Ajouter le patient à la liste
    setPatients([...patients, patient])

    // Fermer le dialogue
    setIsAddPatientOpen(false)

    // Afficher une confirmation
    alert(`Patient ${newPatient.name} ajouté avec succès!`)
  }

  // Fonction pour enregistrer les modifications d'un patient
  const handleSaveEditedPatient = () => {
    // Valider le formulaire
    if (!editedPatient.name || !editedPatient.email) {
      alert("Veuillez remplir tous les champs obligatoires")
      return
    }

    // Trouver l'index du patient dans la liste
    const patientIndex = patients.findIndex((patient) => patient.id === editedPatient.id)

    if (patientIndex !== -1) {
      // Créer une copie du tableau de patients
      const updatedPatients = [...patients]

      // Mettre à jour le patient
      updatedPatients[patientIndex] = {
        ...updatedPatients[patientIndex],
        name: editedPatient.name,
        email: editedPatient.email,
        accountType: editedPatient.accountType,
        status: editedPatient.status,
      }

      // Mettre à jour l'état
      setPatients(updatedPatients)
    }

    // Fermer le dialogue
    setIsEditPatientOpen(false)

    // Afficher une confirmation
    alert(`Patient ${editedPatient.name} mis à jour avec succès!`)
  }

  // Fonction pour voir les détails d'un patient
  const handleViewPatient = (patient: any) => {
    setSelectedPatient(patient)
    setIsViewPatientOpen(true)
  }

  // Fonction pour exporter les patients (simulée)
  const handleExportPatients = () => {
    alert(
      "Export des données patients en cours. Dans une application réelle, cela téléchargerait un fichier CSV ou Excel.",
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
        <h1 className="text-3xl font-bold text-white">Patient Management</h1>
      </div>

      <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-white">All Patients</CardTitle>
              <CardDescription className="text-blue-100">Manage all registered patients</CardDescription>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 h-4 w-4" />
                <Input
                  placeholder="Search patients..."
                  className="bg-white/5 border-blue-800/30 text-white pl-10 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button className="w-full md:w-auto" onClick={handleAddPatient}>
                <Plus className="h-4 w-4 mr-2" />
                Add Patient
              </Button>
              <Button variant="outline" className="w-full md:w-auto" onClick={handleExportPatients}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
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
            {currentPatients.length > 0 ? (
              <div className="divide-y divide-blue-800/30">
                {currentPatients.map((patient) => (
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
                          patient.accountType === "Premium" ? "bg-amber-500/20 text-amber-300 border-amber-500/30" : ""
                        }
                      >
                        {patient.accountType}
                      </Badge>
                    </div>
                    <div className="col-span-1">
                      <Badge variant={patient.status === "Active" ? "default" : "destructive"}>{patient.status}</Badge>
                    </div>
                    <div className="col-span-2 flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => handleEditPatient(patient)}
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => handleViewPatient(patient)}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
                        onClick={() => openDeleteConfirm(patient.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-blue-200">
                <p>No patients found matching your search</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-blue-200 mb-4 md:mb-0">
            Showing {indexOfFirstPatient + 1}-
            {indexOfLastPatient > filteredPatients.length ? filteredPatients.length : indexOfLastPatient} of{" "}
            {filteredPatients.length} patients
          </div>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i}
                variant={currentPage === i + 1 ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30 mt-6">
        <CardHeader>
          <CardTitle className="text-white">Patient Statistics</CardTitle>
          <CardDescription className="text-blue-100">Overview of patient data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/5 p-4 rounded-md">
              <p className="text-blue-200 text-sm">Total Patients</p>
              <p className="text-white text-2xl font-bold mt-1">{patients.length}</p>
              <p className="text-green-400 text-xs mt-2">↑ 12% from last month</p>
            </div>
            <div className="bg-white/5 p-4 rounded-md">
              <p className="text-blue-200 text-sm">Premium Accounts</p>
              <p className="text-white text-2xl font-bold mt-1">
                {patients.filter((p) => p.accountType === "Premium").length}
              </p>
              <p className="text-green-400 text-xs mt-2">↑ 8% from last month</p>
            </div>
            <div className="bg-white/5 p-4 rounded-md">
              <p className="text-blue-200 text-sm">Active Patients</p>
              <p className="text-white text-2xl font-bold mt-1">
                {patients.filter((p) => p.status === "Active").length}
              </p>
              <p className="text-blue-200 text-xs mt-2">No change from last month</p>
            </div>
            <div className="bg-white/5 p-4 rounded-md">
              <p className="text-blue-200 text-sm">Inactive Patients</p>
              <p className="text-white text-2xl font-bold mt-1">
                {patients.filter((p) => p.status === "Inactive").length}
              </p>
              <p className="text-red-400 text-xs mt-2">↑ 3% from last month</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dialogue d'ajout de patient */}
      <Dialog open={isAddPatientOpen} onOpenChange={setIsAddPatientOpen}>
        <DialogContent className="bg-gray-900 border-blue-800/30 text-white">
          <DialogHeader>
            <DialogTitle>Add New Patient</DialogTitle>
            <DialogDescription className="text-blue-100">Enter the details for the new patient.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Smith"
                className="bg-white/5 border-blue-800/30 text-white"
                value={newPatient.name}
                onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="john.smith@example.com"
                className="bg-white/5 border-blue-800/30 text-white"
                value={newPatient.email}
                onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="account-type">Account Type</Label>
              <Select
                value={newPatient.accountType}
                onValueChange={(value) => setNewPatient({ ...newPatient, accountType: value })}
              >
                <SelectTrigger id="account-type" className="bg-white/5 border-blue-800/30 text-white">
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Standard">Standard</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={newPatient.status}
                onValueChange={(value) => setNewPatient({ ...newPatient, status: value })}
              >
                <SelectTrigger id="status" className="bg-white/5 border-blue-800/30 text-white">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddPatientOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveNewPatient}>Add Patient</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogue d'édition de patient */}
      <Dialog open={isEditPatientOpen} onOpenChange={setIsEditPatientOpen}>
        <DialogContent className="bg-gray-900 border-blue-800/30 text-white">
          <DialogHeader>
            <DialogTitle>Edit Patient</DialogTitle>
            <DialogDescription className="text-blue-100">Update the patient information.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Full Name</Label>
              <Input
                id="edit-name"
                value={editedPatient.name}
                onChange={(e) => setEditedPatient({ ...editedPatient, name: e.target.value })}
                className="bg-white/5 border-blue-800/30 text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                value={editedPatient.email}
                onChange={(e) => setEditedPatient({ ...editedPatient, email: e.target.value })}
                className="bg-white/5 border-blue-800/30 text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-account-type">Account Type</Label>
              <Select
                value={editedPatient.accountType}
                onValueChange={(value) => setEditedPatient({ ...editedPatient, accountType: value })}
              >
                <SelectTrigger id="edit-account-type" className="bg-white/5 border-blue-800/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Standard">Standard</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select
                value={editedPatient.status}
                onValueChange={(value) => setEditedPatient({ ...editedPatient, status: value })}
              >
                <SelectTrigger id="edit-status" className="bg-white/5 border-blue-800/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditPatientOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEditedPatient}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogue de visualisation de patient */}
      <Dialog open={isViewPatientOpen} onOpenChange={setIsViewPatientOpen}>
        <DialogContent className="bg-gray-900 border-blue-800/30 text-white">
          <DialogHeader>
            <DialogTitle>Patient Details</DialogTitle>
          </DialogHeader>
          {selectedPatient && (
            <div className="space-y-4 py-2">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedPatient.avatar} alt={selectedPatient.name} />
                  <AvatarFallback>{selectedPatient.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{selectedPatient.name}</h3>
                  <p className="text-blue-200">{selectedPatient.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div>
                  <p className="text-sm text-blue-200">Account Type</p>
                  <p className="text-white">
                    <Badge
                      variant={selectedPatient.accountType === "Premium" ? "outline" : "secondary"}
                      className={
                        selectedPatient.accountType === "Premium"
                          ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                          : ""
                      }
                    >
                      {selectedPatient.accountType}
                    </Badge>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-blue-200">Status</p>
                  <p className="text-white">
                    <Badge variant={selectedPatient.status === "Active" ? "default" : "destructive"}>
                      {selectedPatient.status}
                    </Badge>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-blue-200">ID</p>
                  <p className="text-white">{selectedPatient.id}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-200">Registration Date</p>
                  <p className="text-white">January 15, 2023</p>
                </div>
              </div>

              <div className="pt-4">
                <h4 className="text-white font-medium mb-2">Recent Activity</h4>
                <div className="bg-white/5 p-3 rounded-md text-sm text-blue-100">
                  <p>• Last login: 2 days ago</p>
                  <p>• Last appointment: August 5, 2023</p>
                  <p>• Last scan upload: July 28, 2023</p>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsViewPatientOpen(false)
                    handleEditPatient(selectedPatient)
                  }}
                >
                  Edit Patient
                </Button>
                <Button onClick={() => setIsViewPatientOpen(false)}>Close</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialogue de confirmation de suppression */}
      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent className="bg-gray-900 border-blue-800/30 text-white">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription className="text-blue-100">
              Are you sure you want to delete this patient? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsDeleteConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeletePatient}>
              Delete Patient
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Données d'exemple
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
  {
    id: 6,
    name: "Jennifer Adams",
    email: "jennifer.a@example.com",
    accountType: "Standard",
    status: "Active",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 7,
    name: "Robert Taylor",
    email: "robert.t@example.com",
    accountType: "Premium",
    status: "Active",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 8,
    name: "Lisa Martinez",
    email: "lisa.m@example.com",
    accountType: "Standard",
    status: "Inactive",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

