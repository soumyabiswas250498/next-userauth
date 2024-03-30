import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";
import { ApiError } from "../utils/ApiError";

export async function AuthMiddleware(
    req: NextRequest
) {
    const token = await getToken({
        req,
        secret: process.env.REFRESH_TOKEN_SECRET,
    });
    if (token) {
        return { email: token.email, role: token.role, userId: token.userId }

    } else {
        throw new ApiError(401, 'User not authenticated');
    }
    console.log("from middleware ", token);


}