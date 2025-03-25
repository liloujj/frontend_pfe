"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, Search, Send, Paperclip, Edit, Trash, UserPlus, Download, Users, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Textarea } from "@/components/ui/textarea"
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

// Données d'exemple
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

// Liste des patients pour la nouvelle conversation
const patients = [
  { id: 1, name: "John Smith", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 2, name: "Emily Johnson", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 3, name: "Michael Brown", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 4, name: "Sarah Wilson", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 5, name: "David Lee", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 6, name: "Jennifer Adams", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 7, name: "Robert Taylor", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 8, name: "Lisa Martinez", avatar: "/placeholder.svg?height=40&width=40" },
]

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedConversation, setSelectedConversation] = useState<any | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null)
  const [editedMessageText, setEditedMessageText] = useState("")
  const [isDeleteMessageConfirmOpen, setIsDeleteMessageConfirmOpen] = useState(false)
  const [messageToDelete, setMessageToDelete] = useState<any | null>(null)
  const [isNewConversationOpen, setIsNewConversationOpen] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<string>("")
  const [initialMessage, setInitialMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // État pour les conversations et messages
  const [conversations, setConversations] = useState(adminMessages)
  const [messages, setMessages] = useState<any[]>([])
  const [nextMessageId, setNextMessageId] = useState(4)
  const [nextConversationId, setNextConversationId] = useState(
    conversations.length > 0 ? Math.max(...conversations.map((c) => c.id)) + 1 : 1,
  )

  const filteredMessages = conversations.filter(
    (message) =>
      message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.preview.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Charger les messages lorsqu'une conversation est sélectionnée
  useEffect(() => {
    if (selectedConversation) {
      // Dans une vraie application, ces messages seraient chargés depuis une API
      // Ici on utilise des messages statiques pour la démonstration
      const convoMessages = [
        {
          id: 1,
          sender: "user",
          text: selectedConversation.preview,
          time: "10:30 AM",
        },
        {
          id: 2,
          sender: "admin",
          text: `Hi ${selectedConversation.name}, I've reviewed your recent scan results and everything looks normal. The discomfort you're experiencing is likely temporary and should subside within a few days.`,
          time: "10:45 AM",
        },
        {
          id: 3,
          sender: "user",
          text: "Thank you for checking. Should I schedule a follow-up appointment if the discomfort persists?",
          time: "11:02 AM",
        },
      ]
      setMessages(convoMessages)
      setNextMessageId(4) // Réinitialiser l'ID du prochain message
    } else {
      setMessages([])
    }
  }, [selectedConversation])

  // Faire défiler jusqu'au dernier message quand de nouveaux messages sont ajoutés
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Fonction pour envoyer un message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() && selectedConversation) {
      // Créer un nouveau message
      const newMsg = {
        id: nextMessageId,
        sender: "admin",
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      // Mettre à jour les messages
      setMessages([...messages, newMsg])
      setNextMessageId(nextMessageId + 1)

      // Mettre à jour l'aperçu de la conversation
      const updatedConversations = conversations.map((c) =>
        c.id === selectedConversation.id ? { ...c, preview: newMessage, time: "Just now", unread: false } : c,
      )

      setConversations(updatedConversations)

      // Effacer le message dans l'entrée
      setNewMessage("")
    }
  }

  // Fonction pour commencer à éditer un message
  const handleEditMessage = (id: number, text: string) => {
    setEditingMessageId(id)
    setEditedMessageText(text)
  }

  // Fonction pour enregistrer un message édité
  const handleSaveEdit = (id: number) => {
    if (editedMessageText.trim() === "") return

    // Mettre à jour le message
    const updatedMessages = messages.map((msg) => (msg.id === id ? { ...msg, text: editedMessageText } : msg))

    setMessages(updatedMessages)

    // Mettre à jour l'aperçu de la conversation si c'est le dernier message
    if (id === messages[messages.length - 1].id && selectedConversation) {
      const updatedConversations = conversations.map((c) =>
        c.id === selectedConversation.id ? { ...c, preview: editedMessageText } : c,
      )

      setConversations(updatedConversations)
    }

    setEditingMessageId(null)
  }

  // Fonction pour ouvrir la confirmation de suppression d'un message
  const openDeleteMessageConfirm = (message: any) => {
    setMessageToDelete(message)
    setIsDeleteMessageConfirmOpen(true)
  }

  // Fonction pour supprimer un message
  const handleDeleteMessage = () => {
    if (!messageToDelete) return

    // Supprimer le message
    const updatedMessages = messages.filter((msg) => msg.id !== messageToDelete.id)
    setMessages(updatedMessages)

    // Mettre à jour l'aperçu de la conversation si nécessaire
    if (updatedMessages.length > 0 && selectedConversation) {
      const lastMessage = updatedMessages[updatedMessages.length - 1]
      const updatedConversations = conversations.map((c) =>
        c.id === selectedConversation.id ? { ...c, preview: lastMessage.text } : c,
      )

      setConversations(updatedConversations)
    }

    // Fermer le dialogue
    setIsDeleteMessageConfirmOpen(false)
    setMessageToDelete(null)
  }

  // Fonction pour annuler l'édition
  const handleCancelEdit = () => {
    setEditingMessageId(null)
    setEditedMessageText("")
  }

  // Fonction pour démarrer une nouvelle conversation
  const handleCreateNewConversation = () => {
    if (!selectedPatient || !initialMessage.trim()) {
      alert("Veuillez sélectionner un patient et entrer un message initial")
      return
    }

    // Créer une nouvelle conversation
    const patient = patients.find((p) => p.name === selectedPatient)
    if (!patient) return

    const newConversation = {
      id: nextConversationId,
      name: patient.name,
      preview: initialMessage,
      time: "Just now",
      unread: false,
      avatar: patient.avatar,
    }

    // Ajouter la conversation
    setConversations([newConversation, ...conversations])
    setNextConversationId(nextConversationId + 1)

    // Préparer les messages
    const initialMessages = [
      {
        id: 1,
        sender: "admin",
        text: initialMessage,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]

    // Sélectionner la nouvelle conversation
    setSelectedConversation(newConversation)
    setMessages(initialMessages)
    setNextMessageId(2)

    // Fermer le dialogue
    setIsNewConversationOpen(false)
    setSelectedPatient("")
    setInitialMessage("")
  }

  // Fonction pour attacher un fichier (simulée)
  const handleAttachFile = () => {
    alert(
      "Fonctionnalité d'attachement de fichier. Dans une application réelle, cela ouvrirait un sélecteur de fichiers.",
    )
  }

  // Sélectionner la première conversation par défaut si aucune n'est sélectionnée
  useEffect(() => {
    if (conversations.length > 0 && !selectedConversation) {
      setSelectedConversation(conversations[0])
    }
  }, [conversations, selectedConversation])

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Link href="/dashboard/admin" className="mr-4">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-white">Message Center</h1>
      </div>

      <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-white">Patient Communications</CardTitle>
              <CardDescription className="text-blue-100">Manage communications with patients</CardDescription>
            </div>
            <Button onClick={() => setIsNewConversationOpen(true)}>
              <UserPlus className="h-4 w-4 mr-2" />
              New Message
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 border border-blue-800/30 rounded-md overflow-hidden">
              <div className="bg-white/5 p-3 border-b border-blue-800/30">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 h-4 w-4" />
                  <Input
                    placeholder="Search messages..."
                    className="bg-white/5 border-blue-800/30 text-white pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="divide-y divide-blue-800/30 max-h-[500px] overflow-y-auto">
                {filteredMessages.length > 0 ? (
                  filteredMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-3 hover:bg-white/5 cursor-pointer ${
                        selectedConversation?.id === message.id ? "bg-white/5" : ""
                      }`}
                      onClick={() => setSelectedConversation(message)}
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
                  ))
                ) : (
                  <div className="p-4 text-center text-blue-200">No messages found</div>
                )}
              </div>
            </div>

            <div className="md:col-span-2 border border-blue-800/30 rounded-md overflow-hidden flex flex-col">
              {selectedConversation ? (
                <>
                  <div className="bg-white/5 p-3 border-b border-blue-800/30 flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedConversation.avatar} alt={selectedConversation.name} />
                      <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-white font-medium">{selectedConversation.name}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          Patient
                        </Badge>
                        <p className="text-xs text-blue-200">Last active: 10 minutes ago</p>
                      </div>
                    </div>
                    <div className="ml-auto">
                      <Button variant="ghost" size="icon" className="text-blue-300">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-blue-300">
                        <Users className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-blue-300">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[400px]">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "user" ? "justify-start" : "justify-end"}`}
                      >
                        <div
                          className={`relative ${
                            message.sender === "user" ? "bg-white/5" : "bg-blue-500/20"
                          } p-3 rounded-lg max-w-[80%] group`}
                        >
                          {message.sender === "admin" && (
                            <div className="flex justify-between items-start gap-2">
                              <p className="text-blue-100">{message.text}</p>
                              <div className="flex opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 text-blue-300"
                                  onClick={() => handleEditMessage(message.id, message.text)}
                                >
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 text-blue-300"
                                  onClick={() => openDeleteMessageConfirm(message)}
                                >
                                  <Trash className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          )}

                          {message.sender === "user" && <p className="text-blue-100">{message.text}</p>}

                          <p className="text-xs text-blue-200 mt-1 text-right">{message.time}</p>
                        </div>
                      </div>
                    ))}

                    {/* Zone d'édition de message */}
                    {editingMessageId && (
                      <div className="flex justify-center">
                        <div className="bg-blue-900/30 p-3 rounded-lg w-full">
                          <Textarea
                            value={editedMessageText}
                            onChange={(e) => setEditedMessageText(e.target.value)}
                            className="bg-white/5 border-blue-800/30 text-white min-h-[100px] mb-2"
                          />
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={handleCancelEdit}>
                              Cancel
                            </Button>
                            <Button size="sm" onClick={() => handleSaveEdit(editingMessageId)}>
                              Save Changes
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Référence pour le défilement automatique */}
                    <div ref={messagesEndRef} />
                  </div>

                  <div className="p-3 border-t border-blue-800/30">
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="shrink-0"
                        onClick={handleAttachFile}
                      >
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Input
                        placeholder="Type your message..."
                        className="bg-white/5 border-blue-800/30 text-white"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                      />
                      <Button type="submit" className="shrink-0" disabled={!newMessage.trim()}>
                        <Send className="h-4 w-4 mr-2" />
                        Send
                      </Button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <Users className="h-16 w-16 text-blue-300/50 mb-4" />
                  <h3 className="text-white text-xl font-medium mb-2">No Conversation Selected</h3>
                  <p className="text-blue-200 max-w-md">
                    Select a conversation from the list to view messages or start a new conversation using the "New
                    Message" button.
                  </p>
                  <Button className="mt-6" onClick={() => setIsNewConversationOpen(true)}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Start New Conversation
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dialogue de nouvelle conversation */}
      <Dialog open={isNewConversationOpen} onOpenChange={setIsNewConversationOpen}>
        <DialogContent className="bg-gray-900 border-blue-800/30 text-white">
          <DialogHeader>
            <DialogTitle>New Conversation</DialogTitle>
            <DialogDescription className="text-blue-100">Start a new conversation with a patient.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="patient-select">Select Patient</Label>
              <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                <SelectTrigger id="patient-select" className="bg-white/5 border-blue-800/30 text-white">
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
            <div className="grid gap-2">
              <Label htmlFor="initial-message">Initial Message</Label>
              <Textarea
                id="initial-message"
                placeholder="Type your message..."
                value={initialMessage}
                onChange={(e) => setInitialMessage(e.target.value)}
                className="bg-white/5 border-blue-800/30 text-white min-h-[120px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewConversationOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateNewConversation} disabled={!selectedPatient || !initialMessage.trim()}>
              Start Conversation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogue de confirmation de suppression de message */}
      <Dialog open={isDeleteMessageConfirmOpen} onOpenChange={setIsDeleteMessageConfirmOpen}>
        <DialogContent className="bg-gray-900 border-blue-800/30 text-white">
          <DialogHeader>
            <DialogTitle>Delete Message</DialogTitle>
            <DialogDescription className="text-blue-100">
              Are you sure you want to delete this message? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {messageToDelete && (
            <div className="my-4 p-3 bg-white/5 rounded-md">
              <p className="text-blue-100">{messageToDelete.text}</p>
              <p className="text-xs text-blue-200 mt-1 text-right">{messageToDelete.time}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteMessageConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteMessage}>
              Delete Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

