'use client'

export default function UserModal(){
    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-xl font-bold text-gray-900">Create New User</h2>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">X</button>
                </div>

                {/* Form */}
                <form className="p-6 space-y-4">
                    {/* Name field */}
                     <div>
                         <label htmlFor='name' className='block text-sm font-bold text-gray-700 mb-1'>Name:</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            placeholder='Drax Johnson'
                            className='w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm text-base text-gray-700 placeholder-gray-400
                            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'/>
                    </div>

                    {/* Email field */}
                    <div>
                         <label htmlFor='email' className='block text-sm font-bold text-gray-700 mb-1'>Email:</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            placeholder='you@example.com'
                            className='w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm text-base text-gray-700 placeholder-gray-400
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                            >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Create User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}