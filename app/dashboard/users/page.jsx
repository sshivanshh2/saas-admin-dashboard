'use client'
import {useState, useEffect} from 'react'
import { useSession } from 'next-auth/react'
import SearchInput from '@/app/components/SearchInput'
import { exportToCSV } from '@/lib/utils/csvExport'
import UserModal from '@/app/components/UserModal'
import DeleteConfirmModal from '@/app/components/DeleteConfirmModal'

export default function UsersPage() {
    const { data: session } = useSession()
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [searchTerm, setSearchTerm] = useState('')
    const [userRole, setUserRole] = useState('')
    const [userStatus, setUserStatus] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [pagination, setPagination] = useState(null)

    // State for modals
    const [isUserModalOpen, setIsUserModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    const [successMessage, setSuccessMessage] = useState('')

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm, userRole, userStatus])

    const fetchUsers = async () =>{
            setLoading(true)
            setError(null)
            try{
                const params = new URLSearchParams()
    
                if(searchTerm) params.append('search', searchTerm)
                if(userRole) params.append('role', userRole)
                if(userStatus) params.append('status', userStatus)
                params.append('page', currentPage.toString())
                params.append('limit', '4')
                const response = await fetch(`/api/users?${params}`)
                const data = await response.json()

                if(data.success){
                    setUsers(data.data)
                    setPagination(data.pagination)
                    console.log([Array(data.pagination.totalPages)])
                }
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
    // run when any of the query params change
    useEffect(()=>{
        fetchUsers()
    },[searchTerm, userRole, userStatus, currentPage])

     // Handle success message
    useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('')
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [successMessage])

    const handleExport = () => {
        // Generate filename with timestamp
        const timestamp = new Date().toISOString().split('T')[0] // only the date
        const filename = `users-export-${timestamp}.csv`
  
        // Export
        exportToCSV(users, filename)
    }

    const handleCreateUser = () => {
        setSelectedUser(null)
        setIsUserModalOpen(true)
    }

     const handleEditUser = (user) => {
        setSelectedUser(user)
        setIsUserModalOpen(true)
    }
     
    const handleUserModalClose = () => {
        setIsUserModalOpen(false)
        setSelectedUser(null)
    }
    const handleUserSuccess = (message) => {
        setSuccessMessage(message)
        fetchUsers() // Refresh the list
    }

    const handleDeleteClick = (user) => {
        setSelectedUser(user)
        setIsDeleteModalOpen(true)
    }

    const handleDeleteModalClose = () => {
        setIsDeleteModalOpen(false)
        setSelectedUser(null)
    }

    const handleDeleteConfirm = async () => {
        try {
        const response = await fetch(`/api/users?id=${selectedUser.id}`, {
            method: 'DELETE'
        })

        const data = await response.json()

        if (data.success) {
            setSuccessMessage(data.message)
            setIsDeleteModalOpen(false)
            setSelectedUser(null)
            fetchUsers()
        } else {
            alert('Failed to delete user')
        }
        } catch (err) {
        alert('Error deleting user')
        }
    }


    // showing a nice spinner while the data is being fetched
    if(loading && users.length === 0){
        return(
            <div className='p-8 flex items-center justify-center min-h-screen'>
                <div className='text-center'>
                    <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-indigo-600 mx-auto"></div>
                    <p className='mt-4 text-gray-600'>Loading Users...</p>
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
         {/* Success Message */}
        {successMessage && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center justify-between">
          <span>{successMessage}</span>
          <button onClick={() => setSuccessMessage('')} className="text-green-700 hover:text-green-900 hover:cursor-pointer">
            ×
          </button>
        </div>
        )}
        <div className='flex items-center justify-between mb-6'>
            <h1 className="text-3xl font-bold text-gray-900 mb-6"> User Management </h1>
            <div className='flex gap-3'>
            <button
                onClick={handleExport}
                disabled={users.length === 0}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 hover:cursor-pointer transition-colors">
                    Export CSV</button>

            {session?.user?.role === 'admin' && (
            <button 
                onClick={handleCreateUser}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 hover:cursor-pointer transition-colors">
                    Add User
            </button>)}

            </div>
        </div>
        <div className="bg-white rounded-lg border border-orange-400 shadow-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 gap-6">

            {/* Search Filter */}
            <div className="md:col-span-2">
                <SearchInput 
                    value={searchTerm} 
                    onChange={setSearchTerm}
                    />
            </div>

            {/* Role Filter */}
            <div className='text-gray-500'>
                <select 
                    name="role" 
                    value={userRole} 
                    onChange={(e)=>{setUserRole(e.target.value)}}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    >
                    <option value="">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>
            </div>

            {/* Status Filter */}
            <div className='text-gray-500'>
                <select 
                    name="status" 
                    value={userStatus} 
                    onChange={(e)=>{setUserStatus(e.target.value)}}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>
        </div>
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
                            <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-semibold'>
                                <>
                                    <button 
                                        onClick={() => handleEditUser(user)}
                                        className='text-indigo-600 hover:text-indigo-900 hover: cursor-pointer mr-3 bg-indigo-200 rounded-lg px-2 py-1 '>Edit</button>

                                    {/* Can't delete yourself or other admins */}
                                    { user.role!== 'admin' && user.id!== parseInt(session.user.id) && (
                                    <button 
                                        onClick={()=>handleDeleteClick(user)}
                                        className='text-white hover:text-gray-200 hover: cursor-pointer bg-red-500 rounded-lg px-2 py-1'>Delete</button>
                                    )}
                                    {user.id === parseInt(session.user.id) && (
                                        <span className="text-gray-400 text-sm">(You)</span>
                                    )}

                                    {user.role === 'admin' && user.id !== parseInt(session.user.id) && (
                                        <span className="text-gray-400 text-sm">(Admin)</span>
                                    )}
                                    
                                </>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        
        <div>
            <UserModal
                isOpen={isUserModalOpen}
                onClose={handleUserModalClose}
                onSuccess={handleUserSuccess}
                user={selectedUser}
            />
            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={handleDeleteModalClose}
                onConfirm={handleDeleteConfirm}
                userName={selectedUser?.name}
            />
        </div>
        {pagination && (

            <div className='flex items-center justify-center gap-5'>
                <button
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    disabled={!pagination.hasPrev}
                    className='text-gray-500 hover:cursor-pointer'>
                    Previous
                </button>

                {
                    [...Array(pagination.totalPages)].map((_, index)=>(
                        <button
                            key={index+1}
                            onClick={()=>setCurrentPage(index+1)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
                                ${currentPage === index + 1 ? 
                                    'z-10 bg-indigo-50 border-indigo-500 text-indigo-600':
                                    'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}`}
                            >
                            {index+1}
                        </button>
                    ))
                }

                <button
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    disabled={!pagination.hasNext}
                    className="text-gray-500 hover:cursor-pointer"
                    >
                    Next
                </button>

            </div>
        )}

        </div>
    
        <div className="mt-4 text-center text-sm text-gray-600 font-semibold">
            Showing {users.length} users 👥
        </div>
    </div>
  )
}