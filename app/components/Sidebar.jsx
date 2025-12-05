'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation' //gives me current url path

export default function Sidebar() {
    const pathname = usePathname()

    const navItems = [
        { href: '/dashboard', label: 'Overview', icon: '📊' },
        { href: '/dashboard/users', label: 'Users', icon: '👥' },
        { href: '/dashboard/analytics', label: 'Analytics', icon: '📈' },
        { href: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
    ]
 return (
    <aside className='w-64 bg-gray-900 p-4'>
        {/* Logo */}
        <div className="flex items-center space-x-2 mb-8 px-2">
            <div className='w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center'>
                <span className="text-white font-bold text-xl">D</span>
            </div>
            <h2 className="text-xl font-bold text-white">Dashboard</h2>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
            {navItems.map((item)=>{
                const isActive = pathname === item.href
                return (
                    <Link
                        key={item.href}
                        href = {item.href}
                        className= {` flex items-center space-x-3 px-4 py-3 rounded-lg transition-all
                            ${isActive? 'bg-indigo-600 text-white' 
                            : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}
                    >
                        <span className="text-xl">{item.icon}</span>
                        <span className="font-medium">{item.label}</span>
                    </Link>
                )
            })}
        </nav>

        {/* User Profile Section */}
        <div className='bg-gray-800 rounded-lg p-4'>
            <div className='flex items-center space-x-3'>
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                    <p className='className="text-white font-semibold"'>JD</p>
                </div>
                <div>
                    <p className='text-white font-medium text-sm'>Drax Johnson</p>
                    <p className="text-gray-400 text-xs">Admin</p>    
                </div>
            </div>
        </div>
   </aside>
  )
}