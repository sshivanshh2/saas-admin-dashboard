'use client'
import {useState, useEffect} from 'react'
import SearchInput from '../components/SearchInput'

export default function DashboardPage(){
    const [userCount, setUserCount] = useState(0)

    useEffect(()=>{
        async function fetchUserCount(){
            try{
                const response = await fetch('api/users')
                const data = await response.json()
                if (data.success)
                    setUserCount(data.count)
            }
            catch(error){
                console.error('Failed to fetch user count: ', error)
            }
        }
        fetchUserCount()
    },[])

    return (
        // KPI Content 
        <main className="p-8">
            <div>
                <SearchInput/>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Dashboard Overview
            </h1>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Total Users Card */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-gray-600">Total Users</h3>
                        <span className="text-2xl">👥</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{userCount}</p>
                    <p className="text-sm text-green-600 mt-2">↑ 12% from last month</p>
                </div>

                {/* Revenue Card */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-gray-600">Revenue</h3>
                        <span className="text-2xl">💰</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">$45,231</p>
                    <p className="text-sm text-green-600 mt-2">↑ 8% from last month</p>
                </div>

                {/* Active Sessions Card */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-gray-600">Active Sessions</h3>
                        <span className="text-2xl">⚡</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">573</p>
                    <p className="text-sm text-gray-600 mt-2">Real-time data</p>
                </div>

                {/* Conversion Rate Card */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-gray-600">Conversion Rate</h3>
                        <span className="text-2xl">📈</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">3.2%</p>
                    <p className="text-sm text-red-600 mt-2">↓ 2% from last month</p>
                </div>
        </div>

         <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 hover:cursor-pointer transition-all text-left">
                    <span className="text-2xl mb-2 block">➕</span>
                    <h3 className="font-semibold text-gray-900">Add New User</h3>
                    <p className="text-sm text-gray-600 mt-1">Create a new user account</p>
                </button>
                <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 hover:cursor-pointer transition-all text-left">
                    <span className="text-2xl mb-2 block">📊</span>
                    <h3 className="font-semibold text-gray-900">View Reports</h3>
                    <p className="text-sm text-gray-600 mt-1">Generate analytics reports</p>
                </button>
                 <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 hover:cursor-pointer transition-all text-left">
                    <span className="text-2xl mb-2 block">⚙️</span>
                    <h3 className="font-semibold text-gray-900">Settings</h3>
                    <p className="text-sm text-gray-600 mt-1">Configure your dashboard</p>
                </button>
            </div>
        </div>                        
            
        </main>
    )
}