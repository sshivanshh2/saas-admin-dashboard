'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation' //gives me current url path

export default function Sidebar() {
    const pathname = usePathname()
 return (
    <aside>
        {/* Logo */}
        <h2>Dashboard</h2>

        {/* Navigation */}
        <nav>
            <Link href={'#'}>Overview</Link>
            <Link href={'#'}>Users</Link>
            <Link href={'#'}>Analytics</Link>
            <Link href={'#'}>Settings</Link>
        </nav>

        {/* User Profile Section */}
        <h3>Drax Johnson</h3>
        <p>Admin</p>
   </aside>
  )
}