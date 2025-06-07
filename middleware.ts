import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const { token } = req.nextauth

    // Redirect authenticated users from public pages to dashboard
    if (token && (pathname === "/" || pathname === "/auth/signin" || pathname === "/auth/signup")) {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl

        // Public routes
        if (pathname.startsWith("/event/") || pathname === "/" || pathname.startsWith("/auth/")) {
          return true
        }

        // Protected routes require authentication
        if (pathname.startsWith("/dashboard")) {
          return !!token
        }

        return true
      },
    },
  },
)

export const config = {
  matcher: ["/", "/dashboard/:path*", "/auth/:path*", "/api/events/:path*", "/api/users/:path*"],
}
