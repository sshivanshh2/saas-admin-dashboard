import {NextResponse} from 'next/server'
import {mockUsers} from '@/lib/data/mockUsers'

// GET /api/users?search=aiden&role=admin&status=active&page=1&limit=5
export async function GET(request){
    try{
        await new Promise(resolve => setTimeout(resolve, 500))
        const {searchParams} = new URL(request.url)
        const searchUrlParams = searchParams.get('search')||''
        const roleUrlParams = searchParams.get('role')||''
        const statusUrlParams = searchParams.get('status')||''
        const pageUrlParams = parseInt(searchParams.get('page') || '1')
        const limitUrlParams = parseInt(searchParams.get('limit') || '10')

        let users = mockUsers

        // Search by name or email (case-insensitive)
        if(searchUrlParams){
            users = users.filter((user)=>{
               return (user.name.toLowerCase().includes(searchUrlParams.toLowerCase()) || user.email.toLowerCase().includes(searchUrlParams.toLowerCase()))
            })
        }
        
        // filter by role
        if(roleUrlParams)
            users = users.filter((user)=>user.role === roleUrlParams)
        
        // filter by status
        if(statusUrlParams)
            users = users.filter((user)=>user.status === statusUrlParams)

        //pagination
        const totalUsers = users.length
        const totalPages = Math.ceil(totalUsers/limitUrlParams)
        const startIndex = (pageUrlParams-1)*limitUrlParams
        const endIndex = startIndex + limitUrlParams
        const paginatedUsers = users.slice(startIndex, endIndex)

        return NextResponse.json({
            success: true,
            data: paginatedUsers,
            pagination: {
            pageUrlParams,
            limitUrlParams, 
            total: totalUsers, totalPages,
            hasNext: pageUrlParams < totalPages,
            hasPrev: pageUrlParams > 1   
            },
            count: users.length
        })
    }
    catch (error){
        return NextResponse.json(
            {success: false, error: 'Failed to fetch users'},
            {status: 500}
        )
    }
}