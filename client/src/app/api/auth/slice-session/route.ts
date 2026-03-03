// app/api/auth/logout/route.ts
import { authService } from "@/services/authService";
import { NextRequest, NextResponse } from "next/server";
import { HttpError } from "@/lib/http/errors";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { refresh_token } = body;

        if (!refresh_token) {
            return NextResponse.json(
                { error: "Refresh token not found" },
                { status: 400 },
            );
        }

        const res = await authService.refresh({
            refreshToken: refresh_token,
        });

        const { accessToken, expiresIn, refreshToken } = res.data;

        const response = NextResponse.json({
            message: "Refresh token successfully",
            accessToken,
            expiresIn,
            refreshToken,
        });
        console.log(accessToken);

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

        return response;
    } catch (err: unknown) {
        if (err instanceof HttpError) {
            // Nếu backend trả 401
            if (err.status === 401) {
                const response = NextResponse.json(
                    {
                        message: err.message,
                    },
                    { status: 401 },
                );

                response.cookies.delete("access_token");
                response.cookies.delete("role");

                return response;
            }

            return NextResponse.json(
                {
                    message: err.message,
                },
                { status: err.status },
            );
        }

        // fallback nếu không phải HttpError
        return NextResponse.json(
            {
                message: "Refresh token failed",
                code: "UNKNOWN_ERROR",
            },
            { status: 500 },
        );
    }
}
