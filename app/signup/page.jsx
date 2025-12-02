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
                <p className='text-l text-gray-700 font-medium text-center'>Sign up to get started!</p>
                {error && (<p className='p-3 bg-red-50 border border-red-200 text-center text-red-700 rounded-lg text-sm mb-4'>{error}</p>)}
                 <form onSubmit={handleSubmit} className='space-y-4'></form>
            </div>
        </div>
    )
}

export default SignupPage