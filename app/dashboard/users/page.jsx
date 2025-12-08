'use client'
import {useState, useEffect} from 'react'

export default function UsersPage() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // run once on mount
    useEffect(()=>{
        async function fetchUsers(){
            try{
                const response = await fetch('/api/users')
                const data = await response.json()

                if(data.success)
                    setUsers(data.data)
                else
                    setError("Failed to load users")
            }
            catch(error){
                setError("Network error")
            }
            finally{
                setLoading(false)
            }
        }
        fetchUsers()
    },[])

    // showing a nice spinner while the data is being fetched
    if(loading){
        return(
            <div className='p-8 flex items-center justify-center min-h-screen'>
                <div className='text-center'>
                    <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-indigo-600 mx-auto"></div>
                    <p className='mt-4 text-gray-600'>Loading Users</p>
                </div>
            </div>
        )
    }

    if(error){
        return (
            <div className='p-8'>
                <div className="text-center bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            </div>
        )
    }

  return (
    <div className="p-8">
        <div className='flex items-center justify-between mb-6'>
            <h1 className="text-3xl font-bold text-gray-900 mb-6"> User Management </h1>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 hover:cursor-pointer transition-colors">Add User</button>
        </div>
    

     {/* Here goes the table */}
        <div>
            <table>
                <thead>
                    <tr>
                        <th className='table-header'>Name</th>
                        <th className='table-header'>Email</th>
                        <th className='table-header'>Role</th>
                        <th className='table-header'>Status</th>
                        <th className='table-header'>Last Login</th>
                        <th className='table-header-right'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user)=>(
                        <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className='flex items-center'>
                                    <div className='flex-shrink-0 h-10 w-10 bg-orange-400 flex items-center justify-center rounded-full'>
                                        <span className='text-sm text-gray-900'>{user.name.split(' ').map((item)=>item[0]).join('')}</span>
                                    </div>
                                    <div className='ml-2'>
                                        <span className='text-sm text-gray-900'>{user.name}</span>
                                    </div>
                                </div>
                            </td>
                            <td className="text-sm text-gray-900">{user.email}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role==='admin'?'bg-purple-100 text-purple-800': 'bg-gray-100 text-gray-800'}`}>{user.role}</span> 
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status==='active' ? 'bg-green-100 text-green-800': 'bg-red-100 text-red-800'}`}>{user.status}</span>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{user.lastLogin}</td>
                            {/* px-6  whitespace-nowrap text-right text-sm font-medium" */}
                            <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-semibold'>
                                <button className='text-indigo-600 hover:text-indigo-900 hover: cursor-pointer mr-3 bg-indigo-200 rounded-lg px-2 py-1 '>Edit</button>
                                <button className='text-red-600 hover:text-red-900 hover: cursor-pointer bg-purple-300 rounded-lg px-2 py-1'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    
        <div className="mt-4 text-center text-sm text-gray-600 font-semibold">
            Showing {users.length} users 👥
        </div>
    </div>
  )
}