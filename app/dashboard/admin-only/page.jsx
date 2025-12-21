// app/dashboard/admin-only/page.jsx
import { requireAdmin } from '@/lib/auth'

export default async function AdminPage() {
  const session = await requireAdmin()  // Will throw error if not admin
    if (!session) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center'>
        <h1 className='text-5xl text-gray-500'>Access Denied</h1>
        <p className='text-2xl text-gray-500'>You do not have permission to view this page.</p>
      </div>
    )
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center'>
      <h1 className='text-5xl text-gray-500'>Admin Only Page</h1>
      <p className='text-2xl text-gray-500'>Welcome, {session.user.name}!</p>
    </div>
  )
}