import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import crypto from 'crypto'

export async function POST(request) {
  try {
  
     const { email } = await request.json()
     if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      )
    }

     // Find user by email
    const user = await prisma.user.findUnique({
      where: { email }
    })

    // Always return success (don't reveal if email exists)
    if (!user) {
      return NextResponse.json({
        success: true,
        message: 'If an account exists with that email, a reset link has been sent.'
      })
    }

     // Generate secure random token
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000) // 1 hour from now

     // Save token to database
    await prisma.user.update({
      where: { email },
      data: {
        resetToken,
        resetTokenExpiry
      }
    })

    // In production, I would send an email here
    // For now, I'll return the token 
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`

    console.log('🔑 Password Reset Requested')
    console.log('📧 Email:', email)
    console.log('🔗 Reset Link:', resetUrl)
    console.log('⏰ Expires:', resetTokenExpiry.toLocaleString())

    return NextResponse.json({
      success: true,
      message: 'If an account exists with that email, a reset link has been sent.',
      // ONLY FOR DEVELOPMENT - Remove in production!
      devToken: process.env.NODE_ENV === 'development' ? resetToken : undefined,
      devResetUrl: process.env.NODE_ENV === 'development' ? resetUrl : undefined
    })

    }
  catch(error){
    console.error('Forgot password error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
  )}
}