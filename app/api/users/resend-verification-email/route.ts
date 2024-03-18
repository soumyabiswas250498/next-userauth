import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/src/__server__/utils/db_connect';
import validator from '@/src/__server__/middlewares/validation.middleware';
import { sendVerificationMail } from '@/src/__server__/controllers/users.controller';
import { ApiError } from '@/src/__server__/utils/ApiError';
import httpStatus from 'http-status';

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await connectDB();
    const data = await req.json();
    if (!data.data) {
      throw new ApiError(
        httpStatus.FORBIDDEN,
        `Invalid Token`
      );
    }
    const result = await sendVerificationMail(data.data)
    if (result === 'success') {
      return NextResponse.json('Verification email is sent.')
    }
  } catch (error: any) {
    console.log(error.message, '***E');
    return NextResponse.json({
      success: error.success,
      message: error.message,
    }, { status: error.statusCode || 500 });
  }
}
