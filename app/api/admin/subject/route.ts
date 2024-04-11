import { authOptions } from '../../auth/[...nextauth]/route';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt"
import { AuthMiddleware } from '@/src/__server__/middlewares/auth.middleware';


export async function POST(req: NextRequest, res: NextResponse) {
    const token = await getToken({ req })
    console.log(token, '***t')

    const data = await req.json();
    console.log(data, '***')
    return NextResponse.json({ "success": "test" })
}