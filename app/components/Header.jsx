'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'


export default function Header() {
  const pathname = usePathname()
  const {data: session, status} = useSession()

  const navLinks = [
    {href: '/', label: 'Home'},
    {href: '/dashboard', label: 'Dashboard'}
  ]

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Dashboard</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link)=>{
              const isActive = pathname === link.href
              return (
                <Link 
                  key={link.href}
                  href={link.href}
                  className={`${isActive?'text-indigo-600 font-semibold': 'text-gray-600 hover:text-indigo-600'} transition-colors`}>
                {link.label}
                </Link>
              )
            })}
          </div>

          {/* Auth Buttons */}
            {status === 'loading' ? (
              <div className="text-gray-500">Loading...</div>
            ) : session ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  {session.user.name}
                  {session.user.role === 'admin' && (
                    <span className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-800 text-xs font-semibold rounded">
                      Admin
                    </span>
                  )}
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: '/login' })}
                  className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Login
              </Link>
            )}

          {/* Mobile Menu Button (we'll add functionality later) */}
          <button className="md:hidden text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}