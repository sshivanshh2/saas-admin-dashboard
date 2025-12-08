import {NextResponse} from 'next/server'
import {mockUsers} from '@/lib/data/mockUsers'

export async function GET(request){
    try{
        await new Promise(resolve => setTimeout(resolve, 500))

        const users = mockUsers

        return NextResponse.json({
            success: true,
            data: users,
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