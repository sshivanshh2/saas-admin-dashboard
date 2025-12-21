import './globals.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Providers from './components/Providers'

export const metadata = {
  title: 'SaaS Admin Dashboard',
  description: 'Full-stack admin dashboard with Next.js',
}

export default function RootLayout({ children }) {
/*- `children` is a **prop** - it's whatever page is being rendered
 - When you visit `/`, `children` = `<Home />` component
 - When you visit `/login`, `children` = `<Login />` component

 **This is React fundamentals:**
 - Components can receive `props` (properties)
 - `{children}` is a special prop that represents nested content

 **The layout structure:**
*/
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          <Header/>
          {children}
        </Providers>
      </body>
    </html>
  )
}