import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function getSession() {
  return await getServerSession(authOptions)
}

export async function requireAuth() {
  const session = await getSession()
  
  if (!session) {
    throw new Error('Unauthorized')
  }
  
  return session
}

export async function requireAdmin() {
  const session = await requireAuth()
  
  if (!session ||session.user.role !== 'admin') {
    // throw new Error('Admin access required')
    return null
  }
  
  return session
}