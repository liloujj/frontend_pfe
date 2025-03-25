"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"

export default function Navigation() {
  const pathname = usePathname()
  const [userType, setUserType] = useState<string | null>(null)

  useEffect(() => {
    // Ajoutons un log pour voir le pathname actuel
    console.log("Current pathname:", pathname)

    // Dans une vraie application, vous récupéreriez cette information
    // depuis un contexte d'authentification ou un cookie

    // Pour la démonstration, nous déterminons le type d'utilisateur
    // en fonction de l'URL actuelle
    if (pathname.includes("/admin")) {
      setUserType("admin")
    } else if (pathname.includes("/premium")) {
      setUserType("premium")
    } else if (pathname.includes("/patient")) {
      setUserType("patient")
    }
  }, [pathname])

  return (
    <header className="bg-blue-950/50 backdrop-blur-sm border-b border-blue-800/30">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-white font-bold text-xl">DEEPVISION LAB</div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="text-white hover:text-blue-300 transition-colors">
                Home
              </Link>
            </li>

            {userType === "admin" && (
              <>
                <li>
                  <Link href="/dashboard/admin" className="text-white hover:text-blue-300 transition-colors">
                    Admin Dashboard
                  </Link>
                </li>
              </>
            )}

            {userType === "premium" && (
              <>
                <li>
                  <Link href="/dashboard/premium" className="text-white hover:text-blue-300 transition-colors">
                    Premium Dashboard
                  </Link>
                </li>
              </>
            )}

            {userType === "patient" && (
              <>
                <li>
                  <Link href="/dashboard/patient" className="text-white hover:text-blue-300 transition-colors">
                    Patient Dashboard
                  </Link>
                </li>
              </>
            )}

            {userType ? (
              <li>
                <Link href="/auth" className="text-white hover:text-blue-300 transition-colors">
                  Logout
                </Link>
              </li>
            ) : (
              <li>
                <Link href="/auth" className="text-white hover:text-blue-300 transition-colors">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

