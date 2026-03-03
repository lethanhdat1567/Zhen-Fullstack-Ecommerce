import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const accessToken = req.cookies.get("access_token")?.value;

    const locales = routing.locales;

    const authRoutes = [
        "/login",
        "/forgot-password",
        "/reset-password",
        "/logout",
    ];

    const pathnameParts = pathname.split("/");
    const firstSegment = pathnameParts[1];

    const isLocale = locales.includes(firstSegment as any);
    const secondSegment = pathnameParts[2];

    /**
     * 1️⃣ Nếu có locale + (admin hoặc auth) → bỏ locale
     * VD:
     * /vi/admin
     * /vi/login
     */
    if (
        isLocale &&
        (secondSegment === "admin" || authRoutes.includes(`/${secondSegment}`))
    ) {
        const newPath = pathname.replace(`/${firstSegment}`, "");
        return NextResponse.redirect(new URL(newPath, req.url));
    }

    /**
     * 2️⃣ Nếu vào đúng /admin → redirect dashboard
     */
    if (pathname === "/admin") {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }

    /**
     * 3️⃣ Nếu đã login mà vào auth → dashboard
     */
    if (authRoutes.includes(pathname) && accessToken) {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }

    /**
     * 4️⃣ Nếu vào admin mà chưa login → login
     */
    if (pathname.startsWith("/admin") && !accessToken) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    /**
     * 5️⃣ Admin & Auth không dùng next-intl
     */
    if (pathname.startsWith("/admin") || authRoutes.includes(pathname)) {
        return NextResponse.next();
    }

    /**
     * 6️⃣ Public site → dùng next-intl
     */
    return intlMiddleware(req);
}

export const config = {
    matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
