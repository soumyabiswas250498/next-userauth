
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/src/__server__/utils/db_connect';
import { AuthMiddleware } from '@/src/__server__/middlewares/auth.middleware';
import { ApiError } from '@/src/__server__/utils/ApiError';
import httpStatus from 'http-status';
import { updateCategories, createCategory } from '@/src/__server__/controllers/categories.controller';
import validator from '@/src/__server__/middlewares/validation.middleware';
import { updateCategorySchema, createCategorySchema } from '@/src/__server__/validators/categories.validator';


export async function PUT(req: NextRequest, res: NextResponse) {
    try {
        const userData: any = await AuthMiddleware(req);
        if (userData.role !== 'admin') {
            throw new ApiError(
                httpStatus.FORBIDDEN, 'Access Denied'
            )
        }
        const data = await req.json();
        await validator(data, updateCategorySchema)
        await connectDB();

        const updatedData = await updateCategories(data.type, data.id, data.newLabel)
        if (updatedData === null) {
            throw new ApiError(
                httpStatus.NOT_FOUND, 'Data not foud'
            )
        }
        return NextResponse.json({ 'success': "true", "message": "data update successful", "data": updatedData })
    } catch (error: any) {
        return NextResponse.json({
            success: error.success,
            message: error.message,
        }, { status: error.statusCode || 500 });
    }
}


export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const userData: any = await AuthMiddleware(req);
        if (userData.role !== 'admin') {
            throw new ApiError(
                httpStatus.FORBIDDEN, 'Access Denied'
            )
        }
        const data = await req.json();
        await validator(data, createCategorySchema)
        await connectDB();
        const createdData = await createCategory(data.type, data.label, data?.subject);
        console.log(createdData, '***');
        return NextResponse.json({ 'success': "true", "message": "data update successful", "data": createdData })
    } catch (error: any) {
        return NextResponse.json({
            success: error.success,
            message: error.message,
        }, { status: error.statusCode || 500 });
    }
}

export async function DELETE(req: NextRequest, res: NextResponse) {

}