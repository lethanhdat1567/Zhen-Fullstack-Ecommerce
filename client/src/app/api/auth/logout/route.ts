// app/api/auth/logout/route.ts
import { authService } from "@/services/authService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { refreshToken } = body;

        if (refreshToken) {
            await authService.logout({ refreshToken });
        }

        const response = NextResponse.json({
            message: "Logged out successfully",
        });

        // Sử dụng delete() để xóa cookie
        // Next.js sẽ tự động set expire date về quá khứ cho bạn
        response.cookies.delete("access_token");

        return response;
    } catch (err) {
        return NextResponse.json({ error: "Logout failed" }, { status: 500 });
    }
}
