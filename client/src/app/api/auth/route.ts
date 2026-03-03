// app/api/auth/set-token/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { accessToken, role, expiresIn } = body;

        // Kiểm tra dữ liệu đầu vào
        if (!accessToken || !role) {
            return NextResponse.json(
                { error: "accessToken or role not found" },
                { status: 400 },
            );
        }

        const response = NextResponse.json({
            message: "Token set successfully",
        });

        // Cấu hình cookie chung
        const cookieOptions = {
            httpOnly: true, // Bảo mật, tránh XSS
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: expiresIn / 1000,
        };

        // 1. Set cookie cho access_token
        response.cookies.set({
            name: "access_token",
            value: accessToken,
            ...cookieOptions,
        });

        // 2. Set cookie cho role
        response.cookies.set({
            name: "role",
            value: role,
            ...cookieOptions,
        });

        return response;
    } catch (err) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
        );
    }
}
