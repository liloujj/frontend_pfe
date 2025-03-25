"use client"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { RecentScans } from "./recent-scans"
import { HealthHistory } from "./health-history"
import { Notifications } from "./notifications"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function Dashboard() {
  const [ttsEnabled, setTtsEnabled] = useState(false)
  const { setTheme, theme } = useTheme()

  const toggleTTS = () => {
    setTtsEnabled(!ttsEnabled)
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Patient Dashboard</h1>
          <div className="flex gap-4">
            <Button onClick={toggleTTS} aria-pressed={ttsEnabled} aria-label="Toggle text-to-speech">
              {ttsEnabled ? "Disable TTS" : "Enable TTS"}
            </Button>
            <Button onClick={toggleTheme} variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <RecentScans ttsEnabled={ttsEnabled} />
          <HealthHistory ttsEnabled={ttsEnabled} />
        </div>
        <Notifications />
      </main>
    </div>
  )
}

