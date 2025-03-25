import { Home, FileText, Bell, Settings } from "lucide-react"
import Link from "next/link"

export function Sidebar() {
  return (
    <aside className="w-64 bg-gray-100 dark:bg-gray-800 p-4">
      <nav>
        <ul className="space-y-2">
          <li>
            <Link href="/" className="flex items-center p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
              <Home className="mr-2" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link href="/scans" className="flex items-center p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
              <FileText className="mr-2" />
              <span>Scans</span>
            </Link>
          </li>
          <li>
            <Link
              href="/notifications"
              className="flex items-center p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Bell className="mr-2" />
              <span>Notifications</span>
            </Link>
          </li>
          <li>
            <Link
              href="/settings"
              className="flex items-center p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Settings className="mr-2" />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

