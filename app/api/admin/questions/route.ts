import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/src/__server__/utils/db_connect';
import { AuthMiddleware } from '@/src/__server__/middlewares/auth.middleware';
import { ApiError } from '@/src/__server__/utils/ApiError';
import httpStatus from 'http-status';
import validator from '@/src/__server__/middlewares/validation.middleware';
import { questionSchema } from '@/src/__server__/validators/question.validator';
import { createQuestion } from '@/src/__server__/controllers/question.controller';


export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const userData: any = await AuthMiddleware(req);
        if (userData.role !== 'admin') {
            throw new ApiError(
                httpStatus.FORBIDDEN, 'Access Denied'
            )
        }
        const data = await req.json();
        await validator(data, questionSchema);
        await connectDB();
        console.log(data, '***')
        const res = await createQuestion(data);

        return NextResponse.json({ 'success': "true", "message": "data added successfully", "data": res })
    } catch (error: any) {
        return NextResponse.json({
            success: error.success,
            message: error.message,
        }, { status: error.statusCode || 500 });
    }
}