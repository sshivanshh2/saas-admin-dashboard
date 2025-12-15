'use client'
import {useState} from 'react'

const SignupPage = () =>{
    const [formData, setFormData] = useState({name: '', email: '', password: '', confirmPassword: ''})
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e)=>{
        const {name, value} = e.target
        setFormData(prev=>({...prev, [name]:value}))
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        setIsLoading(true)
        setError('')
        if(formData.password !== formData.confirmPassword)
        {
            setError('Passwords do not match')
            setIsLoading(false)
            return
        }
        if(formData.password.length < 8)
        {
            setError('Passwords must be at least 8 characters')
            setIsLoading(false)
            return
        }

        setTimeout(()=>{
            console.log(formData)
            alert("Account created for: "+ formData.email)
            setIsLoading(false)
        }, 1000)
    }

    return (
       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12">
            {/*White Card*/}
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                <h1 className='text-3xl text-orange-700 font-bold text-center mb-2'>Create Account</h1>
                <p className='text-gray-700 font-semibold text-center mb-6'>Sign up to get started!</p>
                {error && (<p className='p-3 bg-red-50 border border-red-200 text-center text-red-700 rounded-lg text-sm mb-4'>{error}</p>)}
                 <form onSubmit={handleSubmit} className='space-y-4'>
                    {/* Full Name field */}
                    <div>
                        <label htmlFor='name' className='text-sm font-bold text-gray-700 mb-1'>Full Name:</label>
                        <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="Drax Johnson"
                        className='w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm text-base text-gray-700 placeholder-gray-400
                        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                        value={formData.name}
                        onChange={handleChange}
                        />

                    </div>
                    {/* Email Field */}
                    <div>
                        <label htmlFor='email' className='text-sm font-bold text-gray-700 mb-1'>Email:</label>
                        <input 
                            type="email" 
                            id="email"
                            name="email" 
                            required 
                            value={formData.email} 
                            onChange={handleChange} 
                            placeholder='you@example.com'
                            className='w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm text-base text-gray-700 placeholder-gray-400
                            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                            />
                    </div>
                    {/* password field */}
                    <div>
                        <label htmlFor='password' className='text-sm font-bold text-gray-700 mb-1'>Password:</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password"
                            required 
                            value={formData.password} 
                            onChange={handleChange}
                            placeholder='••••••••'
                            className='w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm text-base text-gray-700 placeholder-gray-400
                            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                            />
                    </div>
                     {/* confirm password field */}
                    <div>
                        <label htmlFor='confirmPassword' className='text-sm font-bold text-gray-700 mb-1'>Confirm Password:</label>
                        <input 
                            type="password" 
                            id="confirmPassword" 
                            name="confirmPassword"
                            required 
                            value={formData.confirmPassword} 
                            onChange={handleChange}
                            placeholder='••••••••'
                            className='w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm text-base text-gray-700 placeholder-gray-400
                            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                            />
                    </div>
                     {/* Submit button*/ }
                    <button 
                        type="submit" 
                        className='w-full text-white font-bold bg-indigo-500 rounded-lg px-5 py-2 mt-5 hover:bg-indigo-700 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed' 
                        disabled={isLoading}>
                        {isLoading?'Creating an account':'Create Account'}
                    </button>
                 </form>
                <p className='text-sm text-center text-gray-600 mt-6'>Already have an account? <a href="/login" className='text-indigo-500 font-semibold hover:text-indigo-800'>Sign in</a></p>

            </div>
        </div>
    )
}

export default SignupPage