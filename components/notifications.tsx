import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Notifications() {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li>
            <strong>Appointment Reminder:</strong> Dr. Smith on 2023-07-01 at 10:00 AM
          </li>
          <li>
            <strong>Medication Refill:</strong> Asthma inhaler prescription ready for pickup
          </li>
          <li>
            <strong>Lab Results:</strong> Blood work results are now available
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}

