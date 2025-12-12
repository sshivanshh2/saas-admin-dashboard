'use client'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

import { useEffect, useState } from "react"

export default function AnalyticsPage() {        
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  

  useEffect(()=>{
    async function fetchAnalytics(){
      try{
        const response = await fetch('/api/analytics')
        const data = await response.json()

        if(data.success){
          setAnalytics(data.data)
        }
        else
          setError("Failed to load Analytics")
      }
      catch(error)
      {
        console.log("Network Error: ", error)
      }
      finally{
        setLoading(false)
      }
    }
    fetchAnalytics()
  }, [])

  if(loading)
  {
    return(
            <div className='p-8 flex items-center justify-center min-h-screen'>
                <div className='text-center'>
                    <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-indigo-600 mx-auto"></div>
                    <p className='mt-4 text-gray-600'>Loading Analytics...</p>
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
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Analytics & Reports</h1>

      {/* Revenue vs Expenses Chart */}
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <h2 className="text-gray-500 text-lg">Revenue vs Expenses</h2>
        <ResponsiveContainer width="100%" height={300} style={{ border: "2px solid #000" }}>
          <BarChart data={analytics.revenue}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              formatter={(value) => `$${value.toLocaleString()}`} 
              contentStyle={{ backgroundColor: '#fff'}}
              />
            <Legend />
            <Bar dataKey="revenue" fill="#6366f1" name="Revenue" />
            <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}