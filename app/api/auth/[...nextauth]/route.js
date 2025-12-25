import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/db/prisma'
import bcrypt from 'bcryptjs'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        rememberMe: {label: "Remember Me", type: "checkbox"}
      },
      async authorize(credentials) {
        console.log('🔍 Authorize called with:', credentials?.email)

        if (!credentials?.email || !credentials?.password) {
          console.log('Missing credentials')
          throw new Error('Please enter email and password')
        }

        // Find user by email in DATABASE
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        console.log('User found:', user ? user.email : 'No user')

        if (!user) {
          console.log('No user found')
          throw new Error('No user found with this email')
        }

        // Check if user is active
        if (user.status !== 'active') {
          console.log('User inactive')
          throw new Error('Account is inactive')
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        console.log('🔑 Password valid:', isPasswordValid)

        if (!isPasswordValid) {
          console.log('Invalid password')
          throw new Error('Invalid password')
        }

        // Update last login
        await prisma.user.update({
          where: { id: user.id },
          data: { lastLogin: new Date() }
        })

        console.log('Login successfull!')

        // Return user data (stored in session)
        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
          rememberMe: credentials.rememberMe === 'true'
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      // Add user info to token on login
      if (user) {
        token.id = user.id
        token.role = user.role

         // Set token expiration based on rememberMe
        if (user.rememberMe) {
          // 30 days
          token.exp = Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60)
        } else {
          // 2 hours
          token.exp = Math.floor(Date.now() / 1000) + (2 * 60 * 60)
        }
      }
      return token
    },
    // It runs every time I ask for the session

    async session({ session, token }) {
      // Add user info to session
      if (token && session.user) {
        session.user.id = token.id
        session.user.role = token.role
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
    error: '/login'
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
   cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    }
  },
  secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }