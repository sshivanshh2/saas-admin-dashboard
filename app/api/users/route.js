import {NextResponse} from 'next/server'
import { prisma } from '@/lib/db/prisma'

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

        // Build Prisma where clause
        const where = {}
        
        // Search filter
        if (searchUrlParams){
            where.OR = [
                {name: { contains: searchUrlParams, mode: 'insensitive'}},
                {email: {contains: searchUrlParams, mode: 'insensitive'}}
            ]
        }

        // filter by role
        if(roleUrlParams)
            where.role = roleUrlParams
        
        // filter by status
        if(statusUrlParams)
           where.status = statusUrlParams

        //pagination
        const totalUsers = await prisma.user.count({where}) // total count for pagination
        const paginatedUsers = await prisma.user.findMany({
            where,
            skip: (pageUrlParams - 1)*limitUrlParams,
            take: limitUrlParams,
            orderBy: {
                createdAt: 'desc'
            }
        })
        const totalPages = Math.ceil(totalUsers/limitUrlParams)

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
            count: totalUsers.length
        })
    }
    catch (error){
        return NextResponse.json(
            {success: false, error: 'Failed to fetch users'},
            {status: 500}
        )
    }
}