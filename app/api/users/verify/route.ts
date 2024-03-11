import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/src/__server__/utils/db_connect';
import validator from '@/src/__server__/middlewares/validation.middleware';
import { loginSchema } from '@/src/__server__/validators/user.validator';
import { loginUser } from '@/src/__server__/controllers/users.controller';
import { ApiResponse } from '@/src/__server__/utils/ApiResponse';
import httpStatus from 'http-status';

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await connectDB();
    const data = await req.json();
    console.log(data)
    
    return NextResponse.json(  'Logged In Successfully')
  } catch (error : any) {
    console.log(error.message, '***');
    return NextResponse.json({
      success: error.success,
      message: error.message,
    }, {status: error.statusCode || 500});
  }
}
