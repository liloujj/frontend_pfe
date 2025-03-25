"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Send, Paperclip } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [newMessage, setNewMessage] = useState("")

  // Modifier la fonction handleSendMessage pour envoyer automatiquement le message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      // Simuler l'envoi du message
      const sentMessage = {
        sender: "user",
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      // Dans une vraie application, vous feriez un appel API ici
      // Puis vous mettriez à jour l'état local avec la réponse

      // Ajouter le message à la conversation
      const updatedConversation = {
        ...selectedConversation,
        messages: [...selectedConversation.messages, sentMessage],
        lastMessage: newMessage,
        lastMessageTime: "Just now",
      }

      // Mettre à jour l'état local
      setSelectedConversation(updatedConversation)
      setNewMessage("")
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Link href="/dashboard/patient" className="mr-4">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-white">Messages</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30 md:col-span-1">
          <CardHeader>
            <CardTitle className="text-white">Conversations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-3 rounded-md cursor-pointer transition-colors ${
                    selectedConversation.id === conversation.id ? "bg-blue-500/30" : "bg-white/5 hover:bg-white/10"
                  }`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={conversation.avatar} alt={conversation.name} />
                      <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <p className="text-white font-medium truncate">{conversation.name}</p>
                        <p className="text-xs text-blue-200">{conversation.lastMessageTime}</p>
                      </div>
                      <p className="text-sm text-blue-100 truncate">{conversation.lastMessage}</p>
                    </div>
                    {conversation.unread && <div className="h-2 w-2 bg-blue-500 rounded-full"></div>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-blue-800/30 md:col-span-2">
          <CardHeader className="border-b border-blue-800/30">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={selectedConversation.avatar} alt={selectedConversation.name} />
                <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-white">{selectedConversation.name}</CardTitle>
                <p className="text-xs text-blue-200">{selectedConversation.role}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[400px] overflow-y-auto p-4 space-y-4">
              {selectedConversation.messages.map((message, index) => (
                <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === "user" ? "bg-blue-500/20 text-blue-100" : "bg-white/5 text-blue-100"
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className="text-xs text-right mt-1 opacity-70">{message.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-blue-800/30">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Button type="button" variant="outline" size="icon" className="shrink-0">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Type your message..."
                  className="bg-white/5 border-blue-800/30 text-white"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button type="submit" className="shrink-0">
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Sample data
const conversations = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "Radiologist",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Your X-Ray results look good. No abnormalities detected.",
    lastMessageTime: "10:30 AM",
    unread: true,
    messages: [
      {
        sender: "other",
        text: "Hello! I've reviewed your recent X-Ray results.",
        time: "10:15 AM",
      },
      {
        sender: "other",
        text: "Everything looks good. No abnormalities were detected in your chest X-Ray.",
        time: "10:16 AM",
      },
      {
        sender: "user",
        text: "That's great news! Thank you for letting me know.",
        time: "10:20 AM",
      },
      {
        sender: "other",
        text: "You're welcome! Do you have any questions about the results?",
        time: "10:25 AM",
      },
      {
        sender: "user",
        text: "No, I think I understand everything. Should I schedule a follow-up?",
        time: "10:28 AM",
      },
      {
        sender: "other",
        text: "Since everything looks normal, you don't need a follow-up at this time. Just continue with your regular check-ups.",
        time: "10:30 AM",
      },
    ],
  },
  {
    id: 2,
    name: "Lab Support",
    role: "Technical Support",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Your appointment has been confirmed for August 10.",
    lastMessageTime: "Yesterday",
    unread: false,
    messages: [
      {
        sender: "other",
        text: "Hello! This is to confirm your appointment for a Chest X-Ray on August 10, 2023 at 10:30 AM.",
        time: "Yesterday, 2:15 PM",
      },
      {
        sender: "user",
        text: "Thank you for the confirmation. I'll be there.",
        time: "Yesterday, 2:20 PM",
      },
      {
        sender: "other",
        text: "Great! Please arrive 15 minutes early to complete the registration process.",
        time: "Yesterday, 2:25 PM",
      },
    ],
  },
  {
    id: 3,
    name: "Dr. Michael Chen",
    role: "Neurologist",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I'd like to discuss your recent MRI results.",
    lastMessageTime: "Aug 5",
    unread: false,
    messages: [
      {
        sender: "other",
        text: "Hello! I'd like to discuss your recent MRI results with you.",
        time: "Aug 5, 11:00 AM",
      },
      {
        sender: "user",
        text: "Sure, what did you find?",
        time: "Aug 5, 11:05 AM",
      },
      {
        sender: "other",
        text: "Nothing concerning, but I noticed a small area that I'd like to monitor. Could you schedule a follow-up in 3 months?",
        time: "Aug 5, 11:10 AM",
      },
    ],
  },
]

