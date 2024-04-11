import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/src/__server__/utils/db_connect';
import { getCategories } from '@/src/__server__/controllers/categories.controller';
import validator from '@/src/__server__/middlewares/validation.middleware';
import { categorySchema } from '@/src/__server__/validators/categories.validator';

export async function GET(req: NextRequest, res: NextResponse) {
    try {

        await connectDB();
        const type = req.nextUrl.searchParams.get('type')
        const subject = req.nextUrl.searchParams.get('subject')
        await validator(type, categorySchema)
        const data = await getCategories(type as string, subject)
        return NextResponse.json(data)

    } catch (error: any) {
        return NextResponse.json({
            success: error.success,
            message: error.message,
        }, { status: error.statusCode || 500 });

    }
}