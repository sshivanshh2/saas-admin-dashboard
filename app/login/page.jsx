'use client' //This component needs to run in the browser
import {useState, useEffect} from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const LoginPage = () => {
    const router = useRouter()
    const { data: session, status } = useSession()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [rememberMe, setRememberMe] = useState(false)

    // Redirect if already logged in
    useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard')
    }
    }, [status, router])

    const handleSubmit = async (e) =>{
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try{
            // sends a POST request to /api/auth/callback/credentials
            const result = await signIn('credentials', {
                email: email,
                password: password,
                rememberMe: rememberMe.toString(),
                redirect: false // makes sure that it doesn't redirect automatically
            })

            if(result?.error){
                setError(result.error)
                setIsLoading(false)
            }else{
                 // Set cookie based on "Remember Me"
                if(rememberMe){
                    // Set a long-lived cookie (30 days)
                    document.cookie = `remember-me=true; max-age=${30 * 24 * 60 * 60}; path=/; SameSite=Lax`
                } else {
                    // Session cookie (deleted when browser closes)
                    document.cookie = `remember-me=false; path=/; SameSite=Lax`
                }

                // Success! Check if there's a redirect URL
                const params = new URLSearchParams(window.location.search)
                const callbackUrl = params.get('callbackUrl') || '/dashboard'
  
                router.push(callbackUrl) // success! redirect to dashboard
                router.refresh() // refresh to update session
            }
        } catch(error){
            setError("An error occured. Please try again")
            setIsLoading(false)
        }
    }
    // Show loading while checking session
    if (status === 'loading') {
        return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
            <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
            </div>
        </div>
        )
    }

    // If authenticated, don't show login form (will redirect via useEffect)
    if (status === 'authenticated') {
        return null
    }
    
    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center'>
            {/* White Card */}
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8">
                <h2 className='text-3xl text-orange-700 font-bold text-center mb-2'>Welcome!</h2>
                <p className="text-gray-700 font-semibold text-center mb-6">Sign in to your account</p>
                {error && (<p className='p-3 bg-red-50 border border-red-200 text-center text-red-700 rounded-lg text-sm mb-4'>{error}</p>)}
                <form onSubmit={handleSubmit} className='space-y-4'>
                    {/* email field */}
                    <div>
                        <label htmlFor='email' className='text-sm font-bold text-gray-700 mb-1'>Email:</label>
                        <input 
                            type="email" 
                            id="email" 
                            required 
                            value={email} 
                            onChange={(e)=>setEmail(e.target.value)} 
                            placeholder='you@example.com'
                            disabled={isLoading}
                            className='w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm text-base text-gray-700 placeholder-gray-400
                            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'/>
                    </div>
                    {/* password field */}
                    <div>
                        <label htmlFor='password' className='text-sm font-bold text-gray-700 mb-1'>Password:</label>
                        <input 
                            type="password" 
                            id="password" 
                            required 
                            value={password} 
                            onChange={(e)=>setPassword(e.target.value)}
                            placeholder='••••••••'
                            disabled={isLoading}
                            className='w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm text-base text-gray-700 placeholder-gray-400
                            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                            />
                    </div>
                    {/* Remember me and forgot password field */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input 
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e)=>setRememberMe(e.target.checked)}
                                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                            <span className="text-sm text-gray-700">Remember me</span>
                        </label>
                        <Link href="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-700">
                                Forgot password?
                        </Link>
                    </div>

                    {/* Submit button*/ }
                    <button 
                        type="submit" 
                        className='w-full text-white font-bold bg-indigo-500 rounded-lg px-5 py-2 mt-5 hover:bg-indigo-700 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed' 
                        disabled={isLoading}
                        >
                        {!isLoading?'Submit':'Signing in...'}
                    </button>
                </form>
                <p className='text-sm text-center text-gray-600 mt-6'>Don't have an account? <a href="/signup" className='text-indigo-500 font-semibold hover:text-indigo-800'> Sign up</a></p>
                {/* Test Credentials Info */}
                <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-800 font-semibold mb-1">Test Credentials:</p>
                <p className="text-xs text-blue-700">Admin: admin@example.com / password123</p>
                <p className="text-xs text-blue-700">User: user@example.com / password123</p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage