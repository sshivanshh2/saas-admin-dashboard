'use client'

import { useState, useEffect } from "react";

export default function UserModal({
    isOpen,     // Show/Hide
    onClose,    // Close modal
    onSuccess,  // Refresh data after save
    user = null // The user to edit
}){
    const initialFormState = {name: '', email: '', role: 'user', status: 'active'}

    const [formData, setFormData] = useState(initialFormState)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(()=>{
        if(user){
            // edit mode
            setFormData({
                name: user.name || '',
                email: user.email || '',
                role: user.role || 'user',
                status: user.status || 'active'
      })
        } 
        else{
            setFormData(initialFormState) //create mode
        }
        setError('')
    }, [user, isOpen])


    const handleChange = (e) =>{
        const {name, value} = e.target
        setFormData(prev => ({...prev, [name]: value}))
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        setLoading(true)
        setError('')

        try{
            const url = user ? `/api/users/${user.id}` : '/api/users'
            const method = user ? 'PUT': 'POST'

            const response = await fetch(url, {
                method,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
            })

            const data = await response.json()

            if(!data.success)
                throw new Error(data.error || 'Something went wrong')

            onSuccess(data.message) // tell the parent to refresh
            onClose()
        }
        catch(error){
            setError(error.message)
        }
        finally{
            setLoading(false)
        }
    }

    //If the modal is closed, don't render anything
    if (!isOpen) return null; 

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6">
                    <h2 className="text-xl font-bold text-gray-900">{user ? 'Edit User' : 'Create New User'}</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-600 hover:cursor-pointer transition-colors"><span className="font-bold text-lg border border-gray-700 rounded-full p-1">X</span></button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">

                    {/* Error */}
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded text-sm border border-red-200">
                        {error}
                        </div>
                    )}

                    {/* Name field */}
                     <div>
                         <label htmlFor='name' className='block text-sm font-bold text-gray-700 mb-1'>Name:</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value = {formData.name}
                            onChange={handleChange}
                            required
                            placeholder='Drax Johnson'
                            className='w-full px-3 py-2 border border-gray-500 rounded-lg shadow-sm text-base text-gray-700 placeholder-gray-400
                            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'/>
                    </div>

                    {/* Email field */}
                    <div>
                         <label htmlFor='email' className='block text-sm font-bold text-gray-700 mb-1'>Email:</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value = {formData.email}
                            onChange={handleChange}
                            required
                            placeholder='you@example.com'
                            className='w-full px-3 py-2 border border-gray-500 rounded-lg shadow-sm text-base text-gray-700 placeholder-gray-400
                            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'/>
                    </div>

                    {/* Role Field */}
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                            Role
                        </label>
                        <select
                            id="role"
                            name="role"
                            value = {formData.role}
                            onChange={handleChange}
                            className="w-full text-gray-700 px-4 py-2 border border-gray-500 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                            >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    {/* Status Field */}
                     <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                            Status
                        </label>
                        <select
                            id="status"
                            name="status"
                            value = {formData.status}
                            onChange={handleChange}
                            className="w-full text-gray-700 px-4 py-2 border border-gray-500 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                            >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border bg-gray-600 text-white border-gray-600 text-gray-700 rounded-lg hover:bg-gray-700 hover:cursor-pointer transition-colors"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 hover:cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Saving...': 'Save User'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}