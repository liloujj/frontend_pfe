import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Récupérer le token d'authentification depuis les cookies
  const token = request.cookies.get("auth_token")?.value

  // Pour la démonstration, nous allons simuler une authentification
  // En production, vous vérifieriez correctement le token
  const isLoggedIn = true // Temporairement défini à true pour le test

  // Récupérer le type d'utilisateur (dans une vraie application, vous décoderiez le token JWT)
  // Pour la démonstration, nous utilisons un cookie simple
  const userType = request.cookies.get("user_type")?.value

  // Récupérer le chemin de la requête
  const path = request.nextUrl.pathname

  // Si l'utilisateur essaie d'accéder à une page protégée sans être connecté
  if (path.startsWith("/dashboard") && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth", request.url))
  }

  // Vérifier les autorisations pour les pages spécifiques
  // Nous désactivons temporairement ces vérifications pour le débogage
  /*
  if (path.startsWith("/dashboard/admin") && userType !== "admin") {
    return NextResponse.redirect(new URL("/dashboard/patient", request.url))
  }

  if (path.startsWith("/dashboard/premium") && userType !== "premium") {
    return NextResponse.redirect(new URL("/dashboard/patient", request.url))
  }
  */

  return NextResponse.next()
}

// Configurer les chemins sur lesquels le middleware doit s'exécuter
export const config = {
  matcher: ["/dashboard/:path*"],
}

