import {NextResponse} from 'next/server'
import { prisma } from '@/lib/db/prisma'
import bcrypt from 'bcryptjs'

// PUT /api/users/[id] - Update user
export async function PUT(request, context){
    try{
        const params = await context.params 
        const id = parseInt(params.id)
        const userData = await request.json()
        const {name, email, password, role, status} = userData

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
         const updateData = {
            name,
            email,
            role,
            status
        }

        // Only update password if provided
        if (password && password.trim() !== '') {
        if (password.length < 6) {
            return NextResponse.json(
            { success: false, error: 'Password must be at least 6 characters' },
            { status: 400 }
            )
        }
        updateData.password = await bcrypt.hash(password, 10)
        }

        const updatedUser = await prisma.user.update({
            where: {id},
            data: updateData
        })

         // Don't return password
        const { password: _, ...userWithoutPassword } = updatedUser

            return NextResponse.json({
            success: true,
            data: userWithoutPassword,
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