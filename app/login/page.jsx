'use client' //This component needs to run in the browser
import {useState} from 'react'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e) =>{
        e.preventDefault()
        setIsLoading(true)
        setError('')
        const intervalId = setTimeout(()=>{
            console.log({email, password});
            alert(email)
            setIsLoading(false)
        }, 1000)
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center'>
            {/* White Card */}
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8">
                <h2 className='text-3xl text-orange-700 font-bold text-center mb-2'>Welcome!</h2>
                <p className="text-indigo-600 font-semibold text-center mb-6">Sign in to your account</p>
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
                            className='w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm text-base text-gray-700 placeholder-gray-400
                            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                            />
                    </div>
                    {/* Remember me and forgot password field */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                            <span className="text-sm text-gray-700">Remember me</span>
                        </label>
                        <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700">Forgot password?</a>
                    </div>

                    {/* Submit button */}
                    

                </form>
            </div>
        </div>
    


    )
}

export default LoginPage