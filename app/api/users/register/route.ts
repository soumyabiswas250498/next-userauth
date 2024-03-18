import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/src/__server__/utils/db_connect';
import validator from '@/src/__server__/middlewares/validation.middleware';
import { registrationSchema } from '@/src/__server__/validators/user.validator';
import { registerUser } from '@/src/__server__/controllers/users.controller';
import { ApiResponse } from '@/src/__server__/utils/ApiResponse';
import httpStatus from 'http-status';

export async function POST(req: NextRequest, res: NextResponse) {
  
  try {
    await connectDB();
    const data = await req.json();
    await validator(data, registrationSchema);
    const newUser =  await registerUser(data)

    return NextResponse.json(new ApiResponse(httpStatus.CREATED, newUser, 'User Registered Successfully'), {status: httpStatus.CREATED});
  } catch (error: any) {
    console.log(error.message, '***');
    return NextResponse.json({
      success: error.success,
      message: error.message,
    }, {status: error.statusCode || 500});
  }
}
