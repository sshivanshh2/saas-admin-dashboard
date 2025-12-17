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

export async function POST(request){
    try{
        const userData = await request.json()
        const {name, email, role, status} = userData

        if(!name || !email){
            return NextResponse.json(
                {success: false, error: "Name and email are required"},
                {status: 400}
            )
        }

        // check for existing user if email already exists (unique)
        const existingUser = await prisma.user.findUnique({
            where: {email}
        })
        
        if(existingUser){
             return NextResponse.json(
                {success: false, error: "Email already exists"},
                {status: 400}
            )
        }

        const user = await prisma.user.create({
            data: {
                name, 
                email,
                role: role || 'user',
                status: status || 'active',
                lastLogin: new Date()
            }
        })

        return NextResponse.json({
            success: true,
            data: user,
            message: "User created successfully!"
        }, {status: 201})
    }
    catch(error){
        console.error("Create user error", error)
        return NextResponse.json({
            success: false,
            error: "Failed to create user"},
            {status: 500})
    }
} 

export async function DELETE(request){
    try{
        const {searchParams} = new URL(request.url)
        const id = searchParams.get('id')

        if(!id){
            return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
        )
        }

        await prisma.user.delete({
            where: {id: parseInt(id)}
        })

        return NextResponse.json({
            success: true, 
            message: "User deleted successfully!"
        }, 
        {status: 201})
    }
    catch(error){
        console.log("Delete user error: ", error)
        return NextResponse.json(
            {success: false, error: "Failed to delete user"},
            {status: 500}
    )
    }
}