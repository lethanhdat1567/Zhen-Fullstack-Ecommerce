import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const accessToken = req.cookies.get("access_token")?.value;
    const role = req.cookies.get("role")?.value; // Lấy role từ cookie
    const locales = routing.locales;

    const authRoutes = [
        "/login",
        "/register",
        "/forgot-password",
        "/reset-password",
        "/logout",
    ];

    const pathnameParts = pathname.split("/");
    const firstSegment = pathnameParts[1];
    const isLocale = locales.includes(firstSegment as any);

    const purePathname = isLocale
        ? `/${pathnameParts.slice(2).join("/")}`
        : pathname;

    /**
     * 1️⃣ Gỡ Locale khỏi Admin/Auth Routes
     */
    if (
        isLocale &&
        (purePathname.startsWith("/admin") || authRoutes.includes(purePathname))
    ) {
        return NextResponse.redirect(new URL(purePathname, req.url));
    }

    const isAuthRoute = authRoutes.includes(purePathname);
    const isAdminRoute = purePathname.startsWith("/admin");

    /**
     * 2️⃣ Xử lý bảo mật cho Admin Route
     */
    if (isAdminRoute) {
        // Nếu chưa login hoặc role KHÔNG PHẢI admin -> đá ra login
        // (Hoặc đá ra trang chủ nếu bạn muốn User không thấy trang login)
        if (!accessToken || role !== "admin") {
            const redirectUrl = new URL("/login", req.url);
            // Nếu là User đã login nhưng vào nhầm Admin, có thể xóa token hoặc báo lỗi,
            // ở đây ta chọn đá về login cho an toàn.
            return NextResponse.redirect(redirectUrl);
        }

        // Nếu vào đúng /admin (không có hậu tố) -> dashboard
        if (purePathname === "/admin") {
            return NextResponse.redirect(new URL("/admin/dashboard", req.url));
        }

        return NextResponse.next();
    }

    /**
     * 3️⃣ Xử lý Auth Route (Login, Register...)
     */
    if (isAuthRoute) {
        // Nếu đã login và là ADMIN -> vào Dashboard
        if (accessToken && role === "admin" && purePathname !== "/logout") {
            return NextResponse.redirect(new URL("/admin/dashboard", req.url));
        }

        // Nếu đã login và là USER -> cho ở lại Public (đá về home)
        if (accessToken && role === "user" && purePathname !== "/logout") {
            return NextResponse.redirect(new URL("/", req.url));
        }

        return NextResponse.next();
    }

    /**
     * 4️⃣ Public site (Trường hợp còn lại)
     */
    return intlMiddleware(req);
}

export const config = {
    matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
