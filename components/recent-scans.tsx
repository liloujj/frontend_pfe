"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useRef } from "react"

interface RecentScansProps {
  ttsEnabled: boolean
}

export function RecentScans({ ttsEnabled }: RecentScansProps) {
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
        <CardTitle>Recent Scans</CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={contentRef}>
          <ul className="space-y-2">
            <li>
              <strong>MRI - Brain:</strong> Performed on 2023-06-15. No abnormalities detected.
            </li>
            <li>
              <strong>X-Ray - Chest:</strong> Performed on 2023-05-20. Minor inflammation in lower right lung.
            </li>
            <li>
              <strong>CT Scan - Abdomen:</strong> Performed on 2023-04-10. All clear, no issues found.
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

