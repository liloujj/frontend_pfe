"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useRef } from "react"

interface HealthHistoryProps {
  ttsEnabled: boolean
}

export function HealthHistory({ ttsEnabled }: HealthHistoryProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ttsEnabled && contentRef.current) {
      const text = contentRef.current.textContent
      if (text) {
        const utterance = new SpeechSynthesisUtterance(text)
        window.speechSynthesis.speak(utterance)
      }
    }
  }, [ttsEnabled])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Health History</CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={contentRef}>
          <ul className="space-y-2">
            <li>
              <strong>Allergies:</strong> Penicillin, Peanuts
            </li>
            <li>
              <strong>Chronic Conditions:</strong> Asthma (controlled with inhaler)
            </li>
            <li>
              <strong>Past Surgeries:</strong> Appendectomy (2015)
            </li>
            <li>
              <strong>Family History:</strong> Diabetes (maternal side), Heart Disease (paternal side)
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

