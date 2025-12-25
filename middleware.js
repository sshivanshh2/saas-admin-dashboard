import { withAuth } from "next-auth/middleware"

// This wraps your middleware and handles the redirect to login automatically
export default withAuth({
  pages: {
    signIn: "/login", 
  },
})

export const config = {
  matcher: [
    '/dashboard/:path*', 
  ]
}