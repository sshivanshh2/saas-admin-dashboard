import { NextResponse } from 'next/server'
import {revenueData, userGrowthData, userByRole, trafficSources, dailyActiveUsers} from '@lib/data/mockAnalytics'

export async function GET(request){
    try{
        await new Promise(resolve=>setTimeout(resolve, 800))
        return NextResponse.json({
            success: true,
            data: {
                revenue: revenueData,
                userGrowth: userGrowthData, 
                userByRole,
                trafficSources,
                dailyActiveUsers
            }
        })
    }
    catch(error){
        return NextResponse.json(
            {success: false, error: 'Failed to fetch Analytics'},
            {status: 500}
        )
    }
}