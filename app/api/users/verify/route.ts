import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/src/__server__/utils/db_connect';
import validator from '@/src/__server__/middlewares/validation.middleware';
import { otpSchema } from '@/src/__server__/validators/user.validator';
import { verifyUser } from '@/src/__server__/controllers/users.controller';

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await connectDB();
    const data = await req.json();
    // console.log(data, '***')
    await validator(data, otpSchema);
    const result = await verifyUser(data.email, data.otp);
    // console.log(result)
    if (result === 'expired') {
      return NextResponse.json('expired')
    } else if (result === 'success') {
      return NextResponse.json('success')
    } else {
      return NextResponse.json('invalid otp')
    }
  } catch (error: any) {
    console.log(error.message, '***');
    return NextResponse.json({
      success: error.success,
      message: error.message,
    }, { status: error.statusCode || 500 });
  }
}
