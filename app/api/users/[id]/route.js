import {NextResponse} from 'next/server'
import { prisma } from '@/lib/db/prisma'

// PUT /api/users/[id] - Update user
export async function PUT(request, context){
    try{
        const params = await context.params 
        const id = parseInt(params.id)
        const userData = await request.json()
        const {name, email, role, status} = userData

        if (!name || !email){
        return NextResponse.json(
            { success: false, error: 'Name and email are required' },
            { status: 400 }
        )
      }

      // if email taken by another user
        const existingUser = await prisma.user.findFirst({
            where: {email,
                NOT: {id} // but is NOT the user with this id.
            }
        })

        if (existingUser) {
            return NextResponse.json(
            { success: false, error: 'Email already exists' },
            { status: 400 }
        )
        }

        const user = await prisma.user.update({
            where: {id},
            data: {
                name,
                email,
                role,
                status
            }
        })

        return NextResponse.json({
        success: true,
        data: user,
        message: 'User updated successfully'
    })
    }
    catch(error){
        console.error('Update user error:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to update user' },
            { status: 500 }
    )
    }
}